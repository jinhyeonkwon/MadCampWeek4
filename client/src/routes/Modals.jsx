import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modals.css'
import '../css/CreateQuestionModal.css'
import enroll from "/img/enroll.svg"
import close from "/img/close.svg"
function Modals({ setIsOpen,getFn, themeId }) {
  const [reload,setReload]=useState(false)
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
        { themeId: themeId, contents: inputText },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setReload(!reload);
      setInputText('');
      
    } catch (error) {
      console.error('Error fetching info:', error);
    }
  };

  useEffect(() => {
    getFn();

  }, [reload]);
  return (

        <div className="modal-overlay">
          <div className="modal-background"></div>
          <div className="modal-card is-active question-modal" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <h3>질문을 등록해보세요.</h3>
      
              <textarea
                type="text"
                placeholder="텍스트를 입력하세요."
                value={inputText}
                onChange={handleChange}
                
                className="input-question"
              />
              <div>
                <button  onClick={createQuestion}>등록</button>
                <button  onClick={closeModal}>닫기</button>
                {/* <img src={enroll} onClick={createQuestion}>등록</img>
                <img src={close} onClick={closeModal}>닫기</img> */}
                
              </div>
       
          </div>
        </div>
 
  );
}

export default Modals;
