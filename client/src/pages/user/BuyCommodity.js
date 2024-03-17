import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Modal } from "antd";
import Filtersbar from "../../components/Filters/Filtersbar";
import Link from "antd/es/typography/Link";

import commodities from "../../Data/Commodities";
import Nav from "../../components/UIComponents/Nav";


const BuyCommodity = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products

  const [searchitem, setSearchitem] = useState("");

  const showModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setOpen(true);
  };

  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const [notes, setnotes] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const filterSuggestions = (input) => {
    const filtered = commodities.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.map((product) => product.name));
  };

  useEffect(() => {
    if (searchitem && isFocused) {
      // Only filter suggestions when name is not empty and input is focused
      filterSuggestions(searchitem);
    } else {
      setSuggestions([]); // Clear suggestions when name is empty or input is not focused
    }
  }, [searchitem, isFocused]);

  const handleSelect = (suggest) => {
    setSearchitem(suggest);
    setSuggestions([]);
    handleProductFilter(suggest);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false); // Set input focus state to false after a delay
    }, 200);
  };

  const handleOk = async (pid, sellerid) => {
    try {
      const buyerId = auth?.user._id;
      const productId = pid;
      const sellerId = sellerid;
      const sentBy = auth?.user._id;

      const { data: proposeData } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/propose`,
        { buyerId, productId, sellerId }
      );
      const { data: requirementData } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/requirements/post-requirement`,
        { quantity, price, date, notes, buyerId, sellerId, productId, sentBy }
      );

      if (proposeData?.success && requirementData?.success) {
        toast.success("Offer proposed!");
        setOpen(false);
        setProposedlist([...proposedlist, pid]);
        setquantity("");
        setprice("");
        setdate("");
        setnotes("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Propose failed!");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [auth] = useContext(AuthContext);

  const distance = (lat, long) => {
    if (auth?.user?.latitude && auth?.user?.longitude) {
      const userLat = parseFloat(auth.user.latitude);
      const userLong = parseFloat(auth.user.longitude);
      const sellerLat = parseFloat(lat);
      const sellerLong = parseFloat(long);

      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(sellerLat - userLat);
      const dLon = deg2rad(sellerLong - userLong);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLat)) *
        Math.cos(deg2rad(sellerLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance.toFixed(2);
    } else {
      return "N/A"; // If user's location is not available
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const [proposedlist, setProposedlist] = useState([]);
  const [products, setProducts] = useState([]);

  const getProposedList = async () => {
    try {
      const userid = auth?.user._id;
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/proposedlist`,
        { userid }
      );
      if (data?.success) {
        setProposedlist(data?.proposedList);
      }
    } catch (error) {
      console.error("Error fetching proposed list:", error);
    }
  };

  useEffect(() => {
    getProposedList();
  }, []);

  const handlepropose = async (pid, sellerid) => {
    try {
      const buyerid = auth?.user._id;
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/propose`,
        { buyerid, pid, sellerid }
      );
      if (data?.success) {
        toast.success("Offer proposed!");
        setProposedlist([...proposedlist, pid]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Propose failed");
    }
  };

  const handleDecline = async (pid, sellerid) => {
    try {
      const buyerid = auth?.user._id;
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/decline`,
        { buyerid, pid, sellerid }
      );
      if (data?.success) {
        toast.success("Offer declined!");
        setProposedlist(proposedlist.filter((id) => id !== pid));
      }
    } catch (error) {
      console.log(error);
      toast.error("Decline failed!");
    }
  };

  const getAllProducts = async () => {
    try {
      if(auth?.user){
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-products`);
        if (data?.success) {
          setProducts(data?.products);
        }
      }
      else{
        
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-product`);
        if (data?.success) {
          setProducts(data?.products);
        }

      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all products!");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleProductFilter = (productName) => {
    const filtered = products.filter((product) => product.name === productName);
    setFilteredProducts(filtered);
  };

  const handlecategoryFilter = (productcategory) => {
    const filtered = products.filter(
      (product) => product.category === productcategory
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Nav/>
      
      <div className="row m-3">
      
        
        <div style={{ minHeight: "50vh", width: "100%" }}>
          <div className="container" style={{ position: "relative" }}>
            <div className="d-flex align-items-center">
              <input
                className="form-control mr-sm-2 m-3"
                type="search"
                placeholder="Search for products"
                value={searchitem}
                onChange={(e) => {
                  setSearchitem(e.target.value);
                }}
                aria-label="Search"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
              />
              {searchitem && ( // Render the cross button only when search item is not empty
                <button
                  className="fa-solid fa-multiply btn-sm btn"
                  onClick={() => {
                    setSearchitem("") 
                    setFilteredProducts([])
                
                }} // Clear the search input when the cross button is clicked
                ></button>
              )}
              <button
                className="btn btn-outline-info btn-sm m-3"
                onClick={() => {
                  handleProductFilter(
                    searchitem.charAt(0).toUpperCase() + searchitem.slice(1)
                  );
                }}
              >
                Search
              </button>
            </div>
            {isFocused && suggestions.length > 0 && searchitem && (
              <ul
                style={{
                  listStyle: "none",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  zIndex: 999, // Ensure it's above other elements
                  backgroundColor: "#fff", // Set background color to match input field
                  padding: 0,
                  margin: 0,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add shadow for depth
                  borderRadius: "0.25rem", // Add rounded corners
                }}
              >
                {suggestions.slice(0, 6).map((suggest, index) => (
                  <li
                    key={index}
                    className="bg-info p-1 m-1"
                    onClick={() => handleSelect(suggest)}
                    style={{ cursor: "pointer" }} // Ensure cursor changes to pointer on hover
                  >
                    {suggest}
                  </li>
                ))}
              </ul>
            )}
          </div>


          {/* <Filtersbar onProductSelect={handlecategoryFilter} />*/}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {filteredProducts.length > 0
              ? filteredProducts.map((p) => (
                <Link
                  to={`/dashboard/user/buy-commodity`}
                  className="text-dark text-decoration-none"
                >
                  <div
                    className="card m-3 text-center"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <span
                      className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light"
                      style={{ left: "90%", zIndex: "1" }}
                    >
                      {" "}
                      {p.commodityId.category}
                    </span>
                    <img
                      src={`/api/v1/products/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "30vh", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: "1rem" }}>
                        {p.organic ? "Organic" : "Inorganic"} {p.name}{" "}
                        {p.quality} 
                        <i className="fa-solid fa-star text-warning"></i>
                        <br />
                        {p.description}
                      </h5>
                      <p className="card-text" style={{ fontSize: "1rem" }}>
                        <span className="text-dark bg-warning">
                          Rs.{p.price}/- per {p.quantity} {p.quantityUnit}s
                          <br />
                          (Rs. {(p.price / p.quantity).toFixed(1)} per{" "}
                          {p.quantityUnit})
                        </span>
                      </p>

                      <p style={{ fontSize: "0.9rem" }}>
                        approx. distance to seller :{" "}
                        {distance(p.sellerId.latitude, p.sellerId.longitude)}{" "}
                        km
                      </p>

                      <button
                        className={`btn m-2 btn-${proposedlist.includes(p._id) ? "danger" : "primary"
                          } btn-sm`}
                        onClick={() => {
                          if (proposedlist.includes(p._id)) {
                            handleDecline(p._id, p.sellerId._id);
                          } else {
                            showModal(p); // Pass the selected product to showModal
                          }
                        }}
                      >
                        {proposedlist.includes(p._id) ? (
                          <>Decline Offer</>
                        ) : (
                          <>Propose Offer</>
                        )}
                      </button>
                      <i
                        className="fa-solid fa-phone mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={()=>{}}
                      ></i>
                      <i
                        className="fa-brands fa-whatsapp mx-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </div>
                </Link>
              ))
              : products.map((p) => (
                <div
                  className="card m-3 text-center"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light"
                    style={{ left: "90%", zIndex: "1" }}
                  >
                    {" "}
                    {p.commodityId.category}
                  </span>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "30vh", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "1rem" }}>
                      {p.organic ? "Organic" : "Inorganic"} {p.name}{" "}
                      {p.quality} 
                      <i className="fa-solid fa-star text-warning"></i>
                      <br />
                      {p.description}
                    </h5>
                    <p className="card-text" style={{ fontSize: "1rem" }}>
                      <span className="text-dark bg-warning">
                        Rs.{p.price}/- per {p.quantity} {p.quantityUnit}s
                        <br />
                        (Rs. {(p.price / p.quantity).toFixed(1)} per{" "}
                        {p.quantityUnit})
                      </span>
                    </p>

                    <p style={{ fontSize: "0.9rem" }}>
                      approx. distance to seller :{" "}
                      {distance(p.sellerId.latitude, p.sellerId.longitude)} km
                    </p>

                    <button
                      className={`btn m-2 btn-${proposedlist.includes(p._id) ? "danger" : "primary"
                        } btn-sm`}
                      onClick={() => {
                        if (proposedlist.includes(p._id)) {
                          handleDecline(p._id, p.sellerId._id);
                        } else {
                          showModal(p); // Pass the selected product to showModal
                        }
                      }}
                    >
                      {proposedlist.includes(p._id) ? (
                        <>Decline Offer</>
                      ) : (
                        <>Propose Offer</>
                      )}
                    </button>
                    <i
                      className="fa-solid fa-phone mx-2"
                      style={{ cursor: "pointer" }}
                    ></i>
                    <i
                      className="fa-brands fa-whatsapp mx-2"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        title="Title"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              handleOk(selectedProduct._id, selectedProduct.sellerId._id)
            }
          >
            Submit
          </Button>,
        ]}
      >
        <p>Product Name: {selectedProduct?.name}</p>
        <div className="p-1 m-1">
          <input
            type="number"
            required={true}
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
            style={{ borderRadius: "5px" }}
            className="p-1 m-1"
            placeholder="Required quantity"
          />{" "}
          <label htmlFor="">{selectedProduct?.quantityUnit}s</label>
        </div>
        <div className="p-1 m-1">
          Rs.{" "}
          <input
            type="number"
            required={true}
            value={price}
            onChange={(e) => setprice(e.target.value)}
            style={{ borderRadius: "5px" }}
            className="p-1 m-1"
            placeholder="Offered price"
          />{" "}
          per {quantity} {selectedProduct?.quantityUnit}s
        </div>

        <div className="p-1 m-1">
          Required date:{" "}
          <input
            type="date"
            required={true}
            value={date}
            onChange={(e) => setdate(e.target.value)}
            style={{ borderRadius: "5px" }}
            className="p-1 m-1"
            placeholder="Required date"
          />
        </div>

        <div className="p-1 m-1">
          <input
            type="textbox"
            required={true}
            value={notes}
            onChange={(e) => setnotes(e.target.value)}
            style={{ borderRadius: "5px" }}
            className="p-1"
            placeholder="Some notes..."
          />
        </div>
      </Modal>
      <Footer />
    </>
  );
};

export default BuyCommodity;
