import React, { useEffect, useState } from 'react';
//  import '../App.css'
import '../css/CommentsModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const port = process.env.EXPRESS_PORT;
const API_URL = process.env.API_URL;
const SECRET_KEY = process.env.SECRET_KEY;
// const API_URL = 'http://localhost:8000';

function Modal({ isOpen, qId, hideFn }) {
  const access_token = localStorage.getItem('token');
  const [question, setQuestion] = useState({});
  const [cList, setCList] = useState([]);
  const [modalState, SetModalState] = useState(isOpen);
  const [editCommentId, setEditCommentId] = useState(0);
  const [newContents, setNewContents] = useState('');
  const [reload, setReload] = useState(0); // 이걸 바꿈으로써 reload 시킴
  const token = localStorage.getItem('token');
  let decodedToken;
  const [userId, setUserId] = useState(0);
  let cardList;

  console.log(`modal의 modalState: ${modalState}`);

  const getDecodedToken = () => {
    const asyncFun = async () => {
      console.log(API_URL + '/post/getInfo');
      const response = await axios.post(
        API_URL + '/post/getInfo',
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 404) {
        // not found
        alert('404 Not Found! 홈 화면으로 이동합니다.');
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
      if (response.status === 401) {
        // 토큰 만료
        alert('로그인이 만료되었습니다! 홈 화면으로 이동합니다.'); // 왜 2번 불러지는지는 모르겠지만.. 작동
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
      decodedToken = response.data.decodedToken;
      setUserId(decodedToken.id);
      console.log(`userId : ${userId}`);
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const getThatQuestion = () => {
    const asyncFun = async () => {
      console.log(API_URL + '/post/getonequestion');
      const response = await axios.post(
        API_URL + '/post/getonequestion',
        {
          questionId: qId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('getThatQuestion 성공');
        console.log(response.data.question);
        setQuestion(response.data.question);
      }
      if (response.status === 404) {
        // not found
        alert('404 Not Found! 홈 화면으로 이동합니다.');
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
      if (response.status === 401) {
        // 토큰 만료
        alert('로그인이 만료되었습니다! 홈 화면으로 이동합니다.'); // 왜 2번 불러지는지는 모르겠지만.. 작동
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const getComments = () => {
    const asyncFun = async () => {
      const response = await axios.post(
        API_URL + '/post/getcomments',
        {
          questionId: qId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('getComments 성공');
        console.log(`cList : ${cList}`);
        setCList(response.data.commentList);
      }
      if (response.status === 404) {
        // not found
        alert('404 Not Found! 홈 화면으로 이동합니다.');
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
      if (response.status === 401) {
        // 토큰 만료
        alert('로그인이 만료되었습니다! 홈 화면으로 이동합니다.'); // 왜 2번 불러지는지는 모르겠지만.. 작동
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const deleteComment = (event, id) => {
    console.log('deleteComment');
    const asyncFun = async () => {
      const response = await axios.post(
        API_URL + '/post/deletecomment',
        {
          commentId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 401) {
        // 토큰 만료
        alert('로그인이 만료되었습니다! 홈 화면으로 이동합니다.'); // 왜 2번 불러지는지는 모르겠지만.. 작동
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
      if (response.status === 404) {
        // not found
        alert('404 Not Found! 홈 화면으로 이동합니다.');
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }

      if (response.status === 200) {
        console.log('댓글 삭제 성공');
        setReload(reload === 0 ? 1 : 0); // 새로 로딩해라!
      }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const createComment = (event, questionId) => {
    console.log('createComment');
    const asyncFun = async () => {
      const response = await axios.post(
        API_URL + '/post/createcomments',
        {
          questionId: questionId,
          contents: newContents.replaceAll('<br>', '\n'),
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('댓글 등록 성공');
        setNewContents('');
        setReload(reload === 0 ? 1 : 0); // 새로 로딩해라!
      }
      if (response.status === 404) {
        // not found
        alert('404 Not Found! 홈 화면으로 이동합니다.');
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
      if (response.status === 401) {
        // 토큰 만료
        alert('로그인이 만료되었습니다! 홈 화면으로 이동합니다.'); // 왜 2번 불러지는지는 모르겠지만.. 작동
        window.location.href = `${window.location.href.replace('/post', '')}`; // 리다이렉트
        return;
      }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  useEffect(() => {
    if (userId !== 0) {
      getDecodedToken();
      getThatQuestion();
      console.log(`question : ${question}`);
      getComments();
      console.log(`cList : ${cList}`);
    }
  }, [reload]);

  cardList = cList.map((comment) => (
    <div className="card comment-card">
      <div className="card-content">
        <div
          style={{
            marginLeft: '0px',
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '2rem',
          }}
        >
          {`${comment.author.Name} `}
        </div>
        <div
          style={{
            marginBottom: '3px',
            fontSize: '1.5rem',
            overflowWrap: 'normal',
          }}
        >
          {comment.Contents}
        </div>
        <img
          src="/img/Delete.svg"
          type="button"
          style={
            userId === comment.author.Id
              ? {
                  display: 'absolute',
                  float: 'right',
                  marginRight: '0px',
                  marginTop: '10px',
                  marginBottom: '20px',
                }
              : { display: 'none' }
          }
          onClick={(e) => deleteComment(e, comment.Id)}
        />
        <div
          style={{ marginTop: '10px', fontSize: '1.2rem' }}
        >{`작성 시각 : ${new Date(comment.CreatedAt).toLocaleString()}`}</div>
      </div>
    </div>
  ));

  const closeModal = () => {
    console.log('cloasModal');
    SetModalState(false);
    hideFn();
  };

  return (
    <div className={`modal${modalState ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        {/* 댓글 띄우는 부분 */}
        <header
          className="modal-card-head ink large-text"
          style={{ position: 'relative' }}
        >
          <div>
            <div className="question-name">{question.Contents}</div>
            <div className="quest">
              {question.author
                ? `질문 작성자 : ${question.author.Name}`
                : '기본 질문'}
              <img
                src="/img/CloseButton.svg"
                class="delete"
                onClick={(e) => SetModalState(false)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  float: 'right',
                  width: '40px',
                  height: '40px',
                }}
              ></img>
            </div>
          </div>
        </header>
        <section className="modal-card-body myeongjo20">
          {/* 추가 부분 */}
          <div
            className="card"
            style={{ marginTop: '5px', marginBottom: '5px' }}
          >
            <span style={{ marginBottom: '10px', width: '100%' }}>
              <textarea
                className="myeongjo20"
                rows="11"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '20px',
                }}
                required
                aria-required="true"
                type="text"
                placeholder="우리 반 사람들과 생각을 나눠보아요!"
                value={newContents}
                onChange={(e) => setNewContents(e.target.value)}
              ></textarea>
              <div style={{ float: 'right' }}>
                <img
                  src="/img/CreateComment.svg"
                  type="button"
                  style={{ marginTop: '10px', float: 'right' }}
                  onClick={(e) => createComment(e, qId)}
                />
              </div>
            </span>
            {/* img로 해서 onClick 달자 */}
          </div>
          <div className="card-list" style={{ marginTop: '50px' }}>
            {cardList}
          </div>
        </section>
      </div>
    </div>
  );
}
export default Modal;
