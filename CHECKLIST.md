# ✅ CHECKLIST COMPLETO DE DESPLIEGUE

## ANTES DE EMPEZAR

### Software necesario
- [ ] Node.js 18.x instalado → https://nodejs.org
- [ ] Git instalado → https://git-scm.com
- [ ] Editor de texto (VS Code recomendado) → https://code.visualstudio.com

### Cuentas necesarias
- [ ] GitHub account (gratis) → https://github.com
- [ ] Vercel account (gratis) → https://vercel.com
- [ ] Railway account (gratis) → https://railway.app

---

## FASE 1: PREPARACIÓN LOCAL

### Software
- [ ] `node --version` → Funciona (v18.x+)
- [ ] `npm --version` → Funciona (v9.x+)
- [ ] `git --version` → Funciona

### Código
- [ ] Descargué todos los archivos generados
- [ ] Los coloqué en una carpeta llamada "mecanografia-tutor"
- [ ] La carpeta está vacía excepto mis archivos

### Inicialización
- [ ] `cd mecanografia-tutor`
- [ ] `npm install` ✅ Completado sin errores
- [ ] `cp .env.example .env` ✅ Archivo .env creado

---

## FASE 2: GITHUB

### Repositorio
- [ ] Creé repositorio en GitHub llamado "mecanografia-tutor"
- [ ] Está vacío (sin archivos previos)

### Configuración local
- [ ] `git config user.name "Mi Nombre"`
- [ ] `git config user.email "mi-email@ejemplo.com"`

### Push inicial
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git remote add origin https://github.com/usuario/mecanografia-tutor.git`
- [ ] `git branch -M main`
- [ ] `git push -u origin main` ✅ Push exitoso

### Verificación
- [ ] Abro GitHub y veo todos los archivos
- [ ] Los archivos se ven correctamente

---

## FASE 3: BASE DE DATOS (Railway)

### Creación
- [ ] Fui a https://railway.app
- [ ] Creé cuenta
- [ ] Creé nuevo proyecto
- [ ] Agregué PostgreSQL

### Conexión
- [ ] Voy a PostgreSQL → Connect
- [ ] Copio el valor de `DATABASE_URL` completo
- [ ] Es algo como: `postgresql://usuario:pass@host:5432/railway`

### Archivo .env local
- [ ] Abro mi archivo `.env` con editor
- [ ] Pego DATABASE_URL: 
  ```
  DATABASE_URL=postgresql://...
  ```
- [ ] Agrego JWT_SECRET:
  ```
  JWT_SECRET=clave_super_segura_produccion_123
  ```
- [ ] Guardo el archivo
- [ ] NO lo subo a GitHub (por eso está en .gitignore)

### Prueba local (Opcional)
- [ ] `npm run dev` → Servidor inicia
- [ ] Abro http://localhost:3000
- [ ] Veo la app funcionando
- [ ] Presiono Ctrl+C para detener

---

## FASE 4: GITHUB PREPARADO PARA VERCEL

### Credenciales .env
- [ ] Creo archivo `.env` (sin .example) en la raíz
- [ ] Lo relleno con:
  ```
  DATABASE_URL=mi_url_de_railway
  JWT_SECRET=clave_produccion
  PORT=3000
  NODE_ENV=production
  ```

### Commit y push final
- [ ] `git add .env`
- [ ] `git commit -m "Add production environment variables"`
- [ ] `git push origin main` ✅ Push exitoso

### Verificación
- [ ] Voy a GitHub
- [ ] Veo el archivo `.env` (debería estar ahora)
- [ ] Si no está, hubo error en .gitignore

---

## FASE 5: VERCEL DEPLOYMENT

### Setup en Vercel
- [ ] Voy a https://vercel.com
- [ ] Hago clic en "Sign up with GitHub"
- [ ] Autorizo Vercel para acceder a GitHub
- [ ] Confirmo que Vercel puede ver mis repositorios

### Importar proyecto
- [ ] En dashboard Vercel: "Add New" → "Project"
- [ ] Busco "mecanografia-tutor"
- [ ] Hago clic en "Select"

### Configurar variables de entorno
- [ ] En la pantalla de import, veo "Environment Variables"
- [ ] Agrego variable 1:
  - Nombre: `DATABASE_URL`
  - Valor: (la URL de Railway)
- [ ] Agrego variable 2:
  - Nombre: `JWT_SECRET`
  - Valor: `clave_produccion_123`
- [ ] Agrego variable 3:
  - Nombre: `NODE_ENV`
  - Valor: `production`

