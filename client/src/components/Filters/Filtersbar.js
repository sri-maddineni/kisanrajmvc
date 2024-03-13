import React, { useState } from 'react';
import { Radio } from 'antd';

const Filtersbar = ({ onProductSelect }) => {
  const [product, setProduct] = useState('');

  const handleProductSelect = (value) => {
    setProduct(value);
    onProductSelect(value);
  };

  return (
    <>
      <div className="filterbar m-2" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "solid 2px cyan" }}>
        <Radio.Group onChange={(e) => handleProductSelect(e.target.value)} value={product} className="d-flex align-items-center p-2">
          <Radio value={""} className="me-3">All</Radio>
          <Radio value={"FOOD GRAINS/ CEREALS"} className="me-3">FOOD GRAINS/ CEREALS</Radio>
          <Radio value={"OILSEEDS"} className="me-3">OILSEEDS</Radio>
          <Radio value={"FRUITS"} className="me-3">FRUITS</Radio>
          <Radio value={"VEGETABLES"} className="me-3">VEGETABLES</Radio>
          <Radio value={"SPICES"} className="me-3">SPICES</Radio>
          <Radio value={"MISC"} className="me-3">MISC</Radio>

        </Radio.Group>
      </div>
    </>
  );
};

export default Filtersbar;
