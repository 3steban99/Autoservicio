import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import axios from "axios";


const Combos = () => {
    const [mascotasDueño, setMascotasDueño] = useState([])
    const [alimento, setAlimento] = useState(null);
    const [complementos, setComplementos] = useState(0);
    const [mascotaId, setMascotaId] = useState();

    const { clienteID, clienteName, pedidosRealizados, setPedidosRealizados } = useUserContext();


    useEffect(() => {
        obtenerMascotasDueño();
        // cargar los localstorage para saber si ya son pedidos realizados
        const storedPedidosRealizados = JSON.parse(localStorage.getItem("pedidosRealizados"));
        if (storedPedidosRealizados) {
            setPedidosRealizados(storedPedidosRealizados);
        }
    }, []);

    // Obtener mascotas por la id del dueño

    const obtenerMascotasDueño = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/mascotas")
            const mascotasDelDueño = response.data.data.filter((mascotas) => mascotas.DueñoID === clienteID);
            setMascotasDueño(mascotasDelDueño);
        } catch (error) {
            console.error(error)
        }
    }


    // funciones para realizar los combos de las mascotas a travez del boton ver combos
    const handlerVerCombo = (mascota) => {
        let cantidadAlimento;
        let complementosDietarios = 0;


        if (mascota.Tipo === "gato") {
            cantidadAlimento = mascota.Peso * 0.5;
            if (mascota.Edad > 5) {
                complementosDietarios += 1
            } if (mascota.Castrado) {
                complementosDietarios += 1
            }
        } else if (mascota.Tipo === "perro") {
            cantidadAlimento = mascota.Peso * 0.8;
            if (mascota.Edad > 3) {
                complementosDietarios += 1
            } if (mascota.Castrado && mascota.Edad > 5) {
                complementosDietarios += 1
            }
        }

        // Guardar los datos del combo en los estados
        setMascotaId(mascota.ID)
        setAlimento(cantidadAlimento)
        setComplementos(complementosDietarios)
    }


    // funcion para realizar la compra y hacer el post para los pedidos
    const handlerComprar = () => {
        // Verificar que todos los datos estén disponibles para hacer el POST
        if (mascotaId && alimento !== null && complementos !== null) {
            const pedidoData = {
                ClienteID: clienteID,
                MascotaID: mascotaId,
                Alimento: alimento,
                Complementos: complementos,
                despacho: false
            };

            // Enviar la solicitud POST para crear el pedido
            axios.post("http://127.0.0.1:3001/api/pedidos", pedidoData)
                .then((response) => {
                    console.log("Pedido creado exitosamente:", response.data);
                    //logica para guardar el estado de pedidos si se realizo o no, despues para guardarlo en memoria en localstorage asi se pueda cargar en el useEffect
                    setPedidosRealizados((prevState) => ({
                        ...prevState,
                        [mascotaId]: true,
                    }));
                })
                .catch((error) => {
                    console.error("Error al crear el pedido:", error);
                });
        } else {
            console.error("Faltan datos para crear el pedido.");
        }
    }

    return (
        <div className="container mt-5">
            <div>
                <h2 className="mb-4">Mascotas del cliente {clienteName}</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Peso</th>
                            <th>Edad</th>
                            <th>Castrado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotasDueño.map((mascota) => (
                            <tr key={mascota.ID}>
                                <td>{mascota.Nombre}</td>
                                <td>{mascota.Tipo}</td>
                                <td>{mascota.Peso}</td>
                                <td>{mascota.Edad}</td>
                                <td>{mascota.Castrado ? "Sí" : "No"}</td>
                                <td>
                                    <button
                                        onClick={() => handlerVerCombo(mascota)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Ver combos
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {alimento !== null && complementos !== null && !pedidosRealizados[mascotaId] && (
                    <div className="mt-4">
                        <h3>Detalles del combo</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cantidad de alimento</th>
                                    <th>Complementos dietarios</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{alimento}</td>
                                    <td>{complementos}</td>
                                    <td>
                                        <button
                                            onClick={handlerComprar}
                                            className="btn btn-success btn-sm"
                                        >
                                            Comprar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {pedidosRealizados[mascotaId] && (
                    <p className="mt-4">¡Pedido realizado para esta mascota!</p>
                )}
            </div>
        </div>
    )
}


export default Combos;