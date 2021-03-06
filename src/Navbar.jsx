// Import React essentials
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// Import icon assets
import searchIcon from "./assets/img/search_white_24dp.svg";
import homeIcon from "./assets/img/home_white_24dp.svg";
import settingsIcon from "./assets/img/settings_white_24dp.svg";
import { HapticComponent } from "./assets/react_components/HapticComponent.jsx"
import statisticsIcon from "./assets/img/analytics_white_24dp.svg";
import loginIcon from "./assets/img/login.svg";
// Import component dependencies
import AddButton from "./assets/react_components/AddButton.jsx";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  height: 70px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  background-color: black;
  width: 100vw;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  color: white;
  & :hover {
    color: gray;
  }
`;

export const NavbarContext = React.createContext();

export default function Navbar() {
  let [menuOpened, setMenuOpened] = useState(false);
  return (
    <HapticComponent>
    <Nav>
        <NavLink to="/">
          <img src={homeIcon} className="home-icon nav-icon" />
        </NavLink>
        <NavbarContext.Provider value={[menuOpened, setMenuOpened]}>
        <AddButton></AddButton>
        <NavLink to="/statistics_page">
          <img src={statisticsIcon} className="statistics-icon nav-icon" />
        </NavLink>
        </NavbarContext.Provider>
        <NavLink to="/settings">
          <img src={settingsIcon} className="settings-icon nav-icon" />
        </NavLink>
    </Nav>
    </HapticComponent>
  );
}
