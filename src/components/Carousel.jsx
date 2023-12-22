import React, { useState, useEffect, useRef } from 'react';
import '/public/Carousel.css';
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null); // Interval을 위한 ref 생성

  
  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    setCurrentSlide(prevSlide);
  };

  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % carouselItems.length;
    setCurrentSlide(nextSlide);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goToNextSlide, 2000); // 2초마다 다음 슬라이드로 이동
    return () => clearInterval(intervalRef.current); // 컴포넌트가 언마운트될 때 interval 제거
  }, [currentSlide]);

  const handlePrevClick = () => {
    clearInterval(intervalRef.current); // Interval을 클리어하고 이전 슬라이드로 이동
    goToPrevSlide();
    intervalRef.current = setInterval(goToNextSlide, 2000); // 2초마다 다시 Interval 시작
  };
  
  const handleNextClick = () => {
    clearInterval(intervalRef.current); // Interval을 클리어하고 다음 슬라이드로 이동
    goToNextSlide();
    intervalRef.current = setInterval(goToNextSlide, 2000); // 2초마다 다시 Interval 시작
  };


  const carouselItems = [
  {
    id: 1,
    content: (
      <>
        <div className="carousel">
          <div className="carousel-item">
            <Link to="/Outer">
            <img src="/style/img/outerwear.jpg" alt="Slide 1" />
            </Link>
            <GrFormPrevious onClick={handlePrevClick} className="carousel-controls1" />
            <div className="product-introduce">
              <p className="best">Best</p>
              <p className="slide-comment">남친룩의 정석</p>
              <p className="slide-comment">어디에든 어울릴수 있는</p>
              <p className="slide-comment">도톰하고 따뜻한 아우터</p>
              <p className="zerobase">Zerobase | Mission | Javascript</p>
              <MdNavigateNext onClick={handleNextClick} className="carousel-controls2" />
            </div>
          </div>
        </div>
      </>
    )
  },
   {
    id: 2,
    content: (
      <>
        <div className="carousel">
          <div className="carousel-item">
            <Link to="/Top">
            <img src="/style/img/tops.jpg" alt="Slide 1" />
            </Link>
            <GrFormPrevious onClick={handlePrevClick} className="carousel-controls1" />
            <div className="product-introduce">
              <p className="best">Best</p>
              <p className="slide-comment">우수한 착용감과</p>
              <p className="slide-comment">높은 품질을 갖춘 탑</p>
              <p className="slide-comment">굿퀄리티 드랍 포인터</p>
              <p className="zerobase">Zerobase | Mission | Javascript</p>
              <MdNavigateNext onClick={handleNextClick} className="carousel-controls2" />
            </div>
          </div>
        </div>
      </>
    )
  },
    {
    id: 3,
    content: (
      <>
        <div className="carousel">
          <div className="carousel-item">
            <Link to="/Shoes">
            <img src="/style/img/shoes.jpg" alt="Slide 1" />
            </Link>
            <GrFormPrevious onClick={handlePrevClick} className="carousel-controls1" />
            <div className="product-introduce">
              <p className="best">Best</p>
              <p className="slide-comment">편안&따뜻한</p>
              <p className="slide-comment">겨울을 책임질 슈즈</p>
              <p className="slide-comment">따뜻한 기모 라우터</p>
              <p className="zerobase">Zerobase | Mission | Javascript</p>
              <MdNavigateNext onClick={handleNextClick} className="carousel-controls2" />
            </div>
          </div>
        </div>
      </>
    )
  },
  ];

  return (
    <div>
      {carouselItems[currentSlide].content}     
    </div>
  );
}

export default Carousel;