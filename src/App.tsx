import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import Menu from "./Components/Menu";
import CustomerAccount from "./Components/CustomerAccount";
import Afy_RecipesPage from "./Components/Afy_RecipesPage";
import CateringServicePage from "./Components/CateringServices/CateringServicePage";
import CateringRequestForm from "./Components/CateringServices/CateringRequestForm";
import ThankYou from "./Components/CateringServices/ThankYou";
import ThankYouTour from "./Components/CateringServices/ThankYou"; // Update this import
import Step1 from "./Components/CateringServices/step1";
import Step2 from "./Components/CateringServices/step2";
import Step3 from "./Components/CateringServices/step3";
import Step4 from "./Components/CateringServices/step4";
import Step5 from "./Components/CateringServices/step5";
import Step6 from "./Components/CateringServices/step6";
import Step7 from "./Components/CateringServices/step7";
import Step8 from "./Components/CateringServices/step8";
import Step9 from "./Components/CateringServices/step9";
import AboutUs from "./Components/AboutUs";

// Define the props type for ThankYouTour here if it's not exported from the component file
interface ThankYouTourProps {
  bookingSummary: any; // Replace 'any' with the actual type of bookingSummary
  onClose: () => void;
}

const ThankYouTourWrapper: React.FC = () => {
  const location = useLocation();
  const bookingSummary = location.state?.bookingSummary;

  if (!bookingSummary) {
    return <Navigate to="/menu" replace />;
  }

  const onClose = () => {
    window.history.back();
  };

  return <ThankYouTour bookingSummary={bookingSummary} onClose={onClose} />;
};

const App: React.FC = () => {
  const [formData, setFormData] = useState({});

  const updateFormData = (data: any) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const submitForm = () => {
    console.log("Form submitted:", formData);
    // Add any additional submission logic here
  };

  const StepWrapper: React.FC<{
    Component: React.ComponentType<any>;
    stepNumber: number;
  }> = ({ Component, stepNumber }) => {
    const nextStep = () => {
      // Navigation logic
    };

    const prevStep = () => {
      // Navigation logic
    };

    return (
      <Component
        formData={formData}
        updateFormData={updateFormData}
        nextStep={nextStep}
        prevStep={prevStep}
        submitForm={submitForm}
      />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/account" element={<CustomerAccount />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/recipes" element={<Afy_RecipesPage />} />
        <Route
          path="/catering/:businessSlug"
          element={<CateringServicePage />}
        />
        <Route
          path="/catering/:restaurantName"
          element={<CateringServicePage />}
        />
        <Route path="/catering-request" element={<CateringRequestForm />}>
          <Route
            path="step1"
            element={<StepWrapper Component={Step1} stepNumber={1} />}
          />
          <Route
            path="step2"
            element={<StepWrapper Component={Step2} stepNumber={2} />}
          />
          <Route
            path="step3"
            element={<StepWrapper Component={Step3} stepNumber={3} />}
          />
          <Route
            path="step4"
            element={<StepWrapper Component={Step4} stepNumber={4} />}
          />
          <Route
            path="step5"
            element={<StepWrapper Component={Step5} stepNumber={5} />}
          />
          <Route
            path="step6"
            element={<StepWrapper Component={Step6} stepNumber={6} />}
          />
          <Route
            path="step7"
            element={<StepWrapper Component={Step7} stepNumber={7} />}
          />
          <Route
            path="step8"
            element={<StepWrapper Component={Step8} stepNumber={8} />}
          />
          <Route
            path="step9"
            element={<StepWrapper Component={Step9} stepNumber={9} />}
          />
        </Route>
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/thank-you-tour" element={<ThankYouTourWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
