# 💻 Examen 3: Dashboard de Telemática

> 🌐 **Link en vivo (AWS):** [http://98.83.134.99/](http://98.83.134.99/)

¡Hola! Este es mi proyecto final para el examen 3 de la materia de Telemática. 

Básicamente, construí un "Dashboard en la Nube" que sirve para monitorear cómo está funcionando un servidor (uso de CPU, RAM, qué tanta red está consumiendo, etc.). La idea de este proyecto es demostrar lo que aprendimos en clase sobre servidores, redes y contenedores.

## 🚀 ¿Qué hace este proyecto?
- **Tiene un Servidor Web**: Lo armé usando Node.js y Express. Este servidor se encarga de mostrar la página web y enviar los datos.
- **Simula Datos**: Creé una ruta (`/api/metrics`) que genera datos dinámicos para simular que un servidor real está trabajando y consumiendo recursos.
- **Se ve genial**: El diseño del frontend lo hice a mano con HTML, CSS y un poquito de JavaScript, usando un estilo moderno tipo "cristal" (Glassmorphism) para que se vea bien presentado.
- **Usa Docker**: Todo el proyecto está empaquetado en un contenedor de Docker para que sea súper fácil de correr en cualquier lado, especialmente en la nube de AWS.

---

## 🛠️ Lo que necesitas para correrlo

Si quieres probarlo en tu compu antes de subirlo a la nube, necesitas:
- Tener **Docker** instalado.
- (Opcional) Tener **Node.js** si prefieres correrlo sin Docker.

---

## 💻 Pasos para probarlo en tu compu (Local)

### Opción 1: Con Docker (La mejor forma)

1. Abre tu terminal en la carpeta del proyecto y construye la imagen:
   ```bash
   docker build -t telematics-dashboard .
   ```

2. Prende el contenedor:
   ```bash
   docker run -d -p 8080:8080 --name telematics-app telematics-dashboard
   ```

3. Ve a tu navegador y entra a: `http://localhost:8080`

### Opción 2: A la antigua (Solo con Node.js)

1. Instala las librerías:
   ```bash
   npm install
   ```
2. Corre el servidor:
   ```bash
   npm start
   ```
3. Entra a: `http://localhost:8080`

---

## ☁️ Pasos para subirlo a AWS (El Examen)

Así es como subí este proyecto a una máquina real en la nube de AWS EC2 (con Ubuntu):

1. **Me conecté al servidor** desde mi terminal usando mi llave `.pem`:
   ```bash
   ssh -i "mi-llave.pem" ubuntu@IP_DE_AWS
   ```

2. **Instalé Docker** en la máquina de Ubuntu:
   ```bash
   sudo apt update
   sudo apt install docker.io -y
   ```

3. **Descargué mi código** desde este repositorio de GitHub:
   ```bash
   git clone https://github.com/daviiid00/examen3-telematica.git
   cd examen3-telematica
   ```

4. **Construí la imagen** de Docker ahí mismo en AWS (¡sin olvidar el punto al final!):
   ```bash
   sudo docker build -t telematics-dashboard .
   ```

5. **¡A correr!** Prendí el contenedor pero esta vez conectándolo al puerto 80 para que cualquiera en internet pueda verlo sin poner puertos raros:
   ```bash
   sudo docker run -d -p 80:8080 --name prod-telematics telematics-dashboard
   ```

*(Nota mental: hay que ir a la consola de AWS y abrir el puerto 80 en el Grupo de Seguridad (Inbound Rules) para que esto funcione).*

---

## 📁 Archivos Principales
- `server.js`: Aquí está la lógica del backend y la API.
- `public/`: Aquí están los estilos (`.css`), la estructura (`.html`) y el script visual (`.js`).
- `Dockerfile`: Las instrucciones para que Docker empaquete la app.

## ✒️ Autor
Edgardo David Anaya Negrete - Examen 3 de Telemática.
