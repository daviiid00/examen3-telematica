# Telematics Cloud Dashboard

**Examen 3 - Proyecto Final de Telemática**

Este proyecto es un "Dashboard de Monitoreo en la Nube" que simula el estado de un servidor y de la red. Ha sido construido utilizando **Node.js y Express**, siguiendo una arquitectura sencilla, y diseñado para ser desplegado en un entorno de producción utilizando **Docker**.

## 🚀 Características
- **Servidor Web**: Node.js + Express que expone los archivos estáticos y una API RESTful.
- **API Simulación**: Endpoint `/api/metrics` que simula carga de CPU, RAM, tráfico de red y uptime en tiempo real.
- **Frontend Premium**: Interfaz HTML/CSS/JS pura, que utiliza diseño moderno (Glassmorphism), animaciones CSS y actualizaciones en tiempo real (Polling).
- **Containerización**: Empaquetado totalmente en Docker usando un solo contenedor ligero (basado en `node:18-alpine`).

---

## 🛠️ Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:
- [Docker](https://docs.docker.com/get-docker/) (Para ejecución en contenedor)
- [Node.js](https://nodejs.org/) (Opcional, si deseas correrlo de forma local sin Docker)

---

## 💻 Instrucciones de Instalación y Ejecución Local

### Opción 1: Ejecutar con Docker (Recomendado para el Examen)

1. **Construir la imagen de Docker**:
   Sitúate en la raíz del proyecto (donde está el `Dockerfile`) y ejecuta:
   ```bash
   docker build -t telematics-dashboard .
   ```

2. **Ejecutar el contenedor**:
   Una vez construida la imagen, despliega el servicio exponiendo el puerto `8080` (o el puerto `80` si lo prefieres):
   ```bash
   docker run -d -p 8080:8080 --name telematics-app telematics-dashboard
   ```
   > Nota: El parámetro `-d` ejecuta el contenedor en segundo plano (detached mode).

3. **Verificar**:
   Abre tu navegador web e ingresa a: `http://localhost:8080`

### Opción 2: Ejecutar con Node.js Local (Modo Desarrollo)

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar el servidor web:
   ```bash
   npm start
   ```
3. Acceder en el navegador: `http://localhost:8080`

---

## ☁️ Despliegue en AWS EC2 (Ubuntu)

Para llevar este servicio a nivel de producción en la nube (AWS), sigue estos pasos desde una instancia EC2 con Ubuntu:

1. **Conectarse a la Instancia EC2** vía SSH:
   ```bash
   ssh -i "tu-llave.pem" ubuntu@IP_DE_TU_INSTANCIA
   ```

2. **Instalar Docker en Ubuntu**:
   ```bash
   sudo apt update
   sudo apt install docker.io -y
   sudo systemctl start docker
   sudo systemctl enable docker
   ```
   *(Opcional: agrega tu usuario al grupo de docker para no usar `sudo` siempre: `sudo usermod -aG docker ubuntu`)*

3. **Clonar el Repositorio de GitHub**:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO_GITHUB>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

4. **Construir la Imagen Docker en AWS**:
   ```bash
   sudo docker build -t telematics-dashboard .
   ```

5. **Ejecutar el Contenedor en Producción**:
   Vamos a enlazar el puerto `80` del servidor EC2 con el puerto `8080` del contenedor para que sea accesible públicamente a través de HTTP:
   ```bash
   sudo docker run -d -p 80:8080 --name prod-telematics telematics-dashboard
   ```

6. **Configurar el Security Group en AWS**:
   Asegúrate de ir a la consola de AWS EC2 y editar el **Security Group** asociado a tu instancia. Debes agregar una regla de entrada (Inbound Rule) permitiendo el tráfico **HTTP (Puerto 80)** desde cualquier origen (`0.0.0.0/0`).

7. **Acceso Final**:
   Ingresa la Dirección IP Pública de tu instancia EC2 en el navegador. Ejemplo: `http://IP_PUBLICA_EC2`

---

## 🏗️ Arquitectura de Archivos

- `server.js`: El corazón de la aplicación backend y definición de la API de monitoreo.
- `public/`: Directorio que contiene los estáticos de la página web (Frontend).
  - `index.html`: La estructura semántica del dashboard.
  - `css/style.css`: Hojas de estilo modernas y responsive.
  - `js/app.js`: Script que consulta la API cíclicamente para dar vida al UI.
- `Dockerfile` & `.dockerignore`: Archivos de configuración para construir el contenedor de forma limpia y escalable.

## ✒️ Autor
Edgar - Examen 3 de Telemática.
