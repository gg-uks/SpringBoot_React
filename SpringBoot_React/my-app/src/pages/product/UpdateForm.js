import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; //파라미터 값을 받아서 활용할수 있음
import { useNavigate } from 'react-router-dom';

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //URL이 /product/3 이런 식일 경우, id는 "3"으로 들어옵니다. 이 값은 react-router-dom의 useParams() 훅으로 가져온 것
  const [product, setProduct] = useState({
    productName: '',
    productCompany: '',
  });

  const changeValue = (e) => {
    setProduct({
      ...product, // 기존 값 유지
      [e.target.name]: e.target.value,
    }); // 바뀐 항목만 덮어쓰기
  };

  //요청을 해서 상태초기값을 바꿔서 저장 -> 값을 가져와야함
  useEffect(() => {
    fetch('http://localhost:8081/api/product/' + id)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, [id]);

  //서버통신 submitProduct
  const submitProduct = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/api/product/'+id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(product),
    }).then((res) => {
      if (res.status == 200) {
        navigate('/'); //url경로 변경하는 함수
      } else {
        return alert('상품 수정에 실패 하였습니다.');
      }
    });
  };

  return (
    <Form onSubmit={submitProduct}>
      <Form.Group className="mb-3">
        <Form.Label>productName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter productName"
          name="productName"
          value={product.productName}
          onChange={changeValue}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>productCompany</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter productCompany"
          name="productCompany"
          value={product.productCompany}
          onChange={changeValue}
        />
      </Form.Group>
      <Button type="submit" className="btn btn-primary">
        수정
      </Button>
    </Form>
  );
};

export default UpdateForm;
