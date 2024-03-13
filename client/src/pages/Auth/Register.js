import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/UIComponents/Navbar";
import Nav from "../../components/UIComponents/Nav";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (pincode.length > 6) {
      toast("Please enter valid pincode");
    } else {
      e.preventDefault();

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/register`,
          {
            name,
            email,
            password,
            phone,
            answer,
            address,
            pincode,
            latitude,
            longitude,
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error in registration!");
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Nav />
      <Toaster />
      <div className="d-flex justify-content-between">
        <div className=""></div>
        <div className="register my-2">
          <h1 className="my-2 text-center">Register user</h1>
          <form className="text-center m-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Full Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Enter phone"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="Enter secret code"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter Address"
                required
              />
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <input
                type="number"
                className="form-control m-1"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
                placeholder="Enter Pincode"
                required
              />
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="number"
                className="form-control m-1"
                value={latitude}
                placeholder="Enter latitude"
                required
              />
              <input
                type="number"
                className="form-control m-1"
                value={longitude}
                placeholder="Enter Longitude"
                required
              />
              <button
                className="btn btn-sm btn-success m-1"
                onClick={getLocation}
                style={{ padding: "0.5rem 1rem" }}
              >
                <i className="fas fa-map-marker-alt"></i>
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className=""></div>
      </div>
      <Footer />
    </>
  );
};
