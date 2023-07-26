import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import slide_image_1 from "../assets/img/img_1.png"
import slide_image_2 from "../assets/img/img_2.png"
import slide_image_3 from "../assets/img/img_3.png"
import slide_image_4 from "../assets/img/img_4.png"
import slide_image_5 from "../assets/img/img_5.png"
import slide_image_6 from "../assets/img/img_6.png"
import slide_image_7 from "../assets/img/img_7.png"

function Post2(){
  
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
                <img src={slide_image_1} alt="slide_img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_2} alt="slide_img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_3} alt="slide_img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_4} alt="slide_img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_5} alt="slide_img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_6} alt="slide_img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide_image_7} alt="slide_img"/>
            </SwiperSlide>
</div>
           <div className='slider-controler'>
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