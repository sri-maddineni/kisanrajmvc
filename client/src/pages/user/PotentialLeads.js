import React, { useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';

const PotentialLeads = () => {
  const [potentials, setPotentials] = useState([]);

  const potentialLeads = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/requirements/get-all-potentials`);
      if (res.data.success) {
        setPotentials(res.data.potentials);
        toast.success('Potentials fetched!');
      } else {
        console.log('Something went wrong');
        toast.error('Failed to fetch potentials');
      }
    } catch (error) {
      console.error('Error fetching potentials:', error);
      toast.error('Failed to fetch potentials');
    }
  };

  useEffect(() => {
    potentialLeads();
  }, []);

  return (
    <>
      <Nav />
      <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {potentials.map((potential) => (
          <div key={potential._id} className="card m-2" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">{potential.productName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">ID: {potential._id}</h6>
              <p className="card-text text-muted">Quantity Required: {potential.quantity} {potential.quantityUnit}s</p>
              <p className="card-text">Price offered: Rs.{potential.price}/- per {potential.quantityUnit}</p>
              <p className="card-text">Buyer: {potential?.buyerId?.name}</p>
              {/* Add more fields as needed */}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default PotentialLeads;
