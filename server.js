const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
// Configurar el puerto. Usa 8080 por defecto o el que se defina en las variables de entorno
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors()); // Permite peticiones de otros orígenes
app.use(express.static(path.join(__dirname, 'public'))); // Sirve los archivos estáticos desde la carpeta public

// API: Endpoint que simula métricas del servidor
app.get('/api/metrics', (req, res) => {
    // Generación de datos simulados aleatorios para el dashboard
    const cpuUsage = Math.floor(Math.random() * 40) + 20; // 20% - 60%
    const ramUsage = Math.floor(Math.random() * 30) + 40; // 40% - 70%
    const networkTraffic = Math.floor(Math.random() * 800) + 100; // 100 - 900 Mbps
    const activeConnections = Math.floor(Math.random() * 1500) + 500; // 500 - 2000

    // Respuesta en formato JSON
    res.json({
        status: "ONLINE",
        uptime: process.uptime(), // Tiempo que el servidor de Node lleva ejecutándose
        cpu: `${cpuUsage}%`,
        ram: `${ramUsage}%`,
        network: `${networkTraffic} Mbps`,
        connections: activeConnections,
        timestamp: new Date().toISOString()
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`[Servidor] Aplicación iniciada correctamente.`);
    console.log(`[Servidor] Escuchando en el puerto: ${PORT}`);
    console.log(`[Servidor] URL local: http://localhost:${PORT}`);
});
