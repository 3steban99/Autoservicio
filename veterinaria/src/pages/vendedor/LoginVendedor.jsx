import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const LoginVendedor = ()=>{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vendedores, setVendedores]= useState([])
    const { setVendedorID, setVendedorName } = useUserContext();


    const navigate = useNavigate()

    // Función para obtener los clientes desde el backend
    const obtenerVendedor = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/vendedores");
            setVendedores(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerVendedor();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si las credenciales coinciden con algún cliente registrado
        const vendedorEncontrado = vendedores.find(
            (vendedor) => vendedor.Nombre === nombre && vendedor.Email === email && vendedor.Password === password
        );

        if (vendedorEncontrado) {
            console.log("Login exitoso");
            navigate('/menuvendedor')
            setVendedorID(vendedorEncontrado.ID)
            setVendedorName(vendedorEncontrado.Nombre)

        } else {
            console.log("Credenciales incorrectas");
            
        }

        // Limpiar los campos del formulario después de un login exitoso o fallido
        setEmail("");
        setPassword("");
    };


    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            <Link to='/registrovendedor'>
                <button>Registrar</button>
            </Link>
        </form>
        </div>
    )
}


export default LoginVendedor