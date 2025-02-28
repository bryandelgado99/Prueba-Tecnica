import { createContext, useContext, useEffect, useState } from "react";
import supabase from '../service/supabase.client'

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

        const userId = data.user.id; // Obtener ID del usuario
        const loginTime = new Date().toISOString(); // Fecha y hora actual en formato ISO

        // Eliminar el último registro de sesión del usuario (si existe)
        await supabase
            .from("sessions")
            .delete()
            .eq("user_id", userId);

        // Insertar la nueva sesión
        const { error: insertError } = await supabase.from("sessions").insert([
            { user_id: userId, last_login: loginTime }
        ]);

        if (insertError) {
            console.error("Error al registrar la sesión:", insertError.message);
        }

        return { success: true, message: "Inicio de sesión exitoso." };
    } catch (error) {
        return { success: false, message: error.message };
    }
};


const getLastLogin = async () => {
    try {
        // Obtener el usuario autenticado
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, message: "No hay usuario autenticado." };
        }

        // Buscar la última sesión registrada en la tabla `sessions`
        const { data, error } = await supabase
            .from("sessions")
            .select("last_login")
            .eq("user_id", user.id)
            .order("last_login", { ascending: false })
            .limit(1)
            .single();

        if (error) {
            return { success: false, message: "No se encontró la última sesión." };
        }

        return { success: true, lastLogin: data.last_login };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

  
  const changePassword = async (password, confirmPassword) => {
    try {
        // Verificamos que las contraseñas coincidan
        if (password !== confirmPassword) {
            return { success: false, message: "Las contraseñas no coinciden." };
        }

        // Supabase ya autenticó temporalmente al usuario, solo actualizamos la contraseña
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            return { success: false, message: error.message };
        }

        return { success: true, message: "Contraseña actualizada con éxito." };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
    

    const getUserData = async () => {
        try {
        if (!user) {
            return { success: false, message: "No hay un usuario autenticado." };
        }

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) {
            throw error;
        }

        return { success: true, data };
        } catch (error) {
        return { success: false, message: error.message };
        }
    };


  const resetPassword = async (email) => {
    try {
      // Definimos la URL de redirección
      const redirectUrl = 'http://localhost:5173/change-password';  // Redirige al componente de cambio de contraseña

      // Llamar al método de Supabase para enviar el correo de recuperación
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,  // Aquí pasamos la URL de redirección
      });

      if (error) {
        return { success: false, message: error.message };  // Si ocurre un error
      }

      return { success: true, message: "Correo de recuperación enviado." };  // Si todo va bien
    } catch (error) {
      return { success: false, message: error.message };
    }
};

  // **Cerrar sesión**
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/"  // Redirige a la ruta raíz
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, resetPassword, changePassword, getUserData, getLastLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
