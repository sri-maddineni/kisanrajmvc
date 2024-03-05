import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserMenu from './UserMenu';
import AuthContext from '../../context/AuthContext';

const EquipmentListing = () => {
  const [auth] = useContext(AuthContext);
  const [equipments, setEquipments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEquipments, setFilteredEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipmentsAndCategories = async () => {
      try {
        const uid = auth.user._id;
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/my-equipment-listing/${uid}`);        
        if (response.data?.success) {
          setEquipments(response.data.equipments);
          setFilteredEquipments(response.data.equipments); // Initialize filtered equipments with all equipments
          setCategories(response.data.categories);
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
      setFilteredEquipments(equipments);
    } else {
      // Filter equipments based on selected category
      const filteredEquipments = equipments.filter(equipment => equipment.equipment_category_id === categoryId);
      setFilteredEquipments(filteredEquipments);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 text-center m-1" style={{ minHeight: '50vh' }}>
            <h3>Equipment Listing</h3>
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
              {categories.map(category => (
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

export default EquipmentListing;