import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import searchIcon from './assets/img/search_white_24dp.svg'
import homeIcon from './assets/img/home_white_24dp.svg'
import settingsIcon from './assets/img/settings_white_24dp.svg'
import AddButton from './assets/react_components/AddButton.jsx'
import firebase from 'firebase';

export default function Navbar() {
  let [currentPage, setCurrentPage] = useState(0);
  
  useEffect(() => {
    console.log("Time to update currentPage");
    // Let's color the page they are on?

  }, [currentPage])
  const styles = {
    nav: {
      width: '100%',
      height: '60px',
      lineHeight: '60px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      position: 'fixed',
      bottom: '0px'
    },
    nav_link: {
      width: '100%',
      color: 'lightGray',
      textDecoration: 'none',
      lineHeight: '25px'
    }
  }
  
  let authLabel = useRef();
    firebase.auth().onAuthStateChanged(function(user) {
      console.log("user is authorized? or became unauthorized")
    });
  return (


     <nav>
     <Link to="/">
       <img src={homeIcon} className="home-icon nav-icon"/>
     </Link>
    <AddButton></AddButton>
    <Link to="/settings">
    <img src={settingsIcon} className="settings-icon nav-icon"/>
    </Link>
    </nav>


    // <nav style={styles.nav}>
    //   <Link style={styles.nav_link} onClick={setCurrentPage} to="/">
    //   <span>Home</span>
    //   </Link>
    //   <Link style={styles.nav_link} to="/login">
    //   <span>Login</span>
    //   </Link>
    //   <Link style={styles.nav_link} to="/signup">
    //   <span>Signup</span>
    //   </Link>
    //   <Link style={styles.nav_link} to="/search">
    //     <img src={searchIcon} className="search-icon"/>
    //   </Link>
    //   <Link style={styles.nav_link}to="/account">
    //   <span>Account</span>
    //   </Link>
    //   <Link style={styles.nav_link} to="/create_schedule">
    //   <span>Create Schedule</span>
    //   </Link>
      
    //   <div ref={authLabel}></div>
    //   </nav>
  );
}
