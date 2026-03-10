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
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900">
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

      {/* NỘI DUNG CHÍNH */}
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
                  <textarea name="message" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-500 font-medium" rows={4} placeholder="Nhập tên sản phẩm, link..." required></textarea>
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

        {activeTab === 'about' && (
          <div className="bg-white p-8 rounded shadow border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Về AllInOneVN</h2>
            <p className="text-lg text-gray-700">AllInOneVN là dịch vụ mua hộ hàng ngoại chuyên nghiệp. Chúng tôi cam kết mang đến giải pháp tối ưu, hàng chính hãng và chi phí vận chuyển hợp lý nhất cho mọi khách hàng.</p>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="bg-white p-8 rounded shadow border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Tin tức & Hot Trend</h2>
            <p className="text-lg text-gray-700">Cập nhật các sản phẩm đang được săn đón nhất từ Nhật, Mỹ, Hàn. Hãy quay lại đây thường xuyên để không bỏ lỡ các ưu đãi mới nhất!</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-10 text-center mt-10">
        <h3 className="text-lg font-bold mb-4">Thông tin liên hệ</h3>
        <p className="mb-1">📞 Hotline: 0782059679</p>
        <p className="mb-4">
          💬 Zalo:{" "}
          <a href="https://zalo.me/0782059679" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
            zalo.me/0782059679
          </a>
        </p>
        <p className="text-sm text-gray-400">© 2026 Minh Order Service</p>
      </footer>
    </main>
  );
}