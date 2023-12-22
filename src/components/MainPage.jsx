import React from 'react';
import Header from './Header';
import Carousel from './Carousel';
import ProductList from './ProductList';
import Footer from './Footer';
import '/public/MainPage.css';

function MainPage() {


  return (
    <>
        <Header />
        <Carousel />
        <ProductList />
        <Footer />
    </>
  );
}

export default MainPage;