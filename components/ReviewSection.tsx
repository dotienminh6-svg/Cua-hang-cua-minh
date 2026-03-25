'use client';

import { useState, useEffect } from 'react';
// Chú ý: Đảm bảo đường dẫn này khớp với nơi bạn lưu file supabase.ts ở bước trước
// Nếu bạn lưu ở thư mục utils, hãy đổi thành '@/utils/supabase'
import { supabase } from '@/lib/supabase'; 

export default function ReviewSection() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy các bình luận đã được duyệt từ Supabase
  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true) // Chỉ hiển thị bình luận đã duyệt
      .order('created_at', { ascending: false }); // Mới nhất lên đầu
      
    if (data) {
      setReviews(data);
    } else if (error) {
      console.error("Lỗi khi tải bình luận:", error);
    }
  }

  // Xử lý khi người dùng bấm "Gửi đánh giá"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('reviews')
      .insert([
        { name: name, content: content, rating: 5, is_approved: false }
      ]);

    setIsSubmitting(false);
    
    if (!error) {
      alert('Cảm ơn bạn! Đánh giá của bạn đã được gửi và đang chờ duyệt.');
      setName('');
      setContent('');
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      {/* KHU VỰC NHẬP BÌNH LUẬN MỚI */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Để lại đánh giá của bạn</h3>
        <input
          type="text"
          placeholder="Tên của bạn"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded outline-none focus:border-blue-500 text-black"
        />
        <textarea
          placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded outline-none focus:border-blue-500 text-black"
        ></textarea>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 w-full md:w-auto"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>

      {/* KHU VỰC HIỂN THỊ BÌNH LUẬN */}
      <div className="w-full max-w-2xl space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <span className="font-bold text-blue-700">{review.name}</span>
                <span className="ml-2 text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        )}
      </div>
    </div>
  );
}