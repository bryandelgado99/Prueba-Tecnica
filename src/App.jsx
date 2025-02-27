import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/Login/login.view"
import Register from "./views/Register/register.view"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
