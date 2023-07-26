import React,{useState} from 'react';
import { useNavigate,Link,useLocation} from 'react-router-dom';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import './Post.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import slide_image_1 from "/img/img_1.svg"
import slide_image_2 from "/img/img_2.svg"
import slide_image_3 from "/img/img_3.svg"
import slide_image_4 from "/img/img_4.svg"
import slide_image_5 from "/img/img_5.svg"
import slide_image_6 from "/img/img_6.svg"
import slide_image_7 from "/img/img_7.svg"
import slide_image_8 from "/img/img_8.svg"
function Post2(){
 
const navigate=useNavigate() 
const NavTheme = (id) => {
    console.log(id);
    navigate("/theme", { state: { data: id } });
  };

  const handleNavThemeClick = (id) => () => {
      console.log("아이디는 "+id)
    NavTheme(id);
  };

return(

    <div className="container">
    {/* <img className="MainPage" src="/img/MainPage2.jpg"  alt="Background" /> */}
    
        <Swiper
//   effect="coverflow"
//   grabCursor={true}
//   centeredSlides={true}
//   loop={true}
//   slidesPerView="auto"
//   coverflowEffect={{
//     rotate: 0,
//     stretch: 0,
//     depth: 100,
//     modifier: 2.5,
//   }}
//   pagination={{ clickable: true }}
//   navigation={true}
  className="swiper_container"
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={100}
  slidesPerView="auto"
  navigation
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  onSwiper={(swiper) => console.log(swiper)}
  onSlideChange={() => console.log('slide change')}
  
>
    <div className='Slide'>
       
            <SwiperSlide>
                <img src={slide_image_1} alt="slide_img" onClick={handleNavThemeClick(1)} style={{width:"270px",height:"320px"}} />
            </SwiperSlide>

            <SwiperSlide>
                <img src={slide_image_2} alt="slide_img" onClick={handleNavThemeClick(2)} style={{width:"270px",height:"320px"}} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_3} alt="slide_img" onClick={handleNavThemeClick(3)} style={{width:"270px",height:"320px"}} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_4} alt="slide_img" onClick={handleNavThemeClick(4)} style={{width:"270px",height:"320px"}} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_5} alt="slide_img" onClick={handleNavThemeClick(5)} style={{width:"270px",height:"320px"}} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_6} alt="slide_img" onClick={handleNavThemeClick(6)} style={{width:"270px",height:"320px"}} />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_7} alt="slide_img" onClick={handleNavThemeClick(7)} style={{width:"270px",height:"320px"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_8} alt="slide_img" onClick={handleNavThemeClick(8)} style={{width:"270px",height:"320px"}}/>
            </SwiperSlide>
</div>
           <div className='slider-controler' style={{marginTop:'-40%'}}>
               <div className='swiper-button-prev slider-arrow'>
                   {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
               </div>
               <div className='swiper-button-next slider-arrow'>
                   {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
               </div>
               <div className="swiper-pagination"></div>
               
</div>
        </Swiper>

    </div>
)
}
export default Post2;