'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPortal() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  // Kiểm tra mật mã
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      fetchFullReviews();
    } else {
      alert('Mật mã không đúng!');
    }
  };

  // Lấy toàn bộ bình luận (cả chưa duyệt và đã duyệt)
  async function fetchFullReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setReviews(data);
  }

  // Hàm Duyệt bình luận
  async function approveReview(id: number) {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id);
    if (!error) fetchFullReviews();
  }

  // Hàm Xóa bình luận
  async function deleteReview(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này không?')) {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (!error) fetchFullReviews();
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-black">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin AllInOneVN</h2>
          <input
            type="password"
            placeholder="Nhập mật mã quản trị"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 outline-none focus:border-blue-500"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Quản lý Đánh giá khách hàng</h1>
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review.id} className={`p-4 rounded-lg border bg-white shadow-sm flex justify-between items-center ${!review.is_approved ? 'border-l-4 border-l-yellow-400' : 'border-l-4 border-l-green-500'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg">{review.name}</span>
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  {!review.is_approved && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">Chờ duyệt</span>
                  )}
                </div>
                <p className="text-gray-600">{review.content}</p>
                <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleString('vi-VN')}</span>
              </div>
              
              <div className="flex gap-2 ml-4">
                {!review.is_approved && (
                  <button onClick={() => approveReview(review.id)} className="bg-green-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-600">
                    Duyệt
                  </button>
                )}
                <button onClick={() => deleteReview(review.id)} className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded text-sm font-medium hover:bg-red-100">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}