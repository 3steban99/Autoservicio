import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './pages/Menu';
import RegistroCliente from './pages/RegistroCliente';
import Vendedor from './pages/Vendedor';
import Login from './pages/Login';
import Mascota from './pages/Mascota';
import MenuCliente from './pages/MenuCliente';
import UserProvider from './context/userContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Menu />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/registrocliente' element={<RegistroCliente />} />
          <Route exact path='/vendedor' element={<Vendedor />} />
          <Route exact path='/menucliente' element={<MenuCliente />} />
          <Route exact path='/mascota' element={<Mascota />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
