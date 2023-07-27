import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Modals.css';
import enroll from '/img/enroll.svg';
import close from '/img/close.svg';
function Modals({ setIsOpen, getFn, themeId }) {
  const [reload, setReload] = useState(false);
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
      if (inputText.length < 1) return;
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
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        zIndex: '3',
      }}
    >
      <div
        className="modal-background create-question-modal-background"
        style={{ width: '100vw' }}
      ></div>
      <div
        className="modal-card create-question-modal-card is-active question-modal"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          position: 'fixed',
          left: '0',
          right: '0',
          top: '0',
          marginTop: '12%',
          borderTop: '5px solid white',
          borderBottom: '5px solid white',
        }}
      >
        <h3
          style={{
            fontFamily: 'Myeongjo30',
            color: 'white',
            fontSize: '2rem',
            padding: '20px',
          }}
        >
          질문을 등록해보세요.
        </h3>

        <textarea
          type="text"
          placeholder="텍스트를 입력하세요."
          value={inputText}
          onChange={handleChange}
          style={{
            fontFamily: 'Myeongjo30',
            color: 'white',
            padding: '15px',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
          className="input-question"
        />
        <div style={{ padding: '20px', marginLeft: '59%' }}>
          {/* <button  onClick={createQuestion}>등록</button>
                <button  onClick={closeModal}>닫기</button> */}
          <img src={enroll} onClick={createQuestion}></img>
          <img src={close} onClick={closeModal}></img>
        </div>
      </div>
    </div>
  );
}

export default Modals;
