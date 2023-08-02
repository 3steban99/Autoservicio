import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";


const Pedidos = () => {
    const [pedidosC, setPedidosC] = useState([]);

    const { setPedidosRealizados } = useUserContext();

    const obtenerPedidosClientes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/pedidos");
            setPedidosC(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerPedidosClientes();
    }, []);

    const handleDespacharPedido = async (pedidoId, MascotaID) => {
        try {
            // Realiza la solicitud para despachar el pedido con el ID especificado
            await axios.put(`http://127.0.0.1:3001/api/pedidos/${pedidoId}/despachar`);
            // Actualiza el estado local para reflejar el cambio de despacho
            setPedidosC((prevPedidos) =>
                prevPedidos.map((pedido) =>
                    pedido.ID === pedidoId ? { ...pedido, Despacho: true } : pedido
                )
            );
            setPedidosRealizados((prevState) => ({
                ...prevState,
                [MascotaID]: false,
            }));
        } catch (error) {
            console.error("Error al despachar el pedido:", error);
        }
    };

    return (
        <div>
            <h2>Historial de pedidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cliente n°</th>
                        <th>Mascota n°</th>
                        <th>Cantidad de Alimento</th>
                        <th>Complementos</th>
                        <th>Despacho</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosC.map((pedido) => (
                        <tr key={pedido.ID}>
                            <td>{pedido.ClienteID}</td>
                            <td>{pedido.MascotaID}</td>
                            <td>{pedido.Alimento}kg</td>
                            <td>{pedido.Complementos}</td>
                            <td>
                                {pedido.Despacho ? (
                                    "Despachado"
                                ) : (
                                    <button onClick={() => handleDespacharPedido(pedido.ID, pedido.MascotaID)}>
                                        Despachar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pedidos;