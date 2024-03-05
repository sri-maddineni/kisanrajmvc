import React, { useState, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserMenu from './UserMenu';
import AuthContext from '../../context/AuthContext';

const EquipmentCategory = () => {
  const [equipment_category, setEquipmentCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [auth] = useContext(AuthContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      
      const requestData = { equipment_category };
    
      // Only include keywords in the request if it's not empty
      if (keywords.trim() !== '') {
        requestData.keywords = keywords;
      }
  
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/equipment/create-equipment-category`, requestData);
  



      if (data?.success) {
        toast.success('Equipment category created successfully');
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error('Error occurred while creating equipment category:', error);
      toast.error('Error occurred while creating equipment category');
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
            <h3>Fill Product details</h3>
            <div className="m-1">
              {/* Form Inputs */}
              <div className="mb-3">
                <input type="text" value={equipment_category} placeholder="Enter Equipment Category" className="form-control" onChange={(e) => setEquipmentCategory(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={keywords} placeholder="Enter Keywords" className="form-control" onChange={(e) => setKeywords(e.target.value)} />
              </div>
              <div className="mb-3">
                <button onClick={handleCreate} className="btn btn-primary">Create Equipment Category</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EquipmentCategory;