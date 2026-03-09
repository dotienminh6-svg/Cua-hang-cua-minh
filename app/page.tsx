"use client";
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    alert("Yêu cầu của bạn đã được ghi nhận! Tôi sẽ sớm liên hệ qua Zalo.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đặt hàng theo yêu cầu</h1>
        
        <label className="block mb-2 font-medium">Mô tả món hàng:</label>
        <textarea required className="w-full border p-2 mb-4 rounded" rows={4} placeholder="Ví dụ: Giày Nike size 42..."></textarea>
        
        <label className="block mb-2 font-medium">Zalo/SĐT liên hệ:</label>
        <input required type="text" className="w-full border p-2 mb-6 rounded" placeholder="Số điện thoại của bạn" />
        
        <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          {loading ? "Đang gửi..." : "Gửi yêu cầu tìm hàng"}
        </button>
      </form>
    </main>
  );
}