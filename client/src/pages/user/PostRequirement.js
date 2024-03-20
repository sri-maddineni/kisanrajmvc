import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { Radio } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import commodities from "../../Data/Commodities"; // Import the data from Commodities.js
import Nav from "../../components/UIComponents/Nav";

const PostRequirement = () => {
  const navigate = useNavigate();
  const [auth] = useContext(AuthContext);

  const [productName, setproductName] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [date, setdate] = useState("");
  const [organic, setOrganic] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const [displayPotentials, setDisplayPotentials] = useState(false);
  const [potentials, setPotentials] = useState([]);

  const getPotentials = async () => {
    try {
      const buyerId = auth?.user?._id;

      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/get-potentials`, { buyerId });

      if (response?.data.success) {
        setPotentials(response.data.potentials);
      } else {
        console.log("if else case");
      }
    } catch (error) {
      console.log("somethig wrong");
    }
  };

  // Function to filter product names based on user input
  const filterSuggestions = (input) => {
    const filtered = commodities.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.map((product) => product.name));
  };

  useEffect(() => {
    if (productName && isFocused) {
      // Only filter suggestions when productName is not empty and input is focused
      filterSuggestions(productName);
    } else {
      setSuggestions([]); // Clear suggestions when productName is empty or input is not focused
    }
  }, [productName, isFocused]);

  const handleSelect = (suggest) => {
    setproductName(suggest);
    setSuggestions([]); // Clear suggestions when item is selected
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false); // Set input focus state to false after a delay
    }, 200);
  };

  const handlePost = async () => {
    try {
      const buyerId = auth.user._id;
      const postData = {
        productName,
        buyerId,
        quantity,
        quantityUnit,
        date,
        price,
        organic,
        shipping,
        notes,
      };
      console.log(postData);
      const data = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/requirements/post-potential`,
        postData
      );

      if (data?.data.success) {
        toast.success("success");
        setproductName("")
        setPrice("")
        setNotes("")
        setdate("")
        setQuantity("")
        setQuantityUnit("")
        setShipping("")

      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <>
      <Nav />
      <div>
        <div className="row">
          <h2 className="text-center m-3">Fill Product details</h2>

          <div className="text-center m-1 d-flex justify-content-between" style={{ minHeight: "50vh" }}>

            <div className=""></div>


            <div className="m-1">
              <div className="mb-3">
                <input
                  type="text"
                  value={productName}
                  placeholder="Enter name"
                  className="form-control"
                  onChange={(e) => setproductName(e.target.value)}
                  onFocus={() => setIsFocused(true)} // Add onFocus event handler to set focus state to true
                  onBlur={handleBlur} // Add onBlur event handler
                />
                {/* Render suggestions dropdown */}
                {isFocused && suggestions.length > 0 && productName && (
                  <ul style={{ listStyle: "none" }}>
                    {suggestions.map((suggest, index) => (
                      <li
                        key={index}
                        className="bg-info p-1 m-1"
                        onClick={() => handleSelect(suggest)}
                      >
                        {suggest}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-3 d-flex align-items-center">
                <input type="number" value={price} placeholder='Rs. Price ' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                <span className='m-3' style={{ fontWeight: "600" }}>per</span>
                <Radio.Group onChange={(e) => setQuantityUnit(e.target.value)} value={quantityUnit} className="d-flex align-items-center">
                  <Radio value={"ton"} className="me-3">ton</Radio>
                  <Radio value={"box"} className="me-3">box</Radio>
                  <Radio value={"quintal"} className="me-3">quintal</Radio>
                  <Radio value={"dozen"} className="me-3">dozen</Radio>
                  <Radio value={"kg"}>kg</Radio>
                  <Radio value={"item"}>item</Radio>
                  <Radio value={"bag"}>bag</Radio>
                </Radio.Group>
                <input type="number" value={quantity} placeholder='Total Quantity Needed' className='form-control mx-2' onChange={(e) => setQuantity(e.target.value)} />{""} {quantityUnit}s


              </div>

              <div className="m-4 d-flex align-items-center">
                <label
                  htmlFor=""
                  className="m-0 me-3 text-dark"
                  style={{ fontWeight: "600" }}
                >
                  Required by :
                </label>
                <div className="dater">
                  <input
                    type="date"
                    value={date}
                    placeholder="Required date"
                    className="form-control"
                    onChange={(e) => setdate(e.target.value)}
                  />
                </div>
                <div className="data">
                  <label
                    htmlFor=""
                    className="m-4 text-dark"
                    style={{ fontWeight: "600" }}
                  >
                    Is shipping needed?
                  </label>
                  <Radio.Group
                    onChange={(e) => setShipping(e.target.value)}
                    value={shipping}
                  >
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>

                  <label
                    htmlFor=""
                    className="m-4 text-dark"
                    style={{ fontWeight: "600" }}
                  >
                    Organic
                  </label>
                  <Radio.Group
                    onChange={(e) => setOrganic(e.target.value)}
                    value={organic}
                  >
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className="m-3">
                <input
                  type="text"
                  value={notes}
                  placeholder="Enter some notes"
                  className="form-control"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button onClick={handlePost} className="btn btn-primary">
                  Post Requirement
                </button>
              </div>

              <button
                className="btn btn-warning mb-3"
                onClick={() => {
                  setDisplayPotentials(!displayPotentials);
                  getPotentials();
                }}
              >
                {displayPotentials ? "Hide" : "show"} posted potentials
              </button>
              {displayPotentials && (
                <div
                  className="container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                  }}
                >
                  {potentials.map((p) => (
                    <div
                      key={p._id}
                      className="card m-1"
                      style={{ width: "18rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: "1rem" }}>
                          <span style={{ fontWeight: "600" }}>
                            {p.organic ? "Organic" : "Inorganic"}
                          </span>{" "}
                          <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                            {p.productName}
                          </span>
                          &nbsp;
                        </h5>
                        <p style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                          {p.description}
                        </p>
                        <p className="card-text">
                          <span className="text-dark bg-warning">
                            {" "}
                            unit price Rs.{p.price}/-
                          </span>{" "}
                          {" "}
                          <br />
                          <span>
                            {p.quantity} {p.quantityUnit ? p.quantityUnit : ""}s needed
                          </span>
                        </p>
                        <p style={{ fontSize: "0.8rem" }}>{p._id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostRequirement;
