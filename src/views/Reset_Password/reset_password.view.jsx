import {react, useState} from 'react';
import { Email, Close } from '@mui/icons-material'
import { IconButton, Button, TextField, InputAdornment } from '@mui/material'
import { Link } from "react-router-dom"
import ReactLogo from "../../assets/react_light.svg"
import SuperbaseLogo from "../../assets/supabase.svg"

const Reset_Password = () =>{
    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    return (
      <>
        <main className="bg-blue-400 w-screen h-dvh flex flex-col justify-center items-center relative">
          {/* Return to Login View */}
          <span className="absolute top-8 left-8 bg-white w-10 h-10 rounded-full">
            <Link to="/">
              <IconButton aria-label="Regresar">
                <Close />
              </IconButton>
            </Link>
          </span>

          {/*Reset pasword form*/}
          <section className='absolute w-full md:w-1/4 gap-8 flex flex-col bg-white p-12 rounded-3xl shadow-2xl">'>
            
            
            <div className="flex flex-row justify-center items-center gap-6">
              <img src={ReactLogo} width={80} alt="React Logo" />
              <span className="font-bold text-blue-400 text-3xl">+</span>
              <img src={SuperbaseLogo} width={80} alt="Supabase Logo" />
            </div>

            <h1 className="text-black text-2xl font-bold text-center">
              Recuperación de contraseña
            </h1>

            <p className='text-justify'>Para poder acceder nuevamente al servicio, por favor ingrsa tu correo electrónico registrado. Recibirás un enlace para la recuperación de contraseña.</p>
            
            <form className='flex flex-col gap-y-8'>
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

                <Button variant="contained" size="medium" className="w-full mt-4" disabled={loading}>
                    Recuperar contraseña
                </Button>
            </form>
          </section>
        </main>
      </>
    );
}

export default Reset_Password