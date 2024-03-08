import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axios from "axios"

import { useContext } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";


export const Login = () => {


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const location=useLocation();

  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });

      if (res && res.data.success) {
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })

        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate(location.state || "/")


      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Please check credentials")
    }
  }

  return (
    <>
      <Header />

      <div className="total text-center my -5">
        <div className="register my-5">
          <h1 className="my-2">Login user</h1>
          <form className="text-center m-3" onSubmit={handlesubmit}>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"

                value={email}
                onChange={(e) => { setemail(e.target.value) }}
                placeholder="Enter Email"
                required
              />

            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"

                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
                placeholder="Enter password"
                required
              />

            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="m-3">
              {/*eslint-disable-next-line}*/}
            <a className="m-2" href="#" onClick={()=>{navigate("/forgot-password")}}>Forgot password</a>
            
            
           
            </div>

            {/*
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label htmlFor="">Accept terms and conditions</label>
          </div>
          */}
        
            
          </form>
        </div>

      </div>
      <Footer />
    </>

  );
};
