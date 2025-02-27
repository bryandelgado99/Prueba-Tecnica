import { Link } from "react-router-dom";
import * as React from "react";
import ReactLogo from "../../assets/react_light.svg";
import SuperbaseLogo from "../../assets/supabase.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, InputAdornment} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState('')

  return (
    <>
      <main className="bg-blue-400 w-screen h-dvh flex flex-col justify-center items-center relative">
    
        <section className=" absolute w-full md:w-1/4 gap-8 flex flex-col bg-white p-12 rounded-3xl shadow-2xl">

            <div className="flex flex-row justify-center items-center gap-6">
                <img src={ReactLogo} width={80} alt="React Logo" />
                <span className="font-bold text-blue-400 text-3xl">+</span>
                <img src={SuperbaseLogo} width={80} alt="Supabase Logo" />
            </div>

            <h1 className="text-black text-2xl font-bold text-center">Iniciar Sesión</h1>

            <form className="flex flex-col justify-center items-center w-full gap-6">
            <TextField
                fullWidth
                label="Correo Electrónico"
                variant="outlined"
                margin="normal"
                type="email"
                slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><Email/></InputAdornment>,
                    },
                  }}
            />
            <TextField
                fullWidth
                label="Contraseña"
                variant="outlined"
                margin="normal"
                type="password"
                slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><Lock/></InputAdornment>,
                    },
                  }}            />

            <div className="w-full flex justify-end">
                <Button variant="text" size="small" className="text-blue-400">
                He olvidado mi contraseña
                </Button>
            </div>

            <Button variant="contained" size="medium" className="w-full mt-4" disabled={loading}>
                Iniciar Sesión
            </Button>
            </form>
        
            <Box className="w-full justify-center items-center flex text-sm mt-8">
                <span className="gap-4 flex">¿Aún no tienes una cuenta?
                    <Link to="/register" className="text-sky-400 font-bold">
                        Registrate
                    </Link>
                </span>
            </Box>

        </section>
        
      </main>
    </>
  );
};

export default Login;
