import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const POSTS_PER_PAGE = 5

function Post() {
  return (
    <div className="PostContainer">
      <img className="PostImage" src="/img/쌍둥이자리.png" />
      <video className="PostVideo" autoPlay loop muted>
        <source src="/video/milkyway2.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default Post