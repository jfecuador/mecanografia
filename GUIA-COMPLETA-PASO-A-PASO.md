# 🎬 GUÍA PASO A PASO: DE CERO A PRODUCCIÓN EN 30 MINUTOS

## ANTES DE EMPEZAR

Necesitarás:
- Una cuenta GitHub (gratis en github.com)
- Una cuenta Vercel (gratis, usa tu GitHub)
- Una cuenta Railway (gratis)

---

## ⏱️ PASO 1: PREPARACIÓN LOCAL (5 minutos)

### 1️⃣ Descargar Git

Si no lo tienes: https://git-scm.com/download/win (o tu SO)

Verifica instalación:
```bash
git --version
```

### 2️⃣ Descargar Node.js

https://nodejs.org (Descarga versión LTS)

Verifica instalación:
```bash
node --version
npm --version
```

### 3️⃣ Descargar el código

**Opción A - Si ya tienes un repositorio:**
```bash
git clone https://github.com/tu-usuario/mecanografia-tutor.git
cd mecanografia-tutor
```

**Opción B - Primera vez (crear repositorio):**

1. Ve a https://github.com/new
2. Nombre: `mecanografia-tutor`
3. Crea repo vacío
4. En tu computadora:

```bash
# Crea carpeta
mkdir mecanografia-tutor
cd mecanografia-tutor

# Inicializa Git
git init

# Copia aquí todos los archivos que te dimos
# (server.js, package.json, vercel.json, .env.example, public/, etc)

# Sube a GitHub
git add .
git commit -m "Initial commit: Mecanografía tutor app"
git remote add origin https://github.com/tu-usuario/mecanografia-tutor.git
git branch -M main
git push -u origin main
```

### 4️⃣ Instalar dependencias

```bash
npm install
```

Espera a que termine (puede tardar 1-2 minutos)

---

## 🗄️ PASO 2: CONFIGURAR BASE DE DATOS (5 minutos)

### 1️⃣ Crear base de datos en Railway

1. Ve a https://railway.app
2. Haz clic en "Create"
3. Haz clic en "Provision PostgreSQL"
4. Espera que se cree (30 segundos)

### 2️⃣ Obtener URL de conexión

En Railway:
1. Haz clic en "PostgreSQL"
2. Ve a la pestaña "Connect"
3. Copia todo el valor de `DATABASE_URL`
4. Se verá así: `postgresql://usuario:contraseña@host:5432/railway`

### 3️⃣ Crear archivo .env

En tu carpeta del proyecto, abre `.env.example` y guarda como `.env`:

```bash
# Copiar el archivo
cp .env.example .env
```

Abre el archivo `.env` con un editor de texto y rellena:

```
DATABASE_URL=postgresql://usuario:contraseña@host:5432/railway
JWT_SECRET=clave_super_segura_abc123_cambiar_en_produccion
PORT=3000
NODE_ENV=development
```

**⚠️ NO COMPARTAS tu archivo .env**

### 4️⃣ Probar localmente (opcional)

```bash
npm run dev
```

Abre: http://localhost:3000

Si ves la app funcionando, presiona Ctrl+C para detener.

---

## 🚀 PASO 3: SUBIR A GITHUB (2 minutos)

```bash
# Agregar cambios
git add .env

# Hacer commit
git commit -m "Add environment configuration"

# Subir a GitHub
git push origin main
```

---

## 🌐 PASO 4: DESPLEGAR EN VERCEL (5 minutos)

### 1️⃣ Crear cuenta en Vercel

Ve a https://vercel.com/signup

Haz clic en "Continue with GitHub"

Autoriza la conexión

### 2️⃣ Importar proyecto

En el dashboard de Vercel:

1. Haz clic en "Add New"
2. Elige "Project"
3. Busca "mecanografia-tutor"
4. Haz clic en "Select"

### 3️⃣ Configurar variables de entorno

En la pantalla "Import Project":

Baja hasta "Environment Variables"

Agrega 2 variables:

**Variable 1:**
- Nombre: `DATABASE_URL`
- Valor: (Pega la URL que copiaste de Railway)

**Variable 2:**
- Nombre: `JWT_SECRET`
- Valor: `clave_super_segura_produccion_123456`

### 4️⃣ Desplegar

Haz clic en "Deploy"

**ESPERA** - Vercel está compilando tu app (2-5 minutos)

Cuando veas "Production" en verde, ¡está listo!

Tu URL será: **https://mecanografia-tutor.vercel.app**

---

## ✅ VERIFICACIÓN FINAL (3 minutos)

### 1️⃣ Abre tu app

Abre en navegador: https://mecanografia-tutor.vercel.app

