import {React,useEffect,useState} from 'react'
import axios from 'axios'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom';
function Signup2(){
  const navigate=useNavigate()
  const API_URL=process.env.API_URL;
  const [name,setName]=useState('')
   const [pw, setPw]=useState('')
   const [email, setEmail]=useState('')
   const [userid,setUserId]=useState('')
   const [userclass, setUserClass]=useState("0")
   const [isVerified, setIsVerified] = useState(false)

   //email & 비밀번호 정규식
   //대문자, 소문자 알파벳, 그리고 숫자를 포함한 길이 8자~20자 사이의 문자열
   const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
   const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

   const emailCheck = (username) => {
    return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
  }

   const handleName=(e)=>{
     setName(e.target.value)
   }
   
   const handleUserId=(e)=>{
    setUserId(e.target.value)
  }
   const handlePw=(e)=>{
     //placeholder에 비밀번호 정규식 알려주기.
       setPw(e.target.value)
   }
   const handleEmail=(e)=>{
       setEmail(e.target.value)
   }
   const handleSignup = async () => {
    if(pw.match(passwordRegEx)===null) { 
      alert('비밀번호 형식을 확인해주세요');
      return;
    }
    try {
      const result = await axios.post(`${API_URL}/signup`, {
        name: name,
        email: email,
        password: pw,
        userid:userid,
        userclass:userclass

      });
    
      if (result.status === 200) {
        // 회원가입 성공 처리
        const token =result.data.token
        if(token){
          localStorage.setItem('token',token)//토큰을 로컬 스토리지에 저장 -> 이 후 navigate하면 될듯
          navigate('/post2')
        }
      } else if(result.status==400) {
        // 에러 처리
        alert(result.data.message)
      }
    } catch (error) {
      // 서버에서 오류가 발생한 경우 에러 처리
      console.error(error);
    }
  };

// 이메일 이름 -> 인증, 아이디 비밀번호 -> 중복확인 
//비밀 번호 양식


  const handleVerify=async()=>{
    if (!emailCheck(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }
   
    try {
      //console.log(`Email : ${email}`);
      const response = await axios.post(`${API_URL}/signup/verify`, { email: email, name: name, userClass: userclass });
      if (response.data.match) {
        alert(response.data.message);
        setIsVerified(true);
      } else {
   
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  }
 
  
    const handleLogin = async () => {
      try {
        const result = await axios.post(`${API_URL}/login`, {
          email: email,
          password: password,
        });
  
        if (result.status === 200) {
          const token = result.data.token;
          if (token) {
            localStorage.setItem('token', token); // 토큰을 localStorage에 저장
            //console.log('로그인에 성공하였습니다.');
            //console.log(token);
            
          
          } else {
            console.error('토큰을 받지 못했습니다. 다시 시도해주세요.');
          }
        } else {
          console.error('로그인에 실패하였습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('로그인 중 오류가 발생하였습니다:', error);
      }
    };
  
 
  return(
    <div className="column">
        <img className="MainPage"  src="/img/MainPage.png"></img>
    <div className="SignupContainer">
    <span className="SignupTitle" style={{fontSize:'3rem',marginLeft:'6%'}}>서비스 이름</span>
    <div className='SignupInputContainer' style={{marginLeft:'3%'}}>
    <div className='SignupId'>
    <span className="ModalSubTitle">아이디</span>
        <input type="userid"className="ModalId" value={userid} onChange={handleUserId} /> 
        </div>
        <div className='SignupPw'>
       <span className="ModalSubTitle">비밀번호</span>
       <input type="password" className="ModalId"value={pw} onChange={(e)=>{setPw(e.target.value);
        }} />
     </div>
   
       <img src="/img/signup.svg" onClick={handleSignup} style={{width:'130px',height:'90px', marginLeft:'72%',marginTop:'10%'}}/>
       </div>
   </div>
 
   </div>
  
  
  )
}



export default Signup2