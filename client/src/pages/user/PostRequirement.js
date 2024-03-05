import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import { Radio } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import AuthContext from '../../context/AuthContext';
import commodities from "../../Data/Commodities"; // Import the data from Commodities.js

const PostRequirement = () => {
  const navigate = useNavigate();
  const [auth] = useContext(AuthContext);
  
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [date, setdate] = useState("");
  const [organic, setOrganic] = useState("")
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Function to filter product names based on user input
  const filterSuggestions = (input) => {
    const filtered = commodities.filter(product => product.name.toLowerCase().includes(input.toLowerCase()));
    setSuggestions(filtered.map(product => product.name));
  }

  useEffect(() => {
    if (name && isFocused) { // Only filter suggestions when name is not empty and input is focused
      filterSuggestions(name);
    } else {
      setSuggestions([]); // Clear suggestions when name is empty or input is not focused
    }
  }, [name, isFocused]);

  const handleSelect = (suggest) => {
    setName(suggest);
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
      const postData = { name, buyerId, notes, price, date, organic, quantity, quantityUnit, shipping };
      console.log(postData)
      const data = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/post-potential`,  postData );

      if(data?.data.success){
        toast.success("success")
        navigate("/dashboard/user")
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 text-center m-1" style={{ minHeight: "50vh" }}>
            <h3>Fill Product details</h3>

            
            <div className="m-1">
              {/* Form Inputs */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder='Enter name'
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused(true)} // Add onFocus event handler to set focus state to true
                  onBlur={handleBlur} // Add onBlur event handler
                />
                {/* Render suggestions dropdown */}
                {isFocused && suggestions.length > 0 && name && (
                  <ul style={{ listStyle: "none" }}>
                    {suggestions.map((suggest, index) => (
                      <li key={index} className='bg-info p-1 m-1' onClick={() => handleSelect(suggest)}>
                        {suggest}
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              <div className="mb-3 d-flex align-items-center">
                <input
                  type="number"
                  value={price}
                  placeholder='Rs. Price'
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className='m-3' style={{ fontWeight: "600" }}>per</span>
                <input type="number" value={quantity} placeholder='Enter quantity' className='form-control me-2' onChange={(e) => setQuantity(e.target.value)} />
                <Radio.Group onChange={(e) => setQuantityUnit(e.target.value)} value={quantityUnit} className="d-flex align-items-center">
                  <Radio value={"ton"} className="me-3">ton</Radio>
                  <Radio value={"box"} className="me-3">box</Radio>
                  <Radio value={"quintal"} className="me-3">quintal</Radio>
                  <Radio value={"dozen"} className="me-3">dozen</Radio>
                  <Radio value={"kg"}>kg</Radio>
                </Radio.Group>
              </div>

              <div className="m-4 d-flex align-items-center">
                <label htmlFor="" className="m-0 me-3 text-dark" style={{ fontWeight: "600" }}>Required by :</label>
                <div className="dater">
                  <input type="date" value={date} placeholder='Required date' className='form-control' onChange={(e) => setdate(e.target.value)} />
                </div>
                <div className="data">
                  <label htmlFor="" className='m-4 text-dark' style={{ fontWeight: "600" }}>Is shipping needed?</label>
                  <Radio.Group onChange={(e) => setShipping(e.target.value)} value={shipping}>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>

                  <label htmlFor="" className='m-4 text-dark' style={{ fontWeight: "600" }}>Organic</label>
                  <Radio.Group onChange={(e) => setOrganic(e.target.value)} value={organic}>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className="m-3">
                <input type="text"
                  value={notes}
                  placeholder='Enter some notes'
                  className='form-control'
                  onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="mb-3">
                <button onClick={handlePost} className='btn btn-primary'>Post Requirement</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PostRequirement;
