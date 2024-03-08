import React from 'react'
import UserMenu from './UserMenu'
import { useState, useEffect } from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { format } from 'date-fns';



const Listings = () => {


    const [products, setProducts] = useState([])

    const navigate=useNavigate();


    //get all products

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-posted-products`)
            if (data?.success) {
                setProducts(data?.products)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in getting products!")
        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])

    return (

        <>
            <Header />
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8 text-center" style={{ minHeight: "50vh" }}>
                        <h3>Listings</h3>
                        <div className="row flex-wrap">
                            <>
                                {products.length ? (
                                    products.map(p => (
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={p._id}>
                                            <Link to={`/dashboard/user/product/${p._id}`} className="text-dark text-decoration-none">
                                                <div className="card" style={{ width: "18rem" }}>
                                                    <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: "25vh", objectFit: "cover" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title" style={{ fontSize: "1rem" }}><span style={{fontWeight:"600"}}> {p.organic ? "organic" : "Inorganic"} </span><span style={{ fontSize: "1rem",fontWeight:"600" }}>{p.name}</span> &nbsp;{p.quality}<i className='fa fa-star fa-sm text-warning'> </i></h5>
                                                        <p style={{fontSize:"0.8rem", fontWeight:"600"}}>{p.description}</p>
                                                        <p className="card-text"><span className='text-dark bg-warning'> Rs.{p.price}/-</span> per <span>{p.quantity} {p.quantityUnit?p.quantityUnit:""}</span></p>
                                                        <p>Posted on : {format(new Date(p.createdAt), 'dd MMM yyyy')}</p>
                                                        <p style={{fontSize:"0.8rem"}}>{p._id}</p>   
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                    <button className='btn btn-sm btn-primary' onClick={()=>navigate("/dashboard/user/sell-commodity")}>Start posting commodities</button>
                                    </div>
                                )}
                            </>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Listings





