package main

import (
	//"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// Estructuras de datos para el cliente y la mascota
type Cliente struct {
	ID       int    // ID del cliente
	Nombre   string // Nombre del cliente
	Email    string // Email del cliente
	Password string // Contraseña del cliente (no se recomienda guardar en texto plano en una aplicación real)
}

type Mascota struct {
	ID      int    // ID de la mascota
	Nombre  string // Nombre de la mascota
	Tipo    string // Tipo de mascota (perro o gato)
	Peso	float64// Peso de la mascota
	Edad	int    // Edad de la mascota
	Castrado bool  // Esta castrado o no(boleano)
	DueñoID int    // Referencia al ID del cliente que es dueño de la mascota
}

// Slice para almacenar clientes y mascotas (simulando la base de datos en memoria)
var clientes []Cliente
var mascotas []Mascota

func main() {
	app := fiber.New()

	// Configurar CORS para permitir solicitudes desde http://localhost:3000
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
	}))

	// Ruta para ver los clientes
	app.Get("/api/clientes", VerClientes)

	// Ruta para el registro de clientes
	app.Post("/api/clientes", RegistroCliente)

	// Ruta para el registro de mascotas
	app.Post("/api/mascotas", RegistroMascota)

	// Ruta para ver las mascotas
	app.Get("/api/mascotas", VerMascotas)

	// Iniciar el servidor en el puerto 3001
	log.Fatal(app.Listen(":3001"))

}
