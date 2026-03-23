import Link from 'next/link';

export default function DoGiaDungDecor() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <Link href="/?tab=news" scroll={false} className="inline-flex items-center text-blue-600 font-bold mb-8 hover:text-blue-800 transition-colors">
        ← Quay lại 
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
          <img 
            src="https://furaka.vn/wp-content/uploads/2024/09/Thiet-ke-ban-lam-viec-gan-tuong-1.jpg" 
            alt="Decor đồ gia dụng"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-sm uppercase">
            Xu hướng 2026
          </div>
          <h1 className="text-4xl font-black text-blue-900">Đồ gia dụng & Decor thông minh</h1>
          <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            Những món đồ tiện ích như đèn LED decor, máy in nhãn mini, kệ nhựa đa năng là "chìa khóa" để biến không gian sống trở nên hiện đại hơn. AllInOneVN kết nối bạn với các nguồn hàng nội địa Trung/Hàn cực chất.
          </p>
          <p>
              Với dịch vụ của AllInOneVN, bạn có thể dễ dàng nhập các mặt hàng decor - đồ gia dụng thông minh, những mặt hàng hot nhất từ các nơi uy tín với giá gốc, đảm bảo chất lượng và an toàn khi sử dụng.
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