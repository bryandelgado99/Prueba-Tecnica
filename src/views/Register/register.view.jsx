import { Link } from "react-router-dom"
import * as React from "react"
import ReactLogo from "../../assets/react_light.svg"
import SuperbaseLogo from "../../assets/supabase.svg"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Box, InputAdornment } from "@mui/material"
import {Email, Cake} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Register = () =>{

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    
    const [error, setError] = React.useState('')
    
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [loading, setLoading] = React.useState('');

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
                    />
                        <TextField
                        fullWidth
                        label="Apellidos"
                        variant="outlined"
                        margin="normal"
                        type="text"
                    />
                </Box>

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
                
                <Box className="flex flex-col md:flex-row md:gap-x-4 w-full">
                    <TextField
                        fullWidth
                        label="Contraseña"
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />
                    <TextField
                        fullWidth
                        label="Repetir Contraseña"
                        variant="outlined"
                        margin="normal"
                        type="password"
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
                    <Button variant="contained" size="medium" className="w-full" disabled={loading}>
                        Completar Registro
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