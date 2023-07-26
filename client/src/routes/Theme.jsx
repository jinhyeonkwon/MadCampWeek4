import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './ThemeHeader';
import axios from 'axios';
import image1 from '../assets/img/img_1.png';
import back from "../assets/img/back.png";
const API_URL = 'http://localhost:8000';
import Modals from './Modals';
import "./Theme.css"
import { useMediaQuery } from "react-responsive";

function Theme() {
  const navigate=useNavigate()
  const [question, setQuestion] = useState([]);

  const access_token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);

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

  }, []);


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
    console.log('질문을 삭제하였습니다.');
  
  }else{
    console.log("질문 삭제에 실패하였습니다.")
  }

}
const NavPost=()=>{
  navigate("/post2")
}

  const questionList = question.map((question) => (
    // <div style={question.Id==1?{marginTop:'15%'}:{}}>
    <div className="card" style={{  position: 'relative',
      border: '1.8px solid #FFFFFF',
      boxSizing: 'border-box',
      padding: '16px',
      backgroundColor:'transparent',
      width:"60rem",
      color:'white',
      fontFamily:'Myeongjo30',
      borderRadius: '8px', }} key={question.Id}>
      <form onSubmit={(event) => console.log(event)}>
        <div style={{ marginLeft: '10px' }}>{question.AuthorId}</div>
        <div className="card-content">{question.Contents}</div>
        <footer className="card-footer" style={(userId === question.AuthorId) ? {} : {display: 'none'}}>
        <button onClick={(e)=>handleDelete(e,question.Id)}>삭제</button> 
      </footer>          
     </form>
    </div>
    // </div>
  ));
  console.log(questionList)

  return (
      <div className="ThemeMain">
            <div className="BgImage" />
            {isOpen && <Modals setIsOpen={setIsOpen} />}
      <Header />
      <div className="ThemeContent">
       <section className='ThemeLeft' style={{marginTop:'5%', marginLeft:'10%',flexGrow: '3'}} >
          {/* <img src={image1}style={{width:'266px',height:'317px'}}/> */}
          <img src={image1}></img>
          {/* <img src={back} style={{width:'120px',height:'30px', marginLeft:'27%',marginBottom:'-5%' }} onClick={NavPost}/> */}
          <img src={back} onClick={NavPost}/>
       </section>
      
       {/* <section className='ThemeRight' style={{flexGrow: '7'}}> */}
       <section className='ThemeRight'>
     
       <img src="/img/plus.png" style={{ display: 'block', marginLeft: 'auto', width:'30px', height:'30px',position: 'absolute', 
          right: 0,}} onClick={showModal}/>
      <div className="question-list" style={{display:'flex',flexDirection:'column',zIndex:'2', height: '200px', overflowY: 'scroll'}}>{questionList}</div>
       </section>
      </div>
      </div>
     
  );
};

export default Theme;