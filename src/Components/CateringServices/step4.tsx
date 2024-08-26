import React, { useState } from "react";
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

const CheckboxGroup = styled.div`
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

const Step4: React.FC<StepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const navigate = useNavigate();
  const [showOtherDietaryInput, setShowOtherDietaryInput] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
  });

  const dietaryRestrictions = watch("dietaryRestrictions");

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
          <ProgressFill progress={44.44} />
        </ProgressBar>
        <ProgressPercentage>44.44%</ProgressPercentage>
      </ProgressContainer>
      <Title>Step 4: Menu Selection</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Service Type</Label>
          <Controller
            name="serviceType"
            control={control}
            rules={{ required: "Service type is required" }}
            render={({ field }) => (
              <>
                <Label>
                  <input type="radio" {...field} value="buffet" /> Buffet
                </Label>
                <Label>
                  <input type="radio" {...field} value="plated" /> Plated
                </Label>
                <Label>
                  <input type="radio" {...field} value="familyStyle" />{" "}
                  Family-style
                </Label>
                <Label>
                  <input type="radio" {...field} value="foodStations" /> Food
                  Stations
                </Label>
              </>
            )}
          />
          {errors.serviceType && (
            <ErrorMessage>{errors.serviceType.message as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Meal Type (select all that apply)</Label>
          <CheckboxGroup>
            <Label>
              <input
                type="checkbox"
                {...register("mealType")}
                value="breakfast"
              />{" "}
              Breakfast
            </Label>
            <Label>
              <input type="checkbox" {...register("mealType")} value="lunch" />{" "}
              Lunch
            </Label>
            <Label>
              <input type="checkbox" {...register("mealType")} value="dinner" />{" "}
              Dinner
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("mealType")}
                value="cocktailReception"
              />{" "}
              Cocktail Reception
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("mealType")}
                value="dessertOnly"
              />{" "}
              Dessert Only
            </Label>
          </CheckboxGroup>
        </FormGroup>
        <FormGroup>
          <Label>Dietary Restrictions (select all that apply)</Label>
          <CheckboxGroup>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="vegetarian"
              />{" "}
              Vegetarian
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="vegan"
              />{" "}
              Vegan
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="glutenFree"
              />{" "}
              Gluten-Free
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="kosher"
              />{" "}
              Kosher
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="halal"
              />{" "}
              Halal
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="nutFree"
              />{" "}
              Nut-Free
            </Label>
            <Label>
              <input
                type="checkbox"
                {...register("dietaryRestrictions")}
                value="other"
                onChange={(e) => setShowOtherDietaryInput(e.target.checked)}
              />{" "}
              Other
            </Label>
          </CheckboxGroup>
        </FormGroup>
        {showOtherDietaryInput && (
          <FormGroup>
            <Label htmlFor="otherDietaryRestriction">
              Specify Other Dietary Restriction
            </Label>
            <Input
              id="otherDietaryRestriction"
              {...register("otherDietaryRestriction", {
                required: "Please specify the dietary restriction",
              })}
            />
            {errors.otherDietaryRestriction && (
              <ErrorMessage>
                {errors.otherDietaryRestriction.message as string}
              </ErrorMessage>
            )}
          </FormGroup>
        )}
        <FormGroup>
          <Label htmlFor="menuUpload">Upload Custom Menu</Label>
          <Input id="menuUpload" type="file" {...register("menuUpload")} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="presetMenu">Select from Preset Menus</Label>
          <Select id="presetMenu" {...register("presetMenu")}>
            <option value="">Select a preset menu</option>
            <option value="classicEastAfrican">
              Classic East African Buffet
            </option>
            <option value="internationalFusion">International Fusion</option>
            <option value="vegetarianDelight">Vegetarian Delight</option>
            <option value="executiveBusiness">Executive Business Lunch</option>
            <option value="weddingFeast">Wedding Feast</option>
          </Select>
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

export default Step4;
