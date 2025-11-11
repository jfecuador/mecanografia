# 🚀 DESPLIEGUE A PRODUCCIÓN EN 3 PASOS

## ⚡ TL;DR - Lo esencial

```bash
# Paso 1: Clona y configura
git clone https://github.com/tu-usuario/mecanografia-tutor.git
cd mecanografia-tutor
npm install
cp .env.example .env

# Paso 2: Obtén URL de base de datos de Railway
# (Verás la URL en Railway Dashboard)

# Paso 3: Sube a GitHub y despliega en Vercel
git push origin main
# Vercel se desplegará automáticamente
```

---

## 📋 PASO 1: PREPARAR EL CÓDIGO LOCALMENTE (5 minutos)

### 1.1 Descargar el código

Si aún no tienes Git instalado, descárgalo de: https://git-scm.com/

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/mecanografia-tutor.git
cd mecanografia-tutor

# O si no tienes un repositorio aún, crea uno:
# - Ve a https://github.com/new
# - Crea repositorio vacío llamado "mecanografia-tutor"
# - Luego:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/mecanografia-tutor.git
git branch -M main
git push -u origin main
```

### 1.2 Instalar dependencias

```bash
npm install
```

### 1.3 Crear archivo .env

```bash
cp .env.example .env
```

Dejalo así por ahora, lo modificaremos después.

---

## 🗄️ PASO 2: CONFIGURAR BASE DE DATOS GRATIS (Railway) - 5 minutos

### 2.1 Ir a Railway

1. Ve a https://railway.app
2. Haz clic en "Start a New Project"
3. Elige "Provision PostgreSQL"
4. Haz clic en el plugin PostgreSQL

### 2.2 Obtener conexión

1. En Railway, ve a la pestaña de tu PostgreSQL
2. Abre "Connect"
3. Copia el valor de `DATABASE_URL`
4. Pégalo en tu archivo `.env`:

```
DATABASE_URL=postgresql://usuario:contraseña@host:5432/railway
JWT_SECRET=tu_clave_super_secreta_123
```

### 2.3 Verificar localmente (opcional)

```bash
npm run dev
```

Abre: http://localhost:3000
Si ves la app, ¡está funcionando!

Presiona Ctrl+C para detener.

---

## 🌐 PASO 3: DESPLEGAR EN VERCEL (3 minutos)

### 3.1 Crear cuenta en Vercel

1. Ve a https://vercel.com/signup
2. Elige "Sign up with GitHub"
3. Autoriza Vercel
4. Verás tu dashboard

### 3.2 Importar proyecto

1. En Vercel, haz clic en "Add New"
2. Elige "Project"
3. Busca y selecciona tu repositorio "mecanografia-tutor"
4. Haz clic en "Import"

### 3.3 Configurar variables de entorno

1. En la pantalla de "Environment Variables":
   - `DATABASE_URL`: Pega la URL de Railway
   - `JWT_SECRET`: Escribe algo seguro (ej: `produccion_clave_abc123xyz`)
   
2. Haz clic en "Deploy"

### 3.4 ¡Espera a que se despliegue!

- Vercel comenzará a compilar
- En 2-5 minutos verás "Production"
- Tu URL será algo como: `https://mecanografia-tutor.vercel.app`

---

## ✅ VERIFICAR QUE FUNCIONA

1. Abre tu URL en el navegador
2. Haz clic en "Estudiante"
3. Registra un nuevo usuario
4. ¡Prueba una lección!
5. Haz clic en "Administrador"
6. Login con: `admin@mecanografia.com` / `admin123`
7. Deberías ver tu usuario en la lista

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

### Cambiar contraseña de admin

En tu Railway PostgreSQL, ejecuta:

```sql
-- Para cambiar contraseña del admin
-- (Usa Railway Console → Query)

-- Primero crea el nuevo admin con bcrypt hash
-- Nota: Necesitarás generar un hash bcrypt
-- Usa: https://bcrypt-generator.com/

INSERT INTO usuarios (nombre, email, contraseña, rol) 
VALUES ('Administrador', 'tu-email-admin@tudominio.com', '$2a$10$hashedpassword', 'administrador');
```

### Agregar tu dominio personalizado

En Vercel:
1. **Settings** → **Domains**
2. Agrega tu dominio
3. Configura los DNS records
4. Listo en 24-48 horas

### Hacer backups de la base de datos

Railway hace backups automáticos. Para exportar manualmente:

En Railway → PostgreSQL → Data → Backups

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error: "Database connection failed"
- Verifica que `DATABASE_URL` esté correcto en `.env` y en Vercel
- Revisa en Railway que PostgreSQL esté activo

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Port already in use"
```bash
# Si probando localmente:
# Usa otro puerto
PORT=3001 npm run dev
```

### El login no funciona
- Verifica que las tablas se crearon en Railway
- En Railway Console, ejecuta:
```sql
SELECT * FROM usuarios;
```

### Cambios no se ven en producción
```bash
# Asegúrate de hacer push a GitHub
git add .
git commit -m "Descripción del cambio"
git push origin main

# Vercel se desplegará automáticamente
```

---

## 📊 ACCESO A ADMIN DASHBOARD

**URL**: https://tu-app.vercel.app/admin

**Credenciales por defecto**:
- Email: `admin@mecanografia.com`
- Contraseña: `admin123`

**IMPORTANTE**: Cambia estas credenciales en producción

---

## 💾 RESUMEN DE COSTOS

| Servicio | Costo Inicial |
|----------|--------------|
| Railway (PostgreSQL) | Gratis (después $5/mes) |
| Vercel (Hosting) | Gratis |
| Dominio (opcional) | $10-15/año |
| **TOTAL** | **Gratis** |

---

## 📞 AYUDA RÁPIDA

- **Docs de Railway**: https://docs.railway.app
- **Docs de Vercel**: https://vercel.com/docs
- **Docs de Node.js**: https://nodejs.org/docs

¡Listo! Tu app está en producción. 🎉
