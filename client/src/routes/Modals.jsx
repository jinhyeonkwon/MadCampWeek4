import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modals.css'

function Modals({ setIsOpen }) {
  const API_URL = 'http://localhost:8000';
  const [inputText, setInputText] = useState('');


  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
};
  const access_token = localStorage.getItem('token');

  const createQuestion = async () => {
    try {
      await axios.post(
        API_URL + '/post/createquestions',
        { themeId: 1, contents: inputText },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error fetching info:', error);
    }
  };


  return (

        <div className="modal-overlay">
          <div className="modal is-active">
            <h3>질문을 등록해보세요.</h3>
      
              <input
                type="text"
                placeholder="텍스트를 입력하세요."
                value={inputText}
                onChange={handleChange}
              />
              <div>
                <button type="submit" onClick={createQuestion}>등록</button>
                <button onClick={closeModal}>닫기</button>
              </div>
       
          </div>
        </div>
 
  );
}

export default Modals;
