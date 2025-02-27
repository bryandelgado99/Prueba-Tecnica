import { Link, useNavigate } from "react-router-dom"
import * as React from "react"
import ReactLogo from "../../assets/react_light.svg"
import SuperbaseLogo from "../../assets/supabase.svg"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Box, InputAdornment, CircularProgress } from "@mui/material"
import {Email, Cake, FmdGood} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Swal from "sweetalert2"
import { useAuth } from "../../context/auth.provider"

const Register = () =>{

    const { register } = useAuth(); // Usamos la función de registro del AuthContext
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    
    //Manejo de envio de formulario de registro
    const handleSubmit = async (e) =>{

        e.preventDefault();

        // **Validaciones**
        if (!name || !lastName || !email || !password || !confirmPassword || !address || !selectedDate) {
          return Swal.fire("Error", "Todos los campos son obligatorios", "error");
        }
    
        if (password !== confirmPassword) {
          return Swal.fire("Error", "Las contraseñas no coinciden", "error");
        }
    
        setLoading(true);
    
        // **Registrar usuario**
        const { success, message } = await register(email, password, name, lastName, address, selectedDate);
    
        setLoading(false);
    
        if (!success) {
          return Swal.fire("Error", message, "error");
        }
    
        Swal.fire("Registro Exitoso", "Se ha enviado un correo de activación", "success").then(
            navigate("/")
        );
    }
    
    
    return (
        <>
          <main className="bg-blue-400 w-screen h-dvh flex flex-col justify-center items-center relative">
        
            <section className=" absolute w-full md:w-1/2 gap-8 flex flex-col bg-white p-8 rounded-3xl shadow-2xl">
    
                <div className="flex flex-row justify-center items-center gap-6">
                    <img src={ReactLogo} width={80} alt="React Logo" />
                    <span className="font-bold text-blue-400 text-3xl">+</span>
                    <img src={SuperbaseLogo} width={80} alt="Supabase Logo" />
                </div>
    
                <h1 className="text-black text-2xl font-bold text-center">Registrate</h1>
    
                <form className="flex flex-col justify-center items-center w-full ">
                <Box className="flex flex-col md:flex-row md:gap-x-4 w-full ">
                    <TextField
                        fullWidth
                        label="Nombres"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                        <TextField
                        fullWidth
                        label="Apellidos"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Box>

                <TextField
                    fullWidth
                    label="Dirección"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start"><FmdGood/></InputAdornment>,
                        },
                      }}
                />

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
                          startAdornment: <InputAdornment position="start"><Email/></InputAdornment>,
                        },
                      }}
                />
                
                <Box className="flex flex-col md:flex-row md:gap-x-4 w-full">
                    <TextField
                        fullWidth
                        label="Contraseña"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Confirmar Contraseña"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Box>

                
                <Box className="w-full mt-4 flex gap-x-4 justify-center items-center flex-row">
                    <Cake/>
                    {/*Birthday selector*/}     
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de Nacimiento"
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            renderInput={(params) => <TextField {...params}/>}
                            className="w-full"
                        />
                    </LocalizationProvider>
                </Box>
    
                <Box className="mt-8 w-full">
                    <Button variant="contained" size="medium" className="w-full" disabled={loading} onClick={handleSubmit}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Completar Registro"}
                    </Button>
                </Box>

                </form>
            
                <Box className="w-full justify-center items-center flex text-sm mt-4">
                    <span className="gap-4 flex">¿Ya tienes cuenta?
                        <Link to="/" className="text-sky-400 font-bold">
                            Inicia Sesión
                        </Link>
                    </span>
                </Box>
    
            </section>
            
          </main>
        </>
      );
}

export default Register