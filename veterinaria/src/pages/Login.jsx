import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";


const Login = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clientes, setClientes] = useState([]);
    const { setClienteID, setClienteName } = useUserContext();

    const navigate = useNavigate()

    // Función para obtener los clientes desde el backend
    const obtenerClientes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/api/clientes");
            setClientes(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Llamada a obtenerClientes al cargar el componente
    useEffect(() => {
        obtenerClientes();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si las credenciales coinciden con algún cliente registrado
        const clienteEncontrado = clientes.find(
            (cliente) => cliente.Nombre === nombre && cliente.Email === email && cliente.Password === password
        );

        if (clienteEncontrado) {
            console.log("Login exitoso");
            navigate('/menucliente')
            setClienteID(clienteEncontrado.ID)
            setClienteName(clienteEncontrado.Nombre)

        } else {
            console.log("Credenciales incorrectas");
            
        }

        // Limpiar los campos del formulario después de un login exitoso o fallido
        setEmail("");
        setPassword("");
    };

    return (
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
            <Link to='/registrocliente'>
                <button>Registrar</button>
            </Link>
        </form>
    )
}

export default Login;