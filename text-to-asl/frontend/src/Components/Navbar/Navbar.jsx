import React from 'react'
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
        <div className='cont'>
            <h2 className='title' onClick={() => navigate("/")}>HearAid</h2>
            <ul>
                <li onClick={() => navigate("/request")}>Transcribe</li>
                <li>SDK Docs</li>
                {/* <li onClick={() => navigate("/pricing")}>Pricing</li> */}
                <li onClick={() => navigate("/learning")}>Learning</li>
            </ul>
            <button>Let's Talk  </button>
        </div>
    </div>
  )
}

export default Navbar