const express = require('express');
const {
    registrarPedido,
    consultarPedidos,
    actualizarPedido,
    eliminarPedido
} = require('../controllers/pedidoController');

const router = express.Router();

// Servicio para registrar un pedido.
router.post('/', registrarPedido);

// Servicio para consultar todos los pedidos.
router.get('/', consultarPedidos);

// Servicio para actualizar un pedido.
router.put('/:id', actualizarPedido);

// Servicio para eliminar un pedido.
router.delete('/:id', eliminarPedido);

module.exports = router;