import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            홈
          </Link>
          <Nav className="me-auto">
            <Link to="/joinForm" className="nav-link">
              회원가입
            </Link>
            <Link to="/loginForm" className="nav-link">
              로그인
            </Link>
            <Link to="/saveForm" className="nav-link">
              상품등록
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Header;

// // ✅ 정답 포맷 예시:
// jsx
// 코드 복사
// // Header.jsx
// <Link to="/login">로그인</Link>

// // App.jsx
// <Route path="/login" element={<LoginForm />} />
// 👉 이런 식으로 to="..." 와 path="..."를 똑같이 맞춰주는 게 중요해.
