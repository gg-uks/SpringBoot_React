import React, { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem';

const Home = () => {
  const [products, setproducts] = useState([]);// 1️⃣ 처음엔 빈 배열

  // fetch().then().then().catch();
  useEffect(() => {
    fetch('http://localhost:8081/api/product')// 2️⃣ 컴포넌트가 처음 렌더링될 때 자동 실행
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setproducts(res);// 3️⃣ 데이터를 받아오면 상태를 변경 → 화면 자동 업데이트됨
      }); //비동기 함수
  }, []);//useEffect 함수 한번 실행

  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} /> //앞의 product는 props로 전달할 "속성 이름" 뒤의 product는 현재 반복문에서 꺼낸 각 상품 객체
      ))}
    </div>
  );
};

export default Home;
