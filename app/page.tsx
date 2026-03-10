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
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* TẦNG 1: LOGO (Xử lý hòa trộn nền) */}
      <header className="bg-white py-2 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Thêm mix-blend-multiply để logo hòa vào nền trắng, mất ô caro */}
            <img 
              src="/logo.png" 
              alt="AllInOneVN Logo" 
              className="h-20 w-auto object-contain mix-blend-multiply" 
            />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[#337ab7] font-bold text-lg tracking-tight">AllInOneVN - TẤT CẢ CHỈ TRONG MỘT CLICK</p>
          </div>
        </div>
      </header>

      {/* TẦNG 2: THANH MENU */}
      <nav className="bg-[#337ab7] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex">
          {['home', 'about', 'news'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 font-bold uppercase text-sm tracking-wider transition-all border-r border-blue-400/30 ${
                activeTab === tab ? 'bg-[#23527c] shadow-inner' : 'hover:bg-[#286090]'
              }`}
            >
              {tab === 'home' ? 'Trang chủ' : tab === 'about' ? 'Giới thiệu' : 'Hot trend'}
            </button>
          ))}
        </div>
      </nav>

      {/* TẦNG 3: NỘI DUNG */}
      <div className="max-w-7xl mx-auto py-10 px-6">
        
        {activeTab === 'home' && (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              {/* Sửa lỗi phông chữ "ĐẶT HÀNG NHANH" */}
              <h2 className="text-4xl font-extrabold text-[#337ab7] mb-6 leading-tight">
                ĐẶT HÀNG NHANH
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <span className="font-bold text-orange-600">AllInOneVN</span> cung cấp tất cả những gì bạn cần trên thị trường:
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Nhật Bản (Amazon, Rakuten, Yahoo...)</li>
                  <li>Hoa Kỳ (eBay, Amazon, Jomashop...)</li>
                  <li>Hàn Quốc (Gmarket, Coupang...)</li>
                </ul>
                <p className="italic text-sm text-gray-500">Cam kết: Giá gốc - Vận chuyển nhanh - Hỗ trợ tận tâm.</p>
              </div>
            </div>

            <section className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#337ab7]"></div>
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="mr-2">📝</span> Nhập thứ bạn cần mua
              </h3>
              <form className="space-y-5" onSubmit={sendEmail}>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">What Your Name</label>
                  <input name="name" type="text" placeholder="Ví dụ: Đỗ Tiến Minh" className="w-full border-2 border-gray-100 p-3 rounded-lg focus:border-[#337ab7] outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Thông tin thứ bạn cần mua</label>
                  <textarea name="message" placeholder="Tên sản phẩm, Model hoặc link web..." className="w-full border-2 border-gray-100 p-3 rounded-lg focus:border-[#337ab7] outline-none transition-all" rows={4} required></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Số điện thoại Zalo</label>
                  <input name="phone" type="text" placeholder="Để chúng tôi báo giá nhanh nhất" className="w-full border-2 border-gray-100 p-3 rounded-lg focus:border-[#337ab7] outline-none transition-all" required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#337ab7] text-white p-4 rounded-lg font-black hover:bg-[#23527c] transition-all transform hover:scale-[1.02] shadow-lg uppercase">
                  {loading ? "Đang gửi đi..." : "Gửi yêu cầu ngay"}
                </button>
              </form>
            </section>
          </div>
        )}

        {/* Nội dung Giới thiệu & Tin tức giữ nguyên cấu trúc */}
        {activeTab === 'about' && (
          <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#337ab7] mb-6">Về AllInOneVN</h2>
            <p className="text-gray-700 text-lg leading-relaxed">Chúng tôi có tất cả những gì mà bạn đang tìm kiếm. Với phương châm uy tin, an toàn, chất lượng và giá cả chạm sàn. chúng tôi sẽ mang đến cho bạn trải nghiệm tuyệt vời khi bạn có thể mua bất kì thứ gì bạn muốn chỉ bằng 1 cú click</p>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl shadow border border-gray-50">
                <div className="h-40 bg-blue-50 rounded-lg mb-4 flex items-center justify-center font-bold text-[#337ab7]">Sản phẩm Hot</div>
                <h4 className="font-bold text-lg mb-2 text-gray-800">Cập nhật giá iPhone 14 Pro</h4>
                <p className="text-gray-600 text-sm">Thị trường Nhật đang có giá rất tốt cho các dòng máy lướt...</p>
             </div>
          </div>
        )}
      </div>

      <footer className="bg-[#1a1a1a] text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white font-bold mb-2">AllInOneVN - Order Service</p>
          <p className="text-sm">Hotline & Zalo: 0782.059.679</p>
          <div className="mt-6 border-t border-gray-800 pt-6 text-xs text-gray-600 uppercase tracking-widest">
            © 2026 Designed for Minh Order Service
          </div>
        </div>
      </footer>
    </main>
  );
}