### 2️⃣ Prueba de Estudiante

1. Haz clic en "Estudiante"
2. Haz clic en "Registrarse"
3. Llena el formulario:
   - Nombre: Tu Nombre
   - Email: tu-email@ejemplo.com
   - Contraseña: tu-contraseña
4. Haz clic en "Registrarse"

Si funciona, verás el dashboard

### 3️⃣ Prueba de Admin

1. Haz clic en "Volver al login"
2. Haz clic en "Administrador"
3. Llena:
   - Email: `admin@mecanografia.com`
   - Contraseña: `admin123`
4. Haz clic en "Iniciar sesión"

Deberías ver tu usuario en la lista

### 4️⃣ Prueba una lección

1. Vuelve a login de estudiante
2. Inicia sesión con tu email
3. Elige "Lección 1"
4. Escribe el texto que se muestra
5. Completa la lección

Los datos deberían guardarse automáticamente

---

## 🎉 ¡LISTO!

Tu aplicación está en PRODUCCIÓN y lista para que estudiantes la usen.

**Tu URL**: https://mecanografia-tutor.vercel.app

---

## 🔧 PRÓXIMAS ACCIONES

### Cambiar contraseña de admin

1. En Railway, ve a "PostgreSQL"
2. Abre "Connect" → "Browser"
3. Ejecuta este SQL:

```sql
-- Cambiar contraseña de admin
-- Primero, genera una contraseña bcrypt en: https://bcrypt-generator.com/
-- Copia el hash y pégalo aquí donde dice $2a$10$hash_muy_largo

UPDATE usuarios 
SET contraseña = '$2a$10$hash_muy_largo_que_copiaste'
WHERE email = 'admin@mecanografia.com';
```

### Agregar tu dominio personalizado

Si quieres tu propio dominio (ej: mecanografia.tuempresa.com):

1. Compra dominio en Namecheap o GoDaddy
2. En Vercel: Settings → Domains
3. Agrega tu dominio
4. Sigue instrucciones DNS
5. Listo en 24-48 horas

### Ver logs y errores

**Vercel Logs:**
- Dashboard → Deployments → tu deployment → View Logs

**Railway Logs:**
- PostgreSQL → Logs

---

## 🚨 SI ALGO NO FUNCIONA

### Error: "Cannot connect to database"

```
1. Verifica DATABASE_URL en Vercel
   - Settings → Environment Variables
   - Revisa que esté completa y correcta

2. En Railway, verifica que PostgreSQL esté "running"
   - Si no, haz clic para activarlo

3. En Railway, verifica que pueda crear tablas:
   - PostgreSQL → Connect → Browser
   - Pega el SQL para crear tablas
```

### Error: "Cannot find module 'express'"

```bash
npm install
```

Luego:
```bash
git add .
git commit -m "Update dependencies"
git push origin main
```

### El login no funciona

```
1. Verifica que la tabla "usuarios" existe:
   - Railway → PostgreSQL → Connect → Browser
   - Ejecuta: SELECT * FROM usuarios;

2. Si no existe, Vercel debería crearla automáticamente
   - Recarga vercel.app después de 1 minuto
```

### Los cambios que hago no aparecen

```bash
# Haz push a GitHub primero
git add .
git commit -m "Descripción del cambio"
git push origin main

# Vercel se desplegará automáticamente en 1-2 minutos
```

---

## 📊 RESUMEN DE COSTOS

| Servicio | Costo |
|----------|-------|
| Railway (Base de datos) | Gratis primer mes, luego $5/mes |
| Vercel (Hosting) | Gratis |
| Dominio (opcional) | $10-15/año |

**Total inicial: $0** ✅

---

## 📱 TUS CREDENCIALES IMPORTANTES

Guarda esto en un lugar seguro:

```
SITIO: https://mecanografia-tutor.vercel.app
ADMIN EMAIL: admin@mecanografia.com
ADMIN PASSWORD: admin123 (CAMBIAR EN PRODUCCIÓN)

BASE DE DATOS (Railway):
DATABASE_URL: [Tu URL de Railway]
```

---

## 🎓 COMPARTIR CON ESTUDIANTES

Comparte este link: **https://mecanografia-tutor.vercel.app**

Ellos pueden:
1. Hacer clic en "Estudiante"
2. Registrarse con sus datos
3. Practicar mecanografía
4. Ver su progreso

---

## ✨ ¡FELICIDADES!

Tu aplicación de mecanografía está en PRODUCCIÓN. 🎉

¿Preguntas? Lee los archivos:
- DESPLIEGUE-3-PASOS.md (más detallado)
- README.md (resumen general)

¡Éxito! 🚀
