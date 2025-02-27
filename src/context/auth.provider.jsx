import { v4 as uuidv4 } from 'uuid'; 
import { createContext, useContext, useEffect, useState } from "react";
import supabase from '../service/supabase.client'
import { sendActivationEmail } from "../utils/emailSender.utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica si hay una sesión activa al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkSession();
    
    // Escuchar cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  
 // **Registrar usuario y enviar email de activación**
 const register = async (email, password, firstName, lastName, address, birthDate) => {
    try {
      // Registramos al usuario en Supabase (esto maneja el password y la activación)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) throw error;
  
      // Guardar información adicional en la base de datos (sin password)
      const { error: insertError } = await supabase.from("users").insert([{
        id: data.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        address,
        birth_date: birthDate,
      }]);
  
      if (insertError) throw insertError;
  
      // No es necesario manejar el token ni el enlace de activación, Supabase se encarga de esto
  
      return { success: true, message: "Cuenta creada. Revisa tu correo para activarla." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  

  // **Iniciar sesión**
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        if (error.message.includes('email not confirmed')) {
          return { success: false, message: "Debes activar tu cuenta antes de iniciar sesión." };
        }
        throw error;  // Si hay otro tipo de error, lanzamos el error
      }
  
      return { success: true, message: "Inicio de sesión exitoso." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };  

  // **Cerrar sesión**
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
