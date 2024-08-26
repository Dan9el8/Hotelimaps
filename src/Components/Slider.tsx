import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface SlideProps {
  image: string;
  title: string;
  description: string;
  price?: string;
}

interface SlideImageProps {
  image: string;
}

interface DotProps {
  active: boolean;
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // This creates a 16:9 aspect ratio
  overflow: hidden;
`;

const SlideImage = styled.div<SlideImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.image})`};
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 1s ease-in-out;
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
  z-index: 2;

  /* Center the content */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* Reduce spacing between text lines */
  > * {
    margin: 0;
    line-height: 1.2;
  }

  > * + * {
    margin-top: 5px;
  }
`;

const SlideTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 3px;
  margin-top: 32px;
`;

const SlideDescription = styled.p`
  font-size: 18px;
  margin-bottom: 3px;
`;

const SlidePrice = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const PaginationDots = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Dot = styled.div<DotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "white" : "rgba(255,255,255,0.5)"};
  cursor: pointer;
`;

const NavArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(255, 105, 180, 0.69);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: rgba(255, 105, 180, 0.9);
  }

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
  }
`;

const LeftArrow = styled(NavArrow)`
  left: 20px;

  &::before {
    border-width: 8px 12px 8px 0;
    border-color: transparent white transparent transparent;
    margin-left: -4px;
  }
`;

const RightArrow = styled(NavArrow)`
  right: 20px;

  &::before {
    border-width: 8px 0 8px 12px;
    border-color: transparent transparent transparent white;
    margin-left: 4px;
  }
`;

const slides: SlideProps[] = [
  {
    title: "SignUp as a Juice Vendor",
    description: "Create a Vendor account for Free!",
    price: "9.99",
    image: "/images/JuiceBurger.png",
  },
  {
    image: "/images/Onboarding1.gif",
    title: "List your Signature Food Menu",
    description: "Create account, Get verified, Begin selling!",
    price: "12.99",
  },
  {
    image: "/images/Onboarding2.gif",
    title: "Get Verified to Sell on Our Platform",
    description: "Take advantage of our marketing and order Management System",
    price: "7.99",
  },
  {
    image: "/images/Afyafood.png",
    title: "Nutritious African Cuisine!",
    description: "Advertise your Traditional Cuisine here!",
    price: "11.99",
  },
  {
    image: "/images/Afyafood.png",
    title: "Do you Offer Catering Services?",
    description:
      "Set up a Catering Service Portofolio to sell directly to a wider Customer Base",
    price: "6.99",
  },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVisibleSlides((prevSlides) => {
      const newSlides = [...prevSlides, currentSlide];
      if (newSlides.length > 2) {
        newSlides.shift();
      }
      return newSlides;
    });
  }, [currentSlide]);

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <SliderContainer>
      {slides.map((slide, index) => (
        <SlideImage
          key={index}
          image={slide.image}
          style={{
            opacity: visibleSlides.includes(index) ? 1 : 0,
            zIndex: 1,
          }}
        />
      ))}
      <SlideContent>
        <SlideTitle>{slides[currentSlide].title}</SlideTitle>
        <SlideDescription>{slides[currentSlide].description}</SlideDescription>
        {slides[currentSlide].price && (
          <SlidePrice>Ksh. {slides[currentSlide].price}</SlidePrice>
        )}
      </SlideContent>
      <PaginationDots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </PaginationDots>
      <LeftArrow onClick={goToPrevSlide} />
      <RightArrow onClick={goToNextSlide} />
    </SliderContainer>
  );
};

export default Slider;
