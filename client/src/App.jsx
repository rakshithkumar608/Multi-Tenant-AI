import {  Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import MainLayout from "./layouts/MainLayout";



const App = () => {
  return (
   
    
      <Routes>
       
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>

        <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/history" element={<History />}/>
        </Route>
      </Routes> 
  )
}

export default App
