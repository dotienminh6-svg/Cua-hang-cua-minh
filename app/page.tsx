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
      {/* HEADER */}
<header className="bg-white py-4 px-6 border-b border-gray-100 shadow-sm">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    
    {/* Góc trái: Chỉ có Logo */}
    <div className="flex items-center">
      <img src="/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
    </div>
    
    {/* Góc phải: AllInOneVN và slogan */}
    <div className="flex items-center gap-4">
      <span className="text-[#337ab7] font-extrabold text-2xl tracking-tight">AllInOneVN</span>
      <div className="h-6 w-[1px] bg-gray-300 hidden md:block"></div>
      <p className="text-blue-700 font-bold hidden md:block uppercase text-[11px] tracking-[0.2em]">
        Tất cả chỉ trong một click
      </p>
    </div>
    
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

      {/* NỘI DUNG CHÍNH */}
      <div className="max-w-7xl mx-auto py-10 px-6 min-h-[500px]">
        
        {/* TRANG CHỦ */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-5xl font-black text-blue-900 mb-6 uppercase leading-tight">
                  Mua sắm quốc tế <br/><span className="text-blue-600">Dễ dàng hơn</span>
                </h2>
                <div className="text-gray-800 font-medium space-y-4 text-lg leading-relaxed">
                  <p>AllInOneVN - Một cho tất cả và tất cả trong một</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">✅ Tiết kiệm thời gian mua hàng</li>
                    <li className="flex items-center gap-2">✅ Báo giá nhanh chóng</li>
                    <li className="flex items-center gap-2">✅ Hàng chuẩn 100%</li>
                  </ul>
                  <div className="pt-4">
                    <button onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})} className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-200 transition-colors">
                      Tìm hiểu quy trình ↓
                    </button>
                  </div>
                </div>
              </div>

              {/* FORM */}
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

            {/* QUY TRÌNH 3 BƯỚC MỚI */}
            <div className="pt-10">
               <h3 className="text-2xl font-black text-center mb-10 text-blue-900 uppercase tracking-widest">Quy trình đơn giản</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                    <h4 className="font-bold text-lg mb-2">Gửi thông tin</h4>
                    <p className="text-sm text-gray-500">Bạn chỉ cần gửi link, tên sản phẩm hoặc model vào form phía trên.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                    <h4 className="font-bold text-lg mb-2">Báo giá & Đặt cọc</h4>
                    <p className="text-sm text-gray-500">AllInOneVN gửi báo giá chi tiết. Bạn xác nhận và đặt cọc đơn hàng.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                    <h4 className="font-bold text-lg mb-2">Nhận hàng</h4>
                    <p className="text-sm text-gray-500">Nhận hàng, kiểm tra hàng, hoàn hàng nếu không đúng yêu cầu.</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* TRANG GIỚI THIỆU */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black text-blue-900 mb-8 border-b pb-4">VỀ CHÚNG TÔI</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                <span className="font-bold text-blue-800 text-xl underline decoration-yellow-400">AllInOneVN</span> không chỉ đơn thuần là một dịch vụ mua hộ. Chúng tôi muốn chỉ cần ở nhà và bùm, bạn sẽ có được những thứ bạn cần với chi phí tối ưu.
              </p>
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                 <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-blue-500">
                    <h5 className="font-bold text-blue-700 mb-2">Sứ mệnh</h5>
                    <p className="text-sm">Mang đến cho bạn trải nghiệm tối ưu nhất khi chỉ việc ở nhà và mua những thứ mình muốn.</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-green-500">
                    <h5 className="font-bold text-green-700 mb-2">Giá trị</h5>
                    <p className="text-sm">Minh bạch trong báo giá, tận tâm trong hỗ trợ và hài lòng trong sử dụng.</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANG HOT TREND */}
        {activeTab === 'news' && (
          <div className="grid md:grid-cols-3 gap-6">
             {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                 <div className="h-48 bg-gray-200 animate-pulse"></div> {/* Thay bằng ảnh sản phẩm thật */}
                 <div className="p-4">
                   <span className="text-red-500 font-bold text-xs uppercase">Đang giảm giá</span>
                   <h4 className="font-bold mt-1 text-blue-900">Sản phẩm Hot Trend {i}</h4>
                   <p className="text-sm text-gray-500 mt-2">Mô tả ngắn gọn về món đồ đang cực hot tại Mỹ/Nhật...</p>
                   <button onClick={() => setActiveTab('home')} className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm">Gửi yêu cầu mua ngay</button>
                 </div>
               </div>
             ))}
           </div>
         )}

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-14 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
          <div className="text-2xl font-black tracking-tighter italic">AllInOneVN</div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 uppercase font-bold tracking-widest">
            <span>📞 0782059679</span>
            <span>📍 Hà Nội - Quảng Ninh</span>
          </div>
          <a href="https://www.facebook.com/LilM1905" target="_blank" className="bg-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-500 transition-colors">
            Follow Fanpage
          </a>
          <p className="text-gray-600 text-[10px] pt-10">© 2026 AllInOneVN. Created by Do Tien Minh.</p>
        </div>
      </footer>

      {/* ZALO BUTTON */}
      <a 
        href="https://zalo.me/0782059679" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9999] hover:scale-110 transition-transform animate-bounce"
      >
        <div className="w-16 h-16 bg-[#0068ff] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
           <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 13.591 2.369 15.093 3.024 16.425L2.012 21.056C1.933 21.417 2.247 21.731 2.608 21.652L7.239 20.64C8.571 21.295 10.073 21.664 11.664 21.664C17.187 21.664 21.664 17.187 21.664 11.664C21.664 6.141 17.187 1.664 11.664 1.664L12 2Z"/>
          </svg>
        </div>
      </a>
    </main>
  );
}