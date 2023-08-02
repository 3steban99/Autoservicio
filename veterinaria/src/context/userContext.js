import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [clienteID, setClienteID] = useState(null);
    const [clienteName, setClienteName] = useState("");
    const [vendedorID, setVendedorID] = useState(null)
    const [vendedorName, setVendedorName] = useState("")
    const [pedidosRealizados, setPedidosRealizados] = useState({});

    return (
        <UserContext.Provider value={{ clienteID, setClienteID, clienteName, setClienteName, vendedorID, setVendedorID, vendedorName,setVendedorName,pedidosRealizados, setPedidosRealizados }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;