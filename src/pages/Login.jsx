import LoginArea from "./Login/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

const Login = ()=>{
    const { isLogged, login, logout } = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if(isLogged){
            navigate('/')
        }
    },[isLogged])

    return (
        <>
            <LoginArea />
        </>
    )

}

export default Login