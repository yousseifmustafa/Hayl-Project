"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { slides } from "../../Data/Data";
import "swiper/css";
import "swiper/css/navigation";

export default function Catslider() {
  const skeletons = useMemo(() => [...Array(6)], []);
  return (
    <div className="relative container mx-auto flex items-center justify-center px-6 mb-6">
      <Swiper
        autoplay={{ delay: 1800, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        navigation={{ prevEl: ".cat-prev", nextEl: ".cat-next" }}
        className="overflow-hidden"
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 5 },
          480: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 25 },
          1536: { slidesPerView: 8, spaceBetween: 30 },
        }}
      >
        {slides.length === 0
          ? skeletons.map((_, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded mt-2 animate-pulse"></div>
                </div>
              </SwiperSlide>
            ))
          : slides.map(({ id, image, name, link }) => (
              <SwiperSlide key={id}>
                <Link
                  href={`/shop/?category=${name}`}
                  className="flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300">
                    <Image
                      className="w-full h-full object-cover min-w-[80px] min-h-[80px]"
                      src={image}
                      alt={name}
                      width={128}
                      height={128}
                      priority
                    />
                  </div>
                  <h3 className="mt-2 transition-all group-hover:scale-110">
                    {name}
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>

      <button className="cat-prev absolute left-0 z-10 p-3 bg-gray-600/60 rounded-full transition-all hover:bg-gray-600 hover:scale-110">
        <ChevronLeft size={32} color="#d4b257" />
      </button>

      <button className="cat-next absolute right-0 z-10 p-3 bg-gray-600/60 rounded-full transition-all hover:bg-gray-600 hover:scale-110">
        <ChevronRight size={32} color="#d4b257" />
      </button>
    </div>
  );
}
