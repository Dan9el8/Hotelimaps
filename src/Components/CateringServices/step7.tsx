import React, { useState } from "react";
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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const Step7: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

  const hearAboutUs = watch("hearAboutUs");

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
          <ProgressFill progress={77.77} />
        </ProgressBar>
        <ProgressPercentage>77.77%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 7: Marketing and Follow-up</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
          <Select
            id="hearAboutUs"
            {...register("hearAboutUs", {
              required: "Please select an option",
            })}
            onChange={(e) => setShowOtherInput(e.target.value === "Other")}
          >
            <option value="">Select an option</option>
            <option value="Referral">Referral</option>
            <option value="SocialMedia">Social Media</option>
            <option value="SearchEngine">Search Engine</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Other">Other</option>
          </Select>
          {errors.hearAboutUs && (
            <ErrorMessage>{errors.hearAboutUs.message as string}</ErrorMessage>
          )}
        </FormGroup>
        {showOtherInput && (
          <FormGroup>
            <Label htmlFor="otherSource">Please specify</Label>
            <Input
              id="otherSource"
              {...register("otherSource", {
                required: "Please specify how you heard about us",
              })}
            />
            {errors.otherSource && (
              <ErrorMessage>
                {errors.otherSource.message as string}
              </ErrorMessage>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <Label>Preferred method of follow-up</Label>
          <RadioGroup>
            <Label>
              <input
                type="radio"
                value="phone"
                {...register("preferredFollowUp", {
                  required: "Please select a follow-up method",
                })}
              />
              Phone
            </Label>
            <Label>
              <input
                type="radio"
                value="email"
                {...register("preferredFollowUp", {
                  required: "Please select a follow-up method",
                })}
              />
              Email
            </Label>
            <Label>
              <input
                type="radio"
                value="inPerson"
                {...register("preferredFollowUp", {
                  required: "Please select a follow-up method",
                })}
              />
              In-person consultation
            </Label>
          </RadioGroup>
          {errors.preferredFollowUp && (
            <ErrorMessage>
              {errors.preferredFollowUp.message as string}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>
            <input type="checkbox" {...register("newsletter")} />
            Would you like to sign up for our newsletter?
          </Label>
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

export default Step7;
