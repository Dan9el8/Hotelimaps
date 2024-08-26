import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  text-align: center;
  border: 2px solid rgba(128, 128, 128, 0.69); // Gray border with 69% opacity
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: #666;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #ff0000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    console.log("Navigating to home page");
    navigate('/');
  };

  console.log("Rendering ThankYou component");

  return (
    <Container>
      <Title>Thank You!</Title>
      <Message>Your booking request has been successfully submitted.</Message>
      <Message>We will get back to you as soon as possible.</Message>
      <Button onClick={handleOkClick}>OK</Button>
    </Container>
  );
};

export default ThankYou;