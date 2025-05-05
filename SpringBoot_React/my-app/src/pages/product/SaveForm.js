import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SaveForm = () => {
  const navigate = useNavigate();

  const [product, setProducts] = useState({
    productName: '',
    productCompany: '',
  });

  const changeValue = (e) => {
    setProducts({ ...product,  // 기존 값 유지
        [e.target.name]: e.target.value }); // 바뀐 항목만 덮어쓰기
  };

  //서버통신 submitProduct
  const submitProduct = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/api/product', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(product),
    }).then((res) => {
      if (res.status == 201) {
        navigate('/'); //url경로 변경하는 함수
      } else {
        return alert('상품 등록에 실패 하였습니다.');
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
          onChange={changeValue}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>productCompany</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter productCompany"
          name="productCompany"
          onChange={changeValue}
        />
      </Form.Group>
      <Button type="submit" className="btn btn-primary">
        등록
      </Button>
    </Form>
  );
};

export default SaveForm;
