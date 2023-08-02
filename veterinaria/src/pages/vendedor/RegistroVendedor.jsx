import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegistroVendedor = ()=>{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realizar la solicitud POST al endpoint de registro de vendedor en el backend
            const response = await axios.post('http://127.0.0.1:3001/api/vendedores', {
                nombre,
                email,
                password,
            });

            console.log(response.data); // Debería imprimir "Vendedor registrado exitosamente"

            // Limpiar los campos del formulario después de un registro exitoso
            setNombre('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
        }
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
            <button type="submit">Registrar</button>
            <Link to='/loginvendedor'>
                <button>Iniciar seccion</button>
            </Link>
        </form>
        </div>
    )
}


export default RegistroVendedor;