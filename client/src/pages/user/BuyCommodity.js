import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Modal } from "antd";

const BuyCommodity = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product

  const showModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setOpen(true);
  };

  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const [notes, setnotes] = useState("");

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
    // eslint-disable-next-line
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-all-products`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all products!");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="row m-3">
        <div style={{ width: "25%" }}>
          {auth.user.role === "0" ? <AdminMenu /> : <UserMenu />}
        </div>
        <div style={{ minHeight: "50vh", width: "70%" }}>
          <h3 className="text-center">All Products</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products?.map((p) => (
              <div className="card m-1" style={{ width: "15rem" }} key={p._id}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "30vh", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "1rem" }}>
                    {p.organic ? "Organic" : "Inorganic"} {p.name} {p.quality}{" "}
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
                    className={`btn m-2 btn-${
                      proposedlist.includes(p._id) ? "danger" : "primary"
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
