import Link from 'next/link';

export default function ThoiTrangMixMatch() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <Link href="/?tab=news" scroll={false} className="inline-flex items-center text-blue-600 font-bold mb-8 hover:text-blue-800 transition-colors">
        ← Quay lại 
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1613728455120-d00493b5e77e?q=80&w=464&auto=format&fit=crop" 
            alt="Thời Trang Mix & Match" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block bg-blue-100 text-blue-700 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
            Xu hướng 2026
          </div>
          <h1 className="text-4xl font-black text-blue-900">Thời Trang Mix & Match</h1>
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p>
              Các mặt hàng Local Brand chất lượng cao, đồ tập Yoga, và đặc biệt là phong cách <strong>Quiet Luxury</strong> (sang trọng thầm lặng) hoặc Streetwear Unisex đang dẫn đầu xu hướng.
            </p>
            <p>
              Với dịch vụ của AllInOneVN, bạn có thể dễ dàng nhập các mặt hàng thời trang hot nhất từ các xưởng sản xuất uy tín với giá gốc, đảm bảo chất lượng và form dáng chuẩn.
            </p>
          </div>

        
          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Bạn muốn được tư vấn kỹ hơn về mặt hàng này ?</p>
            <Link href="/" className="inline-block w-full md:w-auto text-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Nhận tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}