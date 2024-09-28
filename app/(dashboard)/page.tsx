"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Home = () => {
  return (
    <div className="relative bg-zinc-900 py-10">
      <h2 className="text-center text-4xl text-white font-bold mb-8 font-protest">
        Discover Our Guitar Collection
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        speed={2000}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className=" shadow-2xl"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://media.gq.com/photos/58ebf7dcae66e147cc478952/16:9/w_2560%2Cc_limit/retrofret-gq-12.jpg"
              alt="guitar"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-md">
              Electric Guitar 1
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://www.ginoguitars.com/images/homepage_slider/27-2-2024-Murphy-Lab-Acoustic.jpg"
              alt="guitar"
              className="w-full h-auto object-cover "
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-md">
              Electric Guitar 2
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://images.guitarguitar.co.uk/cdn/small/160/news_753_Gibson-Custom-Shop-Roadshow-at-guitarguitar_Image00.jpg"
              alt="guitar"
              className="w-full h-auto object-cover "
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-md">
              Vintage Guitar 3
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.ytimg.com/vi/ntzO0IUYvV0/maxresdefault.jpg"
              alt="guitar"
              className="w-full h-auto object-cover "
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-md">
              Classic Guitar 4
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
