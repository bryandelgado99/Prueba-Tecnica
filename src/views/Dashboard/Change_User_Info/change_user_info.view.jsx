import { useState } from "react";
import { Drawer, Modal, Box, TextField, Button, InputAdornment, Stack, Alert } from "@mui/material";
import { FmdGood } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuth } from "../../../context/auth.provider";

const Change_User_Info = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(""); 
  const { updateUserData } = useAuth(); 

  // Maneja la actualización de la información del usuario
  const handleSaveChanges = async () => {

    // Verificar si algún campo está vacío
    if (!name || !lastName || !address || !selectedDate) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const updatedFields = {
      first_name: name,
      last_name: lastName,
      address: address,
      birth_date: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
    };

    // Validación de la fecha de nacimiento
    if (updatedFields.birth_date) {
      const birthDate = new Date(updatedFields.birth_date);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      const dayDiff = currentDate.getDate() - birthDate.getDate();

      // Si la edad es menor a 15 años o la fecha de nacimiento es mayor a la fecha actual
      if (age < 15 || (age === 15 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        setError("La fecha de nacimiento debe ser mayor a 15 años.");
        return;
      }

      if (birthDate > currentDate) {
        setError("La fecha de nacimiento no puede ser posterior a la fecha actual.");
        return;
      }

      setError("");
    }

    // Llamar a la función para actualizar los datos del usuario
    const response = await updateUserData(updatedFields);

    if (response.success) {
      onClose();  // Cierra el modal o el drawer después de guardar
    }
  };

  const formFields = (
    <Box className="flex flex-col gap-4">
      <Box className="flex flex-col md:flex-row gap-4">
        <TextField fullWidth label="Nombres" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
        <TextField fullWidth label="Apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)} variant="outlined" />
      </Box>

      <TextField
        fullWidth
        label="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><FmdGood /></InputAdornment>,
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha de Nacimiento"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>

      {/* Mostrar el mensaje de error si existe */}
      {error && (
        <Stack spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Guardar Cambios
      </Button>
    </Box>
  );

  return (
    <>
      {/* Panel lateral en escritorio */}
      <Drawer anchor="right" open={open} onClose={onClose} className="hidden md:flex">
        <Box className="w-96 p-6 bg-white h-full shadow-lg">
          <h2 className="text-xl font-bold mb-4">Editar Información</h2>
          {formFields}
        </Box>
      </Drawer>

      {/* Modal Bottom Sheet en móvil */}
      <Modal open={open} onClose={onClose} className="flex md:hidden items-end">
        <Box className="w-full bg-white p-6 rounded-t-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Editar Información</h2>
          {formFields}
        </Box>
      </Modal>
    </>
  );
};

export default Change_User_Info;