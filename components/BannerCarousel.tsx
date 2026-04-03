"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const banners = [
  'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2021/07/Mua-ho-hang-hoa-quoc-te.png', 
  'https://cdn.nhandan.vn/images/73dd3adc521635952aeabcf6674a43b030bcd89f7e74208941278b4522a814ae7e9728262103f38c16c75cd2b1296a349db59c87a7c80b5d9bf6604b2fc4a7ee5cfacd5ee898d181029010948d9846a0/ban-hang-online-1-9708.jpg',
  'https://image.voh.com.vn/voh/Image/2023/09/26/cach-tang-uy-tin-trong-lien-quan-1.jpg?t=o',
  'http://img.spiderum.com/sp-images/e5275d20f66911e6b99be3ec1fb4e2d8.jpg',
  'https://media.sohuutritue.net.vn/files/huongmi/2020/03/16/mua-hang-online-mua-dich-1055.png',
  'https://blog.dktcdn.net/files/top-6-trang-ban-hang-uy-tin-tai-viet-nam-4.jpg',
  'https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/mua%20s%E1%BA%AFm%20tr%E1%BB%B1c%20tuy%E1%BA%BFn/mua-sam-truc-tuyen-thumbnail.jpg',
  'https://groups.google.com/group/tran-bi-kinh-nghiem-mua-hang-online/attach/da5e54fa5e71/mua-hang-online-3.jpg?part=0.1&view=1',
  'https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2024/11/19/mua-hang-online--1732011916389918839635.png',
  '/baner-1.png',
];


export function BannerCarousel() {
  // Cấu hình để hiện nhiều ảnh và tự chạy mượt mà
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 2500 })]);

  return (
    <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex h-full ml-[-8px]">
        {banners.map((src, index) => (
          <div 
            className="embla__slide flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 h-full pl-2" 
            key={index}
          >
            <div className="w-full h-full flex items-center justify-center bg-white rounded-lg border border-gray-100 overflow-hidden">
              <img 
                src={src} 
                className="w-full h-full object-cover" 
                alt="Banner AllInOneVN" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}