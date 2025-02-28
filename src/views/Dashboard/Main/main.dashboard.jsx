import ReactLogo from "../../../assets/react_light.svg";
import SuperbaseLogo from "../../../assets/supabase.svg";
import { Button, IconButton } from "@mui/material";
import { Logout, Edit } from "@mui/icons-material";
import GridUserInfo from "../../../components/grid.user_info";
import Change_User_Info from "../Change_User_Info/change_user_info.view";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth.provider";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { getUserData, getLastLogin, logout } = useAuth(); 
    const [userData, setUserData] = useState(null);
    const [lastLogin, setLastLogin] = useState(null);

    // Función para obtener los datos del usuario
    const fetchUserData = async () => {
        const response = await getUserData();
        if (response.success) {
            setUserData(response.data);
        } else {
            console.error(response.message);
        }
    };

    // Función para obtener la última fecha de login
    const fetchLastLogin = async () => {
        const response = await getLastLogin();
        if (response.success) {
            setLastLogin(new Date(response.lastLogin).toLocaleString());
        } else {
            console.error(response.message);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchLastLogin();
    }, []); // Solo se ejecuta una vez cuando se carga el componente
    
    // Función para manejar el logout
    const handleLogout = () => {
        logout();  // Cierra sesión y redirige a la ruta raíz
    };

    // Función que será llamada cuando se cierren los cambios en el modal
    const handleCloseChange = () => {
        setIsOpen(false);  // Cierra el modal
        fetchUserData();  // Recarga los datos del usuario
    };

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
                    <p className="text-white font-bold text-lg hidden md:flex">Bienvenido, {userData?.first_name || ""}</p>
                    {/* Botón de cierre de sesioón A (visible en pantallas medianas y grandes) */}
                    <span className="hidden md:flex">
                            <Button variant="contained" startIcon={<Logout />} onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                    </span>

                    {/* Botón de cierre de sesión B (visible solo en móviles) */}
                    <span className="md:hidden bg-blue-500 w-auto h-auto rounded-xl">
                            <IconButton className="flex md:hidden" onClick={handleLogout}>
                                <Logout className="text-white"/>
                            </IconButton>
                    </span>
                </div>
                </nav>

                {/* Contenido principal que ocupa el espacio restante */}
                <main className="flex justify-center items-center flex-col gap-y-8 p-4">
                    <p className="text-xl font-bold">Información del Usuario</p>
                    
                    <GridUserInfo userData={userData} />

                    <Button variant="contained" startIcon={<Edit />} onClick={() => setIsOpen(true)}>
                        Editar Información
                    </Button>
                </main>

                {/* Footer fijo abajo */}
                <footer className="bg-blue-500 flex-col md:flex-row text-white gap-x-8 p-4 flex items-center justify-center">
                    <span>Fecha y hora de último acceso:</span>
                    <span> {lastLogin || "No disponible"}</span>
                </footer>
            </div>

            {/* Panel lateral / Modal */}
            <Change_User_Info 
                open={isOpen} 
                onClose={handleCloseChange} 
            />
        </>
    );
};

export default Dashboard;
