package main

import (
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

	// Agregar el nuevo cliente a la lista de clientes
	mascotas = append(mascotas, nuevaMascota)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Mascota registrada exitosamente", "data": nuevaMascota})
}


//Handler para ver los clientes
func VerClientes(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": clientes})
}


//Handler para ver las mascotas
func VerMascotas(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": mascotas})
}