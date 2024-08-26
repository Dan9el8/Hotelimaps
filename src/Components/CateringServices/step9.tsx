import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  position: relative;
  overflow: hidden;
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

const Link = styled.a`
  color: #0000ff;
  text-decoration: underline;
  cursor: pointer;
`;

interface StepProps {
  formData: {
    termsAgreed?: boolean;
    privacyPolicyAgreed?: boolean;
  };
  updateFormData: (data: any) => void;
  prevStep: () => void;
  submitForm: () => void;
}

const Step9: React.FC<StepProps> = ({
  formData,
  updateFormData,
  prevStep,
  submitForm,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    (data: typeof formData) => {
      console.log("Form submitted:", data);
      try {
        updateFormData(data);
        submitForm();
        console.log("Navigating to thank you page");
        navigate("/thank-you");
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    },
    [updateFormData, submitForm, navigate]
  );

  console.log("Rendering Step9");

  return (
    <Container>
      <NavigationBar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/menu">Back to Menu</NavLink>
      </NavigationBar>
      <ProgressContainer>
        <ProgressBar>
          <ProgressFill progress={100} />
        </ProgressBar>
        <ProgressPercentage>100%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 9: Terms and Conditions</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
            <input
              type="checkbox"
              {...register("termsAgreed", {
                required: "You must agree to the terms and conditions",
              })}
            />
            I have read and agree to the terms and conditions
          </Label>
          {errors.termsAgreed && (
            <ErrorMessage>{errors.termsAgreed.message as string}</ErrorMessage>
          )}
          <Link href="/terms-and-conditions" target="_blank">
            View Full Terms and Conditions
          </Link>
        </FormGroup>
        <FormGroup>
          <Label>
            <input
              type="checkbox"
              {...register("privacyPolicyAgreed", {
                required: "You must agree to the privacy policy",
              })}
            />
            I consent to the storage and processing of my personal data in
            accordance with the privacy policy
          </Label>
          {errors.privacyPolicyAgreed && (
            <ErrorMessage>
              {errors.privacyPolicyAgreed.message as string}
            </ErrorMessage>
          )}
          <Link href="/privacy-policy" target="_blank">
            View Privacy Policy
          </Link>
        </FormGroup>
        <ButtonContainer>
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Submit Booking Request</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Step9;
