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

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Step8: React.FC<StepProps> = ({
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
          <ProgressFill progress={88.88} />
        </ProgressBar>
        <ProgressPercentage>88.88%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 8: Final Details</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="documents">
            Upload any relevant documents (venue layout, inspiration images,
            etc.)
          </Label>
          <Input
            id="documents"
            type="file"
            multiple
            {...register("documents")}
          />
        </FormGroup>
        <FormGroup>
          <Label>Ideal timeline for finalizing booking</Label>
          <RadioGroup>
            <Label>
              <input
                type="radio"
                value="1week"
                {...register("timeline", {
                  required: "Please select a timeline",
                })}
              />
              Within 1 week
            </Label>
            <Label>
              <input
                type="radio"
                value="2weeks"
                {...register("timeline", {
                  required: "Please select a timeline",
                })}
              />
              Within 2 weeks
            </Label>
            <Label>
              <input
                type="radio"
                value="1month"
                {...register("timeline", {
                  required: "Please select a timeline",
                })}
              />
              Within 1 month
            </Label>
            <Label>
              <input
                type="radio"
                value="moreThan1month"
                {...register("timeline", {
                  required: "Please select a timeline",
                })}
              />
              More than 1 month
            </Label>
          </RadioGroup>
          {errors.timeline && (
            <ErrorMessage>{errors.timeline.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>
            <input
              type="checkbox"
              {...register("depositAcknowledgment", {
                required: "You must acknowledge the deposit requirement",
              })}
            />
            I acknowledge that a deposit may be required to secure the booking
          </Label>
          {errors.depositAcknowledgment && (
            <ErrorMessage>
              {errors.depositAcknowledgment.message as string}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Preferred payment method</Label>
          <RadioGroup>
            <Label>
              <input
                type="radio"
                value="creditCard"
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
              />
              Credit Card
            </Label>
            <Label>
              <input
                type="radio"
                value="bankTransfer"
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
              />
              Bank Transfer
            </Label>
            <Label>
              <input
                type="radio"
                value="mobileMoney"
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
              />
              Mobile Money
            </Label>
            <Label>
              <input
                type="radio"
                value="cash"
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
              />
              Cash
            </Label>
          </RadioGroup>
          {errors.paymentMethod && (
            <ErrorMessage>
              {errors.paymentMethod.message as string}
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

export default Step8;
