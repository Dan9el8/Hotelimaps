import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import {
  Eye,
  EyeOff,
  Menu as MenuIcon,
  X as CloseIcon,
  Phone,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
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
  align-items: center;
  padding: 0 24px;
  gap: 40px;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  gap: 12px;
`;

const LogoIcon = styled.img`
  width: 56px;
  height: 48px;
  margin-right: 10px;
`;

const LogoIcon2 = styled.img`
  width: 120px;
  height: 69px;
  margin-right: 10px;
`;

const MenuToggle = styled.div`
  cursor: pointer;
  z-index: 1001;
  color: white;
`;

const MainContent = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 72px;
  padding-bottom: 12px;
  min-height: calc(100vh - 72px);
`;

const SliderContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
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
  background-repeat: no-repeat;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  border: 0.69px solid #ccc;
  z-index: 30;
  overflow-y: auto;
  max-height: fit-content;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 0 15px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: #666;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ForgotPassword = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-size: 14px;
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #db0007;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  font-size: 16px;
  &:hover {
    background-color: #b8000a;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#db0007" : "white")};
  color: ${(props) => (props.active ? "white" : "#db0007")};
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 15px 0;
  width: 100%;
`;

const InfoIcon = styled.span`
  cursor: help;
  color: #0066cc;
`;

const ErrorMessage = styled.span`
  color: #db0007;
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const CountryCodeSelect = styled(Select)`
  width: 30%;
`;

const PhoneInput = styled(Input)`
  width: 70%;
`;

const OperationHoursContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const TimeSelect = styled(Select)`
  flex: 1;
`;

const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const TermsLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 20;
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

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 60px;
  right: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
  width: 160px;
  height: calc(100vh - 60px);
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 999;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 20px;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #db0007;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 3rem;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Logo2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  font-size: 3rem;
  font-weight: bold;
  position: relative;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #db0007;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Copyright = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 1rem;
  }
`;

const kenyanCounties = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans Nzoia",
  "Uasin Gishu",
  "Elgeyo Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi",
];

const ugandanDistricts = [
  "Kampala",
  "Wakiso",
  "Mukono",
  "Jinja",
  "Mbarara",
  "Gulu",
  "Lira",
  "Mbale",
  "Masaka",
  "Arua",
  "Hoima",
  "Kasese",
  "Kabale",
  "Tororo",
  "Soroti",
  "Masindi",
  "Fort Portal",
  "Kitgum",
  "Luwero",
  "Mityana",
  "Iganga",
  "Mubende",
  "Kayunga",
  // ... (add more districts to reach 147)
];

const generateTimeOptions = () => {
  const options = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      options.push(`${hour}:${minute}`);
    }
  }
  return options;
};

const sliderData = [
  { image: "./images/AuthForm/Onboarding1.gif" },
  { image: "./images/AuthForm/Onboarding2.gif" },
  { image: "./images/AuthForm/Onboarding3.gif" },
  { image: "./images/AuthForm/Onboarding4.gif" },
  { image: "./images/AuthForm/Onboarding5.gif" },
];

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  restaurantName: string;
  countryCode: string;
  phoneNumber: string;
  county: string;
  mtaaVillage: string;
  mainDishes: string;
  openingHours: string;
  closingHours: string;
  is24Hours: boolean;
  services: string;
  agreeToTerms: boolean;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const handleCustomerAccountClick = () => {
    navigate("/CustomerAccount");
  };
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    restaurantName: "",
    countryCode: "254",
    phoneNumber: "",
    county: "",
    mtaaVillage: "",
    mainDishes: "",
    openingHours: "",
    closingHours: "",
    is24Hours: false,
    services: "pickup",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderData.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    if (name === "phoneNumber" && typeof newValue === "string") {
      newValue = newValue.replace(/\D/g, "").slice(0, 9);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    validateField(name as keyof FormData, newValue.toString());

    if (name === "countryCode") {
      setFormData((prev) => ({ ...prev, county: "" }));
    }

    if (name === "is24Hours") {
      setFormData((prev) => ({
        ...prev,
        closingHours: (e.target as HTMLInputElement).checked
          ? ""
          : prev.closingHours,
      }));
    }
  };

  const validateField = (name: keyof FormData, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters long";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      case "phoneNumber":
        if (!value) {
          error = "Phone number is required";
        } else if (value.length !== 9) {
          error = "Phone number must be 9 digits";
        }
        break;
      case "restaurantName":
      case "county":
      case "mtaaVillage":
      case "mainDishes":
      case "openingHours":
        if (!value) {
          error = `${
            name.charAt(0).toUpperCase() +
            name.slice(1).replace(/([A-Z])/g, " $1")
          } is required`;
        }
        break;
      case "closingHours":
        if (!value && !formData.is24Hours) {
          error = "Closing Hours is required";
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formFields = isSignIn ? ["email", "password"] : Object.keys(formData);
    let hasErrors = false;
    formFields.forEach((field) => {
      validateField(
        field as keyof FormData,
        formData[field as keyof FormData].toString()
      );
      if (errors[field]) hasErrors = true;
    });
    if (!hasErrors) {
      console.log("Form submitted:", formData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isSignUpButtonDisabled = !isSignIn && !formData.agreeToTerms;

  return (
    <Container>
      <Navbar>
        <Logo>
          <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
          Hotelimaps
        </Logo>
        <MenuToggle onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </MenuToggle>
      </Navbar>
      <button onClick={handleCustomerAccountClick}>Customer Account</button>
      <MenuContainer isOpen={isMenuOpen}>
        <MenuList>
          <MenuItem>
            <MenuLink to="/menu">Menu</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/account">Customer Account</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/AboutUs">About Us</MenuLink>
          </MenuItem>
        </MenuList>
      </MenuContainer>

      <MainContent>
        <SliderContainer>
          {sliderData.map((slide, index) => (
            <Slide
              key={index}
              active={index === activeSlide}
              backgroundImage={slide.image}
            />
          ))}
        </SliderContainer>
        <ContentWrapper>
          <FormContainer>
            <Logo2>
              <LogoIcon2 src="./LogoW.png" alt="Hotelimaps Logo" />
              Hotelimaps
              <Divider />
            </Logo2>
            <ToggleContainer>
              <ToggleButton active={isSignIn} onClick={() => setIsSignIn(true)}>
                SIGN IN
              </ToggleButton>
              <ToggleButton
                active={!isSignIn}
                onClick={() => setIsSignIn(false)}
              >
                SIGN UP
              </ToggleButton>
            </ToggleContainer>

            <Divider />

            {isSignIn ? (
              <>
                <Title>Login to Hotelimaps® with My Hmaps Account</Title>
                <Subtitle>
                  Sign in with My ARecipes account to start your order{" "}
                  <InfoIcon title="Learn more about member benefits">
                    ⓘ
                  </InfoIcon>
                </Subtitle>
                <Form onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                  <PasswordContainer>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <EyeIcon onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </EyeIcon>
                  </PasswordContainer>
                  {errors.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  )}
                  <RememberMeContainer>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                    <ForgotPassword href="#">Forgot Password?</ForgotPassword>
                  </RememberMeContainer>
                  <Button type="submit">SIGN IN</Button>
                </Form>
              </>
            ) : (
              <>
                <Title>Register Your Restaurant</Title>
                <Subtitle>Join our food delivery marketplace</Subtitle>
                <Form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="restaurantName"
                    placeholder="Restaurant Name"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.restaurantName && (
                    <ErrorMessage>{errors.restaurantName}</ErrorMessage>
                  )}
                  <PhoneInputContainer>
                    <CountryCodeSelect
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="254">+254 (Kenya)</option>
                      <option value="256">+256 (Uganda)</option>
                    </CountryCodeSelect>
                    <PhoneInput
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </PhoneInputContainer>
                  {errors.phoneNumber && (
                    <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
                  )}
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                  <PasswordContainer>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <EyeIcon onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </EyeIcon>
                  </PasswordContainer>
                  {errors.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  )}
                  <PasswordContainer>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <EyeIcon onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </EyeIcon>
                  </PasswordContainer>
                  {errors.confirmPassword && (
                    <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                  )}
                  <Select
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select County/District</option>
                    {formData.countryCode === "254"
                      ? kenyanCounties.map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))
                      : ugandanDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                  </Select>
                  {errors.county && (
                    <ErrorMessage>{errors.county}</ErrorMessage>
                  )}
                  <Input
                    type="text"
                    name="mtaaVillage"
                    placeholder="Mtaa/Village"
                    value={formData.mtaaVillage}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.mtaaVillage && (
                    <ErrorMessage>{errors.mtaaVillage}</ErrorMessage>
                  )}
                  <Input
                    type="text"
                    name="mainDishes"
                    placeholder="Main Dishes (comma separated)"
                    value={formData.mainDishes}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.mainDishes && (
                    <ErrorMessage>{errors.mainDishes}</ErrorMessage>
                  )}
                  <OperationHoursContainer>
                    <TimeSelect
                      name="openingHours"
                      value={formData.openingHours}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Opening Time</option>
                      <option value="24/7">24/7</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </TimeSelect>
                    <TimeSelect
                      name="closingHours"
                      value={formData.closingHours}
                      onChange={handleInputChange}
                      required
                      disabled={formData.openingHours === "24/7"}
                    >
                      <option value="">Closing Time</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </TimeSelect>
                  </OperationHoursContainer>
                  {errors.openingHours && (
                    <ErrorMessage>{errors.openingHours}</ErrorMessage>
                  )}
                  {errors.closingHours && (
                    <ErrorMessage>{errors.closingHours}</ErrorMessage>
                  )}
                  <Select
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                    <option value="both">Both</option>
                  </Select>
                  <TermsContainer>
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="agreeToTerms">
                      I agree to the{" "}
                      <TermsLink href="#" target="_blank">
                        Terms and Conditions
                      </TermsLink>
                    </label>
                  </TermsContainer>
                  <Button type="submit" disabled={isSignUpButtonDisabled}>
                    SIGN UP
                  </Button>
                </Form>
              </>
            )}
          </FormContainer>
        </ContentWrapper>
        <SliderNav>
          {sliderData.map((_, index) => (
            <SliderDot
              key={index}
              active={index === activeSlide}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </SliderNav>
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
            support@Hotelimaps.com
          </ContactInfo>
        </FooterSection>
        <Copyright>
          © {new Date().getFullYear()} Hotelimaps. All rights reserved.
        </Copyright>
      </Footer>
    </Container>
  );
};

export default AuthForm;
