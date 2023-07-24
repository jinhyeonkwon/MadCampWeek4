import React,{useState} from 'react'
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000'
function Modal(){
  const navigate=useNavigate()
  const [userid, setUserId]=useState('')
  const [pw,setPw]=useState('')
    const handleLogin = async () => {
        try {
          const result = await axios.post(`${API_URL}/login`, {
            userid: userid,
            password: pw,
          });
    
          if (result.status === 200) {
            const token = result.data.token;
            if (token) {
              localStorage.setItem('token', token); // 토큰을 localStorage에 저장
    
              // 추가 작업 (리다이렉트, 상태 변경 등)
              console.log('로그인에 성공하였습니다.');
              navigate('/post')
            
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
        <div className="ModalContainer">
            <span className="ModalTitle">서비스 이름</span>
            <div className='ModalInputContainer'>
            <span className="ModalSubTitle">아이디</span>
            <input type="userid" value={userid} onChange={(e)=>{setUserId(e.target.value);}}/>
           
         
            <span className="ModalSubTitle">비밀번호</span>
            <input type="password" value={pw} onChange={(e)=>{setPw(e.target.value);}}/>
            </div>
            <div className='LoginButtonContainer'>
            <img src="/img/Login.png" onClick={handleLogin}/>
            <img src="/img/Signup.png" style={{ width: '159px', height: '61px' }} />
            </div>
        </div>
    )
}
export default Modal