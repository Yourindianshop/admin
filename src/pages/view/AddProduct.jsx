import React, { useState } from 'react';
import { fetchreq, uploadImageAws } from '../../Helper/fetch';
import {useNavigate} from 'react-router-dom'
import AvailableProduct from '../../components/AvailableProduct';
function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav =useNavigate();
  const [showProduct,setShowProduct]=useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(file?.size /1024 > 1000){
      alert("Image Size Must Be Less than 1 MB")
      return;
    }else{
      setIsSubmitting(true);
      try {
          const url = await uploadImageAws(file.name,file);
          const imgs = [url];
          const dt = await fetchreq("POST","addproduct",{
              Name: productName,
              Details: description,
              Price:price,
              Images: (imgs),
              Available: stock,
              Oid:null,
          })
          if(dt){
              alert("Add product Succesfully");
              setProductName('');
              setPrice('');
              setStock('');
              setDescription('');
              setFile(null);
              setIsSubmitting(false);
              setShowProduct(true);
              nav("")
          }else{
              alert("something Went Wrong...");
          }
      } catch (error) {
        console.error('Error submitting data:', error);
        setIsSubmitting(false); // Re-enable the submit button in case of an error
      }
    }
  };

  return (
    <div>
      <div id="dash-pa" className="product-acceptance-form">
        <div style={{display:'flex'}}>
          <button className={`btn ${showProduct && "btn-b"}`} onClick={()=>setShowProduct(true)}>Show Product</button>
          <button className={`btn ${!showProduct && "btn-b"}`} onClick={()=>setShowProduct(false)}>Add Product</button>
        </div>
        {!showProduct && <>
          <div id="l-title" className="no-mar">
            <div className="plan-page-title">
              <span id="org">Add </span>
              <span id="wt">Product </span>
            </div>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                required
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="number"
                step={1}
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="number"
                step={1}
                placeholder="Available Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                required
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group bw">
              <label htmlFor="photo">Product Image</label>
              <input
                required
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-b" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </>}
        {showProduct &&  <AvailableProduct/>}
      </div>
    </div>
  );
}

export default AddProduct;
