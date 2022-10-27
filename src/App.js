import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Subscriptions from "./Subscriptions";
import Contexto from "./Contexto";
import { useState } from "react";


export default function App() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
      const [percentage, setPercentage] = useState(50);
      const [createCardData, setCreateCardData] = useState({
        name: "",
        
        days: '',
      });
    
      console.log(percentage);
      
      
        

console.log(loginData)

    return(
       
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/subscriptions" element={<Subscriptions/>} />
            </Routes>
        </BrowserRouter>
        
    );
    
}