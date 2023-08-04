import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";


const LoginCliente = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clientes, setClientes] = useState([]);
    const { setClienteID, setClienteName } = useUserContext();

    // Para saber si ingreso correctamente los datos para poder iniciar sesion
    const [loginError, setLoginError] = useState(false);

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
        const clienteEncontrado = clientes && clientes.find(
            (cliente) => cliente.Nombre === nombre && cliente.Email === email && cliente.Password === password
        );

        if (clienteEncontrado) {
            navigate('/menucliente')
            setClienteID(clienteEncontrado.ID)
            setClienteName(clienteEncontrado.Nombre)
            setLoginError(false);

        } else {
            alert("Credenciales incorrectas")
            setLoginError(true);
        }

        // Limpiar los campos del formulario después de un login exitoso o fallido
        setEmail("");
        setPassword("");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    Iniciar Sesión
                </button>
                <Link to='/' className="btn btn-primary">
                    Volver
                </Link>
            </form>
            {loginError && (
                <p className="mt-3 text-center text-danger">
                    Credenciales incorrectas. Por favor, inténtelo nuevamente.
                </p>
            )}
            <p className="mt-3 text-center">
                ¿No tienes una cuenta?{" "}
                <Link to="/registrocliente">Regístrate aquí</Link>
            </p>
        </div>
    )
}

export default LoginCliente;