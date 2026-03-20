import Link from 'next/link';

export default function ThucPhamHealthy() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <Link href="/?tab=news" scroll={false} className="inline-flex items-center text-blue-600 font-bold mb-8 hover:text-blue-800 transition-colors">
        ← Quay lại
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1567769541495-338ee7203e3c?q=80&w=387&auto=format&fit=crop" 
            alt="Thực phẩm Healthy"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block bg-orange-100 text-orange-700 font-bold px-4 py-1 rounded-full text-sm uppercase">
            Xu hướng 2026
          </div>
          <h1 className="text-4xl font-black text-blue-900">Thực phẩm Healthy & Đặc sản</h1>
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p> 
              Trà Kombucha, bánh ăn kiêng và các sản phẩm OCOP chất lượng cao đang là ưu tiên số 1 của người tiêu dùng hiện đại. 
            </p>
            <p>
              Với dịch vụ của AllInOneVN, bạn có thể dễ dàng nhập các mặt hàng thực phầm, đồ uống Healthy đảm bảo nhất từ các nhà sản xuất uy tín với giá gốc, đảm bảo chất lượng và an toàn thực phẩm.
            </p>
          </div>  

          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Bạn muốn kinh doanh mặt hàng này?</p>
            <Link href="/" className="inline-block w-full md:w-auto text-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Nhận tư vấn 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}