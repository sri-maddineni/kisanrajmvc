import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserMenu from './UserMenu';
import AuthContext from '../../context/AuthContext';
import Nav from '../../components/UIComponents/Nav';

const Equipment = () => {
    const [equipmentDesc, setEquipmentDesc] = useState('');
    const [equipmentModel, setEquipmentModel] = useState('');
    const [license, setLicense] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [equipmentCategories, setEquipmentCategories] = useState([]);

    const [auth] = useContext(AuthContext)

    useEffect(() => {
        const fetchEquipmentCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/equipment-categories`);
                if (response.data.success) {
                    setEquipmentCategories(response.data.categories);
                } else {
                    console.error('Failed to fetch equipment categories:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching equipment categories:', error);
            }
        };

        fetchEquipmentCategories();
    }, []);


    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('in handle responce');
        try {
            const formData = {
                equipment_category_id: selectedCategoryId,
                equipment_desc: equipmentDesc,
                equipment_model: equipmentModel,
                license: license,
                owner_id: auth.user._id,
            };
            console.log('befor responce');
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/equipment/post-equipment`, formData);
            console.log(response);
            if (response.data.success) {
                toast.success('Equipment created successfully');
                // Clear form fields after successful submission if needed
                setEquipmentDesc('');
                setEquipmentModel('');
                setLicense('');
                setSelectedCategoryId('');
            } else {
                toast.error('Failed to create equipment: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error creating equipment:', error);
            toast.error('Failed to create equipment');
        }
    };

    return (
        <>
            <Nav />
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8 text-center m-1" style={{ minHeight: '50vh' }}>
                        <div>
                            <h2>Create Equipment</h2>
                            <form onSubmit={handleSubmit} className="equipment-form">
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="equipmentDesc">Equipment Description:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="equipmentDesc" value={equipmentDesc} onChange={(e) => setEquipmentDesc(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="equipmentModel">Equipment Model:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="equipmentModel" value={equipmentModel} onChange={(e) => setEquipmentModel(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="license">License:</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="license" value={license} onChange={(e) => setLicense(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col">
                                        <h3>Equipment Category:</h3>
                                        <div className="category-options">
                                            {equipmentCategories.map(category => (
                                                <label key={category._id} className="category-option">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={category._id}
                                                        checked={selectedCategoryId === category._id}
                                                        onChange={() => handleCategoryChange(category._id)}
                                                        className="category-input"
                                                    />
                                                    <span className="category-label">{category.equipment_category}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">Create Equipment</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Equipment;