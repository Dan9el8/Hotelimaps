import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Star,
  X,
  Plus,
  Minus,
  ChevronUp,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  NavBar,
  Logo,
  LogoIcon,
  NavLink,
  MainContent,
  FixedTopContainer,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  LocationButton,
  FilterContainer,
  FilterTitle,
  FilterOptions,
  ToggleButton,
  ToggleOption,
  FilterButton,
  DropdownContainer,
  DropdownContent,
  DropdownItem,
  ContentContainer,
  ListingTitle,
  RestaurantGrid,
  RestaurantCard,
  RestaurantImage,
  RestaurantInfo,
  DishName,
  RestaurantName,
  InfoColumns,
  InfoColumn,
  VerticalDivider,
  HorizontalDivider,
  DishInfo,
  PriceTag,
  DeliveryTag,
  CateringTag,
  ChaJanaTag,
  LocationInfo,
  DeliveryInfo,
  OfferTag,
  OrderButton,
  PaginationContainer,
  PaginationButton,
  Footer,
  FooterSection,
  FooterLogo,
  FooterLink,
  ContactInfo,
  Copyright,
  StarRating,
  StarContainer,
  RatingCount,
  BookTableTag,
  Modal,
  ModalContent,
  CloseButton,
  StyledDatePicker,
  ConfirmButton,
  AddressFormModal,
  AddressFormContent,
  AddressInput,
  AddressFormButton,
  GuestNumberInput,
  GuestNumberLabel,
  AccommodationTag,
  RoomTypeSelect,
  AmenitiesList,
  UtilitiesList,
  RoomTypeCard,
  RoomTypeTitle,
  RoomTypePrice,
  RoomCountContainer,
  RoomCountButton,
  RoomCount,
  RoomDetailsToggle,
  RoomDetails,
  TourPackageTag,
  TourPackageModal,
  TourTypeContainer,
  TourTypeButton,
  PackageTierContainer,
  PackageTierButton,
  FormSection,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormTextArea,
  SummarySection,
  SummaryItem,
  TotalPrice,
  ErrorMessage,
} from "./MenuStyledComponents";
import ThankYouTour from "./CateringServices/ThankYouTour";

const mockImageUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(`https://picsum.photos/300/200?random=${Math.random()}`);
    };
    reader.readAsDataURL(file);
  });
};

const restaurants = [
  {
    id: 1,
    name: "Fresh Greens",
    dishName: "Swahili Coconut Nyama Choma",
    price: 29.99,
    quantity: "1kg grilled meat (serves 4-6)",
    includes: "500g ugali, 200g kachumbari, 200g sukuma wiki",
    delivery: true,
    pickup: true,
    location: "1234 Veggie St",
    deliveryTime: "60-70 min",
    image: "https://picsum.photos/300/200?random=1",
    offer: "Free Delivery",
    catering: true,
    chaJana: true,
    rating: 4.5,
    ratingCount: 100,
    bookTable: true,
    accommodation: false,
    tourPackage: true,
  },
  {
    id: 2,
    name: "Healthy Bites",
    dishName: "Coastal Seafood Platter",
    price: 34.99,
    quantity: "Mixed seafood (serves 2-3)",
    includes: "300g coconut rice, 150g mango salsa, 100g tamarind sauce",
    delivery: true,
    pickup: false,
    location: "5678 Salad Ave",
    deliveryTime: "45-55 min",
    image: "https://picsum.photos/300/200?random=2",
    offer: "20% Off",
    catering: false,
    chaJana: false,
    rating: 4.2,
    ratingCount: 300,
    bookTable: false,
    accommodation: true,
    tourPackage: true,
  },
];

const accommodationRooms = [
  {
    type: "Standard",
    price: 100,
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning"],
    utilities: ["Towels", "Toiletries", "Coffee Maker"],
  },
  {
    type: "Deluxe",
    price: 150,
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Mini Bar"],
    utilities: ["Towels", "Toiletries", "Coffee Maker", "Bathrobe"],
  },
  {
    type: "Suite",
    price: 200,
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi"],
    utilities: ["Towels", "Toiletries", "Coffee Maker", "Bathrobe", "Slippers"],
  },
];

const tourTypes = [
  "Safari Adventure",
  "Farm Tour",
  "Beach Getaway",
  "Cultural Expedition",
  "City Explorer",
  "Educational Tour",
  "Food Feast",
];

const packageTiers = ["Economy", "Standard", "Deluxe", "Premium"];

const tourActivities = {
  "Safari Adventure": ["Game drives", "Guided walks", "Bird watching"],
  "Farm Tour": [
    "Crop harvesting",
    "Animal feeding",
    "Farm-to-table experience",
  ],
  "Beach Getaway": ["Snorkeling", "Boat trips", "Beach yoga"],
  "Cultural Expedition": [
    "Village visits",
    "Craft workshops",
    "Traditional performances",
  ],
  "City Explorer": ["Guided city tours", "Museum visits", "Local market tours"],
  "Educational Tour": [
    "School/university visits",
    "Industry tours",
    "Expert lectures",
  ],
  "Food Feast": ["Cooking classes", "Food market tours", "Wine tasting"],
};

