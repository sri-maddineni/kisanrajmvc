import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "../../components/layouts/AdminMenu";
import Nav from "../../components/UIComponents/Nav";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [auth] = useContext(AuthContext);
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        address: auth.user.address,
        pincode: auth.user.pincode,
    });
    const [formChanged, setFormChanged] = useState(false);

    useEffect(() => {
        // Check if the form data is different from the original user data
        const isFormChanged = Object.keys(formData).some(key => formData[key] !== auth.user[key]);
        if (isFormChanged !== formChanged) {
            setFormChanged(isFormChanged);
        }
    }, [formData, auth.user, formChanged]);

    // Update formData when auth user data changes
    useEffect(() => {
        setFormData({
            name: auth.user.name,
            email: auth.user.email,
            phone: auth.user.phone,
            address: auth.user.address,
            pincode: auth.user.pincode,
        });
    }, [auth.user]);

    const vibrantFieldStyle = {
        border: '2px solid #17a2b8', // Vibrant border color
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#f8f9fa', // Light background color
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/updateuserdata/${auth.user._id}`, formData);
            console.log('backend api called successfully');
            setEditMode(false);
            // Optionally, you can update the formChanged state here
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <>
            <Header />
            <Nav />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        {auth.user.role === "0" ? <AdminMenu /> : <UserMenu />}
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className="card-title mb-4 text-primary">Profile</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <label className="text-muted">Name:</label>
                                        </div>
                                        <div className="col-md-9">
                                            {!editMode ? (
                                                <p style={vibrantFieldStyle}>{formData.name}</p>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <label className="text-muted">Email:</label>
                                        </div>
                                        <div className="col-md-9">
                                            {!editMode ? (
                                                <p style={vibrantFieldStyle}>{formData.email}</p>
                                            ) : (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <label className="text-muted">Phone:</label>
                                        </div>
                                        <div className="col-md-9">
                                            {!editMode ? (
                                                <p style={vibrantFieldStyle}>{formData.phone}</p>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <label className="text-muted">Address:</label>
                                        </div>
                                        <div className="col-md-9">
                                            {!editMode ? (
                                                <p style={vibrantFieldStyle}>{formData.address}</p>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <label className="text-muted">Pincode:</label>
                                        </div>
                                        <div className="col-md-9">
                                            {!editMode ? (
                                                <p style={vibrantFieldStyle}>{formData.pincode}</p>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        {!editMode ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </button>
                                        ) : (
                                            <>
                                                <button type="submit" className="btn btn-success mr-2">Submit</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => setEditMode(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        <button
                                            className="btn btn-link"
                                            onClick={() => { navigate("/forgot-password") }}
                                        >
                                            Forgot Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;