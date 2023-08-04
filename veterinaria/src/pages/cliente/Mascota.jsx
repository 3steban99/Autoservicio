import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";


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

            alert("Mascota registrada exitosamente")
            
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
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3">
                    <label htmlFor="nombreMascota" className="form-label">
                        Nombre de la mascota:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreMascota"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipoMascota" className="form-label">
                        Tipo de mascota:
                    </label>
                    <select
                        className="form-select"
                        id="tipoMascota"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="perro">Perro</option>
                        <option value="gato">Gato</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pesoMascota" className="form-label">
                        Peso de la mascota:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="pesoMascota"
                        value={peso}
                        onChange={(e) => setPeso(parseFloat(e.target.value))}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edadMascota" className="form-label">
                        Edad de la mascota:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="edadMascota"
                        value={edad}
                        onChange={(e) => setEdad(parseInt(e.target.value))}
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="castradoMascota"
                        checked={castrado}
                        onChange={(e) => setCastrado(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="castradoMascota">
                        Castrado
                    </label>
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                    Registrar mascota
                </button>
                <Link to='/menucliente' className="btn btn-primary">
                    Volver
                </Link>
            </form>
        </div>
    );

};

export default Mascota;