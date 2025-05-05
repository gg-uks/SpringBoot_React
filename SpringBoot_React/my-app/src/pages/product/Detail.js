import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; //파라미터 값을 받아서 활용할수 있음
import { useNavigate } from 'react-router-dom';
const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //URL이 /product/3 이런 식일 경우, id는 "3"으로 들어옵니다. 이 값은 react-router-dom의 useParams() 훅으로 가져온 것
  const [product, setProduct] = useState({
    id: '',
    productName: '',
    productCompany: '',
  });

  //데이터가 바뀌는 건 상태값이 바뀌어서 리렌더링되는 거고,
  // id는 서버에서 새로 데이터를 가져오기 위해 useEffect에서 사용하는 것이다
  useEffect(() => {
    fetch('http://localhost:8081/api/product/' + id)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, [id]); //이 부분은 "id가 변할 때마다 이 함수 안에 있는 코드를 실행하라"는 뜻

  //삭제함수 추가
  const deleteProduct = () => {
    fetch('http://localhost:8081/api/product/' + id, { method: 'DELETE' })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          navigate('/');
        } else {
          alert('삭제 실패');
        }
      });
  };

  //수정함수추가
  const updateProduct = () => {
    navigate('/updateForm/'+id);
  };

  return (
    <div>
      <h1>상품상세보기</h1>
      <Button variant="warning" onClick={updateProduct}>
        수정
      </Button>
      &nbsp;
      <Button variant="danger" onClick={deleteProduct}>
        삭제
      </Button>
      <hr />
      <h3>{product.productName}</h3>
      <h3>{product.productCompany}</h3>
    </div>
  );
};

export default Detail;
