/**
 * Estructura de un pedido de ChiliBana.
 * Define los datos que se almacenarán en MongoDB.
 */
const pedidoSchema = {
    cliente: String,
    tipoPedido: String,
    producto: String,
    cantidad: Number
};

module.exports = pedidoSchema;
