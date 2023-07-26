
// src/routes/Post.js
import { useNavigate,Link } from 'react-router-dom';
import { motion } from "framer-motion";
import '../App.css'
import React, { useState, useEffect } from 'react'
import CommentsModal from '../components/CommentsModal';

const POSTS_PER_PAGE = 5

function handleLogout() {
  console.log("로그아웃");
}

const exampleCommentList = [{
  Id: 2,
  QuestionId: 1,
  AuthorId: 3,
  Contents: '으악으아아아아ㅏㄱ',
  CreatedAt: new Date('2023-05-30 03:24:12.98'),
  ModifiedAt: new Date('2023-05-30 03:24:12.98'),
}]

function Post() {
  const slideInLeft = {
    initial: {
      x: '-100%',
    },
    animate: {
      x: 0,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };
  const[clicked,setClicked]=useState(false)
  const navigate=useNavigate()
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
     navigate('/')
    }, 500); // 0.5초 후 이동 (애니메이션 시간과 일치)
  };
  const variants = {
    initial: { scale: 1, rotateY: 0 },
    clicked: { scale: 3.0, rotateY: 20, transition: { duration: 0.5, ease: 'easeInOut' } },
  };
  return (
    <div className="PostContainer">
      {/* 나중에 질문 아이디 반영해서 넣기  */}
      <CommentsModal isOpen={true} qId={1} />
      <nav className="navbar">
        <div className='navbar-container'>
          <div className="navbar-start horizontalcenter">
            <ul>
              <li>
                <div className="navbar-brand">
                  <a className="navbar-item" href="https://geeksforgeeks.org">
                    <img src="/img/Login.svg" />
                  </a>
        
                  <div className="navbar-burger" data-target="navBackgroundDemo1">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </li>
              <li className="nav-link active-link">
                <a href="#">Home </a>
                <div className="underline"></div>
              </li>
              <li className="nav-link">
                <a href="#">About Us</a>
                <div className="underline"></div>
              </li>
              <li className="nav-link">
                <a href="#">Testimonials</a>
                <div className="underline"></div>
              </li>
              <li className="nav-link">
                <a href="#">Contact</a>
                <div className="underline"></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <ul>
            <li>
              <div className='navbar-item nav-link'>
                <img src="/img/Logout.svg" onClick={handleLogout}/>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <video className="PostVideo" autoPlay loop muted>
        <source src="/video/milkyway2.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default Post;
