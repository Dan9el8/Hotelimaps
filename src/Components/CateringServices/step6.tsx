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

const Step6: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

  const budgetType = watch("budgetType");

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
          <ProgressFill progress={66.66} />
        </ProgressBar>
        <ProgressPercentage>66.66%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 6: Budget and Special Requests</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Estimated Budget</Label>
          <RadioGroup>
            <Label>
              <input
                type="radio"
                value="perPerson"
                {...register("budgetType", {
                  required: "Please select a budget type",
                })}
              />
              Per Person
            </Label>
            <Label>
              <input
                type="radio"
                value="totalBudget"
                {...register("budgetType", {
                  required: "Please select a budget type",
                })}
              />
              Total Budget
            </Label>
          </RadioGroup>
          {errors.budgetType && (
            <ErrorMessage>{errors.budgetType.message as string}</ErrorMessage>
          )}
        </FormGroup>
        {budgetType && (
          <FormGroup>
            <Label htmlFor="budgetAmount">Enter amount</Label>
            <Input
              id="budgetAmount"
              type="number"
              {...register("budgetAmount", {
                required: "Budget amount is required",
                min: { value: 0, message: "Budget must be a positive number" },
              })}
            />
            {errors.budgetAmount && (
              <ErrorMessage>
                {errors.budgetAmount.message as string}
              </ErrorMessage>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <Label htmlFor="specialRequests">
            Any special requests or additional information?
          </Label>
          <TextArea
            id="specialRequests"
            {...register("specialRequests")}
            rows={4}
          />
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

export default Step6;
