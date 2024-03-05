import React, { useState, useEffect, useContext } from 'react'
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import AdminMenu from '../../components/layouts/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import AuthContext from '../../context/AuthContext';

const { Option } = Select;


const UpdateProduct = () => {

    const [auth] = useContext(AuthContext)

    const navigate = useNavigate();
    const params = useParams();

    // const [categories, setCategories] = useState([]);
    const [photo] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    //const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("")
    const [sellerId,setSellerId]=useState("")


    ///const get single product
    const getSingleProduct = async () => {

        setId(params.pid)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${params.pid}`)
            setName(data?.product.name)
            setPrice(data?.product.price)
            setQuantity(data?.product.quantity)
            setId(data?.product._id);
            setShipping(data?.product.shipping)
            // setCategory(data.product.category._id)
            setDescription(data?.product.description)
            setSellerId(data?.product.sellerId)
            console.log(sellerId)
            


        } catch (error) {
            console.log(error)
            toast.error("product fetch failed!")
        }
    }

    useEffect(() => {
    
            getSingleProduct();
        
           
        //eslint-disable-next-line
    }, [])




    // Get all categories
    /* const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/category/categories');

            if (data) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    }*/



    /*
        useEffect(() => {
            getAllCategories();
        }, []);
    */


    //update product


    const handleUpdate = async (e) => {

        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            //photo && productData.append("photo", photo);
            // productData.append("category", category);
            productData.append("shipping", shipping);


            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/products/update-product/${params.pid}`, productData);


            if (data?.success) {

                toast.success("Product updated successfully");
                navigate("/dashboard/user/listings-posted");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);

            toast.error("Error occurred while updating product");
        }
    }


    //const handledelete

    const handledelete = async (req, res) => {
        try {
            let answer = window.prompt("Are you sure you want to delete product?")
            if (!answer) {
                console.log(answer)
                return
            }
            else {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`)

                navigate("/dashboard/user/listings-posted");
                toast.success("Product deleted successfully!")
                console.log(data)

            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in delteing product")
        }

    }




    return (
        <>
            <Header />
            <div className="row m-3">
                <div className="col-md-3">
                    {auth.user.role === "0" ? <AdminMenu /> : <UserMenu />}
                </div>
                <div className="col-md-9 text-center">
                    <h3>Update Product</h3>
                    <div className="m-1">
                        
                        {photo ? (
                            <div className="mb-3 text-center">
                                <img src={URL.createObjectURL(photo)} alt="Product " height={"200px"} className="img img-responsive" />
                            </div>
                        ) : (
                            <>
                                <div className="mb-3 text-center">
                                    <img src={`/api/v1/products/product-photo/${id}`} alt="Product " height={"200px"} className="img img-responsive" />
                                </div>
                            </>
                        )}
                        {/* Form Inputs */}
                        <div className="mb-3">
                            <input type="text" value={name} placeholder='Enter name' className='form-control' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="number" value={price} placeholder='Enter price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={description} placeholder='Enter description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="number" value={quantity} placeholder='Enter quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <Select
                                placeholder="Select Shipping"
                                size='large'
                                className='form-select mb-3'
                                onChange={(value) => { setShipping(value) }}
                                value={shipping ? "Yes" : "No"}>
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button onClick={handleUpdate} className='btn btn-primary m-1'>Update Product</button>
                            <button onClick={handledelete} className='btn btn-danger m-1'>Delete Product</button>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UpdateProduct