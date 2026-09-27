const express = require('express');
const conectarBD = require('./config/db');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const PORT = 3000;

// Permite recibir información en formato JSON.
app.use(express.json());

// Rutas de pedidos.
app.use('/api/pedidos', pedidoRoutes);

// Ruta inicial de prueba de la API.
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de ChiliBana funcionando correctamente'
    });
});

// Inicia el servidor y conecta con MongoDB.
async function iniciarServidor() {
    try {
        await conectarBD();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No fue posible iniciar la API.');
    }
}

iniciarServidor();