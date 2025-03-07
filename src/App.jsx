import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/Login/login.view"
import Register from "./views/Register/register.view"
import Reset_Password from "./views/Reset_Password/reset_password.view"
import Active_Account from "./views/Active_Account/active_account.view"
import Dashboard from "./views/Dashboard/Main/main.dashboard"
import Change_User_Info from "./views/Dashboard/Change_User_Info/change_user_info.view"
import { AuthProvider } from "./context/auth.provider"
import Change_Password from "./views/Change_Password/change_password.view"
import PrivateRoute from "./middleware/private.route"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<Reset_Password />} />
          <Route path="/change-password" element={<Change_Password />} />
          <Route path="/activate-account" element={<Active_Account />} />
          {/* Proteger las rutas Dashboard y Edit User Info */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/edit-user-information" element={<PrivateRoute element={<Change_User_Info />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App
