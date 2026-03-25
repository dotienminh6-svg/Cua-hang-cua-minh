'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ReviewSection() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState<File | null>(null); // Lưu file ảnh tạm thời
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    if (data) setReviews(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let uploadedImageUrl = null;

    // 1. Xử lý tải ảnh lên Supabase Storage nếu có chọn file
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(fileName, imageFile);

      if (uploadData) {
        // Lấy link ảnh công khai
        const { data: urlData } = supabase.storage
          .from('review-images')
          .getPublicUrl(fileName);
        uploadedImageUrl = urlData.publicUrl;
      }
    }

    // 2. Lưu thông tin bình luận kèm link ảnh vào bảng reviews
    const { error } = await supabase
      .from('reviews')
      .insert([{ 
        name, 
        content, 
        rating, 
        image_url: uploadedImageUrl, 
        is_approved: false 
      }]);

    setIsSubmitting(false);
    
    if (!error) {
      alert('Gửi thành công! Ảnh của bạn đang chờ duyệt.');
      setName(''); setContent(''); setRating(5); setImageFile(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">Để lại đánh giá của bạn</h3>
        
        {/* Chọn sao */}
        <div className="flex items-center mb-4 text-black">
          <span className="mr-3">Đánh giá:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} className={`text-2xl ${s <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
            ))}
          </div>
        </div>

        <input type="text" placeholder="Tên của bạn" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 p-3 border rounded text-black" />
        <textarea placeholder="Cảm nhận của bạn..." required rows={3} value={content} onChange={(e) => setContent(e.target.value)} className="w-full mb-3 p-3 border rounded text-black"></textarea>
        
        {/* Nút chọn ảnh */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Đính kèm ảnh sản phẩm (nếu có):</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-6 py-2 rounded w-full font-bold">
          {isSubmitting ? 'Đang tải lên...' : 'Gửi đánh giá'}
        </button>
      </form>

      {/* Hiển thị danh sách bình luận */}
      <div className="w-full max-w-2xl space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 bg-gray-50 rounded-lg border text-black">
            <div className="flex items-center mb-2">
              <span className="font-bold text-blue-700">{r.name}</span>
              <span className="ml-2 text-yellow-500">{'★'.repeat(r.rating)}</span>
            </div>
            <p className="mb-3">{r.content}</p>
            {/* Nếu có link ảnh thì hiển thị ảnh ra */}
            {r.image_url && (
              <img src={r.image_url} alt="Review" className="w-48 h-auto rounded-lg shadow-sm border border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}