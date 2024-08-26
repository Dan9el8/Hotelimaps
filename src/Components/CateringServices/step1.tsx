import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
`;

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProgressContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #ff0000;
  border-radius: 5px;
`;

const ProgressPercentage = styled.span`
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 14px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CountryCodeSelect = styled(Select)`
  width: 30%;
`;

const PhoneInput = styled(Input)`
  width: 70%;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #ff0000;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #cc0000;
  }
`;

const kenyanCounties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa",
  "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka Nithi", "Embu",
  "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a",
  "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu",
  "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado",
  "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

const ugandanDistricts = [
  "Kampala", "Wakiso", "Mukono", "Jinja", "Mbarara", "Gulu", "Lira", "Mbale",
  "Masaka", "Arua", "Hoima", "Kasese", "Kabale", "Tororo", "Soroti", "Masindi",
  "Fort Portal", "Kitgum", "Luwero", "Mityana", "Iganga", "Mubende", "Kayunga"
  // Add more Ugandan districts here
];

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step1: React.FC<StepProps> = ({ formData, updateFormData, nextStep }) => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState(formData.countryCode || "254");
  const [locations, setLocations] = useState<string[]>(kenyanCounties);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

  const phoneNumber = watch("phoneNumber");

  useEffect(() => {
    if (countryCode === "254") {
      setLocations(kenyanCounties);
    } else {
      setLocations(ugandanDistricts);
    }
  }, [countryCode]);

  useEffect(() => {
    if (phoneNumber && phoneNumber.startsWith("0")) {
      setValue("phoneNumber", phoneNumber.substring(1));
    }
  }, [phoneNumber, setValue]);

  const onSubmit = (data: any) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <Container>
      <NavigationBar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/menu">Back to Menu</NavLink>
      </NavigationBar>
      <ProgressContainer>
        <ProgressBar>
          <ProgressFill progress={11.11} />
        </ProgressBar>
        <ProgressPercentage>11.11%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 1: Customer Information</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <ErrorMessage>{errors.fullName.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <PhoneInputContainer>
            <CountryCodeSelect
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="254">+254 (Kenya)</option>
              <option value="256">+256 (Uganda)</option>
            </CountryCodeSelect>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[1-9]\d{8}$/,
                  message: "Please enter a valid 9-digit phone number",
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  placeholder="Phone Number (9 digits)"
                />
              )}
            />
          </PhoneInputContainer>
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            type="email"
            {...register("emailAddress", {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.emailAddress && (
            <ErrorMessage>{errors.emailAddress.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="location">County/District</Label>
          <Select
            id="location"
            {...register("location", { required: "Location is required" })}
          >
            <option value="">Select County/District</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
          {errors.location && (
            <ErrorMessage>{errors.location.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Preferred contact method</Label>
          <div>
            <Label>
              <input
                type="radio"
                value="phone"
                {...register("preferredContact", {
                  required: "Please select a contact method",
                })}
              />
              Phone
            </Label>
            <Label>
              <input
                type="radio"
                value="email"
                {...register("preferredContact", {
                  required: "Please select a contact method",
                })}
              />
              Email
            </Label>
            <Label>
              <input
                type="radio"
                value="text"
                {...register("preferredContact", {
                  required: "Please select a contact method",
                })}
              />
              Text Message
            </Label>
          </div>
          {errors.preferredContact && (
            <ErrorMessage>
              {errors.preferredContact.message as string}
            </ErrorMessage>
          )}
        </FormGroup>
        <Button type="submit">Next</Button>
      </Form>
    </Container>
  );
};

export default Step1;