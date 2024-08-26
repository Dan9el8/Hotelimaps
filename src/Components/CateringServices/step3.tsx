import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
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
  margin-right: 10px;
  &:hover {
    background-color: #cc0000;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

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
          <ProgressFill progress={33.33} />
        </ProgressBar>
        <ProgressPercentage>33.33%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 3: Venue Information</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="venueName">Venue Name</Label>
          <Input
            id="venueName"
            {...register("venueName", { required: "Venue name is required" })}
          />
          {errors.venueName && (
            <ErrorMessage>{errors.venueName.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="venueAddress">Venue Address</Label>
          <TextArea
            id="venueAddress"
            {...register("venueAddress", {
              required: "Venue address is required",
            })}
          />
          {errors.venueAddress && (
            <ErrorMessage>{errors.venueAddress.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Is there an on-site kitchen available?</Label>
          <RadioGroup>
            <Label>
              <input
                type="radio"
                value="yes"
                {...register("onSiteKitchen", {
                  required: "Please select an option",
                })}
              />
              Yes
            </Label>
            <Label>
              <input
                type="radio"
                value="no"
                {...register("onSiteKitchen", {
                  required: "Please select an option",
                })}
              />
              No
            </Label>
            <Label>
              <input
                type="radio"
                value="unsure"
                {...register("onSiteKitchen", {
                  required: "Please select an option",
                })}
              />
              Unsure
            </Label>
          </RadioGroup>
          {errors.onSiteKitchen && (
            <ErrorMessage>
              {errors.onSiteKitchen.message as string}
            </ErrorMessage>
          )}
        </FormGroup>
        <ButtonContainer>
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Step3;
