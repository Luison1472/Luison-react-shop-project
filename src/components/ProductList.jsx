import React from 'react';
import '/public/ProductList.css';
import { Link } from 'react-router-dom';
import products from './productsData';


function addComma(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
}

function ProductList() {

    const outerProducts = products.filter(product => product.category === 'Outer');
    const topProducts = products.filter(product => product.category === 'Top');
    const shoesProducts = products.filter(product => product.category === 'Shoes');
    
    const renderProductList = (productList) => {
      return (
        <ul className="products">
          {productList.map((product) => (
            <li className="product_list" key={product.id}>
              <Link to={`/products/${product.id}`} className="product-link">
                <div className="productItem">
                  <div className="productItem_img">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="info">
                    <p className="description">{product.description}</p>
                    <p className="price">{addComma(product.price)}원</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      );
    };

  
  return (
    <>
      {/* Outer 카테고리 */}
      <div className="big_product_title">
        <p>Outer</p>
      </div>
      <div className="product_box">
        {renderProductList(outerProducts)}
      </div>

      {/* Top 카테고리 */}
      <div className="big_product_title">
        <p>Top</p>
      </div>
      <div className="product_box">
        {renderProductList(topProducts)}
      </div>

      {/* Shoes 카테고리 */}
      <div className="big_product_title">
        <p>Shoes</p>
      </div>
      <div className="product_box">
        {renderProductList(shoesProducts)}
      </div>
    </>
  );
}

export default ProductList;