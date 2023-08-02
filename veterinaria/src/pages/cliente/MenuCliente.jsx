import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";


const MenuCliente = () =>{

    const {clienteName} = useUserContext();

    return(
        <div>
            <h1>{clienteName}</h1>
            <Link to='/mascota'>
                <button>Registra mascota</button>
            </Link>
            <Link to='/combos'>
                <button>Combos</button>
            </Link>
            <Link to='/historialcliente'>
                <button>Ver Pedido</button>
            </Link>
        </div>
    )
}


export default MenuCliente;