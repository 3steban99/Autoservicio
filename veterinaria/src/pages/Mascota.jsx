import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../context/userContext";


const Mascota = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('perro');
    const [peso, setPeso] = useState(0);
    const [edad, setEdad] = useState(0);
    const [castrado, setCastrado] = useState(false);

    const { clienteID } = useUserContext(); // Obtener el ID del cliente desde el contexto


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clienteID:", clienteID);

        try {
            if (!clienteID) {
                console.log("No se pudo obtener el ID del cliente desde el contexto");
                return;
            }

            // Realizar la solicitud POST al endpoint de registro de mascota en el backend
            const response = await axios.post('http://127.0.0.1:3001/api/mascotas', {
                Nombre: nombre,
                Tipo: tipo,
                Peso: peso,
                Edad: edad,
                Castrado: castrado,
                DueñoID: clienteID // Asociar la mascota con el cliente utilizando el ID del cliente
            });

            console.log(response.data); // Debería imprimir "Mascota registrada exitosamente"

            // Limpiar los campos del formulario después de un registro exitoso
            setNombre('');
            setTipo('perro');
            setPeso('');
            setEdad('');
            setCastrado(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de la mascota:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>
                Tipo de mascota:
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                </select>
            </label>
            <label>
                Peso de la mascota:
                <input type="number" value={peso} onChange={(e) => setPeso(parseFloat(e.target.value))} />
            </label>
            <label>
                Edad de la mascota:
                <input type="number" value={edad} onChange={(e) => setEdad(parseInt(e.target.value))} />
            </label>
            <label>
                Castrado:
                <input type="checkbox" checked={castrado} onChange={(e) => setCastrado(e.target.checked)} />
            </label>
            <button type="submit">Registrar mascota</button>
        </form>
    );

};

export default Mascota;