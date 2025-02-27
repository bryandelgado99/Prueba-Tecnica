import ReactLogo from "../../../assets/react_light.svg";
import SuperbaseLogo from "../../../assets/supabase.svg";
import { Button, IconButton } from "@mui/material";
import { Logout, Edit } from "@mui/icons-material";
import GridUserInfo from "../../../components/grid.user_info";
import { Link } from "react-router-dom";
import Change_User_Info from "../Change_User_Info/change_user_info.view";
import { useState } from "react";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            {/* Layout con Grid */}
            <div className="grid w-full min-h-dvh grid-rows-[auto_1fr_auto]">
                
                {/* Navbar */}
                <nav className="bg-blue-300 flex flex-row px-10 py-8 justify-between items-center rounded-b-3xl shadow-xl">
                <div className="flex flex-row justify-center items-center gap-x-4">
                    <img src={ReactLogo} width={30} alt="React Logo" />
                    <span className="font-bold text-white text-xl">+</span>
                    <img src={SuperbaseLogo} width={30} alt="Supabase Logo" />
                </div>

                {/* User info and Logout button */}
                <div className="flex flex-row gap-x-10 justify-center items-center">
                    <p className="text-white font-bold text-lg hidden md:flex">Bienvenido, user</p>
                    {/* Botón de cierre de sesioón A (visible en pantallas medianas y grandes) */}
                    <span className="hidden md:flex">
                        <Button variant="contained" startIcon={<Logout />}>
                            Cerrar Sesión
                        </Button>
                    </span>

                    {/* Botón de cierre de sesión B (visible solo en móviles) */}
                    <span className="md:hidden bg-blue-500 w-auto h-auto rounded-xl">
                        <Link to="/">
                            <IconButton className="flex md:hidden">
                                <Logout className="text-white"/>
                            </IconButton>
                        </Link>
                    </span>
                </div>
                </nav>

                {/* Contenido principal que ocupa el espacio restante */}
                <main className="flex justify-center items-center flex-col gap-y-8 p-4">
                <p className="text-xl font-bold">Información del Usuario</p>
                <GridUserInfo/>

                <Button variant="contained" startIcon={<Edit/>} onClick={() => setIsOpen(true)}>
                    Editar Información
                </Button>
                </main>

                {/* Footer fijo abajo */}
                <footer className="bg-blue-500 flex-col md:flex-row text-white p-4 flex items-center justify-center">
                <span>Fecha y hora de último acceso:</span>
                <span> dd/mm/yy HH:MM:SSS</span>
                </footer>
            </div>

            {/* Panel lateral / Modal */}
            <Change_User_Info open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default Dashboard;
