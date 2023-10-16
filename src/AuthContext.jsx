import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  function removeCookie() {
    const pastDate = new Date(0).toUTCString();
    console.log(pastDate);
    document.cookie = `token=; expires=${pastDate}; SameSite=None; Secure;`;
  }
  function setCookie(token) {
    const x = new Date();
    x.setDate(x.getDate() + 1);
    const cookieValue = `token=${token}; SameSite=None; Secure; expires=${x.toUTCString()}`;
    document.cookie = cookieValue;
  }

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
  }


  const [isLogged, setIsLogged] = useState(true);

  useEffect(()=>{
    if(getCookie("token")){
        setIsLogged(true)
    }else{
      setIsLogged(false)
    }
  },[])
  
  const login = (jwt) => {
    setCookie(jwt)
    setIsLogged(true);
  }

  const logout = () => {
    setIsLogged(false);
    removeCookie()
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}