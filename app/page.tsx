"use client";
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // Quản lý các trang: home, about, news

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
    <main className="min-h-screen bg-gray-100">
      {/* TẦNG 1: LOGO & BANNER (Nền trắng) */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src="/logo.png" alt="AllInOneVN Logo" className="h-20 w-auto object-contain" />
          {/* Bạn có thể thêm ảnh banner quảng cáo ở đây nếu muốn */}
          <div className="hidden md:block text-right italic text-blue-600 font-bold">
            "WE MAKE THE SOLUTION FOR EVERYTHING YOU NEED"
          </div>
        </div>
      </header>

      {/* TẦNG 2: THANH MENU NGANG (Màu xanh giống Subin Vina) */}
      <nav className="bg-[#337ab7] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-6 py-3 font-bold hover:bg-[#286090] transition border-r border-blue-400 ${activeTab === 'home' ? 'bg-[#286090]' : ''}`}
          >
            Trang chủ
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-bold hover:bg-[#286090] transition border-r border-blue-400 ${activeTab === 'about' ? 'bg-[#286090]' : ''}`}
          >
            Giới thiệu
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 font-bold hover:bg-[#286090] transition ${activeTab === 'news' ? 'bg-[#286090]' : ''}`}
          >
            Tin tức
          </button>
        </div>
      </nav>

      {/* TẦNG 3: NỘI DUNG THAY ĐỔI THEO MENU */}
      <div className="max-w-7xl mx-auto py-10 px-6 min-h-[60vh]">
        
        {/* NỘI DUNG TRANG CHỦ (FORM ĐẶT HÀNG) */}
        {activeTab === 'home' && (
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-black text-blue-700 mb-4 uppercase">Đặt hàng nhanh</h2>
              <p className="text-gray-700 mb-6 font-medium leading-relaxed">
                Chào mừng bạn đến với AllInOneVN! <br/>
                Tôi hỗ trợ đặt hàng từ Nhật, Mỹ, Hàn với chi phí tối ưu nhất. 
                Hãy để lại thông tin món hàng bạn cần mua dưới đây.
              </p>
              <img src="/logo.png" className="w-full opacity-20 grayscale" alt="decoration" />
            </div>

            <section className="bg-white p-8 rounded-lg shadow-2xl border-t-4 border-blue-600">
              <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Thông tin yêu cầu</h3>
              <form className="space-y-4" onSubmit={sendEmail}>
                <input name="name" placeholder="Họ và tên của bạn" className="w-full border p-3 rounded text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                <textarea name="message" placeholder="Tên sản phẩm, link sản phẩm hoặc số Model..." className="w-full border p-3 rounded text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" rows={4} required></textarea>
                <input name="phone" placeholder="Số điện thoại Zalo" className="w-full border p-3 rounded text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" required />
                <button type="submit" disabled={loading} className="w-full bg-[#337ab7] text-white p-4 rounded font-bold hover:bg-[#23527c] transition uppercase tracking-widest shadow-lg">
                  {loading ? "Đang xử lý..." : "Gửi yêu cầu đặt hàng"}
                </button>
              </form>
            </section>
          </div>
        )}

        {/* NỘI DUNG TRANG GIỚI THIỆU */}
        {activeTab === 'about' && (
          <div className="bg-white p-10 rounded shadow">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Về AllInOneVN</h2>
            <div className="prose text-gray-800 font-medium">
              <p>AllInOneVN là dịch vụ cá nhân hỗ trợ tìm kiếm và mua hộ hàng ngoại từ các thị trường Nhật, Mỹ, Hàn Quốc.</p>
              <p className="mt-4">Chúng tôi cam kết:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Hàng chính hãng 100%.</li>
                <li>Chi phí vận chuyển và công mua hộ thấp nhất thị trường.</li>
                <li>Hỗ trợ kiểm tra hàng và tư vấn model kỹ thuật tận tâm.</li>
              </ul>
            </div>
          </div>
        )}

        {/* NỘI DUNG TRANG TIN TỨC */}
        {activeTab === 'news' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
              <div className="bg-gray-200 h-40 rounded mb-4 flex items-center justify-center text-gray-500 italic">[Ảnh sản phẩm hot 1]</div>
              <h4 className="font-bold text-blue-700">Top 5 iPhone 14 Pro cũ giá rẻ tháng này</h4>
              <p className="text-sm text-gray-600 mt-2">Cập nhật giá iPhone 14 Pro từ thị trường Nhật Bản cực tốt...</p>
            </div>
            <div className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
              <div className="bg-gray-200 h-40 rounded mb-4 flex items-center justify-center text-gray-500 italic">[Ảnh sản phẩm hot 2]</div>
              <h4 className="font-bold text-blue-700">Máy in Zebra RFID - Giải pháp cho kho bãi</h4>
              <p className="text-sm text-gray-600 mt-2">Tìm hiểu các dòng máy in Zebra và linh kiện chính hãng...</p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">AllInOneVN</h3>
            <p className="text-gray-400 text-sm italic">Cung cấp mọi thứ bạn cần từ nước ngoài.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Liên hệ</h3>
            <p className="text-sm text-gray-300">📞 Hotline: 0782059679</p>
            <p className="text-sm text-gray-300">💬 Zalo: 0782059679</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Địa chỉ</h3>
            <p className="text-sm text-gray-300">📍 Hà Nội / Quảng Ninh</p>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-500 text-xs">© 2026 Minh Order Service. All Rights Reserved.</div>
      </footer>
    </main>
  );
}