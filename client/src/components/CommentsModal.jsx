import React,{useEffect, useState} from 'react'
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const port = process.env.EXPRESS_PORT;
const API_URL = process.env.API_URL;
const SECRET_KEY = process.env.SECRET_KEY;

function Modal({ isOpen, qId }){
  const access_token = localStorage.getItem('token');
  const [question, setQuestion] = useState({});
  const [cList, setCList] = useState([]);
  const [modalState, SetModalState] = useState(isOpen);
  const [editCommentId, setEditCommentId] = useState(0);
  const [newContents, setNewContents] = useState('');
  const token = localStorage.getItem('token');
  let decodedToken;
  const [userId, setUserId] = useState(0);
  let cardList;
  
  const getDecodedToken = () => {
    const asyncFun = async () => {
      console.log(API_URL+'/post/getInfo');
      const response = await axios.post(API_URL + '/post/getInfo', {

      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });
      decodedToken = response.data.decodedToken;
      setUserId(decodedToken.id);
      console.log(`userId : ${userId}`);
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const getThatQuestion = () => {
    const asyncFun = async () => {
      console.log(API_URL+'/post/getonequestion');
        const response = await axios.post(API_URL+'/post/getonequestion', 
        {
          questionId: qId,
        }, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          }
        });
  
        if (response.status === 200) {
          console.log('getThatQuestion 성공');
          console.log(response.data.question);
          setQuestion(response.data.question);
        }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const getComments = () => {
    const asyncFun = async () => {
      const response = await axios.post(API_URL+'/post/getcomments', 
        {
          questionId: qId,
        }, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          }
        });
  
      if (response.status === 200) {
        console.log('getComments 성공');
        console.log(`cList : ${cList}`);
        setCList(response.data.commentList);
      }
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const deleteComment = (event, id) => {
    console.log('deleteComment');
    const asyncFun = async () => {
      const response = await axios.post(API_URL+'/post/deletecomment', {
        commentId: id,
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log('댓글 삭제 성공');
      }

    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
    
  };

  const createComment = (event, questionId) => {
    console.log('createComment');
    const asyncFun = async () => {
      const response = await axios.post(API_URL+'/post/createcomments', {
        questionId: questionId,
        contents: newContents,
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log('댓글 등록 성공');
      }

    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
    
  }

  useEffect(() => {
    getDecodedToken();
    getThatQuestion();
    console.log(`question : ${question}`);
    getComments();
    console.log(`cList : ${cList}`);

  }, []);

  cardList = cList.map((comment) => (
    <div className="card" style={{marginTop:'10px', marginBottom:'10px'}}>
      <form onSubmit={(event) => console.log(event)}>
        <header className="card-header">
          <div style={{marginLeft: '10px'}}>
          {`${comment.author.Name} `}  
          </div>
          <div style={{align: 'right'}}>
            {`${comment.CreatedAt}`}
          </div>
        </header>
        <div className="card-content">
          {comment.Contents}
          {`userId : ${userId}, comment.author.Id : ${comment.author.Id}`}
        </div>
        <footer className="card-footer" style={(userId === comment.author.Id) ? {} : {display: 'none'}}>
          <button style={{marginTop: '7px', marginLeft:'5px', marginRight:'5px'}} className="button" onClick={(event) => deleteComment(event, comment.Id)}>삭제</button>
        </footer>
      </form>
    </div>
  ));

    return(
      
        <div className={`modal${modalState ? ' is-active' : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card is-transparent">
              {/* 댓글 띄우는 부분 */}
              <header className='modal-card-head ink large-text'>
                <p>{question.Contents}</p>&nbsp;
                <p>{question.author ? `질문 작성자 : ${question.author.Name}` : '기본 질문'}</p>
                <button class="delete" onClick={(e) => SetModalState(false)} aria-label="close" style={{margin: 'auto 0 auto auto'}}></button>
              </header>
              <section className="modal-card-body myeongjo20">
                {/* 추가 부분 */}
                <div className="card" style={{marginTop:'5px', marginBottom:'5px'}}>
                  <form onSubmit={(event) => createComment(event, qId)}>
                    <span style={{marginBottom: '3px'}}>
                      <input className='input myeongjo20' style={{backgroundColor: 'rgba(0, 0, 0)', opacity: '0.8'}} required aria-required="true" type='text' placeholder='생각을 쓰세요!' value={newContents} onChange={(e) => setNewContents(e.target.value)}></input>
                    </span>
                    {/* img로 해서 onClick 달자 */}
                    <button type="submit" className='button' style={{margin: '10px'}}>생각 띄우기</button>
                  </form>
                </div>
                {cardList}
              </section>
            </div>
        </div>
    )
}
export default Modal