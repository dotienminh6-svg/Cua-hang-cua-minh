'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPortal() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [replyTexts, setReplyTexts] = useState<{[key: number]: string}>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      fetchFullReviews();
    } else { alert('Mật mã sai!'); }
  };

  async function fetchFullReviews() {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) {
      setReviews(data);
      // Khởi tạo giá trị ban đầu cho các ô nhập phản hồi
      const initialReplies: any = {};
      data.forEach(r => { if(r.shop_reply) initialReplies[r.id] = r.shop_reply });
      setReplyTexts(initialReplies);
    }
  }

  async function updateReview(id: number, isApproved: boolean) {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: isApproved, shop_reply: replyTexts[id] || null })
      .eq('id', id);
    if (!error) {
      alert('Đã cập nhật!');
      fetchFullReviews();
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Admin AllInOneVN</h2>
          <input type="password" placeholder="Mật mã" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded mb-4 text-black outline-none" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Đăng nhập</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quản lý & Phản hồi đánh giá</h1>
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className={`p-4 bg-white rounded-xl border shadow-sm ${!r.is_approved ? 'border-l-4 border-l-yellow-400' : 'border-l-4 border-l-green-500'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold">{r.name}</span>
                  <span className="ml-2 text-yellow-500">{'★'.repeat(r.rating)}</span>
                </div>
                <button onClick={async () => { if(confirm('Xóa?')) await supabase.from('reviews').delete().eq('id', r.id); fetchFullReviews(); }} className="text-red-500 text-sm">Xóa</button>
              </div>
              <p className="text-gray-700 mb-2">{r.content}</p>
              {r.image_url && <img src={r.image_url} className="w-32 h-auto rounded mb-3" />}
              
              {/* Ô nhập phản hồi của shop */}
              <div className="mt-4 pt-4 border-t border-dashed">
                <label className="text-xs font-bold text-blue-600 uppercase">Phản hồi của Shop:</label>
                <textarea 
                  value={replyTexts[r.id] || ''} 
                  onChange={(e) => setReplyTexts({...replyTexts, [r.id]: e.target.value})}
                  className="w-full mt-1 p-2 border rounded text-sm bg-blue-50 focus:bg-white outline-none"
                  placeholder="Viết lời cảm ơn hoặc giải đáp..."
                />
                <button 
                  onClick={() => updateReview(r.id, true)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-bold"
                >
                  {r.is_approved ? 'Cập nhật phản hồi' : 'Duyệt & Lưu phản hồi'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}