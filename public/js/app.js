// Archivo JavaScript para consumir la API y actualizar el DOM

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const cpuVal = document.getElementById('cpu-val');
    const cpuBar = document.getElementById('cpu-bar');
    const ramVal = document.getElementById('ram-val');
    const ramBar = document.getElementById('ram-bar');
    const netVal = document.getElementById('net-val');
    const connVal = document.getElementById('conn-val');
    const uptimeVal = document.getElementById('uptime-val');
    const lastUpdate = document.getElementById('last-update');
    const statusText = document.getElementById('status-text');
    const statusIndicator = document.querySelector('.status-indicator');

    // Función para formatear el tiempo (segundos a hh:mm:ss)
    const formatUptime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
    };

    // Función para obtener los datos de la API simulada
    const fetchMetrics = async () => {
        try {
            // Se hace la petición a la API local
            const response = await fetch('/api/metrics');
            
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();

            // Actualizar la interfaz con los nuevos datos
            
            // CPU
            cpuVal.textContent = data.cpu;
            cpuBar.style.width = data.cpu;
            // Cambiar color si el uso es alto
            if (parseInt(data.cpu) > 80) {
                cpuBar.style.background = 'var(--accent-purple)';
            } else {
                cpuBar.style.background = 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))';
            }

            // RAM
            ramVal.textContent = data.ram;
            ramBar.style.width = data.ram;

            // Red y Conexiones
            netVal.textContent = data.network;
            connVal.textContent = data.connections;

            // Tiempo en línea y hora
            uptimeVal.textContent = formatUptime(data.uptime);
            const now = new Date();
            lastUpdate.textContent = `Última actualización: ${now.toLocaleTimeString()}`;

            // Estado
            statusText.textContent = data.status;
            statusText.style.color = 'var(--accent-green)';
            statusIndicator.style.backgroundColor = 'var(--accent-green)';
            statusIndicator.style.boxShadow = '0 0 10px var(--accent-green)';

        } catch (error) {
            console.error("Error al obtener métricas:", error);
            
            // Mostrar estado de error en caso de que falle el servidor
            statusText.textContent = "OFFLINE";
            statusText.style.color = "#ef4444"; // red
            statusIndicator.style.backgroundColor = "#ef4444";
            statusIndicator.style.boxShadow = '0 0 10px #ef4444';
            statusIndicator.style.animation = 'none';
        }
    };

    // Hacer la primera petición inmediatamente
    fetchMetrics();

    // Configurar polling para actualizar cada 2 segundos
    setInterval(fetchMetrics, 2000);
});
