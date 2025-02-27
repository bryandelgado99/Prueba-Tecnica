import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/Login/login.view"
import Register from "./views/Register/register.view"
import Reset_Password from "./views/Reset_Password/reset_password.view"
import Active_Account from "./views/Active_Account/active_account.view"
import Dashboard from "./views/Dashboard/Main/main.dashboard"
import Change_User_Info from "./views/Dashboard/Change_User_Info/change_user_info.view"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset-password" element={<Reset_Password/>}/>
        <Route path="/active-account" element={<Active_Account/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/edit-user-information" element={<Change_User_Info/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
