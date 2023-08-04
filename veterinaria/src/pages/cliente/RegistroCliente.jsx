import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";



const RegistroCliente = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realizar la solicitud POST al endpoint de registro de cliente en el backend
            const response = await axios.post('http://127.0.0.1:3001/api/clientes', {
                nombre,
                email,
                password,
            });
            alert("Cliente registrado exitosamente")

            // Limpiar los campos del formulario después de un registro exitoso
            setNombre('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Registro de Cliente</h1>
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
                    Registrar
                </button>
            </form>
            <p className="mt-3 text-center">
                ¿Ya tienes una cuenta? <Link to="/logincliente">Iniciar sesión aquí</Link>
            </p>
        </div>
    );
};



export default RegistroCliente;