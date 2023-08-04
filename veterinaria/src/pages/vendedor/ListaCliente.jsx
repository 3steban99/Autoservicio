import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ListaCliente = () => {
    const [apiCliente, setApiCliente] = useState([])
    const [apiMascota, setApiMascota] = useState([])


    useEffect(() => {
        ObtenerClientes()
        ObtenerMascotas()
    }, [])

    //Obtener la lista de los clientes
    const ObtenerClientes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/clientes")
            setApiCliente(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }


    //Obtener la lista de las mascotas
    const ObtenerMascotas = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/mascotas")
            setApiMascota(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }



    //Mediante un filter, se mapea las mascotas en donde tenga igual el DueñoId y la id del cliente
    return (
        <div className="container">
            <h2>Historial de Clientes y Mascotas</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre del Cliente</th>
                        <th>Email</th>
                        <th>Mascotas</th>
                    </tr>
                </thead>
                <tbody>
                    {apiCliente.map((cliente) => (
                        <tr key={cliente.ID}>
                            <td>{cliente.Nombre}</td>
                            <td>{cliente.Email}</td>
                            <td>
                                <ul>
                                    {apiMascota
                                        .filter((mascota) => mascota.DueñoID === cliente.ID)
                                        .map((mascota) => (
                                            <li key={mascota.ID}>{mascota.Nombre}</li>
                                        ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/menuvendedor' className="btn btn-primary">
                    Volver
            </Link>
        </div>
    )
}

export default ListaCliente;