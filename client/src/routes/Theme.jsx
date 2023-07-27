import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Header from './ThemeHeader';
import axios from 'axios';
import image1 from '../assets/img/img_1.png';
import back from "/img/back.svg";
const API_URL = 'http://localhost:8000';
import Modals from './Modals';
import "./Theme.css"
import { useMediaQuery } from "react-responsive";
import CommentsModal from '../components/CommentsModal';

function Theme() {
  const navigate=useNavigate()
  const [question, setQuestion] = useState([]);

  const access_token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [reload, setReload] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [qId, setQId] = useState(0);
  const location = useLocation();
  const data = location.state.data;
  const getDecodedToken = () => {

    const asyncFun = async () => {
        console.log(API_URL+'/post/getInfo');
        try {
            const response = await axios.post(API_URL + '/post/getInfo', {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                }
            });
            const decodedToken = response.data.decodedToken;
            setUserId(decodedToken.id);
            console.log(`userId : ${userId}`);
        }
        catch(e) {
            console.log(e);
        }
    }
    asyncFun();  
}

  const showModal = () => {
    setIsOpen(true);
  };

  const getThatQuestion = async () => {
    console.log(API_URL+'/post/getquestions');
      const response = await axios.post(API_URL+'/post/getquestions', 
      {
        themeId:data // 관리해줘야 해
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log('getThatQuestion 성공');
        console.log(response.data.questionList)
        setQuestion(response.data.questionList);
      }
  };
  useEffect(() => {
    getDecodedToken();
    getThatQuestion();

  }, [reload]);


const handleDelete=async(event,id)=>{
  const response = await axios.post(API_URL+'/post/deletequestions', 
  {
    questionId:id 
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    }
  });

  if (response.data.isOk) {
    setReload(!reload);
    console.log('질문을 삭제하였습니다.');
  
  }else{
    console.log("질문 삭제에 실패하였습니다.")
  }

}
const NavPost=()=>{
  console.log('성공')
  navigate("/post2")
}

const showQuestionModal = (e, questionId) => {
  e.preventDefault();
  setCommentsModalOpen(true);
  setQId(questionId);
}

const hideQuestionModal = () => {
  setCommentsModalOpen(false);
}

  const questionList = question.map((question) => (
    // <div style={question.Id==1?{marginTop:'15%'}:{}}>
    <div className="card" style={{  position: 'relative',
      border: '1.8px solid #FFFFFF',
      boxSizing: 'border-box',
      padding: '16px',
      backgroundColor:'transparent',
    width:'60rem',
      height:'20rem',
      color:'white',
      fontSize:'1.5rem',
      fontFamily:'Myeongjo30',
      borderRadius: '8px', }} key={question.Id}
      onClick={(e) => showQuestionModal(e, question.Id)}>
      <form onSubmit={(event) => console.log(event)}>
        <div  style={(userId === question.AuthorId) ? {marginLeft:'90%'} : {display: 'none'}}>
        <img src="/img/delete.svg" onClick={(e)=>handleDelete(e,question.Id)}/>
        </div>
        <div style={{display:'flex', flexDirection:"row"}}>      
        
        <img src="/img/key.svg"/>
        <div className="card-content" style={{fontSize:"3rem"}}>{question.Contents}</div>
        </div>
        <footer className="card-footer" style={{marginLeft:'85%'}}>
      <span>댓글 수 : {question.commentCnt}</span> 
      </footer>          
    </form>
    </div>
    // </div>
  ));
  console.log(questionList)

  return (
      <div className="ThemeMain">
        {commentsModalOpen && <CommentsModal isOpen={true} qId={qId} hideFn={hideQuestionModal} />}
        <div className="BgImage" />
        {isOpen && <Modals setIsOpen={setIsOpen} getFn={getThatQuestion} themeId={data}/>}
        <Header />
        <div className="ThemeContent2 columns" > 
            <div className='ThemeLeft2 column is-one-third-desktop is-one-third-widescreen is-one-third-fullhd'>
            {/* <section className='ThemeLeft' style={{flexGrow: '3'}} > */}
                {/* <img src={image1}style={{width:'266px',height:'317px'}}/> */}
                <img src={`/img/imgg_${data}.svg`} style={{marginTop:'24%', width:'50%',height:'50%'}}></img> {/*----- 별자리 이미지 -----*/}
                {/* <img src={back} style={{width:'120px',height:'30px', marginLeft:'27%',marginBottom:'-5%' }} onClick={NavPost}/> */}
                <img src={back} onClick={NavPost} style={{width:"100px", height:"50px" }}/>
            </div>
        
            {/* <section className='ThemeRight' style={{flexGrow: '7'}}> */}
            <div className='ThemeRight2 column'>
          
            {/* <img src="/img/plus.png" style={{ display: 'block', marginLeft: 'auto', width:'30px', height:'30px',position: 'absolute', 
                right: 0,}} onClick={showModal}/> */}
            <img src="/img/plus.svg" style={{width:'40px', height:'40px',marginRight:'20%',marginTop:'10%'}}onClick={showModal}/> 
            {/* <div className="questions-list" style={{position:'relative',display:'flex',flexDirection:'column', height:'auto', overflowY: 'scroll',marginTop:'10%',marginRight:'30%' }}> */}
          
            <div className="question-list" style={{display:'flex',flexDirection:'column', height: '300px', overflowY: 'scroll',marginTop:'-20%'}}>
              {questionList}
            {/* </div> */}
            </div>
          </div> 
        </div>
      </div>
  );
};

export default Theme;