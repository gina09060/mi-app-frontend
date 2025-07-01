import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import Perfil from './pages/Perfil';
import Configuracion from './pages/Configuracion';
import Hermandad from './pages/Hermandad';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function AppContent() {
  const { modoOscuro, fondoClaro } = useContext(ThemeContext);
  const location = useLocation();

  const rutasSinNavbar = ['/', '/registro', '/login'];
  const ocultarNavbar = rutasSinNavbar.includes(location.pathname);

  const appStyles = {
    minHeight: '100vh',
    backgroundColor: modoOscuro ? '#121212' : fondoClaro,
    color: modoOscuro ? '#ffffff' : '#000000',
    transition: 'all 0.3s',
  };

  return (
    <div style={appStyles}>
      {!ocultarNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/hermandad" element={<Hermandad />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
