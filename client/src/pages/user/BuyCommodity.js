import React, { useContext, useEffect, useState } from "react";

import Footer from "../../components/layouts/Footer";

import AuthContext from "../../context/AuthContext";

import toast from "react-hot-toast";
import axios from "axios";
import { Button, Modal } from "antd";

import Link from "antd/es/typography/Link";

import commodities from "../../Data/Commodities";
import Nav from "../../components/UIComponents/Nav";



const BuyCommodity = () => {

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products

  const [searchitem, setSearchitem] = useState("");

  const [auth] = useContext(AuthContext);

  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const [notes, setnotes] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [proposedlist, setProposedlist] = useState([]);
  const [products, setProducts] = useState([]);

  const showModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const filterSuggestions = (input) => {
    const filtered = commodities.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.map((product) => product.name));
  };

  useEffect(() => {
    if (searchitem && isFocused) {
      filterSuggestions(searchitem);  // Only filter suggestions when name is not empty and input is focused
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
    }, 100);
  };


  //api call to propose offer

  const proposeOffer = async (pid, sellerId) => {


    const sentBy = auth?.user?._id;
    const buyerId = sentBy;
    const productId = pid;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/propose-offer`, { quantity, price, notes, date, sentBy, buyerId, productId, sellerId })
      if (res.data.success) {
        setOpen(false)
        setquantity("")
        setprice("")
        setnotes("")
        setdate("")

        setProposedlist([...proposedlist, pid]);
        toast.success("offer proposed!")

      }
    } catch (error) {
        console.log(error)
    }
  }


  const getProposedList = async () => {
    try {
      const userid = auth?.user?._id;
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/proposedlist`, { userid });
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
      if (auth?.user) {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-products`);
        if (data?.success) {
          setProducts(data?.products);
        }
      }
      else {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-product`); //products not posted by him and posted by others
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

  

  return (
    <>
      <Nav />

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

                      

                      <button
                        className={`btn m-2 btn-${proposedlist.includes(p._id) ? "danger" : "primary"} btn-sm`}
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
                        Rs.{p.price}/- per {p.quantityUnit}
                        <br />

                        ({p.quantity} {p.quantityUnit}s Available)
                      </span>
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
              proposeOffer(selectedProduct._id, selectedProduct.sellerId._id)
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
          per  {selectedProduct?.quantityUnit}s
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
