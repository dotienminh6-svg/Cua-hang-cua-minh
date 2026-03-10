"use client";
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // THAY 3 MÃ CỦA BẠN VÀO DƯỚI ĐÂY
    emailjs.sendForm('service_u39jdqg', 'template_rhrihtn', e.target, 'lTdh8-6gnfkeO7kfJ')
      .then(() => {
        alert("Đã gửi đơn hàng thành công!");
        setLoading(false);
        e.target.reset(); // Xóa sạch dữ liệu trong form sau khi gửi
      }, (error) => {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. Thanh tiêu đề (Header) */}
      <header className="bg-blue-600 text-white p-6 shadow-md text-center">
        <h1 className="text-3xl font-extrabold">AllInOneVN</h1>
        <p className="mt-2 text-blue-100">Chúng tôi bán tất cả những gì bạn cần</p>
      </header>

      {/* 2. Phần giới thiệu (Introduction) */}
      <section className="max-w-4xl mx-auto mt-8 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Chào mừng bạn!</h2>
        <p className="text-gray-900 leading-relaxed font-medium">
          Tôi bán tất cả những gì bạn cần với chi phí tối ưu nhất. 
          Cam kết hàng chính hãng, hỗ trợ kiểm tra hàng, đổi trả nếu hàng có vấn đề từ NSX.
        </p>
      </section>

      {/* 3. Phần Form đặt hàng (Order Form) */}
      <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-900">Nhập thứ bạn cần mua</h2>
        <form className="space-y-4" onSubmit={sendEmail}>
          <input 
            name="name" 
            type="text" 
            placeholder="Họ và tên của bạn" 
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-900 placeholder-gray-900" 
            required 
          />
          <textarea 
            name="message" 
            placeholder="Số Model, thứ bạn cần mua..." 
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-900 placeholder-gray-900" 
            rows={4} 
            required
          ></textarea>
          <input 
            name="phone" 
            type="text" 
            placeholder="Số điện thoại Zalo" 
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-900 placeholder-gray-900" 
            required 
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu ngay"}
          </button>
        </form>
      </section>

      {/* Phần thông tin liên hệ */}
      <footer className="mt-20 py-10 bg-gray-800 text-white text-center">
        <h3 className="text-lg font-bold mb-4">Thông tin liên hệ</h3>
        <p className="mb-1">📞 Hotline: 0782059679</p>
        <p className="mb-4">
          💬 Zalo:{" "}
          <a 
            href="https://zalo.me/0782059679" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            zalo.me/0782059679
          </a>
        </p>
        <p className="text-sm text-gray-400">© 2026 Minh Order Service</p>
      </footer>
    </main>
  );
}