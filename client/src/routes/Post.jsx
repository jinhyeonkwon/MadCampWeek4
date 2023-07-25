import '../App.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  return (
    <div className="PostContainer">
      {/* navbar */}
      <CommentsModal isOpen={true} qId={1} />
      <nav className="navbar">
        <div className='navbar-container'>
          <div className="navbar-start horizontalcenter">
            <ul>
              <li>
                <div className="navbar-brand">
                  <a className="navbar-item" href="https://geeksforgeeks.org">
                    <img src="/img/Login.png" />
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
                <img src="/img/Logout.png" onClick={handleLogout}/>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <img className="PostImage" src="/img/쌍둥이자리.png" />
      <video className="PostVideo" autoPlay loop muted>
        <source src="/video/milkyway2.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default Post