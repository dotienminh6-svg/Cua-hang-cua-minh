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
  
  // --- Cấu hình Xem Thêm ---
  const [visibleCount, setVisibleCount] = useState(5); // Số lượng hiện tại muốn xem
  const [hasMore, setHasMore] = useState(true); // Còn đánh giá để tải không?
  const PAGE_SIZE = 5; // Mỗi lần ấn "Xem thêm" sẽ hiện thêm 5 cái

  useEffect(() => {
    fetchReviews();
  }, [visibleCount]); // Khi visibleCount thay đổi, sẽ tự động tải thêm dữ liệu

  async function fetchReviews() {
    // Chỉ lấy từ vị trí 0 đến (visibleCount - 1)
    const { data, error, count } = await supabase
      .from('reviews')
      .select('*', { count: 'exact' }) // Lấy thêm tổng số dòng để biết khi nào hết
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(0, visibleCount - 1);

    if (data) {
      setReviews(data);
      // Nếu số lượng lấy về đã bằng hoặc vượt tổng số đánh giá thì ẩn nút
      if (count !== null && data.length >= count) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let uploadedImageUrl = null;

    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data: uploadData } = await supabase.storage
        .from('review-images')
        .upload(fileName, imageFile);

      if (uploadData) {
        const { data: urlData } = supabase.storage.from('review-images').getPublicUrl(fileName);
        uploadedImageUrl = urlData.publicUrl;
      }
    }

    const { error } = await supabase
      .from('reviews')
      .insert([{ name, content, rating, image_url: uploadedImageUrl, is_approved: false }]);

    setIsSubmitting(false);
    if (!error) {
      alert('Gửi thành công! Đánh giá đang chờ duyệt.');
      setName(''); setContent(''); setRating(5); setImageFile(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 flex flex-col items-center">
      {/* Form gửi đánh giá (Giữ nguyên như bản trước của bạn) */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 mb-8 box-border">
        <h3 className="text-lg font-bold mb-4 text-black text-center sm:text-left text-blue-700">Để lại đánh giá của bạn</h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center mb-5 text-black">
          <span className="font-medium mr-3 mb-2 sm:mb-0">Bạn chấm mấy sao?</span>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} className={`text-3xl sm:text-2xl transition-transform hover:scale-110 ${s <= rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</button>
            ))}
          </div>
        </div>

        <input type="text" placeholder="Tên của bạn" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea placeholder="Chia sẻ cảm nhận của bạn về dịch vụ và sản phẩm của chúng tôi..." required rows={3} value={content} onChange={(e) => setContent(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
        
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2 italic">Đính kèm ảnh sản phẩm (nếu có):</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full font-bold shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400">
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>

      {/* Hiển thị danh sách đánh giá */}
      <div className="w-full max-w-2xl space-y-4 px-1 sm:px-0 mb-6">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-100 text-black shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center mb-2">
              <span className="font-bold text-blue-700 text-lg">{r.name}</span>
              <span className="sm:ml-3 mt-1 sm:mt-0 text-yellow-500">{'★'.repeat(r.rating)}</span>
            </div>
            <p className="mb-3 text-gray-700 leading-relaxed">{r.content}</p>
            {r.image_url && (
              <img src={r.image_url} alt="Review" className="w-full sm:w-64 h-auto rounded-lg shadow-sm border border-gray-200 mt-2 object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Nút Tải thêm đánh giá */}
      {hasMore && reviews.length > 0 && (
        <button 
          onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
          className="bg-white text-blue-600 border border-blue-600 px-8 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-sm mb-10"
        >
          Xem thêm đánh giá ↓
        </button>
      )}

      {!hasMore && reviews.length > 0 && (
        <p className="text-gray-400 text-sm mb-10">Đã hiển thị tất cả đánh giá</p>
      )}
    </div>
  );
}