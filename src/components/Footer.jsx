import React from 'react';
import '/public/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_box">
        <ul className="footer_info">
          <li>ZeroBase</li>
          <span className="divider">ㅣ</span>
          <li>HTML</li>
          <span className="divider">ㅣ</span>
          <li>CSS</li>
          <span className="divider">ㅣ</span>
          <li >Javscript</li>
          <span className="divider">ㅣ</span>
          <li className="stronger">React</li>
          
        </ul>

        <div className="information">
          <div className="logo">
            <span>Luison</span>
            <span className="sub_logo">Shop</span>
          </div>
          <div className="info1">
            <p>상호명 및 호스팅 서비스 제공 : 루이슨샵(주)</p>
            <p>과제 작성자 : 박민서</p>
            <p>냥냥시 냥냥구 냥냥대로</p>
            <p>과제 제출일 : 2023-12-21</p>
            <p>통신판매업신고:2023-인천서구-1221</p>
          </div>
          <div className="info2">
            <span className="stronger">루이슨센터</span>
            <span className="divider2">|</span>
            <span>과제제출신속처리담당</span>
            <a href="tel:전화번호" className="phnumber">1234-5678</a>
            <p>냥냥시 냥냥구 냥냥대로 827</p>
            <a href="mailto:help@coupang.com?subject=문의사항">melody9908@naver.com</a>
          </div>
          <div className="info3">
            <p className="stronger">우리은행 채무지급보증 안내</p>
            <p className="info3_text">당사는 고객님이 현금 결제한 금액에 대해<br />
              우리은행과 채무지급보증 계약을 체결하여<br />
              안전거래를 보장하고 있습니다.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;