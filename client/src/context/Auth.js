import { useState, useContext, createContext, Children } from "react";

const authContext=createContext();

const AuthProvider=()=>{
    const [auth, setAuth]=useState({
        user:null,
        token:""
    })

    
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {Children}
        </AuthContext.Provider>
    )
}

//custom hook
const  useAuth=()=>useContext(AuthContext);

export {useAuth, AuthProvider}

