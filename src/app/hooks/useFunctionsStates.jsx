export default function useFunctionStates() {
  const ORDER_STATUS = [
    'cancelled',
    'awaiting_confirmation',
    'confirmed',
    'on_hold',
  ]

  const SHIPPING_STATUS = [
    "awaiting_payment",
    "on_hold",
    "cancelled",
    "awaiting_shipment",
    "filtered",
    "shipped",
    "not_delivered",
    "delivered",
    "return",
    "ready_to_pick",
    "picking_list",
    "ready_to_pack",
    "ready_to_ship",
    "new",
  ];

  const shippingStatusValue = (status) => {
    const validStatus = SHIPPING_STATUS.filter(s => s == status);
    if (validStatus.length > 0) {
      if (status == SHIPPING_STATUS[0] || status == SHIPPING_STATUS[3] || status == SHIPPING_STATUS[13]) return 'En Preparacion';
      if (status == SHIPPING_STATUS[2] || status == SHIPPING_STATUS[6]) return 'Cancelado'
      if (status == SHIPPING_STATUS[5]) return "Enviado";
      if (status == SHIPPING_STATUS[7]) return "Entregado";
    }
  }

  const orderStatusValue = (status) => {
    const validStatus = ORDER_STATUS.filter(s => s == status);
    if (validStatus.length > 0) {
      if (status == ORDER_STATUS[0]) return 'Pedido Cancelado';
      if (status == ORDER_STATUS[1] || status == ORDER_STATUS[3]) return 'Esperando Confirmacion'
      if (status == ORDER_STATUS[2]) return "Pedido Confirmado";
    }
  }

  const statusColor = (status) => {
    if (status == undefined) return;
    if (status == 'Entregado' || status == 'Confirmado' || status == "Pedido Confirmado") return 'green';
    if (status == 'En Preparacion' || status == 'Esperando Confirmacion' || status == 'Enviado') return 'yellow';
    if (status == "Cancelado" || status == "Pedido Cancelado") return "red";
  }

  return { ORDER_STATUS, SHIPPING_STATUS, shippingStatusValue, orderStatusValue, statusColor }
}
