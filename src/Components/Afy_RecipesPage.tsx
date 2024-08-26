import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Slider from "./Slider";
import AuthForm from "./AuthForm";

const PageLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SliderWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;

const SignInFormWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  z-index: 2;
  width: 300px;

  @media (max-width: 768px) {
    right: 50%;
    transform: translate(50%, -50%);
  }
`;

interface SlideProps {
  image: string;
  title: string;
  description: string;
  price?: string;
}

const Afy_RecipesPage: React.FC = () => {
  const slides: SlideProps[] = [
    {
      image: "lohei-bundle.jpg",
      title: "Perfect for Sharing",
      description: "NEW Lohei Bundle",
      price: "25.00",
    },
    {
      image: "big-mac.jpg",
      title: "Classic Favorite",
      description: "Big Mac Meal",
      price: "8.99",
    },
    {
      image: "mcnuggets.jpg",
      title: "Snack Time",
      description: "McNuggets Box",
      price: "5.99",
    },
    {
      image: "mcflurry.jpg",
      title: "Sweet Treat",
      description: "McFlurry Delight",
      price: "3.49",
    },
    {
      image: "breakfast-platter.jpg",
      title: "Rise and Shine",
      description: "Breakfast Platter",
      price: "6.99",
    },
  ];

  return (
    <PageLayout>
      <Header />
      <ContentWrapper>
        <SliderWrapper>
          <Slider slides={slides} />
          <AuthForm />
        </SliderWrapper>
      </ContentWrapper>
    </PageLayout>
  );
};
export default Afy_RecipesPage;
