import { Link, useLocation } from 'react-router-dom';
import { FaUser} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

function Navbar() {
  const location = useLocation();
  const { modoOscuro, colorPrimario } = useContext(ThemeContext);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const styles = {
    navbar: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '400px',
      backgroundColor: modoOscuro ? '#2a2a2a' : '#ffffff',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 0',
      borderRadius: '50px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      border: modoOscuro ? '1px solid #444' : '1px solid #eee',
    },
    link: {
      color: modoOscuro ? '#aaa' : '#777',
      textDecoration: 'none',
      fontSize: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 16px',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
    },
    activeLink: {
      color: colorPrimario,
      backgroundColor: modoOscuro ? `${colorPrimario}22` : `${colorPrimario}11`,
      transform: 'translateY(-5px)',
    },
    icon: {
      fontSize: '20px',
      marginBottom: '4px',
    },
    activeIcon: {
      fontSize: '22px',
      filter: `drop-shadow(0 2px 4px ${colorPrimario}66)`,
    },
    label: {
      fontSize: '11px',
      fontWeight: '500',
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link 
        to="/perfil" 
        style={isActive('/perfil') ? {...styles.link, ...styles.activeLink} : styles.link}
      >
        <FaUser style={isActive('/perfil') ? {...styles.icon, ...styles.activeIcon} : styles.icon} />
        <span style={styles.label}>Perfil</span>
      </Link>
      <Link 
        to="/hermandad" 
        style={isActive('/hermandad') ? {...styles.link, ...styles.activeLink} : styles.link}
      >
        <BsPeopleFill style={isActive('/hermandad') ? {...styles.icon, ...styles.activeIcon} : styles.icon} />
        <span style={styles.label}>Hermandad</span>
      </Link>
      <Link 
        to="/configuracion" 
        style={isActive('/configuracion') ? {...styles.link, ...styles.activeLink} : styles.link}
      >
        <IoMdSettings style={isActive('/configuracion') ? {...styles.icon, ...styles.activeIcon} : styles.icon} />
        <span style={styles.label}>Configuraciones</span>
      </Link>
    </nav>
  );
}

export default Navbar;