
import { Link } from "react-router-dom";



const Menu = () => {
    return (
        <div className="container-main">
            <h1>Autoservicio Veterinaria</h1>
            <div className="container-button">
                <Link to="/logincliente">
                    <button type="button" className="btn btn-primary btn-lg btn-custom">
                        Área de Clientes
                    </button>
                </Link>
                <Link to="/loginvendedor">
                    <button type="button" className="btn btn-secondary btn-lg btn-custom">
                        Área de Vendedores
                    </button>
                </Link>
            </div>
        </div>
    )
}


export default Menu;