// src/routes/Post.js
import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { motion } from "framer-motion";



function Post() {

    const slideInRight = {
        initial: {
          x: '100%',
        },
        animate: {
          x: 0,
          transition: { duration: 0.5 },
        },
        exit: {
          x: '-100%',
          transition: { duration: 0.5 },
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
          <motion.div
      className="page"
     
      variants={slideInRight}
      initial="initial"
      animate="animate"
      exit="exit"
    ></motion.div>
      <motion.img
        className="PostImage1"
        src="/img/twin.png"
        onClick={handleClick}
        variants={variants}
        initial="initial"
        animate={clicked ? 'clicked' : 'initial'}
      />
        <img className="PostImage2" src="/img/Virgo.png" />
        <img className="PostImage3" src="/img/Aquarius.png" />
        <Link to="/post">다음 페이지</Link>
        <img className="MainPage" src="/img/MainPage2.jpg"></img>
    </div>
  );
}

export default Post;
