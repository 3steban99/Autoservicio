import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './pages/Menu';
import RegistroCliente from './pages/cliente/RegistroCliente';
import MenuVendedor from './pages/vendedor/MenuVendedor';
import LoginCliente from './pages/cliente/LoginCliente';
import Mascota from './pages/cliente/Mascota';
import MenuCliente from './pages/cliente/MenuCliente';
import UserProvider from './context/userContext';
import Combos from './pages/cliente/Combos';
import LoginVendedor from './pages/vendedor/LoginVendedor';
import RegistroVendedor from './pages/vendedor/RegistroVendedor';
import Pedidos from './pages/vendedor/Pedidos';
import HistorialCliente from './pages/cliente/HistorialCliente';
import ListaCliente from './pages/vendedor/ListaCliente';
import ListaVendedor from './pages/vendedor/ListaVendedor';


function App() {


  //Creacion de todas las rutas
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Menu />} />
          <Route exact path='/logincliente' element={<LoginCliente />} />
          <Route exact path='/registrocliente' element={<RegistroCliente />} />
          <Route exact path='/loginvendedor' element={<LoginVendedor />} />
          <Route exact path='/registrovendedor' element={<RegistroVendedor />} />
          <Route exact path='/menuvendedor' element={<MenuVendedor />} />
          <Route exact path='/menucliente' element={<MenuCliente />} />
          <Route exact path='/mascota' element={<Mascota />} />
          <Route exact path='/combos' element={<Combos />} />
          <Route exact path='/pedidos' element={<Pedidos />} />
          <Route exact path='/historialcliente' element={<HistorialCliente />} />
          <Route exact path='/listacliente' element={<ListaCliente />} />
          <Route exact path='/listavendedor' element={<ListaVendedor />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
