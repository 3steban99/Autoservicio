import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const LoginVendedor = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vendedores, setVendedores] = useState([])
    const { setVendedorID, setVendedorName } = useUserContext();

    // Para saber si ingreso correctamente los datos para poder iniciar sesion
    const [loginError, setLoginError] = useState(false);

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
            navigate('/menuvendedor')
            setVendedorID(vendedorEncontrado.ID)
            setVendedorName(vendedorEncontrado.Nombre)
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
            <h1 className="text-center">Inicio de Sesión - Vendedor</h1>
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
                ¿No tienes una cuenta? <Link to="/registrovendedor">Regístrate aquí</Link>
            </p>
        </div>
    )
}


export default LoginVendedor