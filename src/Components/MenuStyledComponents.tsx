import styled from "styled-components";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
  align-items: center;
`;

export const NavBar = styled.nav`
  background-color: #8b0000;
  color: white;
  padding: 0 32px;
  padding-right: 40px;
  gap: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const LogoIcon = styled.img`
  width: 56px;
  height: 48px;
  margin-right: 10px;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #db0007;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
  }

  &:hover::after {
    visibility: visible;
    transform: scaleX(1);
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

export const FixedTopContainer = styled.div`
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 0.25rem;
  font-size: 16px;
`;

export const LocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  width: 100%;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FilterTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 1rem;
`;

export const FilterOptions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const ToggleButton = styled.div`
  display: flex;
  background-color: #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const ToggleOption = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#db0007" : "transparent")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  padding: 0.25rem 0.75rem;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#b8000a" : "#e0e0e0")};
  }
`;

export const FilterButton = styled.button`
  background-color: #f0f0f0;
  color: black;
  border: none;
  padding: 0.25rem 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 20px;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius: 4px;
  top: 100%;
  left: 0;
`;

export const DropdownItem = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ContentContainer = styled.div`
  padding: 1rem;
  width: 100%;
`;

export const ListingTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

export const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

export const RestaurantCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const RestaurantImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const RestaurantInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const DishName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const RestaurantName = styled.h4`
  margin: 0;
  font-size: 1.4rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;

export const InfoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 48%;
`;

export const VerticalDivider = styled.div`
  width: 0.12px;
  background-color: #d3d3d3;
  align-self: stretch;
`;

export const HorizontalDivider = styled.div`
  width: 69%;
  height: 0.12px;
  background-color: #d3d3d3;
  margin: 0 auto;
`;

export const DishInfo = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const PriceTag = styled.span`
  font-weight: bold;
  color: #db0007;
  margin-bottom: 0.5rem;
`;

export const Tag = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

export const DeliveryTag = styled(Tag)`
  background-color: #4caf50;
  color: white;
`;

export const CateringTag = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f57c00;
  }
`;

export const ChaJanaTag = styled(Tag)`
  background-color: #9c27b0;
  color: white;
`;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const DeliveryInfo = styled(LocationInfo)``;

export const OfferTag = styled(Tag)`
  background-color: #ffc72c;
  color: #333;
`;

export const OrderButton = styled.button`
  background-color: #db0007;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: center;
  margin-top: 1rem;

  &:hover {
    background-color: #b8000a;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const PaginationButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

export const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 3rem;
  padding-left: 69px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FooterSection = styled.div`
  margin-bottom: 0rem;
  margin-right: 1rem;
  text-align: center;
`;

export const FooterLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export const Copyright = styled.p`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #ffa500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 0.25rem;
`;

export const RatingCount = styled.span`
  color: #666;
  font-size: 0.8rem;
  margin-left: 0.25rem;
`;

export const BookTableTag = styled(Tag)`
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  .react-datepicker {
    font-family: Arial, sans-serif;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  .react-datepicker__header {
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
  }
  .react-datepicker__navigation {
    top: 10px;
  }
  .react-datepicker__navigation--previous {
    left: 10px;
  }
  .react-datepicker__navigation--next {
    right: 10px;
  }
  .react-datepicker__time-container {
    border-left: 1px solid #ccc;
  }
  @media (max-width: 768px) {
    .react-datepicker__time-container {
      border-left: none;
      border-top: 1px solid #ccc;
    }
  }
`;

export const ConfirmButton = styled.button`
  background-color: #db0007;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #b8000a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const AddressFormModal = styled(Modal)``;

export const AddressFormContent = styled(ModalContent)`
  max-width: 500px;
`;

export const AddressInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddressFormButton = styled(ConfirmButton)`
  margin-top: 0;
  margin-right: 1rem;
`;

export const GuestNumberInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

export const GuestNumberLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  font-size: 16px;
`;

export const AccommodationTag = styled(Tag)`
  background-color: #1e90ff;
  color: white;
  cursor: pointer;
`;

export const RoomTypeSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AmenitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
`;

export const UtilitiesList = styled(AmenitiesList)``;

export const RoomTypeCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const RoomTypeTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

export const RoomTypePrice = styled.p`
  font-weight: bold;
  margin: 0 0 0.5rem 0;
`;

export const RoomCountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const RoomCountButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const RoomCount = styled.span`
  margin: 0 0.5rem;
`;

export const RoomDetailsToggle = styled.button`
  background: none;
  border: none;
  color: #1e90ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const RoomDetails = styled.div`
  margin-top: 0.5rem;
`;

export const TourPackageTag = styled(Tag)`
  background-color: #2ecc71;
  color: white;
  cursor: pointer;
`;

export const TourPackageModal = styled(Modal)``;

export const TourTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const TourTypeButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#2ecc71" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#27ae60" : "#e0e0e0")};
  }
`;

export const PackageTierContainer = styled(TourTypeContainer)``;

export const PackageTierButton = styled(TourTypeButton)``;

export const FormSection = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export const FormCheckbox = styled.input`
  margin-right: 0.5rem;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  min-height: 100px;
`;

export const SummarySection = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const SummaryItem = styled.p`
  margin: 0.5rem 0;
  font-size: 14px;
`;

export const TotalPrice = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-top: 1rem;
`;