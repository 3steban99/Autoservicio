package main

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// Handler para el registro de clientes
func RegistroCliente(c *fiber.Ctx) error {
	// Leer los datos enviados en el cuerpo de la solicitud y crear un nuevo cliente
	var nuevoCliente Cliente
	if err := c.BodyParser(&nuevoCliente); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error en el formato de la solicitud"})
	}

	// Asignar un ID único al nuevo cliente
	nuevoCliente.ID = ObtenerNuevoIDCliente()

	// Agregar el nuevo cliente a la lista de clientes
	clientes = append(clientes, nuevoCliente)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Cliente registrado exitosamente", "data": nuevoCliente})
}

// Handler para el registro de mascotas
func RegistroMascota(c *fiber.Ctx) error {
	// Leer los datos enviados en el cuerpo de la solicitud y crear una nueva mascota
	var nuevaMascota Mascota
	if err := c.BodyParser(&nuevaMascota); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error en el formato de la solicitud"})
	}

	// Asignar un ID único a la nueva mascota
	nuevaMascota.ID = ObtenerNuevoIDMascota()

	// Agregar la nueva mascota a la lista de mascotas
	mascotas = append(mascotas, nuevaMascota)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Mascota registrada exitosamente", "data": nuevaMascota})
}

// Handler para el registro de pedidos
func RegistroPedido(c *fiber.Ctx) error {
	// Leer los datos enviados en el cuerpo de la solicitud y crear un nuevo pedido
	var nuevoPedido Pedido
	if err := c.BodyParser(&nuevoPedido); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error en el formato de la solicitud"})
	}

	// Asignar un ID único al nuevo pedido
	nuevoPedido.ID = ObtenerNuevoIDPedido()

	// Agregar el nuevo pedido a la lista de pedidos
	pedidos = append(pedidos, nuevoPedido)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Pedido registrado exitosamente", "data": nuevoPedido})
}

// Handler para el registro de vendedores
func RegistroVendedor(c *fiber.Ctx) error {
	// Leer los datos enviados en el cuerpo de la solicitud y crear un nuevo vendedor
	var nuevoVendedor Vendedor
	if err := c.BodyParser(&nuevoVendedor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error en el formato de la solicitud"})
	}

	// Asignar un ID unico al nuevo vendedor
	nuevoVendedor.ID = ObtenerNuevoIDVendedor()

	// Agregar al nuevo vendedor a la lista de vendedores
	vendedores = append(vendedores, nuevoVendedor)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Vendedor registrado exitosamente", "data": nuevoVendedor})
}

// Handler para despachar un pedido por su ID
func DespacharPedido(c *fiber.Ctx) error {
	// Obtener el ID del pedido desde los parámetros de la solicitud
	pedidoIDStr := c.Params("id")
	pedidoID, err := strconv.Atoi(pedidoIDStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "ID de pedido inválido"})
	}

	// Buscar el pedido por su ID en la lista de pedidos
	for i, pedido := range pedidos {
		if pedido.ID == pedidoID {
			// Actualizar el estado de despacho del pedido en la lista
			pedidos[i].Despacho = true
			return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Pedido despachado exitosamente"})
		}
	}

	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Pedido no encontrado"})
}

// Handler para ver los clientes
func VerClientes(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": clientes})
}

// Handler para ver las mascotas
func VerMascotas(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": mascotas})
}

// Handler para ver los pedidos
func VerPedidos(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": pedidos})
}

// Handler para ver los vendedores
func VerVendedores(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": vendedores})
}
