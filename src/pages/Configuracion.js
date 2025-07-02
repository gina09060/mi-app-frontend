import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaCog, FaMoon, FaSun, FaSignOutAlt, FaTrashAlt, FaTimes, FaCheck } from 'react-icons/fa';
import { MdColorLens } from 'react-icons/md';
import { motion } from 'framer-motion';

function Configuracion() {
  const { modoOscuro, setModoOscuro, colorPrimario, setColorPrimario } = useContext(ThemeContext);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const cerrarSesion = () => {
    setShowLogoutDialog(true);
  };

  const confirmarCerrarSesion = () => {
    localStorage.removeItem('userId');
    setShowLogoutDialog(false);
    window.location.href = '/';
  };

  const eliminarCuenta = () => {
    setShowDeleteDialog(true);
  };

  const confirmarEliminarCuenta = () => {
    const userId = localStorage.getItem('userId');
    fetch(`http://cumple.ultrainf.com/api/users/${userId}`, { method: 'DELETE' })
      .then(() => {
        localStorage.removeItem('userId');
        setShowDeleteDialog(false);
        window.location.href = '/';
      })
      .catch(() => alert("Error al eliminar cuenta"));
  };

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
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      color: colorPrimario,
      fontSize: '32px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    },
    settingsGroup: {
      marginBottom: '40px'
    },
    settingItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '25px',
      padding: '20px',
      backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
    },
    settingLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      fontSize: '18px',
      fontWeight: '500'
    },
    toggleButton: {
      position: 'relative',
      display: 'inline-block',
      width: '60px',
      height: '30px',
      borderRadius: '15px',
      backgroundColor: modoOscuro ? '#555' : '#ddd',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    toggleSlider: {
      position: 'absolute',
      top: '3px',
      left: modoOscuro ? '33px' : '3px',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: modoOscuro ? colorPrimario : '#fff',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
    },
    colorPickerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    colorPicker: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      border: `2px solid ${modoOscuro ? '#555' : '#ddd'}`,
      cursor: 'pointer',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    colorInput: {
      width: '100%',
      height: '100%',
      border: 'none',
      padding: 0,
      cursor: 'pointer'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '30px',
      flexWrap: 'wrap'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '14px 28px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
      }
    },
    logoutButton: {
      backgroundColor: modoOscuro ? '#444' : '#e0e0e0',
      color: modoOscuro ? '#f5f5f5' : '#333'
    },
    deleteButton: {
      backgroundColor: '#ff4444',
      color: '#fff'
    },
    dialogOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    dialog: {
      backgroundColor: modoOscuro ? '#333' : '#fff',
      padding: '30px',
      borderRadius: '15px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      color: modoOscuro ? '#f5f5f5' : '#333'
    },
    dialogTitle: {
      fontSize: '24px',
      marginBottom: '20px',
      color: colorPrimario,
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    dialogMessage: {
      marginBottom: '30px',
      fontSize: '18px'
    },
    dialogButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '15px'
    },
    dialogButton: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cancelButton: {
      backgroundColor: modoOscuro ? '#555' : '#e0e0e0',
      color: modoOscuro ? '#f5f5f5' : '#333'
    },
    confirmButton: {
      backgroundColor: colorPrimario,
      color: '#fff'
    },
    deleteDialogButton: {
      backgroundColor: '#ff4444',
      color: '#fff'
    }
  };

  return (
    <>
      <motion.div 
        style={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>
            <FaCog /> Configuración
          </h2>
        </div>

        <div style={styles.settingsGroup}>
          <div style={styles.settingItem}>
            <span style={styles.settingLabel}>
              {modoOscuro ? <FaMoon /> : <FaSun />}
              Modo oscuro
            </span>
            <div 
              style={styles.toggleButton} 
              onClick={() => setModoOscuro(!modoOscuro)}
            >
              <div style={styles.toggleSlider}>
                {modoOscuro ? <FaMoon /> : <FaSun />}
              </div>
            </div>
          </div>

          <div style={styles.settingItem}>
            <span style={styles.settingLabel}>
              <MdColorLens />
              Color primario
            </span>
            <div style={styles.colorPickerContainer}>
              <div style={styles.colorPicker}>
                <input
                  type="color"
                  value={colorPrimario}
                  onChange={e => setColorPrimario(e.target.value)}
                  style={styles.colorInput}
                />
              </div>
              <span style={{ color: colorPrimario, fontWeight: '600' }}>
                {colorPrimario.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.buttonsContainer}>
          <button 
            style={{ ...styles.button, ...styles.logoutButton }}
            onClick={cerrarSesion}
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
          <button
            style={{ ...styles.button, ...styles.deleteButton }}
            onClick={eliminarCuenta}
          >
            <FaTrashAlt /> Eliminar cuenta
          </button>
        </div>
      </motion.div>

      {/* Diálogo para cerrar sesión */}
      {showLogoutDialog && (
        <div style={styles.dialogOverlay}>
          <motion.div 
            style={styles.dialog}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 style={styles.dialogTitle}>
              <FaSignOutAlt /> Cerrar sesión
            </h3>
            <p style={styles.dialogMessage}>
              ¿Estás seguro que deseas cerrar sesión?
            </p>
            <div style={styles.dialogButtons}>
              <button 
                style={{ ...styles.dialogButton, ...styles.cancelButton }}
                onClick={() => setShowLogoutDialog(false)}
              >
                <FaTimes /> Cancelar
              </button>
              <button 
                style={{ ...styles.dialogButton, ...styles.confirmButton }}
                onClick={confirmarCerrarSesion}
              >
                <FaCheck /> Confirmar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Diálogo para eliminar cuenta */}
      {showDeleteDialog && (
        <div style={styles.dialogOverlay}>
          <motion.div 
            style={styles.dialog}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 style={styles.dialogTitle}>
              <FaTrashAlt /> Eliminar cuenta
            </h3>
            <p style={styles.dialogMessage}>
              ¿Estás completamente seguro de eliminar tu cuenta? Esta acción es irreversible y se perderán todos tus datos.
            </p>
            <div style={styles.dialogButtons}>
              <button 
                style={{ ...styles.dialogButton, ...styles.cancelButton }}
                onClick={() => setShowDeleteDialog(false)}
              >
                <FaTimes /> Cancelar
              </button>
              <button 
                style={{ ...styles.dialogButton, ...styles.deleteDialogButton }}
                onClick={confirmarEliminarCuenta}
              >
                <FaCheck /> Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Configuracion;
