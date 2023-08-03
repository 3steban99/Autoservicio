import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";


const MenuCliente = () => {

    const { clienteName } = useUserContext();

    return (
        <div>
            <Link to='/' className="btn btn-info mb-4">
                Inicio
            </Link>
            <div className="container-main">
                <h1> Cliente: {clienteName}</h1>
                <div className="container-button">
                    <Link to="/mascota" className="btn btn-info btn-lg mb-4 btn-custom">
                        Registrar mascota
                    </Link>
                    <Link to="/combos" className="btn btn-info btn-lg mb-4 btn-custom">
                        Combos
                    </Link>
                    <Link to="/historialcliente" className="btn btn-info btn-lg btn-custom">
                        Ver Pedidos
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default MenuCliente;