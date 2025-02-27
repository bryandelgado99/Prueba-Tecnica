import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");  // Este token es gestionado por Supabase

  const [message, setMessage] = useState("Activando cuenta...");

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setMessage("Token inválido.");
        return;
      }

      setMessage("Cuenta activada. Ahora puedes iniciar sesión.");
    };

    activateAccount();
  }, [token]);

  return <div className="p-6 text-center">{message}</div>;
};

export default ActivateAccount;
