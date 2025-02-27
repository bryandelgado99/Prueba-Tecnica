import { Link } from "react-router-dom";
import * as React from "react"
import ActiveAccountLogo from "../../assets/lock-correct-svgrepo-com.svg"
import { Button } from "@mui/material"

const Active_Account = () =>{

    return(
        <>
            <main className="bg-blue-400 w-screen h-dvh flex flex-col justify-center items-center relative">
        
                <section className=" absolute w-full md:w-1/2 gap-8 flex flex-col bg-white p-8 rounded-3xl shadow-2xl justify-center items-center">

                    <img src={ActiveAccountLogo} width={80} alt="React Logo" /> 
            
                    <h1 className="text-black text-2xl font-bold text-center">¡Enhorabuena!</h1>

                    <p>Has activado tu usuario con éxito. Inicia sesión para disfrutar de nuestros servicios.</p>
                        
                    <Link to="/">
                        <Button variant="contained" size="medium" className="w-full mt-4">
                                Entendido
                        </Button>
                    </Link>
                </section>

            </main>
        </>
    )
}

export default Active_Account