import React, { useState, useCallback } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import Step8 from "./step8";
import Step9 from "./step9";

interface FormData {
  // Step 1: Customer Information
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContact: string;

  // Step 2: Event Details
  eventType: string;
  otherEventType: string;
  eventDate: Date | null;
  guestCount: number;

  // Step 3: Venue Information
  venueName: string;
  venueAddress: string;
  onSiteKitchen: string;

  // Step 4: Menu Selection
  serviceType: string;
  mealType: string[];
  dietaryRestrictions: string[];
  otherDietaryRestriction: string;
  menuUpload: File | null;
  presetMenu: string;

  // Step 5: Additional Services
  tableSettings: string;
  tableware: string;
  servingStaff: string;
  barService: string;

  // Step 6: Budget and Special Requests
  budgetType: string;
  budgetAmount: number;
  specialRequests: string;

  // Step 7: Marketing and Follow-up
  hearAboutUs: string;
  otherSource: string;
  preferredFollowUp: string;
  newsletter: boolean;

  // Step 8: Final Details
  documents: File[];
  timeline: string;
  depositAcknowledgment: boolean;
  paymentMethod: string;

  // Step 9: Terms and Conditions
  termsAgreed: boolean;
  privacyPolicyAgreed: boolean;
}

const CateringRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    preferredContact: "",
    eventType: "",
    otherEventType: "",
    eventDate: null,
    guestCount: 0,
    venueName: "",
    venueAddress: "",
    onSiteKitchen: "",
    serviceType: "",
    mealType: [],
    dietaryRestrictions: [],
    otherDietaryRestriction: "",
    menuUpload: null,
    presetMenu: "",
    tableSettings: "",
    tableware: "",
    servingStaff: "",
    barService: "",
    budgetType: "",
    budgetAmount: 0,
    specialRequests: "",
    hearAboutUs: "",
    otherSource: "",
    preferredFollowUp: "",
    newsletter: false,
    documents: [],
    timeline: "",
    depositAcknowledgment: false,
    paymentMethod: "",
    termsAgreed: false,
    privacyPolicyAgreed: false,
  });

  const navigate = useNavigate();

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const goToStep = useCallback(
    (stepNumber: number) => {
      navigate(`step${stepNumber}`);
    },
    [navigate]
  );

  const submitForm = useCallback(() => {
    console.log("Form submitted:", formData);
    // Here you would typically send the formData to your backend
    // For example:
    // api.submitCateringRequest(formData).then(() => {
    //   navigate("/thank-you");
    // });
    navigate("/thank-you");
  }, [formData, navigate]);

  const renderStep = (
    StepComponent: React.ComponentType<any>,
    stepNumber: number,
    isLastStep = false
  ) => (
    <StepComponent
      formData={formData}
      updateFormData={updateFormData}
      nextStep={isLastStep ? undefined : () => goToStep(stepNumber + 1)}
      prevStep={stepNumber > 1 ? () => goToStep(stepNumber - 1) : undefined}
      submitForm={isLastStep ? submitForm : undefined}
    />
  );

  return (
    <Routes>
      <Route path="/" element={<Navigate to="step1" replace />} />
      <Route path="step1" element={renderStep(Step1, 1)} />
      <Route path="step2" element={renderStep(Step2, 2)} />
      <Route path="step3" element={renderStep(Step3, 3)} />
      <Route path="step4" element={renderStep(Step4, 4)} />
      <Route path="step5" element={renderStep(Step5, 5)} />
      <Route path="step6" element={renderStep(Step6, 6)} />
      <Route path="step7" element={renderStep(Step7, 7)} />
      <Route path="step8" element={renderStep(Step8, 8)} />
      <Route
        path="step9"
        element={
          <Step9
            formData={formData}
            updateFormData={updateFormData}
            prevStep={() => goToStep(8)}
            submitForm={submitForm}
          />
        }
      />
    </Routes>
  );
};

export default CateringRequestForm;
