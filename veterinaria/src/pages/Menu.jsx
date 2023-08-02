
import { Link } from "react-router-dom";



const Menu = ()=>{
    return(
        <div className="container">
            <Link to='/logincliente'>
                <button type="button" className="btn btn-primary">
                    Cliente
                </button>
            </Link>
            <Link to='/loginvendedor'>
                <button type="button" className="btn btn-primary">
                    Vendedor
                </button>
            </Link>
        </div>
    )
}


export default Menu;