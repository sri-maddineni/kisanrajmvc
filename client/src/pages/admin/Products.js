import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import AdminMenu from '../../components/layouts/AdminMenu'
import axios from "axios"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Products = () => {

    const [products, setProducts] = useState([])

    //get all products

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-products`)
            if (data?.success) {
                setProducts(data?.products)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in getting all products!")
        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])


    return (
        <>
            <div className="">
                <Header />
                <div className="row">
                    <div className="col-md-3 m-2">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 m-2">
                        <h1 className="text-center">
                            all products list
                        </h1>

                        <div className='d-flex col-md-3'>
                            {products?.map(p => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='text-dark'>
                                    <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                                        <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{height:"30vh", objectFit:"cover"}} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>



                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default Products