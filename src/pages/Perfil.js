import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
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
  FaCheckCircle
} from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { RiLockPasswordLine } from 'react-icons/ri';

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const cumple = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) edad--;
  return edad;
}

function Perfil() {
  const userId = localStorage.getItem('userId');
  const [form, setForm] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { modoOscuro, colorPrimario } = useContext(ThemeContext);

  useEffect(() => {
    axios.get(`https://mi-app-backend-qhy3.onrender.com/api/auth/profile/${applicationId}`)
      .then(res => {
        const data = res.data;
        const fechaISO = new Date(data.birthday).toISOString().split('T')[0];
        const edadCalculada = calcularEdad(fechaISO);
        const newForm = { ...data, birthday: fechaISO, age: edadCalculada };
        setForm(newForm);
        if (data.photo) {
          const base64 = btoa(new Uint8Array(data.photo.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          setPhotoPreview(`data:image/jpeg;base64,${base64}`);
        }
      })
      .catch(() => alert("Error al cargar perfil"));
  }, [userId]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'birthday') {
      const nuevaEdad = calcularEdad(value);
      setForm({ ...form, birthday: value, age: nuevaEdad });
    } else if (name === 'photo' && files[0]) {
      setForm({ ...form, photo: files[0] });
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) formData.append(key, form[key]);
    try {
      await axios.put(`https://mi-app-backend-qhy3.onrender.com/api/auth/profile/${applicationId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccessMessage("Perfil actualizado correctamente");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar perfil");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
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
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    title: {
      color: colorPrimario,
      marginBottom: '20px',
      fontSize: '32px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      textAlign: 'center'
    },
    editButton: {
      backgroundColor: isEditing ? '#ff4444' : colorPrimario,
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '&:hover': {
        opacity: 0.9,
        transform: 'translateY(-2px)'
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    photoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      position: 'relative'
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
      '&:disabled': {
        backgroundColor: 'transparent',
        color: modoOscuro ? '#aaa' : '#666'
      },
      '&::placeholder': {
        color: modoOscuro ? '#777' : '#999'
      }
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
      '&:disabled': {
        backgroundColor: modoOscuro ? '#333' : '#f9f9f9',
        color: modoOscuro ? '#aaa' : '#666'
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
    saveBtn: {
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
    cancelBtn: {
      backgroundColor: modoOscuro ? '#444' : '#e0e0e0',
      color: modoOscuro ? '#f5f5f5' : '#333',
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
      '&:hover': {
        opacity: 0.9,
        transform: 'translateY(-2px)'
      }
    },
    successMessage: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      padding: '18px',
      borderRadius: '12px',
      textAlign: 'center',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      fontSize: '16px',
      fontWeight: '500',
      border: '1px solid #c8e6c9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
    },
    changePassword: {
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
    }
  };

  return (
    <div style={styles.container}>
      {successMessage && (
        <div style={styles.successMessage}>
          <FaCheckCircle style={{ fontSize: '22px' }} />
          {successMessage}
        </div>
      )}
      
      <div style={styles.header}>
        <h2 style={styles.title}>
          <IoMdPerson /> Mi Perfil
        </h2>
        <button 
          style={styles.editButton} 
          onClick={toggleEdit}
          type="button"
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>
      
      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.photoContainer}>
          <label style={styles.photoLabel}>
            <img 
              src={photoPreview || "https://via.placeholder.com/180?text=Subir+Foto"} 
              alt="Foto de perfil" 
              style={styles.photo} 
            />
            {isEditing && (
              <span style={styles.cameraIcon}>
                <FaCamera />
              </span>
            )}
            <input 
              type="file" 
              name="photo" 
              accept="image/*" 
              onChange={handleChange} 
              hidden 
              disabled={!isEditing}
            />
          </label>
        </div>

        <div style={styles.inputGroup}>
          <FaUserAlt style={styles.icon} />
          <input 
            name="name" 
            value={form.name || ''} 
            onChange={handleChange} 
            placeholder="Nombre" 
            style={styles.input} 
            disabled={!isEditing}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaUserAlt style={styles.icon} />
          <input 
            name="lastname" 
            value={form.lastname || ''} 
            onChange={handleChange} 
            placeholder="Apellido" 
            style={styles.input} 
            disabled={!isEditing}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaBirthdayCake style={styles.icon} />
          <input 
            type="date" 
            name="birthday" 
            value={form.birthday || ''} 
            onChange={handleChange} 
            style={styles.input} 
            disabled={!isEditing}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input 
            name="email" 
            value={form.email || ''} 
            onChange={handleChange} 
            placeholder="Correo electrónico" 
            style={styles.input} 
            disabled={!isEditing}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaUserAlt style={styles.icon} />
          <input 
            name="age" 
            value={form.age ? `${form.age} años` : ''} 
            readOnly 
            style={{ ...styles.input, color: modoOscuro ? '#aaa' : '#666' }} 
            placeholder="Edad (calculada automáticamente)"
            disabled
          />
        </div>

        <div style={styles.inputGroup}>
          <FaPhoneAlt style={styles.icon} />
          <input 
            name="phone" 
            value={form.phone || ''} 
            onChange={handleChange} 
            placeholder="Teléfono" 
            style={styles.input} 
            disabled={!isEditing}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaMapMarkerAlt style={styles.icon} />
          <input 
            name="direccion" 
            value={form.direccion || ''} 
            onChange={handleChange} 
            placeholder="Dirección" 
            style={styles.input} 
            disabled={!isEditing}
          />
        </div>

        <div style={{ ...styles.inputGroup, alignItems: 'flex-start', padding: '20px' }}>
          <FaInfoCircle style={{ ...styles.icon, marginTop: '15px' }} />
          <textarea 
            name="description" 
            value={form.description || ''} 
            onChange={handleChange} 
            placeholder="Cuéntanos algo sobre ti..." 
            style={styles.textarea} 
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              style={styles.cancelBtn} 
              onClick={toggleEdit}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={styles.saveBtn}
            >
              <FaSave /> Guardar Cambios
            </button>
          </div>
        )}
      </form>

      <div style={styles.changePassword}>
        <RiLockPasswordLine /> Cambiar contraseña
      </div>
    </div>
  );
}

export default Perfil;
