import React, { useState, useEffect } from 'react'; // import useState and useEffect
import axios from 'axios';
const API_URL = 'http://localhost:8000';
import Modals from './Modals';

function ThemeHeader() {
  const [userClass, setUserClass] = useState('');
  const [userName, setUserName] = useState('');
    const access_token=localStorage.getItem('token')

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
        console.log(response.data.decodedToken)
        setUserClass(response.data.decodedToken.class);
        setUserName(response.data.decodedToken.name);
      }
    } catch (error) {
      console.error('Error fetching info:', error); // Catch and log errors
    }
  };

  return (
    <header>
      <div className="userInfo">
        <div className="userProfile">
          <img src="./img/profile.svg" alt="Profile" />
          <span className='ThemeName'>
            {userClass}분반 {userName}
          </span>
        </div>
        <img className="logoutBtn" src="./img/logout.svg" alt="Logout"  />
      </div>
      <span className="ThemeTitle">{userClass}분반 밤하늘</span>
    </header>
  );
}

export default ThemeHeader;
