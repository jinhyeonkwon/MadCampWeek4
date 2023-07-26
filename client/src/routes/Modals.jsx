import React,{useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css'
function Modals(isOpen) {
  const API_URL = 'http://localhost:8000';
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(isOpen);
  const handleChange = (event) => {
    setInputText(event.target.value);
  };  
  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalVisible(false);
  };

const access_token=localStorage.getItem('token')

  const createQuestion = async () => {
    try {
      const response = await axios.post(
        API_URL + '/post/createquestions',
        {themeId:1,
        contents:inputText},
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Make sure access_token is defined
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isOk) {
        console.log('getquestions 성공');
       
      }
    } catch (error) {
      console.error('Error fetching info:', error); // Catch and log errors
    }
  };
  useEffect(() => {
    createQuestion();
  }, []);
  if (modalVisible) return null;
 

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>이미지 클릭 된 이벤트</h3>
        <input
          type="text"
          placeholder="텍스트를 입력하세요."
          value={inputText}
          onChange={handleChange}
        />
        <div>
          <button onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Modals;
