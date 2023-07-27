import '../App.css'
import Modal from "./Modal"
import { useNavigate } from 'react-router-dom'

function Main() {
  const navigate = useNavigate()

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
      <img className="MainPage" src="/img/MainPage.png" style={{backgroundSize:'contain'}}></img>
    </div>
  )
}

export default Main