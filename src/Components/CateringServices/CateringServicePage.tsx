import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { ChevronDown, ChevronUp, Home, ArrowLeft } from "lucide-react";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #8b0000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  width: 56px;
  height: 48px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  display: flex;
  align-items: center;
  position: relative;

  &:hover::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #db0007;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 8px;
`;

const ProfileContent = styled.div`
  max-width: 800px;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const BusinessInfo = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #db0007;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #db0007;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
  margin-top: 1rem;

  &:hover {
    background-color: #b8000a;
  }
`;

const PortfolioSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PortfolioTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const PortfolioCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const PortfolioImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const PortfolioInfo = styled.div`
  padding: 1rem;
`;

const PortfolioName = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const PortfolioDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #db0007;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const RecommendationSection = styled.div`
  margin-top: 2rem;
  width: 100%;
  overflow: hidden;
`;

const RecommendationTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const RecommendationSliderContainer = styled.div`
  border: 1px solid rgba(204, 204, 204, 0.3);
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  height: 400px;
`;

const RecommendationSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

const RecommendationCard = styled.div`
  flex: 0 0 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const RecommendationImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

const RecommendationInfo = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RecommendationName = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const RecommendationDescription = styled.p`
  font-size: 1rem;
  color: #666;
  flex: 1;
`;

const RecommendationLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const LearnMoreButton = styled(Button)`
  align-self: center;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

// This would typically come from a database or API
const cateringBusinesses = {
  "fresh-greens": {
    name: "Fresh Greens Catering",
    subtitle: "Farm-to-Table Experiences",
    description: `Fresh Greens Catering specializes in providing farm-to-table experiences for all types of events. Our focus is on using locally-sourced, organic ingredients to create memorable meals that not only taste great but also support our local farming community. From intimate gatherings to large corporate events, we offer a range of services including buffet-style setups, plated dinners, and interactive food stations. Our team of experienced chefs can accommodate various dietary requirements, ensuring that all your guests are well-catered for.`,
    image: "https://picsum.photos/seed/freshgreens/300/200",
    logo: "https://picsum.photos/seed/freshgreenslogo/50/50",
    portfolio: [
      {
        name: "Summer Garden Party",
        description:
          "A vibrant buffet featuring seasonal vegetables and grilled local meats.",
        image: "https://picsum.photos/seed/summerparty/300/100",
      },
      {
        name: "Corporate Lunch Boxes",
        description: "Individually packed, nutritious meals for office events.",
        image: "https://picsum.photos/seed/lunchbox/300/100",
      },
      {
        name: "Wedding Feast",
        description:
          "A grand spread of organic delights for a rustic wedding celebration.",
        image: "https://picsum.photos/seed/weddingfeast/300/100",
      },
    ],
  },
  "coastal-delights": {
    name: "Coastal Delights Catering",
    subtitle: "Bringing the Ocean to Your Event",
    description: `At Coastal Delights Catering, we bring the flavors of the ocean to your event. Specializing in seafood and coastal cuisine, we offer a unique catering experience that's perfect for both casual beach parties and elegant seaside weddings. Our menu features a wide array of fresh seafood options, from raw bars and sushi stations to grilled fish and seafood paella. We also offer non-seafood options to ensure all your guests are satisfied. Our experienced team can handle events of all sizes, providing full-service catering including setup, service, and cleanup.`,
    image: "https://picsum.photos/seed/coastaldelights/300/200",
    logo: "https://picsum.photos/seed/coastaldelightslogo/50/50",
    portfolio: [
      {
        name: "Beachside Barbecue",
        description:
          "Grilled seafood and tropical sides for a relaxed beach party.",
        image: "https://picsum.photos/seed/beachbbq/300/100",
      },
      {
        name: "Elegant Seafood Soirée",
        description:
          "A sophisticated spread of premium seafood for upscale events.",
        image: "https://picsum.photos/seed/seafoodsoiree/300/100",
      },
      {
        name: "Sushi Spectacular",
        description:
          "Interactive sushi stations with a variety of fresh fish and rolls.",
        image: "https://picsum.photos/seed/sushispectacular/300/100",
      },
    ],
  },
  "spice-fusion": {
    name: "Spice Fusion Catering",
    subtitle: "A World of Flavors",
    description: `Spice Fusion Catering brings together cuisines from around the world to create unique and exciting culinary experiences. Our team of international chefs specializes in creating custom menus that blend different cultural flavors, resulting in innovative and delicious dishes. Whether you're looking for an Indian-Mexican fusion menu or a Mediterranean-Asian blend, we can create the perfect combination for your event. We cater to all types of events, from intimate dinner parties to large corporate functions.`,
    image: "https://picsum.photos/seed/spicefusion/300/200",
    logo: "https://picsum.photos/seed/spicefusionlogo/50/50",
    portfolio: [
      {
        name: "Global Tapas Night",
        description:
          "A selection of small plates featuring flavors from around the world.",
        image: "https://picsum.photos/seed/globaltapas/300/100",
      },
      {
        name: "Fusion Wedding Feast",
        description:
          "A unique wedding menu blending the couple's cultural backgrounds.",
        image: "https://picsum.photos/seed/fusionwedding/300/100",
      },
      {
        name: "Corporate Culinary Journey",
        description:
          "An interactive food station setup taking guests on a global taste adventure.",
        image: "https://picsum.photos/seed/culinaryjourney/300/100",
      },
    ],
  },
  "green-gourmet": {
    name: "Green Gourmet Catering",
    subtitle: "Sustainable and Delicious",
    description: `Green Gourmet Catering is committed to providing high-quality, delicious food while minimizing our environmental impact. We source our ingredients from local, sustainable farms and use eco-friendly packaging and serving materials. Our menu options include a wide range of vegetarian, vegan, and plant-based dishes that appeal to both herbivores and omnivores alike. We specialize in creating beautiful, Instagram-worthy food presentations that taste as good as they look.`,
    image: "https://picsum.photos/seed/greengourmet/300/200",
    logo: "https://picsum.photos/seed/greengourmetlogo/50/50",
    portfolio: [
      {
        name: "Zero-Waste Wedding",
        description:
          "A fully sustainable wedding feast with minimal environmental impact.",
        image: "https://picsum.photos/seed/zerowastewedding/300/100",
      },
      {
        name: "Plant-Based Corporate Lunch",
        description:
          "Nutritious and delicious vegan options for a health-conscious company.",
        image: "https://picsum.photos/seed/plantbasedlunch/300/100",
      },
      {
        name: "Farm-to-Table Dinner Party",
        description:
          "An intimate gathering featuring the best of local, seasonal produce.",
        image: "https://picsum.photos/seed/farmtotable/300/100",
      },
    ],
  },
  "sweet-celebrations": {
    name: "Sweet Celebrations Catering",
    subtitle: "Making Every Occasion Special",
    description: `Sweet Celebrations Catering specializes in creating unforgettable dessert experiences for all types of events. From elaborate wedding cakes to colorful dessert bars and interactive sweet stations, we bring creativity and deliciousness to every occasion. Our team of pastry chefs can accommodate a wide range of dietary requirements, including gluten-free, vegan, and sugar-free options. We also offer savory catering options, ensuring we can provide a full-service experience for your event.`,
    image: "https://picsum.photos/seed/sweetcelebrations/300/200",
    logo: "https://picsum.photos/seed/sweetcelebrationslogo/50/50",
    portfolio: [
      {
        name: "Whimsical Wedding Cake",
        description:
          "A five-tier masterpiece with intricate sugar flower decorations.",
        image: "https://picsum.photos/seed/weddingcake/300/100",
      },
      {
        name: "Corporate Dessert Bar",
        description:
          "A luxurious spread of mini desserts for a company milestone celebration.",
        image: "https://picsum.photos/seed/dessertbar/300/100",
      },
      {
        name: "Kids' Birthday Party",
        description:
          "A colorful and fun dessert spread with interactive candy stations.",
        image: "https://picsum.photos/seed/kidsparty/300/100",
      },
    ],
  },
};

