const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function conectarBD() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB correctamente.');
        return client.db('chilibana');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        throw error;
    }
}

module.exports = conectarBD;