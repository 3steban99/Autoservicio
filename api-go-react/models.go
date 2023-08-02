package main

// Función para obtener un nuevo ID para el cliente
func ObtenerNuevoIDCliente() int {
	return len(clientes) + 1
}

// Función para obtener un nuevo ID para la mascota
func ObtenerNuevoIDMascota() int {
	return len(mascotas) + 1
}


// Función para obtener un nuevo ID para el pedido
func ObtenerNuevoIDPedido() int {
	return len(pedidos) + 1
}

// Funcion para obtener un nuevo ID para el vendedor
func ObtenerNuevoIDVendedor() int{
	return len(vendedores) + 1
}