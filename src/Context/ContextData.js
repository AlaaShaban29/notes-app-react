import jwtDecode from 'jwt-decode';
import React, { useContext ,createContext, useState, useEffect } from 'react';
const ContextData = createContext([]);

export function ContextDataProvider({ children }) {

const BASE_URL= 'https://route-egypt-api.herokuapp.com';

const [loginUser, setLoginUSer] = useState(null);
const loginUSerInfo=()=>{
  const incode=localStorage.getItem('userToken');
  setLoginUSer(jwtDecode(incode))
}
const userLogout=()=>{
  localStorage.removeItem('userToken');
  setLoginUSer(null)
}
useEffect(() => {
}, [])
  return (
    <>
      <ContextData.Provider
        value={{
          BASE_URL,loginUser, loginUSerInfo,userLogout
        }}
      >
        {children}
      </ContextData.Provider>
    </>
  );
}
function useGlobalContext() {
  return useContext(ContextData);
}
export default useGlobalContext;

//
