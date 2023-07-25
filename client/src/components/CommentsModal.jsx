import React,{useState} from 'react'
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const port = process.env.EXPRESS_PORT;
const API_URL = process.env.API_URL;

function Modal({ isOpen, qId }){
  const access_token = localStorage.getItem('token');
  const [question, setQuestion] = useState({});
  const [cList, setCList] = useState([]);
  const [modalState, SetModalState] = useState(isOpen);

  const getThatQuestion = async () => {
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
        setQuestion(response.question);
      }
  };
  const getComments = async () => {

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
      setCList(response.commentList);
    }
  };

  getThatQuestion();
  console.log(question);
  getComments();
  console.log(cList);


  const cardList = cList.map((comment) => (
    <div className="card" style={{marginTop:'5px', marginBottom:'5px'}}>
      <form onSubmit={(event) => console.log(event)}>
        <header className="card-header">
          {comment.AuthorId}
        </header>
        <div className="card-content">
          {comment.Contents}
        </div>
      </form>
    </div>
  ));

    return(
        <div className={`modal${modalState ? ' is-active' : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card is-transparent">
              <header className='modal-card-head'>
                <p>{question.Contents}</p>
                <button class="delete" onClick={(e) => SetModalState(false)}aria-label="close" style={{margin: 'auto 0 auto auto'}}></button>
              </header>
              <section className="modal-card-body">
                {cardList}
              </section>
            </div>
        </div>
    )
}
export default Modal