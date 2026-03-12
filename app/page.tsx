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
              className={`px-8 py-3 font-bold uppercase text-sm transition-all ${activeTab === tab ? 'bg-[#23527c]' : 'hover:bg-[#286090]'}`}
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
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase">Đặt hàng nhanh</h2>
              <div className="text-gray-800 font-medium space-y-4 text-lg">
                <p>AllInOneVN cung cấp tất cả những gì bạn cần:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Tìm kiếm nhanh chóng từ Nhật, Mỹ, Hàn...</li>
                  <li>Tiết kiệm thời gian và chi phí vận chuyển</li>
                  <li>Giá cả hợp lý, báo giá công khai</li>
                  <li>Hỗ trợ săn sale, đấu giá trực tuyến</li>
                </ul>
                <p className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 italic">
                  "Chỉ cần gửi thông tin, chúng tôi sẽ lo phần còn lại!"
                </p>
              </div>
            </div>

            <section className="bg-white p-6 rounded border border-gray-300 shadow-sm">
              <form className="space-y-4" onSubmit={sendEmail}>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">Họ và tên của bạn</label>
                  <input name="name" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-400 font-medium outline-none focus:border-blue-500" placeholder="Nhập tên..." required />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">Thông tin sản phẩm cần mua</label>
                  <textarea name="message" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-400 font-medium outline-none focus:border-blue-500" rows={4} placeholder="Link sản phẩm, tên hoặc mã model..." required></textarea>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-900">Số điện thoại Zalo</label>
                  <input name="phone" className="w-full border border-gray-400 p-2 rounded text-gray-900 placeholder-gray-400 font-medium outline-none focus:border-blue-500" placeholder="Số Zalo để báo giá..." required />
                </div>
                <button type="submit" className="w-full bg-[#337ab7] text-white p-3 font-bold uppercase rounded hover:bg-blue-800 transition-colors shadow-lg">
                  {loading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu ngay"}
                </button>
              </form>
            </section>
          </div>
        )}

        {/* TRANG GIỚI THIỆU */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-blue-900 mb-6 border-b-2 border-blue-900 pb-2 uppercase">Về AllInOneVN</h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                <span className="font-bold text-blue-800 text-xl">AllInOneVN</span> ra đời với sứ mệnh kết nối người tiêu dùng Việt Nam với những sản phẩm chất lượng từ khắp nơi. Với sức trẻ, nhiệt huyết, tôi tin chắc bạn sẽ hài lòng khi sử dụng dịch vụ của chúng tôi.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-blue-800 mb-2 text-lg">Tích kiệm thời gian</h4>
                  <p className="text-sm">Chúng tôi hỗ trợ bạn bằng tất cả khả năng và công sức giúp bạn có được thứ mình muốn, cần trong thời gian sớm nhất.</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-blue-800 mb-2 text-lg">Cam kết uy tín</h4>
                  <p className="text-sm">Đội ngũ AllInOneVN luôn đặt sự minh bạch và trách nhiệm lên hàng đầu, đảm bảo hàng hóa về tay đúng theo yêu cầu và nhanh nhất.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANG HOT TREND */}
        {activeTab === 'news' && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-black text-blue-900 mb-4 uppercase">Sản phẩm Hot Trend</h2>
            <p className="text-gray-600 italic">Tính năng đang được cập nhật. Những xu hướng mua sắm mới nhất sẽ sớm xuất hiện tại đây!</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-10 text-center mt-10">
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Liên hệ với tôi</h3>
        <p className="mb-2 flex items-center justify-center gap-2">
           <span>📞 Hotline:</span> 
           <span className="font-bold text-blue-400">0782059679</span>
        </p>
        <p>Facebook: <a href="https://www.facebook.com/LilM1905" target="_blank" className="text-blue-400 underline hover:text-blue-300">LilM1905</a></p>
      </footer>

      {/* NÚT ZALO NỔI */}
      <a 
        href="https://zalo.me/0782059679" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[9999] transition-all transform hover:scale-110 animate-bounce"
        title="Chat Zalo ngay"
      >
        <div className="w-16 h-16 bg-[#0068ff] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,104,255,0.5)]">
           <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M410.64 245.333C410.64 344.4 330.347 424.693 231.28 424.693C212.827 424.693 195.12 421.84 178.48 416.587L96.0001 448L127.413 365.52C122.16 348.88 119.307 331.173 119.307 312.72C119.307 213.653 199.6 133.36 298.667 133.36C397.733 133.36 478.027 213.653 478.027 312.72C478.027 330.147 475.493 346.96 470.853 362.72" fill="#0068FF"/>
            <path d="M410.64 245.333C410.64 146.267 330.347 66 231.28 66C132.213 66 51.9201 146.267 51.9201 245.333C51.9201 262.76 54.4534 279.573 59.0934 295.333C59.0934 295.333 59.0934 295.333 59.0934 295.333C33.6801 371.787 32 377.013 32 378.293C32 381.76 34.8267 384.587 38.2934 384.587C39.5734 384.587 44.8001 382.907 121.253 357.52C137.013 362.16 153.827 364.693 171.253 364.693C270.32 364.693 350.613 284.4 350.613 185.333C350.613 183.787 350.587 182.267 350.507 180.747C385.92 194.507 410.64 217.173 410.64 245.333Z" fill="white"/>
            <path d="M129.547 210.453H212.827V229.493H162.773L212.827 283.413V302.453H129.547V283.413H181.28L129.547 227.467V210.453Z" fill="#0068FF"/>
          </svg>
        </div>
      </a>
    </main>
  );
}