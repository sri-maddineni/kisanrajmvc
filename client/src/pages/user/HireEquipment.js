import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserMenu from './UserMenu';
import AuthContext from '../../context/AuthContext';
import { isMobile } from 'react-device-detect';
import Nav from '../../components/UIComponents/Nav';

const HireEquipment = () => {
    const [auth] = useContext(AuthContext);
    const [equipmentResponse, setEquipmentResponse] = useState({ equipments: [], categories: [] });
    const [selectedCategory, setSelectedCategory] = useState('all'); // Initially set to 'all'
    const [filteredEquipments, setFilteredEquipments] = useState([]);

    useEffect(() => {
        const fetchEquipmentsAndCategories = async () => {
            try {
                const uid = auth.user._id;

                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/hire-equipment`);

                if (response.data?.success) {
                    // Filter out equipment associated with the current user
                    const filteredEquipments = response.data.equipments.filter(equipment => equipment.owner_id._id !== uid);
                    setEquipmentResponse({ equipments: filteredEquipments, categories: response.data.categories });
                    setFilteredEquipments(filteredEquipments); // Initialize filtered equipments with all equipments
                } else {
                    toast.error(response.data?.message);
                }
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
                toast.error('Error occurred while fetching data');
            }
        };

        fetchEquipmentsAndCategories();
    }, [auth.user._id]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 'all') {
            // If "All" category is selected, display all equipments
            setFilteredEquipments(equipmentResponse.equipments);
        } else {
            // Filter equipments based on selected category
            const filteredEquipments = equipmentResponse.equipments.filter(equipment => equipment.equipment_category_id === categoryId && equipment.owner_id._id !== auth.user._id);
            setFilteredEquipments(filteredEquipments);
        }
    };

    const handlePhoneCall = (phoneNumber) => {
        if (isMobile) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // Handle non-mobile devices (e.g., display a message)
            alert('Phone call is only available on mobile devices.');
        }
    };
    const handleWhatsAppMessage = (phoneNumber) => {
        // Open WhatsApp with the phone number in a new tab
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
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
                        <h3>Hire Equipment details</h3>
                        <div className="m-1">
                            {/* Display Equipment Categories as Radio Buttons */}
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="all"
                                    className="form-check-input"
                                    name="category"
                                    value="all"
                                    checked={selectedCategory === 'all'}
                                    onChange={() => handleCategoryChange('all')}
                                />
                                <label htmlFor="all" className="form-check-label">All</label>
                            </div>
                            {equipmentResponse.categories.map(category => (
                                <div key={category._id} className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        id={category._id}
                                        className="form-check-input"
                                        name="category"
                                        value={category._id}
                                        checked={selectedCategory === category._id}
                                        onChange={() => handleCategoryChange(category._id)}
                                    />
                                    <label htmlFor={category._id} className="form-check-label">{category.equipment_category}</label>
                                </div>
                            ))}

                            {/* Display Filtered Equipments */}
                            {filteredEquipments.map(equipment => (
                                <div key={equipment._id} className="card m-2">
                                    <div className="card-body">
                                        <h5 className="card-title">{equipment.equipment_desc}</h5>
                                        <p className="card-text">Model: {equipment.equipment_model}</p>
                                        <p className="card-text">License: {equipment.license}</p>
                                        {/* Display owner details */}
                                        <p className="card-text">Owner: {equipment.owner_id.name}</p>
                                        {/* Display phone number with call and WhatsApp buttons */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            {isMobile && (
                                                <button className="btn btn-primary" onClick={() => handlePhoneCall(equipment.owner_id.phone)}>Call</button>
                                            )}
                                            <button className="btn btn-success" onClick={() => handleWhatsAppMessage(equipment.owner_id.phone)}>WhatsApp</button>
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

export default HireEquipment;