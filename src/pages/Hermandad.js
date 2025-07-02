import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';
import { 
  FaBirthdayCake,
  FaUserCircle,
  FaGift,
  FaSearch
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Hermandad() {
  const [cumples, setCumples] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const { modoOscuro, colorPrimario } = useContext(ThemeContext);

  useEffect(() => {
    const cargarCumples = async () => {
      try {
        const response = await axios.get(
          `https://mi-app-backend-qhy3.onrender.com/api/auth/hermandad?filtro=mes&mes=${mesSeleccionado}`
        );
        
        // Ordenar por día del mes
        const sortedResults = response.data.sort((a, b) => {
          const dateA = new Date(a.birthday);
          const dateB = new Date(b.birthday);
          return dateA.getDate() - dateB.getDate();
        });

        setCumples(sortedResults);
        setError(null);
      } catch (err) {
        console.error("Error al cargar cumpleaños:", err);
        setError("Error al cargar los cumpleaños. Por favor intenta nuevamente.");
        setCumples([]);
      }
    };

    cargarCumples();
  }, [mesSeleccionado]);

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad + 1;
  };

  const filteredCumples = cumples.filter(user => 
    `${user.name} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      backgroundColor: modoOscuro ? '#1e1e1e' : `${colorPrimario}22`,
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      color: modoOscuro ? '#f5f5f5' : '#333',
      border: modoOscuro ? '1px solid #444' : '1px solid #e0e0e0',
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      color: colorPrimario,
      marginBottom: '15px',
      fontSize: '32px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      textAlign: 'center'
    },
    searchContainer: {
      width: '100%',
      maxWidth: '500px',
      marginBottom: '25px',
      position: 'relative'
    },
    searchInput: {
      width: '85%',
      padding: '14px 20px 14px 45px',
      borderRadius: '50px',
      border: `2px solid ${modoOscuro ? '#555' : '#ddd'}`,
      backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
      color: modoOscuro ? '#f5f5f5' : '#333',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: colorPrimario,
        boxShadow: `0 0 0 3px ${colorPrimario}33`
      }
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: modoOscuro ? '#aaa' : '#777'
    },
    filtersContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px'
    },
    monthSelect: {
      padding: '12px 25px',
      borderRadius: '50px',
      border: `2px solid ${colorPrimario}`,
      backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
      color: modoOscuro ? '#f5f5f5' : '#333',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: colorPrimario,
        color: '#fff'
      }
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 8px 20px ${colorPrimario}33`
      }
    },
    photo: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginRight: '20px',
      objectFit: 'cover',
      border: `3px solid ${colorPrimario}`,
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
    },
    userInfo: {
      flex: 1
    },
    name: {
      fontWeight: '600',
      fontSize: '18px',
      color: colorPrimario,
      marginBottom: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    date: {
      fontSize: '14px',
      color: modoOscuro ? '#ccc' : '#666',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '30px',
      color: modoOscuro ? '#aaa' : '#777',
      fontSize: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px'
    },
    emptyIcon: {
      fontSize: '50px',
      color: modoOscuro ? '#555' : '#ddd',
      opacity: 0.7
    },
    errorMessage: {
      color: '#ff4444',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '16px',
      fontWeight: '500'
    },
    cardContainer: {
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          <FaBirthdayCake /> Cumpleañeros
        </h2>

        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.filtersContainer}>
        <select
          value={mesSeleccionado}
          onChange={e => setMesSeleccionado(Number(e.target.value))}
          style={styles.monthSelect}
        >
          {meses.map((mes, i) => (
            <option key={i} value={i + 1}>
              {mes}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          {error}
        </div>
      )}

      <div style={styles.cardContainer}>
        <AnimatePresence>
          {filteredCumples.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.emptyState}
            >
              <FaGift style={styles.emptyIcon} />
              <p>
                {searchTerm 
                  ? `No se encontraron cumpleañeros que coincidan con "${searchTerm}"`
                  : `No hay cumpleaños registrados en ${meses[mesSeleccionado - 1]}`}
              </p>
            </motion.div>
          ) : (
            filteredCumples.map(user => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={styles.card}
              >
                <img
                  src={user.photo
                    ? `data:image/jpeg;base64,${btoa(
                        new Uint8Array(user.photo.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                      )}`
                    : 'https://via.placeholder.com/80?text=Sin+Foto'}
                  alt="Foto de perfil"
                  style={styles.photo}
                />
                <div style={styles.userInfo}>
                  <div style={styles.name}>
                    <FaUserCircle /> {user.name} {user.lastname}
                  </div>
                  <div style={styles.date}>
                    <FaBirthdayCake /> 
                    {new Date(user.birthday).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long' 
                    })} - Cumple {calcularEdad(user.birthday)} años
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Hermandad;
