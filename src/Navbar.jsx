import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import searchIcon from './assets/img/search_white_24dp.svg'
import firebase from 'firebase';

export default function Navbar() {
  let [currentPage, setCurrentPage] = useState([]);
  
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
      let currentStatus = authLabel.current;
      if (!user) {
        currentStatus.innerHTML = "Not signed in";
      } else {
        currentStatus.innerHTML = "Signed in";
      }
    });
  
  return (
    <nav style={styles.nav}>
      <Link style={styles.nav_link} onClick={setCurrentPage} to="/">
      <span>Home</span>
      </Link>
      <Link style={styles.nav_link} to="/login">
      <span>Login</span>
      </Link>
      <Link style={styles.nav_link} to="/signup">
      <span>Signup</span>
      </Link>
      <Link style={styles.nav_link} to="/search">
        <img src={searchIcon} className="search-icon"/>
      </Link>
      <Link style={styles.nav_link}to="/account">
      <span>Account</span>
      </Link>
      <Link style={styles.nav_link} to="/create_schedule">
      <span>Create Schedule</span>
      </Link>
      
      <div ref={authLabel}></div>
    </nav>
  );
}
