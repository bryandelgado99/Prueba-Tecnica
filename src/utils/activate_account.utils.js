import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import supabase from '../service/supabase.client';

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Activando cuenta...");
  const navigate = useNavigate();  // Usamos el hook de navegación para redirigir después de la activación

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setMessage("Token inválido.");
        return;
      }

      try {
        // Activar la cuenta con el token de Supabase
        const { error } = await supabase.auth.api
          .updateUser(token);

        if (error) {
          setMessage("Error al activar la cuenta.");
          return;
        }

        // Una vez que la cuenta se activa, podemos redirigir al usuario
        setMessage("Cuenta activada. Ahora puedes iniciar sesión.");
        // Redirigir al usuario a la página de login después de un breve mensaje
        setTimeout(() => {
          navigate("/login");  // Cambiar '/login' por la ruta que uses para el login en tu app
        }, 2000); // Esperamos 2 segundos para que el mensaje sea visible
      } catch (error) {
        setMessage("Error al activar la cuenta.");
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="p-6 text-center">
      <h2>{message}</h2>
    </div>
  );
};

export default ActivateAccount;
