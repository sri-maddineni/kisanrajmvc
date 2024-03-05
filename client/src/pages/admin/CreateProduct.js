import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import AdminMenu from '../../components/layouts/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/category/categories');

      if (data) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const [auth]=useContext(AuthContext)
  
  const handleCreate = async (e) => {
    console.log(5)
    e.preventDefault();

    try {
      
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("sellerId",auth.user._id)


      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/create-product`, productData);

      if (data?.success) {
    
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Error occurred while creating product hrere");
    }
  }

  return (
    <>
      <Header />
      <div className="row m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 text-center">
          <h3>Create Product</h3>
          <div className="m-1">
            <Select
              placeholder="Select category"
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value) => { setCategory(value) }}>
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
            {/* Photo Upload */}
            <div className="mb-3">
              <label className='btn btn-primary btn-prinary'>
                {photo ? photo.name : "Upload photo"}
                <input type="file" name="photo" id="" accept='image/*'
                  onChange={(e) => setPhoto(e.target.files[0])} hidden />
              </label>
            </div>
            {photo && (
              <div className="mb-3 text-center">
                <img src={URL.createObjectURL(photo)} alt="Product " height={"200px"} className="img img-responsive" />
              </div>
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
                onChange={(value) => { setShipping(value) }}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button onClick={handleCreate} className='btn btn-primary'>Create Product</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CreateProduct;
