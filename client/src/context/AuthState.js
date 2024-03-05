import axios from "axios";
import AuthContext from "./AuthContext";
import React, { useEffect } from "react";
import { useState } from "react";

const AuthState = (props) => {

    const [auth, setAuth]=useState({
        user:null,
    })

    //default axios

    axios.defaults.headers.common['Authorization']=auth?.token;

    useEffect(()=>{
        const data=localStorage.getItem('auth');
        if(data){
            const parsedata=JSON.parse(data);
            setAuth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token
            })
        }

        
        //eslint-disable-next-line
    },[]);

  

    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}




export default AuthState;



