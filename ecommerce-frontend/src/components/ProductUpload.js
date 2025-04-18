import React, { useState } from 'react';
import axios from 'axios';

const ProductUpload = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setProductData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('image', productData.image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Product Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Upload Product</button>
    </form>
  );
};

export default ProductUpload;
