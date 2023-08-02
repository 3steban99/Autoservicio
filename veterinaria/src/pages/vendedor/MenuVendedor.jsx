import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";


const MenuVendedor = ()=>{

    const {vendedorName} = useUserContext();


    return(
        <div>
            <h1>{vendedorName}</h1>
            <Link to='/pedidos'>
                <button>Ver Pedidos</button>
            </Link>
            <Link to='/listacliente'>
                <button>Ver Clientes</button>
            </Link>
            <Link to='/listavendedor'>
                <button>Ver Vendedores</button>
            </Link>
        </div>
    )
}


export default MenuVendedor;