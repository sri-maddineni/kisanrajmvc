import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "../user/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns"
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button, Modal } from 'antd';
import Nav from "../../components/UIComponents/Nav";

const Responses = () => {
    const params = useParams();

    const [proposal, setProposal] = useState([]);   // to propose a new offer by seller to buyer for negotiation

    const [product, setProduct] = useState({}); //for product details maintenance

    const [leads, setLeads] = useState([]);

    const [requirements, setRequirements] = useState([]);   //to fetch all requirements from requirements model

    const [auth, setAuth] = useContext(AuthContext);//to maintain user state and logged-in details for profile page

    const [open, setOpen] = useState(false);    //for modal in negotiate button

    const [requirement, setRequirement] = useState('')  //to attach details of requirement to it and use eg: requirement.productId
    const [responsesState, setResponsesState] = useState(true)

    const [negotiation, setnegotiation] = useState("")   //new requirement or proposal that seller wants to send

    const [quantity, setquantity] = useState("")        //these are for new proposal or negotiation details
    const [price, setprice] = useState("")
    const [date, setdate] = useState("")
    const [notes, setnotes] = useState("")

    const showModal = (r) => {
        setRequirement(r)
        setOpen(true);
    };

    const handleOk = async (pid, buyerid) => {
        try {
            const sellerId = auth?.user._id;
            const productId = pid;
            const buyerId = buyerid;
            const sentBy = auth?.user?._id;

            const { data: proposeData } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/propose`, { buyerId, productId, sellerId });
            const { data: requirementData } = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/post-requirement`, { quantity, price, date, notes, buyerId, sellerId, productId, sentBy });

            if (proposeData?.success && requirementData?.success) {
                toast.success("Offer proposed!");
                setOpen(false);

                setquantity("")
                setprice("")
                setdate("")
                setnotes("")
            }
        } catch (error) {
            console.log(error);
            toast.error("Propose failed!");
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const getRequirements = async () => {
        try {
            const sellerId = auth?.user?._id;
            const productId = params.pid;
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/get-requirement`, { sellerId, productId });

            if (data?.success) {
                setRequirements(data.result);

            } else {
                console.log("Failed to fetch requirements");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRequirements();
    }, []);



    const getPotentials = async (productName) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/requirements/get-product-potentials`, { productName });

            if (response?.data.success) {
                setLeads(response.data.potentials);
            } else {
                console.log("if else case");
            }
        } catch (error) {
            console.log(error)
            console.log("somethig wrong");
        }
    };



    const formattedDate = product.createdAt ? format(new Date(product.createdAt), 'dd MMM yyyy') : '';

    const pid = params.pid;


    const getProductData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${pid}`);

            if (data?.success) {
                const proposalsReceived = data.product?.sellerId?.proposalsReceived?.[pid] || [];
                setProduct(data.product);
                setProposal(proposalsReceived);
            } else {
                console.log("Failed to get product data");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to get product data responses");
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    
                    <div style={{ minHeight: "50vh" }}>
                        <div className="titler">
                            <div className="topper p-3">
                                <div style={{ flexDirection: "column" }}>
                                    <p>
                                        <span className="text-primary m-2" style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                                            {product.name}
                                        </span>{" "}
                                        <span className="text-warning bg-dark">Rs.{product.price}/-</span> per {" "} {product.quantityUnit}
                                        <span className="bg-warning">{product.quantity} {product.quantityUnit}s</span> Lot id: <span className="text-danger">{product._id} </span>{" "}
                                        Posted on : <span className="text-info">{formattedDate}</span>{" "}
                                    </p>
                                    <div className="buttons">
                                        <button className="btn btn-lg btn-warning m-1" style={{ width: "49%" }} onClick={() => {
                                            setResponsesState(true)
                                        }}>
                                            Buyer Responses
                                        </button>
                                        <button className="btn btn-lg btn-warning m-1" style={{ width: "49%" }} onClick={() => {
                                            setResponsesState(false)
                                            getPotentials(product.name);
                                        }}>
                                            Potential Leads
                                        </button>
                                    </div>
                                    <>
                                        {responsesState && (
                                            <div className="container">
                                                <h1 className="text-center">Responses</h1>
                                                <div className="row">
                                                    {requirements.map((requirement, index) => (
                                                        <div className="card p-1 mx-2 mb-2" key={index}>
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <div className="p-2" style={{ width: "70%" }}>
                                                                    <div className="d-flex justify-content-between">
                                                                        <p>{product.name}</p>
                                                                        <p><i className="fa-regular fa-clock p-1"></i>{format(new Date(requirement.date), 'dd MMM yy')}</p>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between p-1" style={{ display: "flex", flexDirection: "row" }}>
                                                                        <p>Rs.{requirement.price} /-</p>
                                                                        <p>Quantity : {requirement.quantity} {product.quantityUnit}s</p>
                                                                        <p>Description : {requirement.notes}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="card mx-2 p-1" style={{ width: "30%", display: "flex", flexDirection: "column" }}>
                                                                    <div style={{ display: "flex", flexDirection: "row" }} >
                                                                        <div style={{ width: "30%" }}>
                                                                            <i className="fa-solid fa-circle-user fa-2x p-1"></i>
                                                                        </div>
                                                                        <div className="p-1" style={{ width: "70%" }}>
                                                                            <p style={{ fontSize: "15px" }}>{requirement.sentBy.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <button className="btn btn-primary btn-sm m-1">Accept</button>
                                                                        <button onClick={() => showModal(requirement)} className="btn btn-primary btn-sm m-1">Negotiate</button>
                                                                        <i className="fa-solid fa-phone m-2" style={{ cursor: "pointer" }}></i>
                                                                        <i className="fa-brands fa-whatsapp m-2" style={{ cursor: "pointer" }}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {
                                            !responsesState && (
                                                <div className="container">
                                                    <h1 className="text-center">Potential Leads</h1>
                                                    {leads.length? 
                                                        (<div className="row"
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            flexWrap: "wrap",
                                                            justifyContent: "space-around",
                                                        }}>
                                                        {leads.map((lead, index) => (
                                                            <div className="card p-1 m-1" key={index}>
                                                                <div className="d-flex justify-content-between">

                                                                    <p>Quantity Required : {lead.quantity} {lead.quantityUnit}</p>
                                                                    <p className="">Cost offered : {lead.price}/- ( Rs.{lead.price / lead.quantity} per {lead.quantityUnit} )</p>

                                                                    <div className="card mx-2 p-1" style={{ width: "30%", display: "flex", flexDirection: "column" }}>
                                                                        <div style={{ display: "flex", flexDirection: "row" }} >
                                                                            <div style={{ width: "30%" }}>
                                                                                <i className="fa-solid fa-circle-user fa-2x p-1"></i>
                                                                            </div>
                                                                            <div className="p-1" style={{ width: "70%" }}>
                                                                                <p style={{ fontSize: "15px" }}>{lead.buyerId.name}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <button className="btn btn-primary btn-sm m-1">Accept</button>

                                                                            <i className="fa-solid fa-phone m-2" style={{ cursor: "pointer" }}></i>
                                                                            <i className="fa-brands fa-whatsapp m-2" style={{ cursor: "pointer" }}></i>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>
                                                ):<>
                                                <div className="text-center">
                                                    <button className="btn btn-danger">0 Potential leads found</button></div></>}
                                                </div>

                                            )
                                        }
                                    </>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
            <Modal
                title={`Negotiate with : ${requirement?.buyerId?.name}`}
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={() => handleOk(requirement?.productId, requirement?.buyerId)}>Submit</Button>,
                ]}
            >
                <p>Product Name : {requirement?.productId?.name}</p>
                <div className="p-1 m-1" >
                    <input type="number" required={true} value={quantity} onChange={(e) => setquantity(e.target.value)} style={{ borderRadius: "5px" }} className="p-1 m-1" placeholder="Quantity" /> <label htmlFor="">{requirement?.productId?.quantityUnit}s</label>
                </div>
                <div className="p-1 m-1">
                    Rs. <input type="number" required={true} value={price} onChange={(e) => setprice(e.target.value)} style={{ borderRadius: "5px" }} className="p-1 m-1" placeholder="Offered price" /> per {quantity} {requirement?.productId?.quantityUnit}s
                </div>
                <div className="p-1 m-1" >
                    Available date: <input type="date" required={true} value={date} onChange={(e) => setdate(e.target.value)} style={{ borderRadius: "5px" }} className="p-1 m-1" placeholder="Available date" />
                </div>
                <div className="p-1 m-1" >
                    <input type="textbox" required={true} value={notes} onChange={(e) => setnotes(e.target.value)} style={{ borderRadius: "5px" }} className="p-1" placeholder="Some notes..." />
                </div>
            </Modal>
        </>
    );
};

export default Responses;
