import React, { useState, useRef, useEffect } from "react"
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <nav>
      <Link to="/">
      <a href="#">Home</a>
      </Link>
      <Link to="/login">
      <a href="#">Login</a>
      </Link>
      <Link to="/signup">
      <a href="#">Signup</a>
      </Link>
    </nav>
  );
}
