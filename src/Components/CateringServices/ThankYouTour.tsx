import React from "react";

export interface ThankYouTourProps {
  bookingSummary: {
    tourType: string;
    packageTier: string;
    duration: number;
    roomType: string;
    meals: string[];
    activities: string[];
    transportation: string;
    adults: number;
    children: number;
    infants: number;
    startDate: Date | null;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    dietaryRequirements: string[];
    accessibilityNeeds: string;
    specialRequests: string;
    addOns: string[];
    totalPrice: number;
  };
  onClose: () => void;
}

const ThankYouTour: React.FC<ThankYouTourProps> = ({
  bookingSummary,
  onClose,
}) => {
  return (
    <div>
      <h2>Thank You for Your Booking!</h2>
      <p>Tour Type: {bookingSummary.tourType}</p>
      <p>Package Tier: {bookingSummary.packageTier}</p>
      <p>Duration: {bookingSummary.duration} days</p>
      <p>Room Type: {bookingSummary.roomType}</p>
      <p>Meals: {bookingSummary.meals.join(", ")}</p>
      <p>Activities: {bookingSummary.activities.join(", ")}</p>
      <p>Transportation: {bookingSummary.transportation}</p>
      <p>
        Guests: {bookingSummary.adults} Adults, {bookingSummary.children}{" "}
        Children, {bookingSummary.infants} Infants
      </p>
      <p>Start Date: {bookingSummary.startDate?.toLocaleDateString()}</p>
      <p>Full Name: {bookingSummary.fullName}</p>
      <p>Email: {bookingSummary.email}</p>
      <p>Phone: {bookingSummary.phone}</p>
      <p>Country: {bookingSummary.country}</p>
      <p>
        Dietary Requirements: {bookingSummary.dietaryRequirements.join(", ")}
      </p>
      <p>Accessibility Needs: {bookingSummary.accessibilityNeeds}</p>
      <p>Special Requests: {bookingSummary.specialRequests}</p>
      <p>Add-ons: {bookingSummary.addOns.join(", ")}</p>
      <p>Total Price: ${bookingSummary.totalPrice.toFixed(2)}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ThankYouTour;
