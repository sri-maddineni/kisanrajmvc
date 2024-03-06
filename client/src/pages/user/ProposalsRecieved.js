import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProposalsRecieved = () => {
  const [auth] = useContext(AuthContext);
  const [proposals, setProposals] = useState({});
  const [posted, setPosted] = useState([]);
  const [productData, setProductData] = useState({});
  const [activeSection, setActiveSection] = useState("responses"); // State to manage active section

  const getProductData = async (pid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${pid}`
      );
      if (res.data.success) {
        return res.data.product;
      } else {
        return "abc";
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
      return "abc";
    }
  };

  const getProposalsRecieved = async () => {
    try {
      const uid = auth?.user?._id;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/proposals-recieved`,
        { uid }
      );
      if (res.data.success) {
        const proposalsData = res.data.proposedList;
        const proposalsCount = {};
        const productData = {};
        for (const productId in proposalsData) {
          const count = proposalsData[productId].length;
          proposalsCount[productId] = count;
          if (!productData[productId]) {
            const product = await getProductData(productId);
            if (product) {
              productData[productId] = product;
            }
          }
        }
        setProductData(productData);
        setProposals(proposalsCount);
      }
    } catch (error) {
      console.log("Error fetching proposals:", error);
    }
  };

  useEffect(() => {
    getProposalsRecieved();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid m-3 p-1">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 text-center" style={{ minHeight: "50vh" }}>
            <div className="btns">
              <button
                className="btn btn-warning m-2"
                onClick={() => setActiveSection("responses")}
              >
                Responses (for listed products)
              </button>
              <button
                className="btn btn-warning m-2"
                onClick={() => setActiveSection("negotiations")}
              >
                Negotiations (for proposals sent)
              </button>
            </div>
            <div className="container">
              <h1>
                {activeSection === "responses" ? "Responses" : "Negotiations"}
              </h1>
            </div>
            <div className="row">
              {Object.entries(proposals).map(([productId, count]) => (
                <div className="col-md-4 mb-4" key={productId}>
                  <div className="card">
                    <div className="card-body">
                      {productData[productId] ? (
                        <>
                          <img
                            src={`/api/v1/products/product-photo/${productId}`}
                            alt=""
                            style={{ minHeight: "20vh" }}
                          />
                          <p className="card-text">
                            Product Name: {productData[productId].name}
                          </p>
                          <p className="card-text">
                            Description: {productData[productId].description}
                          </p>
                          <p className="card-text">
                            Price: {productData[productId].price}
                          </p>
                          <p className="card-text">
                            Quantity: {productData[productId].quantity}
                          </p>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                      <Link
                        to={`/dashboard/user/${activeSection}/${productId}`}
                      >
                        <button className="btn btn-primary">
                          {count}{" "}
                          {activeSection === "responses"
                            ? "responses"
                            : "negotiations"}{" "}
                          received
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProposalsRecieved;
