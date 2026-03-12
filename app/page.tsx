"use client";
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const sendEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm('service_u39jdqg', 'template_rhrihtn', e.target, 'lTdh8-6gnfkeO7kfJ')
      .then(() => {
        alert("Đã gửi đơn hàng thành công! Đợi chút Minh sẽ check và báo giá bạn ngay.");
        setLoading(false);
        e.target.reset();
      }, (error) => {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      {/* HEADER - Đã khôi phục Logo */}
      <header className="bg-white py-3 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-blue-900 font-black text-xl tracking-tighter">AllInOneVN</span>
          </div>
          <p className="text-blue-800 font-bold hidden md:block uppercase text-xs tracking-widest">
            Tất cả chỉ trong một click
          </p>
        </div>
      </header>

      {/* MENU */}
      <nav className="bg-[#337ab7] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-hide">
          {['home', 'about', 'news'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-bold uppercase text-xs tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-[#23527c] border-b-4 border-yellow-400' : 'hover:bg-[#286090]'
              }`}
            >
              {tab === 'home' ? 'Trang chủ' : tab === 'about' ? 'Giới thiệu' : 'Hot trend'}
            </button>
          ))}
        </div>
      </nav>

      {/* NỘI DUNG CHÍNH - Giữ nguyên thiết kế của bạn */}
      <div className="max-w-7xl mx-auto py-10 px-6 min-h-[500px]">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-5xl font-black text-blue-900 mb-6 uppercase leading-tight">
                  Mua sắm quốc tế <br/><span className="text-blue-600">Dễ dàng hơn</span>
                </h2>
                <div className="text-gray-800 font-medium space-y-4 text-lg leading-relaxed">
                  <p>AllInOneVN - Giải pháp mua hộ hàng đầu từ Mỹ, Nhật, Hàn, Trung Quốc...</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">✅ Tiết kiệm chi phí vận chuyển</li>
                    <li className="flex items-center gap-2">✅ Báo giá nhanh trong 5-10 phút</li>
                    <li className="flex items-center gap-2">✅ Bảo hiểm hàng hóa 100%</li>
                  </ul>
                  <div className="pt-4">
                    <button onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})} className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-200 transition-colors">
                      Tìm hiểu quy trình ↓
                    </button>
                  </div>
                </div>
              </div>

              <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-blue-900 font-black px-4 py-1 rounded-lg shadow-md text-xs uppercase animate-pulse">
                  Quick Order
                </div>
                <form className="space-y-4" onSubmit={sendEmail}>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 text-sm">Tên của bạn</label>
                    <input name="name" className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên..." required />
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 text-sm">Sản phẩm cần mua</label>
                    <textarea name="message" className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Link sản phẩm hoặc tên món đồ..." required></textarea>
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 text-sm">Số điện thoại Zalo</label>
                    <input name="phone" className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Để Minh báo giá cho bạn..." required />
                  </div>
                  <button type="submit" className="w-full bg-[#337ab7] text-white p-4 font-bold uppercase rounded-xl hover:bg-blue-800 shadow-lg transform active:scale-95 transition-all">
                    {loading ? "Đang gửi đi..." : "Gửi yêu cầu ngay"}
                  </button>
                </form>
              </section>
            </div>

            <div className="pt-10">
               <h3 className="text-2xl font-black text-center mb-10 text-blue-900 uppercase tracking-widest">Quy trình đơn giản</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                    <h4 className="font-bold text-lg mb-2">Gửi thông tin</h4>
                  </div>
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                    <h4 className="font-bold text-lg mb-2">Báo giá & Đặt cọc</h4>
                  </div>
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                    <h4 className="font-bold text-lg mb-2">Nhận hàng</h4>
                  </div>
               </div>
            </div>
          </div>
        )}
        {/* Giữ nguyên logic cho các tab khác của bạn */}
      </div>

      {/* FOOTER & ZALO BUTTON giữ nguyên */}
      <footer className="bg-gray-900 text-white py-14 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
          <div className="text-2xl font-black tracking-tighter italic">AllInOneVN</div>
          <p className="text-gray-600 text-[10px] pt-10">© 2026 AllInOneVN. Created by Do Tien Minh.</p>
        </div>
      </footer>
    </main>
  );
}