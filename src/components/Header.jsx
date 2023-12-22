import React, { useEffect, useState } from 'react';
import '/public/Header.css';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import productsData from './productsData';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   const handleSearch = (event) => {
    const input = event.target.value;
     setSearchTerm(input);
     
      const results = productsData.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
     <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="search-area">
        <div className="position-relative">
          <input
            type="text"
            placeholder="검색"
            className="search"
            value={searchTerm}
            onChange={handleSearch}
          />
          
          {searchResults.length > 0 && (
            <div className="dropdown">
              <ul>
                {searchResults.map((product, index) => (
                  <li key={index}>
                    <Link to={`/products/${product.id}`}>{product.description}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
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
    </header>
  );
}

export default Header;