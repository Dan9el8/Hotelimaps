import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  User,
  Lock,
  MapPin,
} from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f9fc;
  font-family: "Poppins", sans-serif;
`;

const NavBar = styled.nav`
  background-color: #8b0000;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

const LogoIcon = styled.img`
  width: 56px;
  height: 48px;
  margin-right: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #ffcc00;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
  }

  &:hover::after {
    visibility: visible;
    transform: scaleX(1);
  }

  &:hover {
    color: #ffcc00;
  }
`;

const MainContent = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem;
  background: linear-gradient(135deg, #f7f9fc 0%, #e3e8ef 100%);
`;

const SliderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Slide = styled.div<{ active: boolean; backgroundImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 11;
`;

const SliderDot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#ffcc00" : "#ffffff")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.69);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  z-index: 10;
  overflow: hidden;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
`;

const TitleDivider = styled.hr`
  border: none;
  height: 2px;
  background-color: #8b0000;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #8b0000;
    box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #8b0000;
    box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.2);
  }
`;

const ErrorMessage = styled.span`
  color: #db0007;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const PasswordContainer = styled(InputGroup)``;

const EyeIcon = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const CountryCodeSelect = styled(Select)`
  width: 30%;
  padding-right: 0.5rem;
`;

const PhoneInput = styled(Input)`
  width: 70%;
`;

const Button = styled.button`
  background-color: #8b0000;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #660000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 3rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FooterLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const Copyright = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  color: #999;
  font-size: 0.875rem;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const sliderImages = [
  "https://picsum.photos/1200/800?random=1",
  "https://picsum.photos/1200/800?random=2",
  "https://picsum.photos/1200/800?random=3",
  "https://picsum.photos/1200/800?random=4",
];

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

const CustomerAccount: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "254",
    phoneNumber: "",
    county: "",
    mtaaVillage: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = `${name === "firstName" ? "First" : "Last"} name is required`;
        }
        break;
      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (value.length < 3) {
          error = "Username must be at least 3 characters long";
        }
        break;
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
        } else if (!/^\d+$/.test(value)) {
          error = "Phone number must contain only digits";
        }
        break;
      case "county":
        if (!value) {
          error = "County/District is required";
        }
        break;
      case "mtaaVillage":
        if (!value) {
          error = "Mtaa/Village is required";
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formFields = Object.keys(formData);
    let hasErrors = false;
    formFields.forEach((field) => {
      validateField(field, formData[field as keyof typeof formData]);
      if (errors[field]) hasErrors = true;
    });
    if (!hasErrors) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
      // and handle the response (e.g., show success message, redirect user)
    }
  };

  return (
    <Container>
      <NavBar>
        <Logo to="/">
          <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
          AfyaRecipes
        </Logo>
        <NavLink to="/">Home</NavLink>
      </NavBar>

      <MainContent>
        <SliderContainer>
          {sliderImages.map((image, index) => (
            <Slide
              key={index}
              active={index === activeSlide}
              backgroundImage={image}
            />
          ))}
          <SliderNav>
            {sliderImages.map((_, index) => (
              <SliderDot
                key={index}
                active={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </SliderNav>
        </SliderContainer>

        <FormContainer>
          <FormTitle>Create Customer Account</FormTitle>
          <TitleDivider />
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputIcon>
                <User size={18} />
              </InputIcon>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}

            <InputGroup>
              <InputIcon>
                <User size={18} />
              </InputIcon>
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

            <InputGroup>
              <InputIcon>
                <User size={18} />
              </InputIcon>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

            <InputGroup>
              <InputIcon>
                <Mail size={18} />
              </InputIcon>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

            <PasswordContainer>
              <InputIcon>
                <Lock size={18} />
              </InputIcon>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </EyeIcon>
            </PasswordContainer>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

            <PasswordContainer>
              <InputIcon>
                <Lock size={18} />
              </InputIcon>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <EyeIcon
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </EyeIcon>
            </PasswordContainer>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
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

            <InputGroup>
              <InputIcon>
                <MapPin size={18} />
              </InputIcon>
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
            </InputGroup>
            {errors.county && <ErrorMessage>{errors.county}</ErrorMessage>}

            <InputGroup>
              <InputIcon>
                <MapPin size={18} />
              </InputIcon>
              <Input
                type="text"
                name="mtaaVillage"
                placeholder="Mtaa/Village"
                value={formData.mtaaVillage}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            {errors.mtaaVillage && (
              <ErrorMessage>{errors.mtaaVillage}</ErrorMessage>
            )}

            <Button type="submit">Create Account</Button>
          </Form>
        </FormContainer>
      </MainContent>

      <Footer>
        <FooterSection>
          <FooterLogo to="/">
            <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
            AfyaRecipes
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

export default CustomerAccount;
