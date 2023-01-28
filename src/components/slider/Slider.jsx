import React from 'react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import slide1 from '../../image/slide1.png'
import slide2 from '../../image/slide2.png'
import slide3 from '../../image/slide3.png'

// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/scrollbar'
import styles from './slider.module.css'

function Slider() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('Slide changed')}
      >
        <SwiperSlide>
          <div className={styles.image_container}>
            <img src={slide1} alt='' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.image_container}>
            <img src={slide2} alt='' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.image_container}>
            <img src={slide3} alt='' />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider
