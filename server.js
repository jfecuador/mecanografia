// server.js - Backend Node.js Express
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mecanografia'
});

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aqui_cambiar_en_produccion';

// ==================== AUTENTICACIÓN ====================

// Registro de usuario
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    // Crear usuario
    const resultado = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
      [nombre, email, contraseñaHasheada, 'estudiante']
    );

    const usuario = resultado.rows[0];
    const token = jwt.sign({ id: usuario.id, email: usuario.email, rol: usuario.rol }, JWT_SECRET, { expiresIn: '30d' });

    res.json({ usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const resultado = await pool.query(
      'SELECT id, nombre, email, contraseña, rol FROM usuarios WHERE email = $1',
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const usuario = resultado.rows[0];
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, rol: usuario.rol }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ==================== PROGRESO ====================

// Guardar progreso de lección
app.post('/api/progreso', verificarToken, async (req, res) => {
  try {
    const { leccion_id, ejercicio_id, velocidad_wpm, precision, tiempo_segundos, puntos_ganados } = req.body;
    const usuario_id = req.usuario.id;

    await pool.query(
      `INSERT INTO progreso (usuario_id, leccion_id, ejercicio_id, velocidad_wpm, precision, tiempo_segundos, puntos_ganados)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (usuario_id, leccion_id, ejercicio_id) 
       DO UPDATE SET velocidad_wpm = $4, precision = $5, tiempo_segundos = $6, puntos_ganados = $7, fecha = NOW()`,
      [usuario_id, leccion_id, ejercicio_id, velocidad_wpm, precision, tiempo_segundos, puntos_ganados]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar progreso' });
  }
});

// Obtener progreso del usuario
app.get('/api/progreso', verificarToken, async (req, res) => {
  try {
    const usuario_id = req.usuario.id;

    const resultado = await pool.query(
      `SELECT leccion_id, ejercicio_id, velocidad_wpm, precision, tiempo_segundos, puntos_ganados, fecha
       FROM progreso WHERE usuario_id = $1 ORDER BY fecha DESC`,
      [usuario_id]
    );

    // Calcular estadísticas
    const progresoData = resultado.rows;
    const velocidadPromedio = progresoData.length > 0
      ? (progresoData.reduce((sum, p) => sum + (p.velocidad_wpm || 0), 0) / progresoData.length).toFixed(2)
      : 0;

    const precisionPromedio = progresoData.length > 0
      ? (progresoData.reduce((sum, p) => sum + (p.precision || 0), 0) / progresoData.length).toFixed(2)
      : 0;

    const puntosTotal = progresoData.reduce((sum, p) => sum + (p.puntos_ganados || 0), 0);
    const tiempoTotal = progresoData.reduce((sum, p) => sum + (p.tiempo_segundos || 0), 0);

    // Lecciones completadas
    const leccionesCompletadas = [...new Set(progresoData.map(p => p.leccion_id))];

    res.json({
      progreso: progresoData,
      estadisticas: {
        velocidadPromedio,
        precisionPromedio,
        puntosTotal,
        tiempoTotal,
        leccionesCompletadas
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
});

// ==================== ADMIN ====================

// Obtener todos los usuarios (solo admin)
app.get('/api/admin/usuarios', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT u.id, u.nombre, u.email, u.rol, u.fecha_registro,
              COALESCE(COUNT(DISTINCT p.leccion_id), 0) as lecciones_completadas,
              COALESCE(AVG(p.velocidad_wpm), 0)::NUMERIC(10,2) as velocidad_promedio,
              COALESCE(AVG(p.precision), 0)::NUMERIC(5,2) as precision_promedio,
              COALESCE(SUM(p.tiempo_segundos), 0) as tiempo_total,
              MAX(p.fecha) as ultima_practica
       FROM usuarios u
       LEFT JOIN progreso p ON u.id = p.usuario_id
       GROUP BY u.id
       ORDER BY u.fecha_registro DESC`
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener detalles de usuario específico (solo admin)
app.get('/api/admin/usuarios/:usuario_id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const usuarioResult = await pool.query(
      'SELECT id, nombre, email, rol, fecha_registro FROM usuarios WHERE id = $1',
      [usuario_id]
    );

    if (usuarioResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const progresoResult = await pool.query(
      `SELECT leccion_id, ejercicio_id, velocidad_wpm, precision, tiempo_segundos, puntos_ganados, fecha
       FROM progreso WHERE usuario_id = $1 ORDER BY fecha DESC`,
      [usuario_id]
    );

    const estadisticasResult = await pool.query(
      `SELECT leccion_id,
              COUNT(*) as ejercicios_completados,
              MAX(velocidad_wpm)::NUMERIC(10,2) as mejor_velocidad,
              MAX(precision)::NUMERIC(5,2) as mejor_precision,
              SUM(tiempo_segundos) as tiempo_total
       FROM progreso WHERE usuario_id = $1
       GROUP BY leccion_id
       ORDER BY leccion_id`,
      [usuario_id]
    );

    res.json({
      usuario: usuarioResult.rows[0],
      progreso: progresoResult.rows,
      estadisticas: estadisticasResult.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener detalles del usuario' });
  }
});

// Resetear progreso de usuario (solo admin)
app.post('/api/admin/usuarios/:usuario_id/resetear', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { usuario_id } = req.params;

    await pool.query('DELETE FROM progreso WHERE usuario_id = $1', [usuario_id]);

    res.json({ success: true, message: 'Progreso reiniciado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al resetear progreso' });
  }
});

// Eliminar usuario (solo admin)
app.delete('/api/admin/usuarios/:usuario_id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { usuario_id } = req.params;

    await pool.query('DELETE FROM progreso WHERE usuario_id = $1', [usuario_id]);
    await pool.query('DELETE FROM usuarios WHERE id = $1', [usuario_id]);

    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Obtener estadísticas generales (solo admin)
app.get('/api/admin/estadisticas', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const totalUsuariosResult = await pool.query('SELECT COUNT(*) as total FROM usuarios');
    const totalEstudiantesResult = await pool.query("SELECT COUNT(*) as total FROM usuarios WHERE rol = 'estudiante'");
    
    const estadisticasResult = await pool.query(
      `SELECT COUNT(DISTINCT usuario_id) as usuarios_activos,
              COALESCE(AVG(velocidad_wpm), 0)::NUMERIC(10,2) as velocidad_promedio_global,
              COALESCE(AVG(precision), 0)::NUMERIC(5,2) as precision_promedio_global,
              COALESCE(SUM(tiempo_segundos), 0) as tiempo_total_global,
              COUNT(*) as total_ejercicios_completados
       FROM progreso`
    );

    res.json({
      totalUsuarios: totalUsuariosResult.rows[0].total,
      totalEstudiantes: totalEstudiantesResult.rows[0].total,
      estadisticas: estadisticasResult.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// ==================== MIDDLEWARES ====================

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function verificarAdmin(req, res, next) {
  if (req.usuario.rol !== 'administrador') {
    return res.status(403).json({ error: 'Acceso denegado: se requieren permisos de administrador' });
  }
  next();
}

// ==================== INICIAR SERVIDOR ====================

const PORT = process.env.PORT || 3000;

pool.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'estudiante',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progreso (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    leccion_id INTEGER NOT NULL,
    ejercicio_id INTEGER NOT NULL,
    velocidad_wpm DECIMAL(10, 2),
    precision DECIMAL(5, 2),
    tiempo_segundos INTEGER,
    puntos_ganados INTEGER DEFAULT 0,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, leccion_id, ejercicio_id)
  );

  CREATE INDEX IF NOT EXISTS idx_progreso_usuario ON progreso(usuario_id);
  CREATE INDEX IF NOT EXISTS idx_progreso_fecha ON progreso(fecha);
`).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error inicializando base de datos:', err);
  process.exit(1);
});
