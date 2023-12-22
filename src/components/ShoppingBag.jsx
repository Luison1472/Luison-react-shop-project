import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import products from './productsData';
import { FaShoppingBag, FaTrash } from 'react-icons/fa';
import Layout from './Layout';
import '/public/ShoppingBag.css';

function addComma(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
}

function ShoppingBag() {
  
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  

  const [totalPrice, setTotalPrice] = useState(0);

  const purchaseConfirmation = () => {
    const confirmed = window.confirm('초기화 하시겠습니까?');
    if (confirmed) {
      clearCart();
    }
  };

  useEffect(() => {
    // 장바구니에 있는 모든 상품의 총 가격 계산
    const totalPriceValue = cartItems.reduce((accumulator, item) => {
      return accumulator + item.amount
    }, 0);
     setTotalPrice(totalPriceValue); // 총 가격 상태 업데이트
  }, [cartItems]);
  
   const clearCart = () => {
     localStorage.removeItem('cartItems'); // 로컬 스토리지에서 장바구니 정보 삭제
     setCartItems([]); // 장바구니 비우기
  };
  


  const removeCartItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // 로컬 스토리지 업데이트
  };


 useEffect(() => {
  const storedCartItems = localStorage.getItem('cartItems');
  console.log('Stored Cart Items:', storedCartItems);
  const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

  if (parsedCartItems && parsedCartItems.length > 0 && cartItems.length === 0) {
    setCartItems(parsedCartItems); // cartItems가 비어있을 때만 상태를 업데이트합니다.
   }
   

  const productId = searchParams.get('productId');
  const option = searchParams.get('option');
  const quantity = searchParams.get('quantity');
  const amount = searchParams.get('amount');
  const color = searchParams.get('color');

  const product = products.find((product) => product.id === parseInt(productId));

  if (product) {
    const newItem = {
      productId: parseInt(productId),
      color: color,
      option: option,
      quantity: parseInt(quantity),
      amount: parseInt(amount),
    };

    const isItemInCart = parsedCartItems.some(
      (item) =>
        item.productId === newItem.productId &&
        item.color === newItem.color &&
        item.option === newItem.option
    );

    if (!isItemInCart) {
      const updatedCart = [...parsedCartItems, newItem];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  } else {
    console.error(`ID가 ${productId}인 상품을 찾을 수 없습니다.`);
  }
}, []);



  return (
    
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
          <Link to="/ShoppingBag"><FaShoppingBag className="itemPage_cart_logo" /></Link>
        </div>
      </header>
        

      <div className="shoppingBag_title">
        <p>장바구니</p>
        
      {cartItems.length > 0 && (
              <button className="all_clear_btn" onClick={clearCart}>장바구니 전체 비우기</button>
            )}
      </div>

      <div className="shoppingBag_productList">
        {cartItems.length === 0 ? ( // 장바구니가 비어 있을 때
          <p className="no_shoppingBag">장바구니에 상품이 없습니다.<br/>상품을 담아보세요 ㅇㅂㅇ </p>
        ) : (
          cartItems.map((item, index) => {
            const selectedProduct = products.find((product) => product.id === item.productId);
            
            return (
              <div className="shopping_box" key={index}>
                {selectedProduct && (
                  <div className="grid_box">
                    <p>상품명<br/><br/>{selectedProduct.description}</p>
                    <img src={selectedProduct.imageUrl} alt={selectedProduct.description} />
                    <p>색상: {item.color}</p>
                    <p>사이즈: {item.option}</p>
                    <p>수량: {item.quantity}</p>
                    <p>가격: {addComma(item.amount)}</p>
                    {cartItems.length > 1 && ( // 장바구니에 상품이 두 개 이상인 경우에만 삭제 버튼 표시
                     <p><FaTrash className="trash_btn" onClick={() => removeCartItem(index)}/></p>
                     )}
                  </div>
                )}
              </div>
            );
          })
          
          )}
      </div>

      <div className="purchase">
        <p onClick={purchaseConfirmation}>구매하기</p>
        <Link to ="/">
        <p>계속 쇼핑하기</p>
        </Link>
        <p>총 가격: {addComma(totalPrice)}원</p>
      </div>
          
        </Layout>
  );
}
export default ShoppingBag;