"use client";
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Phần giới thiệu */}
      <header className="bg-white shadow-sm p-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-600">Minh Order Hàng Ngoại</h1>
        <p className="mt-2 text-gray-600">Chuyên order hàng chính hãng từ Nhật, Mỹ, Hàn. Nhanh chóng - Uy tín - Giá tốt.</p>
      </header>

      {/* Phần Form đặt hàng */}
      <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Gửi yêu cầu đặt hàng</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Tên của bạn" className="w-full border p-3 rounded" required />
          <textarea placeholder="Link sản phẩm hoặc mô tả..." className="w-full border p-3 rounded" rows={3} required></textarea>
          <input type="text" placeholder="Số điện thoại Zalo" className="w-full border p-3 rounded" required />
          <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
            Gửi yêu cầu
          </button>
        </form>
      </section>

      {/* Phần thông tin liên hệ */}
      <footer className="mt-16 py-8 text-center bg-gray-200">
        <h3 className="font-bold">Liên hệ với tôi</h3>
        <p>📞 SĐT: 0782059679</p>
        <p>💬 Zalo: Zalo.me/0782059679</p>
        <p className="mt-2 text-sm text-gray-500">© 2026 Minh Order</p>
      </footer>
    </main>
  );
}