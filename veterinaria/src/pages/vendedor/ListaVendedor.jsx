import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const ListaVendedor = () => {
    const [apiVendedores, setApiVendedores] = useState([])



    useEffect(() => {
        ObtenerVendedores()
    }, [])

    
    // Obtener la lista de los vendedores 
    const ObtenerVendedores = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/vendedores")
            setApiVendedores(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mt-5">
            <h2>Historial de Vendedores</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID del cliente</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {apiVendedores.map((vendedor) => (
                        <tr key={vendedor.ID}>
                            <td>{vendedor.ID}</td>
                            <td>{vendedor.Nombre}</td>
                            <td>{vendedor.Email}</td>
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


export default ListaVendedor