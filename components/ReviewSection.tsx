'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ReviewSection() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- Cấu hình Xem Thêm & Bộ Lọc ---
  const [visibleCount, setVisibleCount] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [filterRating, setFilterRating] = useState<number | null>(null); // null nghĩa là hiện tất cả
  const [stats, setStats] = useState({ average: 0, total: 0, counts: [0, 0, 0, 0, 0] });
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchStats();
    fetchReviews();
  }, [visibleCount, filterRating]);

  // 1. Hàm tính toán thống kê số sao
  async function fetchStats() {
    const { data } = await supabase
      .from('reviews')
      .select('rating')
      .eq('is_approved', true);

    if (data && data.length > 0) {
      const total = data.length;
      const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
      const counts = [0, 0, 0, 0, 0];
      data.forEach(r => counts[r.rating - 1]++);
      
      setStats({
        average: parseFloat((sum / total).toFixed(1)),
        total,
        counts: counts.reverse() // [5 sao, 4 sao, 3 sao, 2 sao, 1 sao]
      });
    }
  }

  // 2. Hàm lấy danh sách đánh giá có kèm lọc
  async function fetchReviews() {
    let query = supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    // Nếu có chọn lọc sao
    if (filterRating !== null) {
      query = query.eq('rating', filterRating);
    }

    const { data, count } = await query.range(0, visibleCount - 1);

    if (data) {
      setReviews(data);
      setHasMore(count !== null && data.length < count);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let uploadedImageUrl = null;

    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data: uploadData } = await supabase.storage.from('review-images').upload(fileName, imageFile);
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('review-images').getPublicUrl(fileName);
        uploadedImageUrl = urlData.publicUrl;
      }
    }

    const { error } = await supabase.from('reviews').insert([{ name, content, rating, image_url: uploadedImageUrl, is_approved: false }]);
    setIsSubmitting(false);
    if (!error) {
      alert('Gửi thành command! Đang chờ duyệt.');
      setName(''); setContent(''); setRating(5); setImageFile(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-6 flex flex-col items-center text-black">
      
      {/* PHẦN 1: THỐNG KÊ SỐ SAO TỔNG QUAN */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-700">{stats.average}</div>
          <div className="text-yellow-400 text-xl my-1">{'★'.repeat(Math.round(stats.average))}</div>
          <div className="text-gray-500 text-sm">{stats.total} đánh giá</div>
        </div>
        
        <div className="flex-1 w-full space-y-2">
          {stats.counts.map((count, index) => {
            const starLevel = 5 - index;
            const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={starLevel} className="flex items-center gap-2 text-sm">
                <span className="w-10 whitespace-nowrap">{starLevel} sao</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="w-8 text-gray-400 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* PHẦN 2: BỘ LỌC SAO */}
      <div className="w-full max-w-2xl mb-6 flex flex-wrap gap-2 justify-center">
        <button 
          onClick={() => { setFilterRating(null); setVisibleCount(5); }}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${filterRating === null ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
        >
          Tất cả
        </button>
        {[5, 4, 3, 2, 1].map((s) => (
          <button 
            key={s}
            onClick={() => { setFilterRating(s); setVisibleCount(5); }}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${filterRating === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
          >
            {s} sao ({stats.counts[5-s]})
          </button>
        ))}
      </div>

      {/* PHẦN 3: FORM GỬI ĐÁNH GIÁ (Ẩn/Hiện tùy ý, ở đây tôi để nguyên) */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10">
        <h3 className="text-lg font-bold mb-4 text-blue-700">Viết đánh giá của bạn</h3>
        <div className="flex items-center mb-4">
          <span className="mr-3 font-medium">Đánh giá:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} className={`text-2xl ${s <= rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</button>
            ))}
          </div>
        </div>
        <input type="text" placeholder="Tên" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea placeholder="Nội dung..." required rows={3} value={content} onChange={(e) => setContent(e.target.value)} className="w-full mb-3 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="mb-4 text-sm text-gray-500 block w-full" />
        <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-3 rounded-lg w-full font-bold hover:bg-blue-700 transition-colors">
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>

      {/* PHẦN 4: DANH SÁCH ĐÁNH GIÁ */}
      <div className="w-full max-w-2xl space-y-4 mb-6">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-400 py-10">Chưa có đánh giá nào cho mức sao này.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-blue-800">{r.name}</span>
                  <div className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}</div>
                </div>
                <span className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString('vi-VN')}</span>
              </div>
              <p className="text-gray-700 mb-3">{r.content}</p>
              {r.image_url && <img src={r.image_url} alt="Review" className="w-48 h-auto rounded-lg border" />}
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)} className="text-blue-600 font-medium py-2 hover:underline">
          Xem thêm đánh giá ↓
        </button>
      )}
    </div>
  );
}