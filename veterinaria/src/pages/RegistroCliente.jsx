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

            console.log(response.data); // Debería imprimir "Cliente registrado exitosamente"

            // Limpiar los campos del formulario después de un registro exitoso
            setNombre('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
        }
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
            <button type="submit">Registrar</button>
            <Link to='/login'>
                <button>Iniciar seccion</button>
            </Link>
        </form>
    );
};



export default RegistroCliente;