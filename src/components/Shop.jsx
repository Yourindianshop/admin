import React from "react";
import Product from "./Product";
import "../stylesheet/Shop.css";
const Shop = () => {
  const ar = [1, 2, 3, 4];
  const pr = [1, 2, 3, 4, 4, 5, 6, 7, 8];
  return (
    <div>
      <h2>
        <span id="blue">Edit </span>
        <span id="org">Or</span>
        <span id="blue">Remove </span>
        <span id="org">Product</span>
      </h2>

      <div id="displayProducts">
        {pr.map((e) => {
          return (
            <Product
              // proImg={`./imgs/btt${e}.webp`}
              proImg={`https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/Curior-service/shipping-site-imgs/product/sp${e}.webp`}
              proName={`Sport Bottle ${e}`}
              proPrice=" $12.00"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
