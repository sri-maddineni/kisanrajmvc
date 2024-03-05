import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axios from "axios"

import {} from "react-router-dom";
import { useNavigate} from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";

export const Register = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");

  const navigate=useNavigate();
 
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,answer,address,});
      
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/login")
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in registration!")
    }
  }
  
  return (
    <>
      <Header />
      <Toaster/>
      <div className="total text-center my -5">
      <div className="register my-5">
        <h1 className="my-2">Register user</h1>
        <form className="text-center m-3" onSubmit={handlesubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              
              value={name}
              required
              onChange={(e) => { setname(e.target.value) }}
              placeholder="Enter Full Name"
            />

          </div>
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

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              
              value={phone} onChange={(e) => { setphone(e.target.value) }}
              placeholder="Enter phone"
              required
            />

          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={answer} onChange={(e) => { setanswer(e.target.value) }}
              placeholder="Enter secret code"
              required
            />

          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              
              value={address}
              onChange={(e) => { setaddress(e.target.value) }}
              placeholder="Enter Address"
              required
            />

          </div>



          {/*
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label htmlFor="">Accept terms and conditions</label>
          </div>
          */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      
      </div>
      <Footer />
    </>

  );
};
