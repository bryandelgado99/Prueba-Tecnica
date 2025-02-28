import supabase from '../service/supabase.client';

export const sendActivationEmail = async (email) => {

 await supabase.functions.invoke("send-email", {
    body: {
      to: email,
      subject: "Activa tu cuenta",
      text: "Haz clic en el enlace enviado a tu correo para activar tu cuenta.",
    },
  });
};

// Función para enviar el correo de recuperación de contraseña
export const sendPasswordResetEmail = async (email) => {
  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) {
      throw error;
    }

    return { success: true, message: "Correo de recuperación enviado. Revisa tu bandeja de entrada." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};