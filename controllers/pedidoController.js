const { ObjectId } = require('mongodb');
const conectarBD = require('../config/db');

/**
 * Registrar un nuevo pedido.
 */
async function registrarPedido(req, res) {
    try {
        const db = await conectarBD();
        const pedido = req.body;

        // Validar campos obligatorios.
        if (!pedido.cliente || !pedido.tipoPedido || !pedido.producto) {
            return res.status(400).json({
                mensaje: 'Los campos cliente, tipoPedido y producto son obligatorios.'
            });
        }

        // Validar cantidad mínima.
        if (!pedido.cantidad || pedido.cantidad < 1) {
            return res.status(400).json({
                mensaje: 'La cantidad debe ser mínimo 1.'
            });
        }

        const resultado = await db.collection('pedidos').insertOne(pedido);

        res.status(201).json({
            mensaje: 'Pedido registrado correctamente.',
            id: resultado.insertedId
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar el pedido.',
            error: error.message
        });
    }
}

/**
 * Consultar todos los pedidos.
 */
async function consultarPedidos(req, res) {
    try {
        const db = await conectarBD();
        const pedidos = await db.collection('pedidos').find().toArray();

        res.json(pedidos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar los pedidos.',
            error: error.message
        });
    }
}

/**
 * Actualizar un pedido.
 */
async function actualizarPedido(req, res) {
    try {
        const db = await conectarBD();
        const id = req.params.id;
        const datosActualizados = req.body;

        const resultado = await db.collection('pedidos').updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                mensaje: 'Pedido no encontrado.'
            });
        }

        res.json({
            mensaje: 'Pedido actualizado correctamente.'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el pedido.',
            error: error.message
        });
    }
}

/**
 * Eliminar un pedido.
 */
async function eliminarPedido(req, res) {
    try {
        const db = await conectarBD();
        const id = req.params.id;

        const resultado = await db.collection('pedidos').deleteOne({
            _id: new ObjectId(id)
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                mensaje: 'Pedido no encontrado.'
            });
        }

        res.json({
            mensaje: 'Pedido eliminado correctamente.'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el pedido.',
            error: error.message
        });
    }
}

module.exports = {
    registrarPedido,
    consultarPedidos,
    actualizarPedido,
    eliminarPedido
};