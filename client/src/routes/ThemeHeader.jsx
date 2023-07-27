import React, { useState, useEffect } from 'react'; // import useState and useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.API_URL;
import Modals from './Modals';
import '../css/ThemeHeader.css';
import '../App.css';

function ThemeHeader() {
  const navigate = useNavigate();
  const [userClass, setUserClass] = useState('');
  const [userName, setUserName] = useState('');
  const access_token = localStorage.getItem('token');

  // Add useEffect to call getInfo when the component mounts
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await axios.post(
        API_URL + '/post/getInfo',
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Make sure access_token is defined
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('getThatQuestion 성공');
        console.log(response.data.decodedToken);
        setUserClass(response.data.decodedToken.class);
        setUserName(response.data.decodedToken.name);
      }
    } catch (error) {
      console.error('Error fetching info:', error); // Catch and log errors
    }
  };

  // return (
  //   <header className="themeHeader">
  //     <span className="ThemeTitle">{userClass}분반 밤하늘</span>
  //     <span className="userInfo">
  //       <div className="userProfile">
  //         <img src="./img/profile.svg" alt="Profile" />
  //         <span className="ThemeName">
  //           {userClass}분반 {userName}
  //         </span>
  //       </div>
  //       <img className="logoutBtn" src="./img/Logout.svg" alt="Logout" />
  //     </span>
  //   </header>
  // );
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ backgroundColor: 'transparent' }}
    >
      <span
        className="ThemeTitle"
        style={{
          fontSize: '6rem',
          fontFamily: 'InkLipquid',
          color: 'white',
          position: 'fixed',
          left: '45%',
          // transform: "translate('-50%', 0)",
        }}
      >
        {userClass}분반 밤하늘
      </span>
      <div className="navbar-menu is-active">
        <div className="navbar-end">
          <div className="navbar-item">
            <div
              className="userInfo"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div className="userProfile" style={{ display: 'flex' }}>
                <img
                  className="profileIcon"
                  src="./img/profile.svg"
                  alt="Profile"
                  style={{ marginRight: '10px' }}
                />
                <div
                  className="ThemeName"
                  style={{
                    color: 'white',
                    fontFamily: 'Myeongjo30',
                    fontSize: '2rem',
                  }}
                >
                  {userClass}분반 {userName}
                </div>
              </div>
              <div className="logoutArea">
                <img
                  className="logoutBtn navbar-item"
                  src="/img/Logout.svg"
                  alt="Logout"
                  onClick={logout}
                  style={{
                    scale: '10',
                    position: 'relative',
                    marginTop: '15%',
                    marginLeft: '50%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  return <div className="ThemeHeader"></div>;
}

export default ThemeHeader;