### Deploy
- [ ] Hago clic en "Deploy"
- [ ] Vercel comienza a compilar (2-5 minutos)
- [ ] Veo progreso de build
- [ ] Estado cambia a "Production" (verde)

### URL obtenida
- [ ] Vercel me da una URL como: `https://mecanografia-tutor.vercel.app`
- [ ] Guardo esta URL

---

## FASE 6: PRUEBAS EN PRODUCCIÓN

### Acceso a la app
- [ ] Abro https://mecanografia-tutor.vercel.app en navegador
- [ ] Veo la app cargada

### Prueba de Estudiante
- [ ] Hago clic en "Estudiante"
- [ ] Hago clic en "Registrarse"
- [ ] Lleno el formulario con datos ficticios
- [ ] Presiono "Registrarse"
- [ ] Veo dashboard del estudiante ✅ Funcionó

### Prueba de Lección
- [ ] Selecciono "Lección 1"
- [ ] Escribo texto según se indica
- [ ] Completo la lección
- [ ] Veo resultados guardados ✅ Funcionó

### Prueba de Admin
- [ ] Hago clic "Volver al login"
- [ ] Selecciono "Administrador"
- [ ] Email: `admin@mecanografia.com`
- [ ] Contraseña: `admin123`
- [ ] Veo lista de estudiantes ✅ Funcionó
- [ ] Veo mi usuario en la lista ✅ Datos se guardaron

---

## FASE 7: SEGURIDAD EN PRODUCCIÓN

### Cambiar credenciales de admin
- [ ] Voy a Railway → PostgreSQL → Connect → Browser
- [ ] Ejecuto SQL para cambiar contraseña (después)
- [ ] Verifico que nueva contraseña funciona

### Verificar variables de entorno
- [ ] En Vercel: Settings → Environment Variables
- [ ] Confirmo que DATABASE_URL y JWT_SECRET están presentes
- [ ] NO aparecen completas en interfaz (seguridad)

### Revisar Git
- [ ] Mi `.env` real NO está en GitHub
- [ ] Solo está `.env.example`

---

## FASE 8: MONITOREO

### Logs de Vercel
- [ ] En Vercel: Deployments → Selecciono último deployment
- [ ] Veo "View Logs"
- [ ] No hay errores críticos

### Logs de Railway
- [ ] En Railway: PostgreSQL → Logs
- [ ] Veo que se conecta correctamente

### Performance
- [ ] App carga en < 3 segundos
- [ ] No hay errores en consola del navegador (F12)

---

## FASE 9: DOCUMENTACIÓN

### Guardé mis datos
- [ ] ✅ URL de app: https://mecanografia-tutor.vercel.app
- [ ] ✅ DATABASE_URL: (segura en Railway/Vercel, no guardada localmente)
- [ ] ✅ Admin email: admin@mecanografia.com
- [ ] ✅ Admin password: admin123 (CAMBIAR DESPUÉS)

### Documentación local
- [ ] ✅ Guardé GUIA-COMPLETA-PASO-A-PASO.md
- [ ] ✅ Guardé DESPLIEGUE-3-PASOS.md
- [ ] ✅ Guardé README.md

---

## FASE 10: COMPARTIR CON USUARIOS

### Prepare para usuarios
- [ ] Creo 3-5 cuentas de prueba (estudiantes de ejemplo)
- [ ] Pruebo que cada una pueda hacer login y practicar
- [ ] Documento instrucciones simples para nuevos usuarios

### Compartir
- [ ] Doy a estudiantes la URL: https://mecanografia-tutor.vercel.app
- [ ] Les explico:
  - [ ] Hacen clic en "Estudiante"
  - [ ] Se registran
  - [ ] Practican lecciones
  - [ ] Su progreso se guarda automáticamente

---

## CHECKLIST FINAL

- [ ] ✅ Todo lo anterior completado
- [ ] ✅ App funcionando en producción
- [ ] ✅ Múltiples estudiantes pueden registrarse
- [ ] ✅ Admin dashboard muestra progreso
- [ ] ✅ Datos persisten en base de datos
- [ ] ✅ Sin errores críticos
- [ ] ✅ Listo para compartir con usuarios

---

## 🎉 COMPLETADO

Si todas las casillas están marcadas, ¡tu aplicación está en PRODUCCIÓN! 

**Dirección para compartir:** https://mecanografia-tutor.vercel.app

---

## PRÓXIMAS ACCIONES

- [ ] Cambiar contraseña de admin
- [ ] Hacer backup de BD
- [ ] Agregar dominio personalizado (opcional)
- [ ] Configurar email de recuperación (futuro)
- [ ] Promover app a usuarios

---

**FELICIDADES 🎉 - Tu app está viva en el internet**
