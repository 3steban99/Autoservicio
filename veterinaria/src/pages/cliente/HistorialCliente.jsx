import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import axios from "axios";


const HistorialCliente = () =>{
    const [pedidosC, setPedidosC] = useState([])

    const { clienteID, clienteName } = useUserContext();


    // obtener lista de los pedidos y filtrando por la id del cliente
    const obtenerPedidosClientes = async () =>{
        try{
            const response = await axios.get("http://127.0.0.1:3001/api/pedidos")
            const pedidoCliente = response.data.data.filter((pedido)=>pedido.ClienteID === clienteID)
            setPedidosC(pedidoCliente)
        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        obtenerPedidosClientes();
    }, []);

    return(
        <div>
            <h2>historial de pedido: {clienteName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>cliente n°</th>
                        <th>mascota n°</th>
                        <th>alimento</th>
                        <th>complementos</th>
                        <th>despacho</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosC.map((ped)=>(
                        <tr key={ped.ID}>
                            <th>{ped.ClienteID}</th>
                            <th>{ped.MascotaID}</th>
                            <th>{ped.Alimento}kg</th>
                            <th>{ped.Complementos}</th>
                            <th>{ped.Despacho? "si":"no"}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistorialCliente