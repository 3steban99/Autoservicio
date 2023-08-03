import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";


const MenuVendedor = () => {

    const { vendedorName } = useUserContext();


    return (
        <div>
            <Link to='/' className="btn btn-info mb-4">
                Inicio
            </Link>
            <div className="container-main">
                <h1>Vendedor: {vendedorName}</h1>
                <div className="container-button">
                    <Link to='/pedidos' className="btn btn-info btn-lg mb-4 btn-custom">
                        Ver Pedidos
                    </Link>
                    <Link to='/listacliente' className="btn btn-info btn-lg mb-4 btn-custom">
                        Ver Clientes
                    </Link>
                    <Link to='/listavendedor' className="btn btn-info btn-lg mb-4 btn-custom">
                        Ver Vendedores
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default MenuVendedor;