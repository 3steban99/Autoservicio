package main

// Función para obtener un nuevo ID para el cliente (simulación, puedes usar una función o un contador en una aplicación real)
func ObtenerNuevoIDCliente() int {
	return len(clientes) + 1
}

// Función para obtener un nuevo ID para la mascota (simulación, puedes usar una función o un contador en una aplicación real)
func ObtenerNuevoIDMascota() int {
	return len(mascotas) + 1
}
