import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './ThemeHeader';
import axios from 'axios';
import image1 from '../assets/img/img_1.png';
import back from '/img/back.svg';
const API_URL = 'http://localhost:8000';
import Modals from './Modals';
import './Theme.css';
import '../css/CommentsModal.css';
import { useMediaQuery } from 'react-responsive';
import CommentsModal from '../components/CommentsModal';
import ThemeHeader from './ThemeHeader';
function Theme() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);

  const access_token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [qId, setQId] = useState(0);
  const [questionModalClass, setQuestionModalClass] = useState('modal');
  const [cList, setCList] = useState([]);
  const [newContents, setNewContents] = useState('');
  const [reload, setReload] = useState(false); // 이걸 바꿈으로써 reload 시킴
  const [modalReload, setModalReload] = useState(false); // 이걸 바꿈으로써 reload 시킴
  const [thatQuestion, setThatQuestion] = useState({});

  const location = useLocation();
  const data = location.state.data;
  const getDecodedToken = () => {
    const asyncFun = async () => {
      console.log(API_URL + '/post/getInfo');
      try {
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
        const decodedToken = response.data.decodedToken;
        setUserId(decodedToken.id);
        console.log(`userId : ${userId}`);
      } catch (e) {
        console.log(e);
      }
    };
    asyncFun();
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const getThatQuestion = async () => {
    console.log(API_URL + '/post/getquestions');
    const response = await axios.post(
      API_URL + '/post/getquestions',
      {
        themeId: data, // 관리해줘야 해
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
      console.log(response.data.questionList);
      setQuestion(response.data.questionList);
    }
  };

  const getOneQuestion = async (questionId) => {
    console.log('모달에서 질문 받기');
    console.log(questionId);
    const response = await axios.post(
      API_URL + '/post/getonequestion',
      {
        questionId: questionId,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      console.log('getOneQuestion 성공');
      console.log(response.data.question);
      setThatQuestion(response.data.question);
    }
  };

  useEffect(() => {
    getDecodedToken();
    getThatQuestion();
  }, [reload]);

  useEffect(() => {
    if (qId !== 0) {
      getComments(qId);
    }
  }, [modalReload]);

  const handleDelete = async (event, id) => {
    const response = await axios.post(
      API_URL + '/post/deletequestions',
      {
        questionId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.isOk) {
      setReload(!reload);
      console.log('질문을 삭제하였습니다.');
    } else {
      console.log('질문 삭제에 실패하였습니다.');
    }
  };
  const NavPost = () => {
    console.log('성공');
    navigate('/post2');
  };

  const showQuestionModal = (e, questionId) => {
    e.preventDefault();
    setCommentsModalOpen(true);
    setQId(questionId);
    showModal();
  };

  const hideQuestionModal = () => {
    setCommentsModalOpen(false);
  };

  const questionList = question.map((question) => (
    // <div style={question.Id==1?{marginTop:'15%'}:{}}>
    <div
      className="card"
      style={{
        position: 'relative',
        border: '1.8px solid #FFFFFF',
        boxSizing: 'border-box',
        padding: '16px',
        marginBottom: '20px',
        backgroundColor: 'transparent',
        width: '85%',
        height: 'calc(100% / 4)',
        color: 'white',
        fontSize: '1.5rem',
        fontFamily: 'Myeongjo30',
        borderRadius: '8px',
      }}
      key={question.Id}
      onClick={(e) => {
        getOneQuestion(question.Id);
        getComments(question.Id);
        setQId(question.Id);
        setQuestionModalClass('modal is-active');
      }}
    >
      <form onSubmit={(event) => console.log(event)}>
        <div
          style={
            userId === question.AuthorId
              ? { marginLeft: '90%' }
              : { display: 'none' }
          }
        >
          <img
            src="/img/delete.svg"
            onClick={(e) => {
              handleDelete(e, question.Id);
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src="/img/key.svg" />
          <div className="card-content" style={{ fontSize: '3rem' }}>
            {question.Contents}
          </div>
        </div>
        <footer className="card-footer" style={{ marginLeft: '85%' }}>
          <span>댓글 수 : {question.commentCnt}</span>
        </footer>
      </form>
    </div>
    // </div>
  ));
  console.log(questionList);

  // 모달 관련 ----------------------------
  const cardList = cList.map((comment) => (
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
                  zIndex: '999',
                  display: 'absolute',
                  float: 'right',
                  marginRight: '0px',
                  marginTop: '10px',
                  marginBottom: '20px',
                }
              : { display: 'none' }
          }
          onClick={(e) => {
            deleteComment(e, comment.Id);
          }}
        />
        <div
          style={{ marginTop: '10px', fontSize: '1.2rem' }}
        >{`작성 시각 : ${new Date(comment.CreatedAt).toLocaleString()}`}</div>
      </div>
    </div>
  ));

  const getComments = (questionId) => {
    console.log(`getcomments: ${questionId}`);
    const asyncFun = async () => {
      const response = await axios.post(
        API_URL + '/post/getcomments',
        {
          questionId: questionId,
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
        setReload(!reload);
        setModalReload(!modalReload); // 새로 로딩해라!
      }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const createComment = (event, questionId) => {
    console.log('createComment');
    const asyncFun = async () => {
      if (newContents.length < 1) return;
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
      console.log('제대로 받아왔나봐');

      if (response.status === 200) {
        console.log('댓글 등록 성공');
        setNewContents('');
        setReload(!reload);
        setModalReload(!modalReload); // 새로 로딩해라!
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
  // ------------------------------------------

  return (
    <div className="ThemeMain">
      <ThemeHeader />
      <div className="BgImage" />
      {isOpen && (
        <Modals
          setIsOpen={setIsOpen}
          getFn={getThatQuestion}
          themeId={data}
          style={{ zIndex: '99' }}
        />
      )}
      <div></div>
      <div className="ThemeViewPort">
        <div className={questionModalClass}>
          <div className="modal-background"></div>
          <div
            className="modal-card"
            style={{
              overflowY: 'scroll',
            }}
          >
            {/* 댓글 띄우는 부분 */}
            <header
              className="modal-card-head ink large-text"
              style={{ position: 'relative' }}
            >
              <div>
                <div className="question-name">{thatQuestion.Contents}</div>
                <div className="quest">
                  {thatQuestion.author
                    ? `질문 작성자 : ${thatQuestion.author.Name}`
                    : '기본 질문'}
                  <img
                    src="/img/CloseButton.svg"
                    class="delete"
                    onClick={(e) => setQuestionModalClass('modal')}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      float: 'right',
                      width: '70px',
                      height: '70px',
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
                      padding: '5px',
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
              <div className="card-list" style={{ marginTop: '0px' }}>
                {cardList}
              </div>
            </section>
          </div>
        </div>
        <div className="columns">
          <div className="ThemeLeft column is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
            {/* <section className='ThemeLeft' style={{flexGrow: '3'}} > */}
            {/* <img src={image1}style={{width:'266px',height:'317px'}}/> */}
            <img
              src={`/img/imgg_${data}.svg`}
              style={{
                marginTop: '24%',
                width: '50%',
                height: '50%',
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            ></img>{' '}
            {/*----- 별자리 이미지 -----*/}
            {/* <img src={back} style={{width:'120px',height:'30px', marginLeft:'27%',marginBottom:'-5%' }} onClick={NavPost}/> */}
            <img
              src={back}
              onClick={NavPost}
              style={{
                width: '200px',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: '30%',
              }}
            />
          </div>

          {/* <section className='ThemeRight' style={{flexGrow: '7'}}> */}
          <div
            className="ThemeRight column"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '80vh',
              overflowY: 'scroll',
              width: '100%',
            }}
          >
            {/* <img src="/img/plus.png" style={{ display: 'block', marginLeft: 'auto', width:'30px', height:'30px',position: 'absolute', 
                right: 0,}} onClick={showModal}/> */}
            <img
              src="/img/plus.svg"
              style={{
                width: '150px',
                height: '150px',

                marginLeft: '75%',

                marginTop: '8%',
              }}
              onClick={showModal}
            />
            <div
              className="questions-list"
              style={{
                //   position: 'relative',
                //   display: 'flex',
                //   flexDirection: 'column',
                //   height: '2000px',
                overflowY: 'scroll',

                //   marginTop: '10%',
                //   marginRight: '30%',
              }}
            >
              <div
                className="question-list"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'flex-start',

                  overflowY: 'scroll',
                }}
              >
                {questionList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;