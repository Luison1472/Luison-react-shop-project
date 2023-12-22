import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import products from './productsData';
import '/public/ItemPage.css';
import Layout from './Layout';
import { useCart } from './CartContext.jsx';



function addComma(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
}

function ItemPage() {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const product = products.find(product => product.id === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  }, [productId]);

   

  


  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleColorChange = event => {
    setSelectedColor(event.target.value);
  };

  const handleQuantityChange = event => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const addToCartCallback = useCallback(() => {
    if (selectedOption !== '' && selectedColor !== '' && selectedQuantity > 0) {
      const totalAmount = selectedQuantity * selectedProduct.price;
      const item = {
        productId: selectedProduct.id,
        color: selectedColor,
        option: selectedOption,
        quantity: selectedQuantity,
        amount: totalAmount,
      };
      alert('장바구니에 담겼습니다.');

      addToCart(item);
      navigate('/ShoppingBag');
    } else {
      alert('사이즈와 색상을 선택해주세요.');
    }
  }, [addToCart, navigate, selectedOption, selectedColor, selectedQuantity, selectedProduct]);

  const totalAmount = selectedProduct ? selectedQuantity * selectedProduct.price : 0;

  return (
    <>
      <Layout>
        <header className="itemPage_header">
          <Link to="/" className="link-wrapper">
            <div className="itemPage_brand_name">
              <span className="itemPage-brand-part1">Luison</span>
              <span>Shop</span>
            </div>
          </Link>
          <ul className="itemPage_navigation">
            <li><Link to="/Outer" className="itemPage_outerwear">Outer</Link></li>
            <li><Link to="/Top" className="itemPage_top">Top</Link></li>
            <li><Link to="/Shoes" className="itemPage_shoes">Shoes</Link></li>
          </ul>
          <div className="itemPage_search_area">
            <input type="text" placeholder="검색" className="itemPage_search" />
            <Link to="/ShopingBag"><FaShoppingBag className="itemPage_cart_logo" /></Link>
          </div>
        </header>

        <div className="itemPage_nav2">
          <ul className="itemPage_position">
            <Link to="/">
              <li>main</li>
            </Link>
            <li>/</li>
            <li>detail</li>
          </ul>
        </div>

        <div className="itemPage_detail">
          {selectedProduct && (
            <div className="itemPage_product_details">
              <div className="itemPage_product_image">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
              </div>

              <div className="itemPage_product_info">
                <h2>{selectedProduct.description}</h2>
                <p>가격: {selectedProduct.price}원</p>
                {selectedProduct.type === 'clothing' && (
                  <div>
                    <div className="itemPage_option">
                      <label htmlFor="options">사이즈</label>
                      <select id="options" value={selectedOption} onChange={handleOptionChange}>
                        {selectedProduct.options.sizes.map(size => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="itemPage_option">
                      <label htmlFor="colors">색상</label>
                      <select id="colors" value={selectedColor} onChange={handleColorChange}>
                        {selectedProduct.options.colors.map(color => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {selectedProduct.type === 'shoesType' && (
                  <div>
                    <div className="itemPage_option">
                      <label htmlFor="options">사이즈</label>
                      <select id="options" value={selectedOption} onChange={handleOptionChange}>
                        {selectedProduct.options.sizes.map(size => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="itemPage_option">
                      <label htmlFor="options">색상</label>
                      <select id="options" value={selectedColor} onChange={handleColorChange}>
                        {selectedProduct.options.colors.map(color => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="selected_box">
                  {selectedProduct && selectedOption !== '' && selectedColor !== '' && (
                    <div className="selected">
                      <div className="description">
                        <p>{selectedProduct.description}</p>
                        <p>-{selectedOption}/{selectedColor}</p>
                      </div>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={selectedQuantity}
                        onChange={handleQuantityChange}
                      />
                      {selectedProduct.price && (
                        <p className="total_price">총 가격: {addComma(selectedQuantity * selectedProduct.price)}원</p>
                      )}
                    </div>
                  )}
                </div>

                {selectedOption !== '' && selectedColor !== '' && selectedQuantity > 0 && (
                  <Link to={`/ShoppingBag?productId=${selectedProduct?.id}&color=${selectedColor}&option=${selectedOption}&quantity=${selectedQuantity}&amount=${totalAmount}`}>
                    <button className="shoppingBag">ADD TO CART</button>
                  </Link>
                )}
                {!(selectedOption !== '' && selectedColor !== '' && selectedQuantity > 0) && (
                  <button className="shoppingBag" onClick={addToCartCallback}>
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default ItemPage;