# Usar una imagen ligera de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto (Express)
RUN npm install --production

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación escucha (8080)
EXPOSE 8080

# Comando para iniciar la aplicación cuando se lance el contenedor
CMD ["npm", "start"]
