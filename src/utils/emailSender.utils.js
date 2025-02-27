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