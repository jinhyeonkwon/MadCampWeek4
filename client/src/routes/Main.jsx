import '../App.css'
import Modal from "./Modal"
import { useNavigate } from 'react-router-dom'

function Main() {
  const navigate = useNavigate()
  const Rest_api_key = 'dcb8c3b23d720c296085cbdc9046ece9'
  const redirect_uri = 'http://localhost:3000/oauth'

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }
  const navLogin = () => {
    navigate('/Login')
  }
  return (
    <div className="column">
      <div className="MainBox" />
    
      {/* <img
        className="MainButton"
        src="/img/Component 1.png"
        onClick={navLogin}
      ></img> */}
  <Modal/>
      <img className="MainPage" src="/img/MainPage.png"></img>
    </div>
  )
}

export default Main