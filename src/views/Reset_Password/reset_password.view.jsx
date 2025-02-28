import { useState } from 'react';
import { Email, Close } from '@mui/icons-material';
import { IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import ReactLogo from "../../assets/react_light.svg";
import SuperbaseLogo from "../../assets/supabase.svg";
import { useAuth } from '../../context/auth.provider';  // Utilizamos el AuthProvider
import Swal from 'sweetalert2';

const Reset_Password = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();  // Obtener la función resetPassword del contexto
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);  // Activar el estado de carga

    // Llamamos a la función para enviar el correo de recuperación
    const response = await resetPassword(email);

    setLoading(false);  // Desactivar el estado de carga

    if (response.success) {
      // Muestra una alerta de éxito
      Swal.fire({
        title: '¡Correo enviado!',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => navigate("/"));  // Redirigir al home después de éxito
    } else {
      // Muestra una alerta de error
      Swal.fire({
        title: 'Error',
        text: response.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <main className="bg-blue-400 w-screen h-dvh flex flex-col justify-center items-center relative">
      {/* Return to Login View */}
      <span className="absolute top-8 left-8 bg-white w-10 h-10 rounded-full">
        <Link to="/">
          <IconButton aria-label="Regresar">
            <Close />
          </IconButton>
        </Link>
      </span>

      {/* Reset password form */}
      <section className='absolute w-full md:w-1/4 gap-8 flex flex-col bg-white p-12 rounded-3xl shadow-2xl'>
        <div className="flex flex-row justify-center items-center gap-6">
          <img src={ReactLogo} width={80} alt="React Logo" />
          <span className="font-bold text-blue-400 text-3xl">+</span>
          <img src={SuperbaseLogo} width={80} alt="Supabase Logo" />
        </div>

        <h1 className="text-black text-2xl font-bold text-center">
          Recuperación de contraseña
        </h1>

        <p className='text-justify'>
          Para poder acceder nuevamente al servicio, por favor ingresa tu correo electrónico registrado. Recibirás un enlace para la recuperación de contraseña.
        </p>
        
        <form className='flex flex-col gap-y-8' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
              },
            }}
          />

          <Button
            variant="contained"
            size="medium"
            className="w-full mt-4"
            disabled={loading}
            type="submit"
          >
            Recuperar contraseña
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Reset_Password;