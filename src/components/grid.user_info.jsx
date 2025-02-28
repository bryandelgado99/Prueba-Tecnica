import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useAuth } from "../context/auth.provider";
import UserIcon from '../assets/user-circle-2-svgrepo-com.svg';

const GridUserInfo = () => {
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserData();
      if (response.success) {
        setUserData(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col w-1/2 md:grid bg-gray-50 border border-blue-400 p-6 rounded-lg 
                    gap-6 md:grid-cols-5 md:grid-rows-4 grid-cols-1">

      {/* Imagen de perfil */}
      <div className="flex justify-center items-center row-span-4 md:row-span-4 ">
        <img
          src={UserIcon}
          alt="Perfil"
          className="w-50 h-fit rounded-full object-cover"
        />
      </div>

      {/* Campos de usuario */}
      <TextField
        label="Nombres"
        value={userData?.first_name || ""}
        InputProps={{ readOnly: true }}
        className="col-span-2 md:col-span-2"
      />

      <TextField
        label="Apellidos"
        value={userData?.last_name || ""}
        InputProps={{ readOnly: true }}
        className="col-span-2 md:col-span-2 md:col-start-4"
      />

      <TextField
        label="Correo Electrónico"
        value={userData?.email || ""}
        InputProps={{ readOnly: true }}
        className="col-span-4 md:col-span-4 md:col-start-2 md:row-start-2"
      />

      <TextField
        label="Dirección"
        value={userData?.address || ""}
        InputProps={{ readOnly: true }}
        className="col-span-4 md:col-span-4 md:col-start-2 md:row-start-3"
      />

      <TextField
        label="Fecha de nacimiento"
        value={userData?.birth_date || ""}
        InputProps={{ readOnly: true }}
        className="col-span-4 md:col-span-4 md:col-start-2 md:row-start-4"
      />
    </div>
  );
};

export default GridUserInfo;