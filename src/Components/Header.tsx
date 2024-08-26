import React, { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  background-color: #da291c;
  color: white;
  padding: 10px 20px;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  flex-grow: 1;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
  }
`;

interface MobileNavProps {
  isOpen: boolean;
}

const MobileNav = styled.nav<MobileNavProps>`
  display: none;
  @media (max-width: 768px) {
    display: ${(props: MobileNavProps) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    background-color: #333;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
  }
`;

const MobileNavItem = styled(NavItem)`
  padding: 10px 20px;
  &:hover {
    background-color: #444;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>Hotelimaps</Logo>
      <Nav>
        <NavGroup>
          <NavItem href="#">
            <span role="img" aria-label="menu">
              🍔
            </span>{" "}
            Menu
          </NavItem>
          <NavItem href="#">
            <span role="img" aria-label="account">
              👤
            </span>{" "}
            My Account
          </NavItem>
          <NavItem href="#">
            <span role="img" aria-label="support">
              📞
            </span>{" "}
            Support
          </NavItem>
        </NavGroup>
        <NavGroup>
          <NavItem href="#">Sign In</NavItem>
          <NavItem href="#">Guest Order</NavItem>
          <NavItem href="#">Track My Order</NavItem>
        </NavGroup>
      </Nav>
      <HamburgerMenu onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </HamburgerMenu>
      <MobileNav isOpen={isMobileMenuOpen}>
        <MobileNavItem href="#">
          <span role="img" aria-label="menu">
            🍔
          </span>{" "}
          Menu
        </MobileNavItem>
        <MobileNavItem href="#">
          <span role="img" aria-label="account">
            👤
          </span>{" "}
          My Account
        </MobileNavItem>
        <MobileNavItem href="#">
          <span role="img" aria-label="support">
            📞
          </span>{" "}
          Support
        </MobileNavItem>
        <MobileNavItem href="#">Sign In</MobileNavItem>
        <MobileNavItem href="#">Guest Order</MobileNavItem>
        <MobileNavItem href="#">Track My Order</MobileNavItem>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