const CateringServicePage: React.FC = () => {
  const { businessSlug } = useParams<{ businessSlug: string }>();
  const navigate = useNavigate();
  const [expandedPortfolio, setExpandedPortfolio] = useState<string | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const business =
    cateringBusinesses[businessSlug as keyof typeof cateringBusinesses];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % Object.keys(cateringBusinesses).length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!business) {
    return (
      <Container>
        <h2>Catering business not found.</h2>
        <p>The requested catering service "{businessSlug}" does not exist.</p>
        <Button onClick={() => navigate("/menu")}>Return to Menu</Button>
      </Container>
    );
  }

  const handleRequestServices = () => {
    navigate(`/catering-request/step1?business=${businessSlug}`);
  };

  const togglePortfolioExpand = (portfolioName: string) => {
    setExpandedPortfolio(
      expandedPortfolio === portfolioName ? null : portfolioName
    );
  };

  const recommendations = Object.entries(cateringBusinesses)
    .filter(([slug]) => slug !== businessSlug)
    .map(([slug, business]) => ({ slug, ...business }));

  return (
    <>
      <Navbar>
        <Logo to="/">
          <LogoIcon src="/images/Afyafood.png" alt="AfyaRecipes Logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/menu">
            <ArrowLeft size={24} style={{ marginRight: "5px" }} />
            Back
          </NavLink>
          <NavLink to="/">
            <Home size={24} style={{ marginRight: "5px" }} />
            Home
          </NavLink>
        </NavLinks>
      </Navbar>

      <Container>
        <ProfileSection>
          <ProfileContent>
            <ProfileImage src={business.image} alt={business.name} />
            <BusinessInfo>
              <Title>{business.name}</Title>
              <Subtitle>{business.subtitle}</Subtitle>
              <Description>{business.description}</Description>
            </BusinessInfo>

            <PortfolioSection>
              <PortfolioTitle>Our Portfolio</PortfolioTitle>
              <PortfolioGrid>
                {business.portfolio.map((item) => (
                  <PortfolioCard key={item.name}>
                    <PortfolioImage src={item.image} alt={item.name} />
                    <PortfolioInfo>
                      <PortfolioName>{item.name}</PortfolioName>
                      <PortfolioDescription>
                        {expandedPortfolio === item.name
                          ? item.description
                          : `${item.description.slice(0, 100)}...`}
                      </PortfolioDescription>
                      <ExpandButton
                        onClick={() => togglePortfolioExpand(item.name)}
                      >
                        {expandedPortfolio === item.name ? (
                          <>
                            Less <ChevronUp size={16} />
                          </>
                        ) : (
                          <>
                            More <ChevronDown size={16} />
                          </>
                        )}
                      </ExpandButton>
                    </PortfolioInfo>
                  </PortfolioCard>
                ))}
              </PortfolioGrid>
            </PortfolioSection>

            <Button onClick={handleRequestServices}>
              Request for Services
            </Button>
          </ProfileContent>
        </ProfileSection>

        <RecommendationSection>
          <RecommendationTitle>Similar Catering Services</RecommendationTitle>
          <RecommendationSliderContainer>
            <RecommendationSlider
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.slug}>
                  <RecommendationImage
                    src={recommendation.image}
                    alt={recommendation.name}
                  />
                  <RecommendationInfo>
                    <RecommendationLogo
                      src={recommendation.logo}
                      alt={`${recommendation.name} logo`}
                    />
                    <RecommendationName>
                      {recommendation.name}
                    </RecommendationName>
                    <RecommendationDescription>
                      {recommendation.subtitle}
                    </RecommendationDescription>
                    <LearnMoreButton
                      onClick={() =>
                        navigate(`/catering/${recommendation.slug}`)
                      }
                    >
                      Learn More
                    </LearnMoreButton>
                  </RecommendationInfo>
                </RecommendationCard>
              ))}
            </RecommendationSlider>
          </RecommendationSliderContainer>
        </RecommendationSection>
      </Container>

      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>About Us</FooterTitle>
            <FooterLink to="/about">Our Story</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Customer Support</FooterTitle>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Legal</FooterTitle>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
          </FooterSection>
        </FooterContent>
        <Copyright>
          © {new Date().getFullYear()} AfyaRecipes. All rights reserved.
        </Copyright>
      </Footer>
    </>
  );
};

export default CateringServicePage;
