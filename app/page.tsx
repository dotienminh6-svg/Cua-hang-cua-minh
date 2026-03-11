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
        alert("Đã gửi đơn hàng thành công!");
        setLoading(false);
        e.target.reset();
      }, (error) => {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      {/* HEADER */}
      <header className="bg-white py-2 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          <p className="text-blue-800 font-bold hidden md:block">AllInOneVN - TẤT CẢ CHỈ TRONG MỘT CLICK</p>
        </div>
      </header>

      {/* MENU */}
      <nav className="bg-[#337ab7] text-white">
        <div className="max-w-7xl mx-auto flex">
          {['home', 'about', 'news'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 font-bold uppercase text-sm ${activeTab === tab ? 'bg-[#23527c]' : 'hover:bg-[#286090]'}`}
            >
              {tab === 'home' ? 'Trang chủ' : tab === 'about' ? 'Giới thiệu' : 'Tin tức'}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-10 px-6 min-h-[400px]">
        {activeTab === 'home' && (
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black text-blue-900 mb-6">ĐẶT HÀNG NHANH</h2>
              <div className="text-gray-800 font-medium space-y-4 text-lg">
                <p>AllInOneVN cung cấp tất cả những gì bạn cần:</p>
                <ul className="list-disc ml-5">
                  <li>Nhật Bản (Amazon, Rakuten, Yahoo...)</li>
                  <li>Hoa Kỳ (eBay, Amazon, Jomashop...)</li>
                  <li>Hàn Quốc (Gmarket, Coupang...)</li>
                </ul>
              </div>
            </div>

            <section className="bg-white p-6 rounded border border-gray-300 shadow-sm">
              <form className="space-y-4" onSubmit={sendEmail}>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">What Your Name</label>
                  <input name="name" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-500 font-medium" placeholder="Nhập tên của bạn..." required />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">Thông tin thứ bạn cần mua</label>
                  <textarea name="message" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-500 font-medium" rows={4} placeholder="Tên sản phẩm, mã Model..." required></textarea>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">Số điện thoại Zalo</label>
                  <input name="phone" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-500 font-medium" placeholder="Nhập số Zalo..." required />
                </div>
                <button type="submit" className="w-full bg-[#337ab7] text-white p-3 font-bold uppercase rounded hover:bg-blue-800">
                  {loading ? "Đang gửi..." : "Gửi yêu cầu ngay"}
                </button>
              </form>
            </section>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-10 text-center mt-10">
        <h3 className="text-lg font-bold mb-4">Thông tin liên hệ</h3>
        <p className="mb-2">📞 Hotline: 0782059679</p>
        <p>Facebook: <a href="https://www.facebook.com/LilM1905" target="_blank" className="text-blue-400 underline">LilM1905</a></p>
      </footer>

      {/* NÚT ZALO NỔI - SỬ DỤNG SVG ĐỂ KHÔNG BAO GIỜ LỖI ẢNH */}
      <a 
        href="https://zalo.me/0782059679" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[9999] transition-all transform hover:scale-110 animate-bounce"
      >
        <div className="w-16 h-16 bg-[#0068ff] rounded-full flex items-center justify-center shadow-2xl">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 11.5C22.5 16.4706 17.7985 20.5 12 20.5C11.127 20.5 10.2795 20.4074 9.471 20.2319L5.5 22.5V18.636C3.0645 16.9421 1.5 14.3982 1.5 11.5C1.5 6.52944 6.20152 2.5 12 2.5C17.7985 2.5 22.5 6.52944 22.5 11.5Z" stroke="white" strokeWidth="1.5"/>
            <text x="50%" y="55%" fontSize="6" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Arial">Zalo</text>
          </svg>
        </div>
      </a>
    </main>
  );
}