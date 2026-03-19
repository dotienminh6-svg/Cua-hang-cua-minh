import Link from 'next/link';

export default function SanPhamThuCung() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <Link href="/?tab=news" scroll={false} className="inline-flex items-center text-blue-600 font-bold mb-8 hover:text-blue-800 transition-colors">
        ← Quay lại 
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
          <img 
          src="https://finterior.com.vn/wp-content/uploads/2024/07/mau-thiet-ke-spa-thu-cung.jpg" 
          alt="Pet Care"
          className="w-full h-full object-cover" 
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block bg-yellow-100 text-yellow-700 font-bold px-4 py-1 rounded-full text-sm uppercase">
            Xu hướng 2026
          </div>
          <h1 className="text-4xl font-black text-blue-900">Sản phẩm cho thú cưng</h1>
          <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            Chăm sóc thú cưng như thành viên trong gia đình đang là xu hướng. Từ thực phẩm dinh dưỡng đến đồ chơi thông minh, chúng tôi giúp bạn nhập hàng từ những thương hiệu uy tín nhất.
          </p>
          <p>
              Với dịch vụ của AllInOneVN, bạn có thể dễ dàng nhập các mặt hàng cho thú cưng hot nhất từ các nơi uy tín với giá gốc, đảm bảo chất lượng và an toàn với thú cưng.
          </p>
        </div> 
          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Bạn muốn kinh doanh mặt hàng này?</p>
            <Link href="/" className="inline-block w-full md:w-auto text-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Tìm nguồn hàng Pet Care
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}