# 🎓 Tutor de Mecanografía - Teclado Español Ecuador

Aplicación web completa para aprender mecanografía rápida usando el teclado latinoamericano español.

**Demostración**: https://mecanografia-tutor.vercel.app  
**Estado**: ✅ Producción Lista  
**Licencia**: MIT

---

## 🚀 Características

### Para Estudiantes
- ✅ 5 lecciones progresivas (fila base → acentos)
- ✅ Teclado visual con código de colores
- ✅ Retroalimentación en tiempo real
- ✅ Tracker de progreso y estadísticas
- ✅ Sistema de logros y puntos
- ✅ Prueba de velocidad (WPM)
- ✅ Guardado automático de progreso

### Para Administradores
- ✅ Dashboard de estudiantes
- ✅ Seguimiento de progreso individual
- ✅ Gráficos y estadísticas
- ✅ Gestión de cuentas
- ✅ Exportación de datos
- ✅ Reset de progreso

---

## 📋 Requisitos

- Node.js 18.x
- npm 9.x
- Base de datos PostgreSQL (gratis con Railway)
- Vercel (hosting gratis)

---

## 🎯 Inicio Rápido

### Opción 1: En 3 pasos a Producción (RECOMENDADO)

```bash
# Lee la guía
cat DESPLIEGUE-3-PASOS.md

# Resumen:
# 1. Clona el repo e instala: npm install
# 2. Configura base de datos en Railway (gratis)
# 3. Despliega en Vercel (automático)
```

### Opción 2: Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar .env
cp .env.example .env
# Edita .env con tu DATABASE_URL local

# Iniciar servidor
npm run dev

# Abre http://localhost:3000
```

---

## 📁 Estructura de Carpetas

```
mecanografia-tutor/
├── server.js              # Backend Node.js + Express
├── package.json           # Dependencias
├── vercel.json           # Config de Vercel
├── .env.example          # Variables de entorno (plantilla)
├── DESPLIEGUE-3-PASOS.md # Guía de despliegue
├── public/               # Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── admin.js
└── README.md             # Este archivo
```

---

## 🔐 Autenticación

### Login de Estudiante
- Registro: Email + Contraseña
- Auto-guardado de progreso
- 30 días de sesión

### Login de Admin
- Email: `admin@mecanografia.com`
- Contraseña: `admin123`
- **CAMBIA ESTO EN PRODUCCIÓN**

---

## 📊 API Endpoints

### Autenticación
```
POST   /api/auth/register          Registrar estudiante
POST   /api/auth/login              Iniciar sesión
```

### Progreso
```
POST   /api/progreso                Guardar progreso
GET    /api/progreso                Obtener progreso del usuario
```

### Admin
```
GET    /api/admin/usuarios          Listar todos los usuarios
GET    /api/admin/usuarios/:id      Detalles de usuario
POST   /api/admin/usuarios/:id/resetear   Resetear progreso
DELETE /api/admin/usuarios/:id      Eliminar usuario
GET    /api/admin/estadisticas      Estadísticas generales
```

---

## 🛠️ Configuración de Producción

### Variables de Entorno

```env
# Base de datos PostgreSQL
DATABASE_URL=postgresql://user:pass@host:5432/db

# JWT Secret (CAMBIA ESTO)
JWT_SECRET=tu_clave_muy_segura_aqui

# Puerto
PORT=3000

# Node Environment
NODE_ENV=production
```

### Deploy en Vercel

1. Conecta tu GitHub a Vercel
2. Importa el repositorio
3. Agrega las variables de entorno
4. Deploy automático en cada push

---

## 📈 Mejoras Futuras

- [ ] Desafíos entre usuarios
- [ ] Integración con plataformas educativas
- [ ] App móvil nativa
- [ ] Más idiomas de teclado
- [ ] Sistema de certificados
- [ ] Exportación de reportes (PDF)
- [ ] Integración con Discord

---

## 🐛 Bugs Conocidos

Ninguno reportado actualmente. ¡Reporta cualquier problema en GitHub Issues!

---

## 📝 Licencia

MIT License - Libre para uso personal y comercial

---

## 👨‍💻 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mejora`)
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

## 📞 Soporte

- **Documentación**: Ver DESPLIEGUE-3-PASOS.md
- **Issues**: GitHub Issues
- **Email**: soporte@ejemplo.com

---

## 🙏 Agradecimientos

Inspirado en aplicaciones como Typing.com y KeyBlaze.

Desarrollado para estudiantes de Ecuador y América Latina.

