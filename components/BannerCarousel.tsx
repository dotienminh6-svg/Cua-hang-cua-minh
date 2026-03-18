"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const banners = [
  'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2021/07/Mua-ho-hang-hoa-quoc-te.png', // Mua sắm
  'https://cdn.nhandan.vn/images/73dd3adc521635952aeabcf6674a43b030bcd89f7e74208941278b4522a814ae7e9728262103f38c16c75cd2b1296a349db59c87a7c80b5d9bf6604b2fc4a7ee5cfacd5ee898d181029010948d9846a0/ban-hang-online-1-9708.jpg', // Tiện ích
  'https://image.voh.com.vn/voh/Image/2023/09/26/cach-tang-uy-tin-trong-lien-quan-1.jpg?t=o', // Uy tín
  'http://img.spiderum.com/sp-images/e5275d20f66911e6b99be3ec1fb4e2d8.jpg', // Nhanh chóng
  ];

export function BannerCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <div className="embla w-full h-full" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {banners.map((src, index) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0 h-full flex items-center justify-center" key={index}>
            <img 
              src={src} 
              className="max-w-full max-h-full object-contain" // Giữ nguyên tỷ lệ, hiện đầy đủ ảnh
              alt="Promotion banner" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}