const priceWeights = {
  tourType: {
    "Safari Adventure": 1000,
    "Farm Tour": 500,
    "Beach Getaway": 800,
    "Cultural Expedition": 700,
    "City Explorer": 600,
    "Educational Tour": 900,
    "Food Feast": 750,
  },
  packageTier: {
    Economy: 1,
    Standard: 1.2,
    Deluxe: 1.5,
    Premium: 2,
  },
  duration: 100,
  roomType: {
    Standard: 50,
    Deluxe: 100,
    Suite: 200,
  },
  meals: {
    Breakfast: 15,
    Lunch: 20,
    Dinner: 25,
  },
  activities: 50,
  transportation: {
    "Shared tour vehicle": 50,
    "Private tour vehicle": 100,
    "Self-drive option": 0,
  },
  addOns: {
    "Airport Transfer": 50,
    "Travel Insurance": 30,
    "Equipment Rental": 20,
    "Spa Treatments": 80,
    "Guided Shopping Tour": 40,
  },
};

interface TourFormData {
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
  termsAndConditions: boolean;
}

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [currentPage, setCurrentPage] = useState(1);
  const [userLocation, setUserLocation] = useState("3109 Wingdom Dr.");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Recommended");
  const [currentItems, setCurrentItems] = useState(restaurants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [guestNumber, setGuestNumber] = useState(1);
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] =
    useState(false);
  const [accommodationCheckInDate, setAccommodationCheckInDate] =
    useState<Date | null>(null);
  const [accommodationCheckOutDate, setAccommodationCheckOutDate] =
    useState<Date | null>(null);
  const [roomCounts, setRoomCounts] = useState({
    Standard: 0,
    Deluxe: 0,
    Suite: 0,
  });
  const [expandedRoomTypes, setExpandedRoomTypes] = useState({
    Standard: false,
    Deluxe: false,
    Suite: false,
  });
  const [isTourPackageModalOpen, setIsTourPackageModalOpen] = useState(false);
  const [selectedRestaurantForTour, setSelectedRestaurantForTour] = useState<
    string | null
  >(null);
  const [selectedTourType, setSelectedTourType] = useState<string | null>(null);
  const [selectedPackageTier, setSelectedPackageTier] = useState<string | null>(
    null
  );
  const [tourFormData, setTourFormData] = useState<TourFormData>({
    duration: 1,
    roomType: "Standard",
    meals: [],
    activities: [],
    transportation: "Shared tour vehicle",
    adults: 1,
    children: 0,
    infants: 0,
    startDate: null,
    fullName: "",
    email: "",
    phone: "",
    country: "",
    dietaryRequirements: [],
    accessibilityNeeds: "",
    specialRequests: "",
    addOns: [],
    termsAndConditions: false,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [tourBookingSummary, setTourBookingSummary] =
    useState<TourFormData | null>(null);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        !(event.target as Element).closest(".dropdown-container")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSort = async (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleBookTable = (restaurantName: string, dishName: string) => {
    setSelectedRestaurant(restaurantName);
    setSelectedDish(dishName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedRestaurant(null);
    setSelectedDish(null);
    setGuestNumber(1);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedRestaurant && selectedDish) {
      console.log(
        `Booking confirmed for ${selectedRestaurant} (${selectedDish}) on ${selectedDate} for ${guestNumber} guest(s)`
      );
      setIsModalOpen(false);
      setIsConfirmationModalOpen(true);
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedDate(null);
    setSelectedRestaurant(null);
    setSelectedDish(null);
    setGuestNumber(1);
    setRoomCounts({ Standard: 0, Deluxe: 0, Suite: 0 });
    setAccommodationCheckInDate(null);
    setAccommodationCheckOutDate(null);
  };

  const handleOpenAddressForm = () => {
    setIsAddressFormOpen(true);
  };

  const handleCloseAddressForm = () => {
    setIsAddressFormOpen(false);
    setNewAddress("");
  };

  const handleConfirmAddress = () => {
    setUserLocation(newAddress);
    handleCloseAddressForm();
  };

  const handleGuestNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setGuestNumber(value);
    }
  };

  const handleCateringClick = (restaurantName: string) => {
    const slug = restaurantName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/catering/${encodeURIComponent(slug)}`);
  };

  const handleAccommodationClick = (restaurantName: string) => {
    setSelectedRestaurant(restaurantName);
    setIsAccommodationModalOpen(true);
  };

  const handleCloseAccommodationModal = () => {
    setIsAccommodationModalOpen(false);
    setSelectedRestaurant(null);
    setRoomCounts({ Standard: 0, Deluxe: 0, Suite: 0 });
    setAccommodationCheckInDate(null);
    setAccommodationCheckOutDate(null);
    setExpandedRoomTypes({ Standard: false, Deluxe: false, Suite: false });
  };

  const handleConfirmAccommodationBooking = () => {
    if (
      selectedRestaurant &&
      (roomCounts.Standard > 0 ||
        roomCounts.Deluxe > 0 ||
        roomCounts.Suite > 0) &&
      accommodationCheckInDate &&
      accommodationCheckOutDate
    ) {
      const totalAmount = calculateAccommodationTotalAmount();
      console.log(
        `Accommodation booking initiated for ${selectedRestaurant}:\n` +
          `Standard Rooms: ${roomCounts.Standard}\n` +
          `Deluxe Rooms: ${roomCounts.Deluxe}\n` +
          `Suite Rooms: ${roomCounts.Suite}\n` +
          `Check-in: ${accommodationCheckInDate.toLocaleDateString()}\n` +
          `Check-out: ${accommodationCheckOutDate.toLocaleDateString()}\n` +
          `Total Amount: Ksh. ${totalAmount}`
      );
      setIsAccommodationModalOpen(false);
      setIsConfirmationModalOpen(true);
    }
  };

  const handleRoomCountChange = (roomType: string, increment: boolean) => {
    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [roomType]: increment
        ? prevCounts[roomType as keyof typeof prevCounts] + 1
        : Math.max(0, prevCounts[roomType as keyof typeof prevCounts] - 1),
    }));
  };

  const toggleRoomDetails = (roomType: string) => {
    setExpandedRoomTypes((prevExpanded) => ({
      ...prevExpanded,
      [roomType]: !prevExpanded[roomType as keyof typeof prevExpanded],
    }));
  };

  const calculateAccommodationTotalAmount = () => {
    const nightsStayed =
      accommodationCheckInDate && accommodationCheckOutDate
        ? Math.ceil(
            (accommodationCheckOutDate.getTime() -
              accommodationCheckInDate.getTime()) /
              (1000 * 3600 * 24)
          )
        : 0;

    return accommodationRooms.reduce((total, room) => {
      return (
        total +
        room.price *
          roomCounts[room.type as keyof typeof roomCounts] *
          nightsStayed
      );
    }, 0);
  };

  const handleTourPackageClick = (restaurantName: string) => {
    setSelectedRestaurantForTour(restaurantName);
    setIsTourPackageModalOpen(true);
  };

  const handleCloseTourPackageModal = () => {
    setIsTourPackageModalOpen(false);
    setSelectedRestaurantForTour(null);
    setSelectedTourType(null);
    setSelectedPackageTier(null);
    setTourFormData({
      duration: 1,
      roomType: "Standard",
      meals: [],
      activities: [],
      transportation: "Shared tour vehicle",
      adults: 1,
      children: 0,
      infants: 0,
      startDate: null,
      fullName: "",
      email: "",
      phone: "",
      country: "",
      dietaryRequirements: [],
      accessibilityNeeds: "",
      specialRequests: "",
      addOns: [],
      termsAndConditions: false,
    });
    setFormErrors({});
  };

  const handleTourTypeSelect = (tourType: string) => {
    setSelectedTourType(tourType);
    setSelectedPackageTier(null);
    setTourFormData((prevData) => ({
      ...prevData,
      activities: [],
    }));
  };

  const handlePackageTierSelect = (tier: string) => {
    setSelectedPackageTier(tier);
  };

  const handleTourFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const checkedValue = checkbox.value;
      setTourFormData((prevData) => ({
        ...prevData,
        [name]:
          name === "termsAndConditions"
            ? checkbox.checked
            : checkbox.checked
            ? [...prevData[name as keyof TourFormData], checkedValue]
            : (prevData[name as keyof TourFormData] as string[]).filter(
                (item) => item !== checkedValue
              ),
      }));
    } else if (type === "number") {
      setTourFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      setTourFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const calculateTourPrice = () => {
    if (!selectedTourType || !selectedPackageTier) return 0;

    let totalPrice =
      priceWeights.tourType[
        selectedTourType as keyof typeof priceWeights.tourType
      ] *
      priceWeights.packageTier[
        selectedPackageTier as keyof typeof priceWeights.packageTier
      ];

    totalPrice += tourFormData.duration * priceWeights.duration;
    totalPrice +=
      priceWeights.roomType[
        tourFormData.roomType as keyof typeof priceWeights.roomType
      ];

    tourFormData.meals.forEach((meal) => {
      totalPrice += priceWeights.meals[meal as keyof typeof priceWeights.meals];
    });

    totalPrice += tourFormData.activities.length * priceWeights.activities;
    totalPrice +=
      priceWeights.transportation[
        tourFormData.transportation as keyof typeof priceWeights.transportation
      ];

    tourFormData.addOns.forEach((addOn) => {
      totalPrice +=
        priceWeights.addOns[addOn as keyof typeof priceWeights.addOns];
    });

    totalPrice *= tourFormData.adults + tourFormData.children * 0.5;

    return totalPrice;
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!tourFormData.fullName) errors.fullName = "Full name is required";
    if (!tourFormData.email) errors.email = "Email is required";
    if (!tourFormData.phone) errors.phone = "Phone number is required";
    if (!tourFormData.country) errors.country = "Country is required";
    if (tourFormData.adults < 1)
      errors.adults = "At least one adult is required";
    if (!tourFormData.startDate) errors.startDate = "Start date is required";
    if (!tourFormData.termsAndConditions) {
      errors.termsAndConditions = "You must agree to the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmTourBooking = () => {
    if (validateForm()) {
      const bookingSummary = {
        ...tourFormData,
        tourType: selectedTourType,
        packageTier: selectedPackageTier,
        totalPrice: calculateTourPrice(),
      };
      setTourBookingSummary(bookingSummary);
      setShowThankYouModal(true);
      handleCloseTourPackageModal();
    } else {
      console.log("Form validation failed");
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;

    return (
      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={12}
            fill={
              index < fullStars
                ? "#ffa500"
                : index === fullStars && decimalPart > 0
                ? `url(#partialFill-${index})`
                : "none"
            }
            color="#ffa500"
            strokeWidth={2}
          >
            {index === fullStars && decimalPart > 0 && (
              <defs>
                <linearGradient
                  id={`partialFill-${index}`}
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset={`${decimalPart * 100}%`} stopColor="#ffa500" />
                  <stop
                    offset={`${decimalPart * 100}%`}
                    stopColor="transparent"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
            )}
          </Star>
        ))}
      </StarContainer>
    );
  };

  return (
    <Container>
      <NavBar>
        <Logo to="/">
          <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
          Hotelimaps
        </Logo>
        <NavLink to="/">Home</NavLink>
      </NavBar>

      <MainContent>
        <FixedTopContainer>
          <SearchContainer>
            <SearchInputWrapper>
              <Search size={32} style={{ margin: "0 0.5rem" }} />
              <SearchInput
                type="text"
                placeholder="Search restaurants or dishes"
              />
            </SearchInputWrapper>
            <LocationButton onClick={handleOpenAddressForm}>
              <MapPin size={32} style={{ marginRight: "0.25rem" }} />
              {userLocation}
            </LocationButton>
          </SearchContainer>

          <FilterContainer>
            <FilterTitle>Sort and Filter</FilterTitle>
            <FilterOptions>
              <ToggleButton>
                <ToggleOption
                  active={deliveryMode === "delivery"}
                  onClick={() => setDeliveryMode("delivery")}
                >
                  Delivery
                </ToggleOption>
                <ToggleOption
                  active={deliveryMode === "pickup"}
                  onClick={() => setDeliveryMode("pickup")}
                >
                  Pickup
                </ToggleOption>
              </ToggleButton>
              <DropdownContainer className="dropdown-container">
                <FilterButton
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Sort: {sortOption}{" "}
                  <ChevronDown size={24} style={{ marginLeft: "0.25rem" }} />
                </FilterButton>
                <DropdownContent isOpen={isDropdownOpen}>
                  <DropdownItem onClick={() => handleSort("Recommended")}>
                    Recommended
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Most Popular")}>
                    Most Popular
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Rating")}>
                    Rating
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Delivery Time")}>
                    Delivery Time
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Catering Services")}>
                    Catering Services
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Cha Jana")}>
                    Cha Jana
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Book Table")}>
                    Book Table
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Accommodation")}>
                    Accommodation
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSort("Tour Package")}>
                    Tour Package
                  </DropdownItem>
                </DropdownContent>
              </DropdownContainer>
              <FilterButton>Offers</FilterButton>
              <FilterButton>Popular</FilterButton>
            </FilterOptions>
          </FilterContainer>
        </FixedTopContainer>

        <ContentContainer>
          <ListingTitle>Restaurant Listings</ListingTitle>
          <RestaurantGrid>
            {currentItems
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((item) => (
                <RestaurantCard key={item.id}>
                  <RestaurantImage src={item.image} alt={item.name} />
                  <RestaurantInfo>
                    <RestaurantName>{item.name}</RestaurantName>
                    <InfoColumns>
                      <InfoColumn>
                        <DishName>{item.dishName}</DishName>
                        <DishInfo>Quantity: {item.quantity}</DishInfo>
                        <DishInfo>Includes: {item.includes}</DishInfo>
                        <PriceTag>Ksh. {item.price.toFixed(2)}</PriceTag>
                        <DeliveryTag>
                          {item.delivery ? "Delivery" : "Pickup Only"}
                        </DeliveryTag>
                        {item.offer && <OfferTag>{item.offer}</OfferTag>}
                      </InfoColumn>
                      <VerticalDivider />
                      <InfoColumn>
                        <StarRating>
                          {renderStars(item.rating)}
                          {item.rating.toFixed(1)}
                          <RatingCount>({item.ratingCount})</RatingCount>
                        </StarRating>
                        <LocationInfo>
                          <MapPin
                            size={16}
                            style={{ marginRight: "0.25rem" }}
                          />
                          {item.location}
                        </LocationInfo>
                        {item.delivery && (
                          <DeliveryInfo>
                            <Clock
                              size={16}
                              style={{ marginRight: "0.25rem" }}
                            />
                            {item.deliveryTime}
                          </DeliveryInfo>
                        )}
                        {item.catering && (
                          <CateringTag
                            onClick={() => handleCateringClick(item.name)}
                          >
                            Catering Services
                          </CateringTag>
                        )}
                        {item.chaJana && (
                          <ChaJanaTag>Cha Jana Offers</ChaJanaTag>
                        )}
                        {item.bookTable && (
                          <BookTableTag
                            onClick={() =>
                              handleBookTable(item.name, item.dishName)
                            }
                          >
                            Book a Table
                          </BookTableTag>
                        )}
                        {item.accommodation && (
                          <AccommodationTag
                            onClick={() => handleAccommodationClick(item.name)}
                          >
                            Accommodation
                          </AccommodationTag>
                        )}
                        {item.tourPackage && (
                          <TourPackageTag
                            onClick={() => handleTourPackageClick(item.name)}
                          >
                            Tour Package
                          </TourPackageTag>
                        )}
                      </InfoColumn>
                    </InfoColumns>
                    <HorizontalDivider />
                    <OrderButton>Order Now</OrderButton>
                  </RestaurantInfo>
                </RestaurantCard>
              ))}
          </RestaurantGrid>

          <PaginationContainer>
            <PaginationButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </PaginationButton>
            {Array.from({
              length: Math.ceil(currentItems.length / itemsPerPage),
            }).map((_, index) => (
              <PaginationButton
                key={index}
                onClick={() => paginate(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
            <PaginationButton
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(currentItems.length / itemsPerPage)
              }
            >
              <ChevronRight size={20} />
            </PaginationButton>
          </PaginationContainer>
        </ContentContainer>
      </MainContent>

      <Footer>
        <FooterSection>
          <FooterLogo to="/">
            <LogoIcon src="./Logo.png" alt="Hotelimaps Logo" />
            Hotelimaps
          </FooterLogo>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/terms">Terms and Conditions</FooterLink>
        </FooterSection>
        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <Phone size={16} style={{ marginRight: "0.5rem" }} />
            +(254)705477395
          </ContactInfo>
          <ContactInfo>
            <Mail size={16} style={{ marginRight: "0.5rem" }} />
            support@hotelimaps.com
          </ContactInfo>
        </FooterSection>
        <Copyright>
          © {new Date().getFullYear()} Hotelimaps. All rights reserved.
        </Copyright>
      </Footer>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Book a Table</h2>
            <p>Restaurant: {selectedRestaurant}</p>
            <p>Dish: {selectedDish}</p>
            <StyledDatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              placeholderText="Select date and time"
              inline
            />
            <GuestNumberLabel>
              Number of Guest(s):
              <GuestNumberInput
                type="number"
                min="1"
                value={guestNumber}
                onChange={handleGuestNumberChange}
              />
            </GuestNumberLabel>
            <ConfirmButton
              onClick={handleConfirmBooking}
              disabled={!selectedDate}
            >
              Confirm Booking
            </ConfirmButton>
            <CloseButton onClick={handleCloseModal}>
              <X />
            </CloseButton>
          </ModalContent>
        </Modal>
      )}

      {isConfirmationModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Booking Initiated</h2>
            {selectedDish ? (
              <>
                <p>
                  Your table booking for {selectedRestaurant} has been
                  initiated.
                </p>
                <p>Dish: {selectedDish}</p>
                <p>Date and Time: {selectedDate?.toLocaleString()}</p>
                <p>Number of Guests: {guestNumber}</p>
              </>
            ) : selectedRestaurantForTour ? (
              <>
                <p>
                  Your tour package booking for {selectedRestaurantForTour} has
                  been initiated.
                </p>
                <p>Tour Type: {selectedTourType}</p>
                <p>Package Tier: {selectedPackageTier}</p>
                <p>Duration: {tourFormData.duration} days</p>
                <p>
                  Start Date: {tourFormData.startDate?.toLocaleDateString()}
                </p>
                <p>Number of Adults: {tourFormData.adults}</p>
                <p>Number of Children: {tourFormData.children}</p>
                <p>Number of Infants: {tourFormData.infants}</p>
                <p>Total Price: Ksh. {calculateTourPrice().toFixed(2)}</p>
              </>
            ) : (
              <>
                <p>
                  Your accommodation booking for {selectedRestaurant} has been
                  initiated.
                </p>
                <p>Room Details:</p>
                {Object.entries(roomCounts).map(
                  ([type, count]) =>
                    count > 0 && (
                      <p key={type}>
                        {type} Rooms: {count}
                      </p>
                    )
                )}
                <p>
                  Check-in: {accommodationCheckInDate?.toLocaleDateString()}
                </p>
                <p>
                  Check-out: {accommodationCheckOutDate?.toLocaleDateString()}
                </p>
                <p>
                  Total Amount: Ksh.{" "}
                  {calculateAccommodationTotalAmount().toFixed(2)}
                </p>
              </>
            )}
            <p>We will confirm your reservation shortly.</p>
            <ConfirmButton onClick={handleCloseConfirmationModal}>
              Close
            </ConfirmButton>
          </ModalContent>
        </Modal>
      )}

      {isAddressFormOpen && (
        <AddressFormModal>
          <AddressFormContent>
            <h2>Enter Your Address</h2>
            <AddressInput
              type="text"
              value={newAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewAddress(e.target.value)
              }
              placeholder="Enter your street address"
            />
            <div>
              <AddressFormButton onClick={handleConfirmAddress}>
                Confirm
              </AddressFormButton>
              <AddressFormButton onClick={handleCloseAddressForm}>
                Cancel
              </AddressFormButton>
            </div>
            <CloseButton onClick={handleCloseAddressForm}>
              <X />
            </CloseButton>
          </AddressFormContent>
        </AddressFormModal>
      )}

      {isAccommodationModalOpen && (
        <Modal>
          <ModalContent>
            <h2>Book Accommodation</h2>
            <p>Restaurant: {selectedRestaurant}</p>
            {accommodationRooms.map((room) => (
              <RoomTypeCard key={room.type}>
                <RoomTypeTitle>{room.type}</RoomTypeTitle>
                <RoomTypePrice>Ksh. {room.price} per night</RoomTypePrice>
                <RoomCountContainer>
                  <RoomCountButton
                    onClick={() => handleRoomCountChange(room.type, false)}
                  >
                    <Minus size={16} />
                  </RoomCountButton>
                  <RoomCount>
                    {roomCounts[room.type as keyof typeof roomCounts]}
                  </RoomCount>
                  <RoomCountButton
                    onClick={() => handleRoomCountChange(room.type, true)}
                  >
                    <Plus size={16} />
                  </RoomCountButton>
                </RoomCountContainer>
                <RoomDetailsToggle onClick={() => toggleRoomDetails(room.type)}>
                  Room Details{" "}
                  {expandedRoomTypes[
                    room.type as keyof typeof expandedRoomTypes
                  ] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </RoomDetailsToggle>
                {expandedRoomTypes[
                  room.type as keyof typeof expandedRoomTypes
                ] && (
                  <RoomDetails>
                    <h4>Amenities:</h4>
                    <AmenitiesList>
                      {room.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </AmenitiesList>
                    <h4>Utilities:</h4>
                    <UtilitiesList>
                      {room.utilities.map((utility, index) => (
                        <li key={index}>{utility}</li>
                      ))}
                    </UtilitiesList>
                  </RoomDetails>
                )}
              </RoomTypeCard>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>Check-in Date:</p>
                <StyledDatePicker
                  selected={accommodationCheckInDate}
                  onChange={(date: Date) => setAccommodationCheckInDate(date)}
                  selectsStart
                  startDate={accommodationCheckInDate}
                  endDate={accommodationCheckOutDate}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select check-in date"
                />
              </div>
              <div>
                <p>Check-out Date:</p>
                <StyledDatePicker
                  selected={accommodationCheckOutDate}
                  onChange={(date: Date) => setAccommodationCheckOutDate(date)}
                  selectsEnd
                  startDate={accommodationCheckInDate}
                  endDate={accommodationCheckOutDate}
                  minDate={accommodationCheckInDate}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select check-out date"
                />
              </div>
            </div>
            <p>
              Total Amount: Ksh.{" "}
              {calculateAccommodationTotalAmount().toFixed(2)}
            </p>
            <ConfirmButton
              onClick={handleConfirmAccommodationBooking}
              disabled={
                !accommodationCheckInDate ||
                !accommodationCheckOutDate ||
                Object.values(roomCounts).every((count) => count === 0)
              }
            >
              Confirm Booking
            </ConfirmButton>
            <CloseButton onClick={handleCloseAccommodationModal}>
              <X />
            </CloseButton>
          </ModalContent>
        </Modal>
      )}

      {isTourPackageModalOpen && (
        <TourPackageModal>
          <ModalContent>
            <h2>Book Tour Package</h2>
            <p>Restaurant: {selectedRestaurantForTour}</p>

            <FormSection>
              <h3>Tour Type</h3>
              <TourTypeContainer>
                {tourTypes.map((type) => (
                  <TourTypeButton
                    key={type}
                    onClick={() => handleTourTypeSelect(type)}
                    selected={selectedTourType === type}
                  >
                    {type}
                  </TourTypeButton>
                ))}
              </TourTypeContainer>
            </FormSection>

            {selectedTourType && (
              <FormSection>
                <h3>Package Tier</h3>
                <PackageTierContainer>
                  {packageTiers.map((tier) => (
                    <PackageTierButton
                      key={tier}
                      onClick={() => handlePackageTierSelect(tier)}
                      selected={selectedPackageTier === tier}
                    >
                      {tier}
                    </PackageTierButton>
                  ))}
                </PackageTierContainer>
              </FormSection>
            )}

            {selectedPackageTier && (
              <>
                <FormSection>
                  <h3>Package Details</h3>
                  <FormLabel>
                    Duration (days):
                    <FormInput
                      type="number"
                      name="duration"
                      value={tourFormData.duration}
                      onChange={handleTourFormChange}
                      min="1"
                      max="14"
                    />
                  </FormLabel>

                  <FormLabel>
                    Room Type:
                    <FormSelect
                      name="roomType"
                      value={tourFormData.roomType}
                      onChange={handleTourFormChange}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </FormSelect>
                  </FormLabel>

                  <FormLabel>
                    Meals:
                    <FormCheckbox
                      type="checkbox"
                      name="meals"
                      value="Breakfast"
                      checked={tourFormData.meals.includes("Breakfast")}
                      onChange={handleTourFormChange}
                    />
                    Breakfast
                    <FormCheckbox
                      type="checkbox"
                      name="meals"
                      value="Lunch"
                      checked={tourFormData.meals.includes("Lunch")}
                      onChange={handleTourFormChange}
                    />
                    Lunch
                    <FormCheckbox
                      type="checkbox"
                      name="meals"
                      value="Dinner"
                      checked={tourFormData.meals.includes("Dinner")}
                      onChange={handleTourFormChange}
                    />
                    Dinner
                  </FormLabel>

                  <FormLabel>
                    Activities:
                    {tourActivities[selectedTourType].map((activity) => (
                      <div key={activity}>
                        <FormCheckbox
                          type="checkbox"
                          name="activities"
                          value={activity}
                          checked={tourFormData.activities.includes(activity)}
                          onChange={handleTourFormChange}
                        />
                        {activity}
                      </div>
                    ))}
                  </FormLabel>

                  <FormLabel>
                    Transportation:
                    <FormSelect
                      name="transportation"
                      value={tourFormData.transportation}
                      onChange={handleTourFormChange}
                    >
                      <option value="Shared tour vehicle">
                        Shared tour vehicle
                      </option>
                      <option value="Private tour vehicle">
                        Private tour vehicle
                      </option>
                      <option value="Self-drive option">
                        Self-drive option
                      </option>
                    </FormSelect>
                  </FormLabel>
                </FormSection>

                <FormSection>
                  <h3>Guest Information</h3>
                  <FormLabel>
                    Number of Adults:
                    <FormInput
                      type="number"
                      name="adults"
                      value={tourFormData.adults}
                      onChange={handleTourFormChange}
                      min="1"
                    />
                    {formErrors.adults && (
                      <ErrorMessage>{formErrors.adults}</ErrorMessage>
                    )}
                  </FormLabel>
                  <FormLabel>
                    Number of Children:
                    <FormInput
                      type="number"
                      name="children"
                      value={tourFormData.children}
                      onChange={handleTourFormChange}
                      min="0"
                    />
                  </FormLabel>
                  <FormLabel>
                    Number of Infants:
                    <FormInput
                      type="number"
                      name="infants"
                      value={tourFormData.infants}
                      onChange={handleTourFormChange}
                      min="0"
                    />
                  </FormLabel>
                </FormSection>

                <FormSection>
                  <h3>Date Selection</h3>
                  <FormLabel>
                    Start Date:
                    <StyledDatePicker
                      selected={tourFormData.startDate}
                      onChange={(date: Date) =>
                        setTourFormData((prev) => ({
                          ...prev,
                          startDate: date,
                        }))
                      }
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select start date"
                    />
                    {formErrors.startDate && (
                      <ErrorMessage>{formErrors.startDate}</ErrorMessage>
                    )}
                  </FormLabel>
                </FormSection>

                <FormSection>
                  <h3>Personal Details</h3>
                  <FormLabel>
                    Full Name:
                    <FormInput
                      type="text"
                      name="fullName"
                      value={tourFormData.fullName}
                      onChange={handleTourFormChange}
                    />
                    {formErrors.fullName && (
                      <ErrorMessage>{formErrors.fullName}</ErrorMessage>
                    )}
                  </FormLabel>
                  <FormLabel>
                    Email Address:
                    <FormInput
                      type="email"
                      name="email"
                      value={tourFormData.email}
                      onChange={handleTourFormChange}
                    />
                    {formErrors.email && (
                      <ErrorMessage>{formErrors.email}</ErrorMessage>
                    )}
                  </FormLabel>
                  <FormLabel>
                    Phone Number:
                    <FormInput
                      type="tel"
                      name="phone"
                      value={tourFormData.phone}
                      onChange={handleTourFormChange}
                    />
                    {formErrors.phone && (
                      <ErrorMessage>{formErrors.phone}</ErrorMessage>
                    )}
                  </FormLabel>
                  <FormLabel>
                    Country of Origin:
                    <FormSelect
                      name="country"
                      value={tourFormData.country}
                      onChange={handleTourFormChange}
                    >
                      <option value="">Select a country</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Tanzania">Tanzania</option>
                      {/* Add more countries as needed */}
                    </FormSelect>
                    {formErrors.country && (
                      <ErrorMessage>{formErrors.country}</ErrorMessage>
                    )}
                  </FormLabel>
                </FormSection>

                <FormSection>
                  <h3>Special Requests</h3>
                  <FormLabel>
                    Dietary Requirements:
                    <FormCheckbox
                      type="checkbox"
                      name="dietaryRequirements"
                      value="Vegetarian"
                      checked={tourFormData.dietaryRequirements.includes(
                        "Vegetarian"
                      )}
                      onChange={handleTourFormChange}
                    />
                    Vegetarian
                    <FormCheckbox
                      type="checkbox"
                      name="dietaryRequirements"
                      value="Vegan"
                      checked={tourFormData.dietaryRequirements.includes(
                        "Vegan"
                      )}
                      onChange={handleTourFormChange}
                    />
                    Vegan
                    <FormCheckbox
                      type="checkbox"
                      name="dietaryRequirements"
                      value="Gluten-free"
                      checked={tourFormData.dietaryRequirements.includes(
                        "Gluten-free"
                      )}
                      onChange={handleTourFormChange}
                    />
                    Gluten-free
                    <FormCheckbox
                      type="checkbox"
                      name="dietaryRequirements"
                      value="Halal"
                      checked={tourFormData.dietaryRequirements.includes(
                        "Halal"
                      )}
                      onChange={handleTourFormChange}
                    />
                    Halal
                  </FormLabel>
                  <FormLabel>
                    Accessibility Needs:
                    <FormTextArea
                      name="accessibilityNeeds"
                      value={tourFormData.accessibilityNeeds}
                      onChange={handleTourFormChange}
                    />
                  </FormLabel>
                  <FormLabel>
                    Other Special Requests:
                    <FormTextArea
                      name="specialRequests"
                      value={tourFormData.specialRequests}
                      onChange={handleTourFormChange}
                    />
                  </FormLabel>
                </FormSection>

                <FormSection>
                  <h3>Add-ons</h3>
                  <FormLabel>
                    <FormCheckbox
                      type="checkbox"
                      name="addOns"
                      value="Airport Transfer"
                      checked={tourFormData.addOns.includes("Airport Transfer")}
                      onChange={handleTourFormChange}
                    />
                    Airport Transfer
                  </FormLabel>
                  <FormLabel>
                    <FormCheckbox
                      type="checkbox"
                      name="addOns"
                      value="Travel Insurance"
                      checked={tourFormData.addOns.includes("Travel Insurance")}
                      onChange={handleTourFormChange}
                    />
                    Travel Insurance
                  </FormLabel>
                  <FormLabel>
                    <FormCheckbox
                      type="checkbox"
                      name="addOns"
                      value="Equipment Rental"
                      checked={tourFormData.addOns.includes("Equipment Rental")}
                      onChange={handleTourFormChange}
                    />
                    Equipment Rental
                  </FormLabel>
                  <FormLabel>
                    <FormCheckbox
                      type="checkbox"
                      name="addOns"
                      value="Spa Treatments"
                      checked={tourFormData.addOns.includes("Spa Treatments")}
                      onChange={handleTourFormChange}
                    />
                    Spa Treatments
                  </FormLabel>
                  <FormLabel>
                    <FormCheckbox
                      type="checkbox"
                      name="addOns"
                      value="Guided Shopping Tour"
                      checked={tourFormData.addOns.includes(
                        "Guided Shopping Tour"
                      )}
                      onChange={handleTourFormChange}
                    />
                    Guided Shopping Tour
                  </FormLabel>
                </FormSection>

                <FormSection>
                  <h3>Review and Confirm</h3>
                  <SummarySection>
                    <SummaryItem>Tour Type: {selectedTourType}</SummaryItem>
                    <SummaryItem>
                      Package Tier: {selectedPackageTier}
                    </SummaryItem>
                    <SummaryItem>
                      Duration: {tourFormData.duration} days
                    </SummaryItem>
                    <SummaryItem>
                      Room Type: {tourFormData.roomType}
                    </SummaryItem>
                    <SummaryItem>
                      Meals: {tourFormData.meals.join(", ")}
                    </SummaryItem>
                    <SummaryItem>
                      Activities: {tourFormData.activities.join(", ")}
                    </SummaryItem>
                    <SummaryItem>
                      Transportation: {tourFormData.transportation}
                    </SummaryItem>
                    <SummaryItem>
                      Guests: {tourFormData.adults} Adults,{" "}
                      {tourFormData.children} Children, {tourFormData.infants}{" "}
                      Infants
                    </SummaryItem>
                    <SummaryItem>
                      Start Date: {tourFormData.startDate?.toLocaleDateString()}
                    </SummaryItem>
                    <SummaryItem>
                      Dietary Requirements:{" "}
                      {tourFormData.dietaryRequirements.join(", ")}
                    </SummaryItem>
                    <SummaryItem>
                      Add-ons: {tourFormData.addOns.join(", ")}
                    </SummaryItem>
                    <TotalPrice>
                      Estimated Total Price: Ksh.{" "}
                      {calculateTourPrice().toFixed(2)}
                    </TotalPrice>
                  </SummarySection>
                  <FormLabel>
                    <FormCheckbox
                      type="checkbox"
                      name="termsAndConditions"
                      checked={tourFormData.termsAndConditions}
                      onChange={handleTourFormChange}
                    />
                    I agree to the Terms and Conditions
                    {formErrors.termsAndConditions && (
                      <ErrorMessage>
                        {formErrors.termsAndConditions}
                      </ErrorMessage>
                    )}
                  </FormLabel>
                  <ConfirmButton
                    onClick={handleConfirmTourBooking}
                    disabled={!tourFormData.termsAndConditions}
                  >
                    Initiate Booking
                  </ConfirmButton>
                </FormSection>
              </>
            )}
            <CloseButton onClick={handleCloseTourPackageModal}>
              <X />
            </CloseButton>
          </ModalContent>
        </TourPackageModal>
      )}

      {showThankYouModal && tourBookingSummary && (
        <ThankYouTour
          bookingSummary={tourBookingSummary}
          onClose={() => setShowThankYouModal(false)}
        />
      )}
    </Container>
  );
};

export default Menu;
