import React from 'react';
import { FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '/public/Top.css';
import Layout from './Layout';


function Top() {



  return (
    <>
      <Layout>
      <div className="top_header">
          <div className="search-area">
            <input type="text" placeholder="검색" className="search" />
          <Link to="/ShoppingBag"><FaShoppingBag className="cart-logo" /></Link>
        </div>
        
        <Link to="/" className="link-wrapper">
          <div className="brand-name">
          <span className="brand-name-part1">Luison</span>
          <span className="brand-name-part2">Shop</span>
          </div>
        </Link>
        
        <ul className="navigation">
          <Link to="/Outer"><li className="outerwear">Outer</li></Link>
          <Link to="/Top"><li className="top">Top</li></Link>
          <Link to="/Shoes"><li className="shoes">Shoes</li></Link>
        </ul>
      </div>
      </Layout>
     

    </>
    

    


  );
}

export default Top;