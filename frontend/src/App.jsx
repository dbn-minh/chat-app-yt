import './App.css'
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </div>
  )
}

export default App
