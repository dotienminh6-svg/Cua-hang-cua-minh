"use client";
import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './embla.css'; // Chúng ta sẽ tạo file này ở bước 3

// Mảng chứa các ảnh banner của bạn
const banners = [
  'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2021/07/Mua-ho-hang-hoa-quoc-te.png', // Mua sắm
  'https://cdn.nhandan.vn/images/73dd3adc521635952aeabcf6674a43b030bcd89f7e74208941278b4522a814ae7e9728262103f38c16c75cd2b1296a349db59c87a7c80b5d9bf6604b2fc4a7ee5cfacd5ee898d181029010948d9846a0/ban-hang-online-1-9708.jpg', // Tiện ích
  'https://image.voh.com.vn/voh/Image/2023/09/26/cach-tang-uy-tin-trong-lien-quan-1.jpg?t=o', // Uy tín
  'http://img.spiderum.com/sp-images/e5275d20f66911e6b99be3ec1fb4e2d8.jpg', // Nhanh chóng
];

export function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="embla relative overflow-hidden bg-white shadow-xl rounded-2xl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {banners.map((src, index) => (
            <div className="embla__slide relative flex-[0_0_100%] min-w-0" key={index}>
              <img 
                src={src} 
                className="w-full h-[400px] object-cover rounded-2xl" 
                alt={`AllInOneVN Banner ${index + 1}`} 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                <h1 className="text-white text-5xl font-black uppercase tracking-tight text-center px-10">
                   {index === 0 && 'HÀNG NGOÀI TỐT - MUA DỄ DÀNG'}
                   {index === 1 && 'VẬN CHUYỂN NHANH CHÓNG'}
                   {index === 2 && 'UY TÍN HÀNG ĐẦU'}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Nút Previous */}
      <button className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all" onClick={scrollPrev}>
        <svg className="w-6 h-6 text-aio-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      
      {/* Nút Next */}
      <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all" onClick={scrollNext}>
        <svg className="w-6 h-6 text-aio-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}