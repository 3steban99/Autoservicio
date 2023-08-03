import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import axios from "axios";


const HistorialCliente = () => {
    const [pedidosC, setPedidosC] = useState([])

    const { clienteID, clienteName } = useUserContext();


    // obtener lista de los pedidos y filtrando por la id del cliente
    const obtenerPedidosClientes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/pedidos")
            const pedidoCliente = response.data.data.filter((pedido) => pedido.ClienteID === clienteID)
            setPedidosC(pedidoCliente)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        obtenerPedidosClientes();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Historial de pedidos: {clienteName}</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cliente n°</th>
                        <th>Mascota n°</th>
                        <th>Alimento</th>
                        <th>Complementos</th>
                        <th>Despacho</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosC.map((pedido) => (
                        <tr key={pedido.ID}>
                            <td>{pedido.ClienteID}</td>
                            <td>{pedido.MascotaID}</td>
                            <td>{pedido.Alimento} kg</td>
                            <td>{pedido.Complementos}</td>
                            <td>{pedido.Despacho ? "Si" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistorialCliente