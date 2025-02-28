import { useState, useEffect } from 'react';
import { Lock, Close } from '@mui/icons-material';
import { IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactLogo from "../../assets/react_light.svg";
import SuperbaseLogo from "../../assets/supabase.svg";
import { useAuth } from '../../context/auth.provider';  // Utilizamos el AuthProvider
import Swal from 'sweetalert2';

const Change_Password = () => {
  const [password, setPassword] = useState('');
  const [confirPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();  // Obtener la función changePassword del contexto
  const navigate = useNavigate();
  const location = useLocation();  // Usamos location para obtener los parámetros de la URL

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');  // Obtenemos el token desde la URL

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: "No se proporcionó un token válido.",
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      navigate('/');  // Redirige si no hay token
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
        Swal.fire({
            title: 'Error',
            text: "No se ha proporcionado un token válido.",
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        return;
    }

    if (!password || !confirPassword) {
        Swal.fire({
            title: '¡Error!',
            text: "Los campos no pueden estar vacíos.",
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        return;
    }

    if (password !== confirPassword) {
        Swal.fire({
            title: '¡Error!',
            text: "Las contraseñas no coinciden.",
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        return;
    }

    setLoading(true);

    // Pasamos el token al cambiar la contraseña
    const response = await changePassword(token, password, confirPassword);

    setLoading(false);

    if (response.success) {
        Swal.fire({
            title: '¡Contraseña actualizada!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => navigate("/")); // Redirigir al home después de éxito
    } else {
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
      <span className="absolute top-8 left-8 bg-white w-10 h-10 rounded-full">
        <Link to="/">
          <IconButton aria-label="Regresar">
            <Close />
          </IconButton>
        </Link>
      </span>

      <section className='absolute w-full md:w-1/4 gap-8 flex flex-col bg-white p-12 rounded-3xl shadow-2xl'>
        <div className="flex flex-row justify-center items-center gap-6">
          <img src={ReactLogo} width={80} alt="React Logo" />
          <span className="font-bold text-blue-400 text-3xl">+</span>
          <img src={SuperbaseLogo} width={80} alt="Supabase Logo" />
        </div>

        <h1 className="text-black text-2xl font-bold text-center">
          Cambia tu contraseña
        </h1>

        <p className='text-justify'>
          Se ha verificado tu enlace de recuperación. Ahora puedes cambiar tu contraseña.
        </p>
        
        <form className='flex flex-col gap-y-8' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
              },
            }}
          />

          <TextField
            fullWidth
            label="Repite la contraseña"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
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
            Cambiar contraseña
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Change_Password;
