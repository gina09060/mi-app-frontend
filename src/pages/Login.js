import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import { 
  FaSignInAlt, 
  FaEye, 
  FaEyeSlash, 
  FaEnvelope, 
  FaLock,
  FaUserPlus
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { modoOscuro, colorPrimario } = useContext(ThemeContext);

  const handleChange = e => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', form);
      localStorage.setItem('userId', res.data.user.id);
      navigate('/perfil');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: modoOscuro ? '#1a1a1a' : '#f5f5f5',
      padding: '20px'
    },
    loginBox: {
      width: '100%',
      maxWidth: '450px',
      backgroundColor: modoOscuro ? '#1e1e1e' : `${colorPrimario}22`,
      borderRadius: '20px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: modoOscuro ? '1px solid #444' : '1px solid #e0e0e0'
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
    formContainer: {
      padding: '40px'
    },
    inputGroup: {
      position: 'relative',
      marginBottom: '25px'
    },
    inputIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: modoOscuro ? '#aaa' : '#777'
    },
    input: {
      width: '80%',
      padding: '16px 20px 16px 55px',
      borderRadius: '12px',
      border: `2px solid ${modoOscuro ? '#444' : '#e0e0e0'}`,
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
    passwordToggle: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: modoOscuro ? '#aaa' : '#777',
      cursor: 'pointer',
      fontSize: '18px'
    },
    submitButton: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: colorPrimario,
      color: '#fff',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.3s ease',
      marginTop: '10px',
      '&:hover': {
        opacity: 0.9,
        transform: 'translateY(-2px)'
      },
      '&:disabled': {
        opacity: 0.7,
        cursor: 'not-allowed'
      }
    },
    footer: {
      textAlign: 'center',
      marginTop: '25px',
      color: modoOscuro ? '#aaa' : '#777'
    },
    registerLink: {
      color: colorPrimario,
      fontWeight: '600',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
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
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.loginBox}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>
            <FaSignInAlt /> Iniciar Sesión
          </h2>
        </div>

        <div style={styles.formContainer}>
          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <FaEnvelope style={styles.inputIcon} />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <FaLock style={styles.inputIcon} />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : (
                <>
                  <FaSignInAlt /> Ingresar
                </>
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <p>¿No tienes una cuenta?</p>
            <a href="/registro" style={styles.registerLink}>
              <FaUserPlus /> Regístrate aquí
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;