import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
  background-color: #f0f0f0;
  align-items: center;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #8b0000;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  gap: 12px;
  z-index: 1000;
  max-width: 100vw;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LogoIcon = styled.img`
  width: 56px;
  height: 48px;
  margin-right: 10px;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 16px;
    display: flex;
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #db0007;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
  }

  &:hover::after {
    visibility: visible;
    transform: scaleX(1);
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 400px;
  overflow: hidden;
`;

const Slide = styled.div<{ active: boolean; backgroundImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

const TextAndArrowsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  width: 80%;
  max-width: 1200px;
`;

const SlideTextContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  flex-grow: 1;
  margin: 0 12px;
`;

const SlideText = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SliderArrow = styled.button`
  background: RGBA(255, 255, 255, 0.1);
  border: none;
  color: Pink;
  font-size: 2rem;
  cursor: pointer;
  padding: 3px;
  border-radius: 5%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 8px;
  }
`;

const LeftArrow = styled(SliderArrow)`
  margin-right: 12px;
`;

const RightArrow = styled(SliderArrow)`
  margin-left: 12px;
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SliderDot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#db0007" : "#ccc")};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
`;

const AboutUsContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 40px auto;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AboutUsTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const AboutUsText = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding-left: 180px;
  padding-right: 140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100vw;
`;

const FooterSection = styled.div`
  margin-bottom: 0rem;
  margin-right: 3rem;
  text-align: center;
  width: 100vw;
`;

const FooterLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Copyright = styled.p`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
`;

const sliderData = [
  {
    image: "https://picsum.photos/1600/900?random=1",
    caption: "Discover the story behind AfyaRecipes",
  },
  {
    image: "https://picsum.photos/1600/900?random=2",
    caption: "Our mission to bring healthy and delicious food to your table",
  },
  {
    image: "https://picsum.photos/1600/900?random=3",
    caption: "Join us in our journey to revolutionize food delivery",
  },
];

const AboutUs: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <Navbar>
        <Logo to="/">
          <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
          Hotelimaps
        </Logo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
        </NavMenu>
      </Navbar>

      <MainContent>
        <SliderContainer>
          {sliderData.map((slide, index) => (
            <Slide
              key={index}
              active={index === activeSlide}
              backgroundImage={slide.image}
            />
          ))}
          <TextAndArrowsContainer>
            <LeftArrow
              onClick={() =>
                setActiveSlide(
                  (prev) => (prev - 1 + sliderData.length) % sliderData.length
                )
              }
            >
              <ChevronLeft />
            </LeftArrow>
            <SlideTextContainer>
              <SlideText>{sliderData[activeSlide].caption}</SlideText>
            </SlideTextContainer>
            <RightArrow
              onClick={() =>
                setActiveSlide((prev) => (prev + 1) % sliderData.length)
              }
            >
              <ChevronRight />
            </RightArrow>
          </TextAndArrowsContainer>
          <SliderNav>
            {sliderData.map((_, index) => (
              <SliderDot
                key={index}
                active={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </SliderNav>
        </SliderContainer>

        <AboutUsContainer>
          <AboutUsTitle>About Us</AboutUsTitle>
          <AboutUsText>
            AfyaRecipes is a revolutionary food delivery platform that connects
            food lovers with local restaurants, focusing on healthy and
            delicious meal options. Our mission is to make nutritious eating
            accessible, convenient, and enjoyable for everyone.
          </AboutUsText>
          <AboutUsText>
            Founded in 2023, AfyaRecipes was born out of a passion for good food
            and a desire to promote healthier eating habits. We work closely
            with local restaurants and chefs to curate a diverse menu of
            nutritious meals that cater to various dietary preferences and
            restrictions.
          </AboutUsText>
          <AboutUsText>
            At AfyaRecipes, we believe that eating well shouldn't be a chore.
            That's why we've created a user-friendly platform that makes it easy
            to discover, order, and enjoy healthy meals from the comfort of your
            home or office. Our innovative features like nutritional information
            for each dish, personalized meal recommendations, and seamless
            ordering process set us apart in the food delivery industry.
          </AboutUsText>
          <AboutUsText>
            Join us in our mission to transform the way people think about and
            enjoy food. With AfyaRecipes, every meal is an opportunity to
            nourish your body and delight your taste buds.
          </AboutUsText>
        </AboutUsContainer>
      </MainContent>

      <Footer>
        <FooterSection>
          <FooterLogo to="/">
            <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
            Hotelimaps
          </FooterLogo>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/terms">Terms and Conditions</FooterLink>
        </FooterSection>
        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <Phone size={16} style={{ marginRight: "0.5rem" }} />
            +(254)705477395
          </ContactInfo>
          <ContactInfo>
            <Mail size={16} style={{ marginRight: "0.5rem" }} />
            support@afyarecipes.com
          </ContactInfo>
        </FooterSection>
        <Copyright>
          © {new Date().getFullYear()} AfyaRecipes. All rights reserved.
        </Copyright>
      </Footer>
    </Container>
  );
};

export default AboutUs;
