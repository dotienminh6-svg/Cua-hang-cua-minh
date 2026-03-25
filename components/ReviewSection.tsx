'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Đảm bảo đường dẫn này đúng với project của bạn

export default function ReviewSection() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5); // Thêm state để lưu số sao, mặc định là 5 sao
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
      
    if (data) setReviews(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Gửi kèm số sao (rating) mà khách vừa chọn lên Supabase
    const { error } = await supabase
      .from('reviews')
      .insert([{ name, content, rating, is_approved: false }]);

    setIsSubmitting(false);
    
    if (!error) {
      alert('Cảm ơn bạn! Đánh giá của bạn đã được gửi và đang chờ duyệt.');
      setName('');
      setContent('');
      setRating(5); // Reset lại 5 sao sau khi gửi
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      
      {/* KHU VỰC FORM NHẬP BÌNH LUẬN */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Để lại đánh giá của bạn</h3>
        
        {/* Phần chọn sao tương tác */}
        <div className="flex items-center mb-4">
          <span className="mr-3 text-gray-700 font-medium">Bạn chấm mấy sao?</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl focus:outline-none transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Tên của bạn"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded outline-none focus:border-blue-500 text-black"
        />
        <textarea
          placeholder="Chia sẻ cảm nhận của bạn về dịch vụ của chúng tôi..."
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded outline-none focus:border-blue-500 text-black"
        ></textarea>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 w-full md:w-auto font-medium"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>

      {/* KHU VỰC HIỂN THỊ CÁC BÌNH LUẬN ĐÃ DUYỆT */}
      <div className="w-full max-w-2xl space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <span className="font-bold text-blue-700">{review.name}</span>
                {/* Hiển thị số sao tương ứng với dữ liệu trong database */}
                <span className="ml-2 text-yellow-500 text-lg tracking-widest">
                  {'★'.repeat(review.rating || 5)}
                  <span className="text-gray-300">{'★'.repeat(5 - (review.rating || 5))}</span>
                </span>
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