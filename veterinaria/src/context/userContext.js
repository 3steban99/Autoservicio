import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [clienteID, setClienteID] = useState(null);
    const [clienteName, setClienteName] = useState("");

    return (
        <UserContext.Provider value={{ clienteID, setClienteID, clienteName, setClienteName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;