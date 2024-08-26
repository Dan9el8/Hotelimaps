import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const Step2: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

  const eventType = watch("eventType");

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
          <ProgressFill progress={22.22} />
        </ProgressBar>
        <ProgressPercentage>22.22%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 2: Event Details</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="eventType">Event Type</Label>
          <Select
            id="eventType"
            {...register("eventType", { required: "Event type is required" })}
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="birthday">Birthday Party</option>
            <option value="other">Other</option>
          </Select>
          {errors.eventType && (
            <ErrorMessage>{errors.eventType.message as string}</ErrorMessage>
          )}
        </FormGroup>
        {eventType === "other" && (
          <FormGroup>
            <Label htmlFor="otherEventType">Specify Event Type</Label>
            <Input
              id="otherEventType"
              {...register("otherEventType", {
                required: "Please specify the event type",
              })}
            />
            {errors.otherEventType && (
              <ErrorMessage>
                {errors.otherEventType.message as string}
              </ErrorMessage>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <Label htmlFor="eventDate">Event Date</Label>
          <Controller
            name="eventDate"
            control={control}
            rules={{ required: "Event date is required" }}
            render={({ field }) => (
              <DatePicker
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                placeholderText="Select event date"
                minDate={new Date()} // Set minimum date to today
                dateFormat="MMMM d, yyyy"
              />
            )}
          />
          {errors.eventDate && (
            <ErrorMessage>{errors.eventDate.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="guestCount">Number of Guests</Label>
          <Input
            id="guestCount"
            type="number"
            {...register("guestCount", {
              required: "Number of guests is required",
              min: { value: 1, message: "Minimum 1 guest required" },
            })}
          />
          {errors.guestCount && (
            <ErrorMessage>{errors.guestCount.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <ButtonContainer>
          <Button type="button" onClick={() => prevStep()}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Step2;