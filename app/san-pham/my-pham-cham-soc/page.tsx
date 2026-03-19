import Link from 'next/link';

export default function MyPhamChamSoc() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <Link href="/?tab=news" scroll={false} className="inline-flex items-center text-blue-600 font-bold mb-8 hover:text-blue-800 transition-colors">
        ← Quay lại 
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
          <img src="https://tint.creativemarket.com/n5FB40tiOuSCkdlSyWK94UokNgpfOE1xi-OEd6P72oU/width:1200/height:800/gravity:ce/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzUxMDQvNTEwNDUvNTEwNDU5MjkvOC1iZWF1dHktYW5kLXNraW5jYXJlLW51c2luZXNzLXN0b2NrLWltYWdlLWJ1bmRsZS1vLmpwZyMxNzE5NDMzNjY0?1719433664" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <div className="inline-block bg-pink-100 text-pink-700 font-bold px-4 py-1 rounded-full text-sm uppercase">Skincare & Beauty</div>
          <h1 className="text-4xl font-black text-blue-900">Mỹ phẩm & Chăm sóc cá nhân</h1>
          <p className="text-gray-600 leading-relaxed">
            Dụng cụ nail thủ công (press-on nails), và các thiết thiết bị chăm sóc da mini tại nhà đang bùng nổ. Người tiêu dùng ngày càng ưu tiên các giải pháp làm đẹp tiện lợi, tiết kiệm thời gian ngay tại nhà.
          </p>
          <div className="pt-6 border-t border-gray-100">
            <Link href="/" className="inline-block w-full md:w-auto text-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Nhận tư vấn nhập hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}