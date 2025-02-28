import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.provider"; // Asegúrate de que la ruta es correcta

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Mostrar un loading mientras verificamos la sesión
  }

  if (!user) {
    // Si no hay usuario, redirigir a la página de login
    return <Navigate to="/" />;
  }

  // Si el usuario está autenticado, renderizamos el componente pasado como 'element'
  return element;
};

export default PrivateRoute;
