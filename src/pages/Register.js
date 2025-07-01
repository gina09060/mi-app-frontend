import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import { 
  FaUserAlt, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaBirthdayCake, 
  FaCamera, 
  FaSave,
  FaEnvelope,
  FaInfoCircle,
  FaLock,
  FaUserPlus
} from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';

function Register() {
  const navigate = useNavigate();
  const { modoOscuro, colorPrimario } = useContext(ThemeContext);
  const [form, setForm] = useState({});
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (form.password !== passwordRepeat) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (photoPreview) {
      const response = await fetch(photoPreview);
      const blob = await response.blob();
      formData.append('photo', blob);
    }

    try {
      await axios.post('https://mi-app-backend-osut.onrender.com/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registro exitoso. Por favor inicia sesión.');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error en el registro. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0px auto',
      backgroundColor: modoOscuro ? '#1e1e1e' : `${colorPrimario}22`,
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      color: modoOscuro ? '#f5f5f5' : '#333',
      border: modoOscuro ? '1px solid #444' : '1px solid #e0e0e0'
    },
    header: {
      marginBottom: '30px',
      textAlign: 'center'
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    photoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    photoLabel: {
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)'
      }
    },
    photo: {
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: `4px solid ${colorPrimario}`,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
    },
    cameraIcon: {
      position: 'absolute',
      bottom: '15px',
      right: '15px',
      backgroundColor: colorPrimario,
      color: 'white',
      borderRadius: '50%',
      padding: '10px',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
      borderRadius: '12px',
      padding: '8px 20px',
      border: `1px solid ${modoOscuro ? '#444' : '#e0e0e0'}`,
      transition: 'all 0.3s ease',
      '&:focus-within': {
        borderColor: colorPrimario,
        boxShadow: `0 0 0 3px ${colorPrimario}33`
      }
    },
    icon: {
      color: colorPrimario,
      fontSize: '18px',
      marginRight: '15px',
      minWidth: '25px'
    },
    input: {
      flex: 1,
      padding: '14px 10px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'transparent',
      color: modoOscuro ? '#f5f5f5' : '#333',
      fontSize: '16px',
      outline: 'none',
      '&::placeholder': {
        color: modoOscuro ? '#777' : '#999'
      }
    },
    select: {
      flex: 1,
      padding: '14px 10px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'transparent',
      color: modoOscuro ? '#f5f5f5' : '#333',
      fontSize: '16px',
      outline: 'none',
      appearance: 'none'
    },
    textarea: {
      flex: 1,
      padding: '15px',
      borderRadius: '12px',
      backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
      color: modoOscuro ? '#f5f5f5' : '#333',
      minHeight: '100px',
      fontSize: '16px',
      outline: 'none',
      resize: 'vertical',
      border: `1px solid ${modoOscuro ? '#444' : '#e0e0e0'}`,
      '&:focus': {
        borderColor: colorPrimario,
        boxShadow: `0 0 0 3px ${colorPrimario}33`
      },
      '&::placeholder': {
        color: modoOscuro ? '#777' : '#999'
      }
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '30px'
    },
    submitBtn: {
      backgroundColor: colorPrimario,
      color: '#fff',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 8px ${colorPrimario}33`,
      '&:hover': {
        opacity: 0.9,
        transform: 'translateY(-2px)',
        boxShadow: `0 6px 12px ${colorPrimario}44`
      },
      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      color: colorPrimario,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    errorMessage: {
      color: '#ff4444',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '15px',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          <FaUserPlus /> Registro
        </h2>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.photoContainer}>
          <label style={styles.photoLabel}>
            <img 
              src={photoPreview || "https://via.placeholder.com/180?text=Subir+Foto"} 
              alt="Foto de perfil" 
              style={styles.photo} 
            />
            <span style={styles.cameraIcon}>
              <FaCamera />
            </span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoChange}
              hidden
            />
          </label>
        </div>

        <div style={styles.inputGroup}>
          <FaUserAlt style={styles.icon} />
          <input 
            name="name" 
            placeholder="Nombre" 
            onChange={handleChange} 
            required
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaUserAlt style={styles.icon} />
          <input 
            name="lastname" 
            placeholder="Apellido" 
            onChange={handleChange} 
            required
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaBirthdayCake style={styles.icon} />
          <input 
            type="date" 
            name="birthday" 
            onChange={handleChange} 
            required
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaPhoneAlt style={styles.icon} />
          <input 
            name="phone" 
            placeholder="Teléfono" 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaMapMarkerAlt style={styles.icon} />
          <input 
            name="direccion" 
            placeholder="Dirección" 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            onChange={handleChange} 
            required
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            onChange={handleChange} 
            required
            minLength="6"
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input 
            type="password" 
            placeholder="Repetir contraseña" 
            onChange={e => setPasswordRepeat(e.target.value)} 
            required
            style={styles.input} 
          />
        </div>

        <div style={{ ...styles.inputGroup, alignItems: 'flex-start', padding: '20px' }}>
          <FaInfoCircle style={{ ...styles.icon, marginTop: '15px' }} />
          <textarea 
            name="description" 
            placeholder="Cuéntanos algo sobre ti..." 
            onChange={handleChange} 
            style={styles.textarea} 
          />
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : (
              <>
                <FaSave /> Registrarse
              </>
            )}
          </button>
        </div>
      </form>

      <div 
        style={styles.loginLink}
        onClick={() => navigate('/')}
      >
        <RiLockPasswordLine /> ¿Ya tienes cuenta? Inicia sesión
      </div>
    </div>
  );
}

export default Register;