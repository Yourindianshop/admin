import React, { useState } from "react";
import "../../stylesheet/AddToShop.css"; // Import your CSS file for styling
import Shop from "../../components/Shop";

function AddToShop() {
  // State variables to store product data
  const [productInfo, setProductInfo] = useState({
    productName: "",
    price: "",
    description: "",
    quantity: "",
    images: [null, null, null], // Three image files
  });

  // Handle form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process and send product data to the server or admin
    // ...
  };

  // Handle updating an image file
  const handleUpdateImage = (index, file) => {
    const updatedImages = [...productInfo.images];
    updatedImages[index] = file;
    setProductInfo({ ...productInfo, images: updatedImages });
  };

  return (
    <div id="dash-pa" className="add-to-shop-form">
      <Shop />

      <h2>
        <span id="blue">Add to </span>
        <span id="org">Shop</span>
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Information */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Name"
            value={productInfo.productName}
            onChange={(e) =>
              setProductInfo({ ...productInfo, productName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Price"
            value={productInfo.price}
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={productInfo.description}
            onChange={(e) =>
              setProductInfo({ ...productInfo, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Quantity"
            value={productInfo.quantity}
            onChange={(e) =>
              setProductInfo({ ...productInfo, quantity: e.target.value })
            }
          />
        </div>

        {/* Product Images */}
        <div className="points">
          <label>Product Images:</label>
          {productInfo.images.map((image, index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              onChange={(e) => handleUpdateImage(index, e.target.files[0])}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button className="btn btn-b" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddToShop;
