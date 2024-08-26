import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #8b0000; // Dark red
  color: white; // Change text color to white for better contrast
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #db0007;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #db0007;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #db0007;
  }
`;

export const Button = styled.button`
  background-color: #db0007;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: #b8000a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: #db0007;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  margin-bottom: 2rem;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #db0007;
  transition: width 0.3s;
`;

export const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #db0007;
  }
`;

export interface FormData {
  // Add all form fields here
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContact: string;
  eventDate: Date | null;
  startTime: string;
  endTime: string;
  eventType: string;
  otherEventType: string;
  numberOfGuests: number;
  // ... add the rest of the fields
}

export interface StepProps {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}
