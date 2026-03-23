"use client";
import { BannerCarousel } from '../components/BannerCarousel';
import { useState, useEffect, Suspense } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// ==========================================
// COMPONENT CON: CHỨA TOÀN BỘ LOGIC VÀ GIAO DIỆN
// ==========================================
function HomeContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'home';

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => {
    // 1. XỬ LÝ VỊ TRÍ CUỘN CHO TAB NEWS
    if (initialTab === 'news') {
      setActiveTab('news');

      const savedScroll = sessionStorage.getItem('homeScrollY');
      
      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll));
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
        }, 50);
        sessionStorage.removeItem('homeScrollY');
      } else {
        const element = document.getElementById('hot-trend-section');
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }
    }

    // 2. XỬ LÝ RENDER LẠI FACEBOOK COMMENT
    if (activeTab === 'community') {
      const parseFB = () => {
        // Dùng (window as any) để TypeScript không báo lỗi đỏ
        const win = window as any;
        if (typeof win !== 'undefined' && win.FB) {
          win.FB.XFBML.parse(); 
        } else {
          // Vì layout dùng 'lazyOnload' nên đôi khi FB tải chậm một chút
          // Nếu chưa có FB, đợi 500ms rồi thử lại
          setTimeout(parseFB, 500);
        }
      };
      parseFB();
    }
  }, [initialTab, activeTab]); // Dấu đóng ngoặc chuẩn xác, chỉ gọi 1 lần

  const sendEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm('service_u39jdqg', 'template_rhrihtn', e.target, 'lTdh8-6gnfkeO7kfJ')
      .then(() => {
        alert("Đã gửi đơn hàng thành công! Đợi chút mình sẽ check và báo giá bạn ngay.");
        setLoading(false);
        e.target.reset();
      }, (error) => {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-aio-bg font-sans text-gray-900 relative">
      {/* HEADER */}
      <header className="bg-white py-4 px-6 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Góc trái: Chỉ có Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-32 w-auto object-contain transition-transform hover:scale-105" />
          </div>

          {/* PHẦN GIỮA: Banner rộng hơn để hiện 3 ảnh chạy cùng lúc */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="w-full h-24 overflow-hidden rounded-xl bg-gray-50 shadow-inner">
              <BannerCarousel />
            </div>
          </div>
          
          {/* Góc phải: AllInOneVN và slogan */}
          <div className="flex items-center gap-4">
            <span className="text-aio-blue font-extrabold text-2xl tracking-tight">AllInOneVN</span>
            <div className="h-6 w-[1px] bg-gray-300 hidden md:block"></div>
            <p className="text-aio-blue font-bold hidden md:block uppercase text-[11px] tracking-[0.2em]">
              Tất cả chỉ trong một click
            </p>
          </div>
          
        </div>
      </header>

      {/* MENU ĐIỀU HƯỚNG */}
      <nav className="bg-[#337ab7] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-hide px-6">
          {[
            { id: 'home', label: 'Trang chủ' },         // Trả lại tên Trang chủ
            { id: 'about', label: 'Giới thiệu' },       // Thêm mới tab Giới thiệu
            { id: 'news', label: 'Hot Trend' },
            { id: 'community', label: 'Cộng đồng' },
            { id: 'partnership', label: 'Hợp tác & Liên kết' }
          ].map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setActiveTab(tabItem.id)}
              className={`px-8 py-4 font-bold uppercase text-xs tracking-widest transition-all whitespace-nowrap ${
                activeTab === tabItem.id ? 'bg-[#23527c] border-b-4 border-yellow-400' : 'hover:bg-[#286090]'
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
      </nav>

      {/* NỘI DUNG CHÍNH */}
      <div className="max-w-7xl mx-auto py-10 px-6 min-h-[500px]">
        
        {/* TRANG CHỦ */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-5xl font-black text-blue-900 mb-6 uppercase leading-tight">
                  Mua những gì bạn muốn <br/><span className="text-blue-600">Dễ dàng hơn</span>
                </h2>
                <div className="text-gray-800 font-medium space-y-4 text-lg leading-relaxed">
                  <p>AllInOneVN - Một cho tất cả và tất cả trong một</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">✅ Tiết kiệm thời gian mua hàng</li>
                    <li className="flex items-center gap-2">✅ Báo giá nhanh chóng</li>
                    <li className="flex items-center gap-2">✅ Hàng chuẩn 100%</li>
                  </ul>
                  <div className="pt-4">
                    <button onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})} className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-200 transition-colors">
                      Tìm hiểu quy trình ↓
                    </button>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-blue-900 font-black px-4 py-1 rounded-lg shadow-md text-xs uppercase animate-pulse">
                  Quick Order
                </div>
                <form className="space-y-4" onSubmit={sendEmail}>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 text-sm">Tên của bạn</label>
                    <input name="name" className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên..." required />
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 text-sm">Sản phẩm cần mua</label>
                    <textarea name="message" className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Link sản phẩm hoặc tên món đồ..." required></textarea>
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-gray-700 text-sm">Số điện thoại Zalo</label>
                    <input name="phone" className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Để AIOVN báo giá cho bạn..." required />
                  </div>
                  <button type="submit" className="w-full bg-[#337ab7] text-white p-4 font-bold uppercase rounded-xl hover:bg-blue-800 shadow-lg transform active:scale-95 transition-all">
                    {loading ? "Đang gửi đi..." : "Gửi yêu cầu ngay"}
                  </button>
                </form>
              </section>
            </div>

            {/* QUY TRÌNH 3 BƯỚC MỚI */}
            <div className="pt-10">
               <h3 className="text-2xl font-black text-center mb-10 text-blue-900 uppercase tracking-widest">Quy trình đơn giản</h3>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                    <h4 className="font-bold text-lg mb-2">Gửi thông tin</h4>
                    <p className="text-sm text-gray-500">Bạn chỉ cần gửi link, tên sản phẩm hoặc model vào form phía trên.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                    <h4 className="font-bold text-lg mb-2">Báo giá & Đặt cọc</h4>
                    <p className="text-sm text-gray-500">AllInOneVN gửi báo giá chi tiết. Bạn xác nhận và đặt cọc đơn hàng.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                    <h4 className="font-bold text-lg mb-2">Nhận hàng</h4>
                    <p className="text-sm text-gray-500">Nhận hàng, kiểm tra hàng, hoàn hàng nếu không đúng yêu cầu.</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* TRANG GIỚI THIỆU */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black text-blue-900 mb-8 border-b pb-4">VỀ CHÚNG TÔI</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                <span className="font-bold text-blue-800 text-xl underline decoration-yellow-400">AllInOneVN</span> không chỉ đơn thuần là một dịch vụ mua hộ. Chúng tôi muốn chỉ cần ở nhà hoặc bất kỳ đâu, bạn cũng sẽ có được những thứ bạn cần với chi phí tối ưu.
              </p>
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                 <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-blue-500">
                    <h5 className="font-bold text-blue-700 mb-2">Sứ mệnh</h5>
                    <p className="text-sm">Mang đến cho bạn trải nghiệm tối ưu nhất khi chỉ việc ở nhà và mua những thứ mình muốn.</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-green-500">
                    <h5 className="font-bold text-green-700 mb-2">Giá trị</h5>
                    <p className="text-sm">Minh bạch trong báo giá, tận tâm trong hỗ trợ, hết mình trong tư vấn và hài lòng trong sử dụng.</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANG HOT TREND */}
        {activeTab === 'news' && (
          <div id="hot-trend-section" className="space-y-10"> {/* Đã thêm ID vào đây */}
            <div className="text-center">
              <h2 className="text-3xl font-black text-blue-900 uppercase">Xu hướng tiêu dùng 2026</h2>
              <p className="text-gray-500">Những sản phẩm được săn đón nhất tại thị trường Việt Nam</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Thời Trang Mix & Match",
                  desc: "Các mặt hàng Local Brand chất lượng cao, đồ tập Yoga, và đặc biệt là phong cách Quiet Luxury (sang trọng thầm lặng) hoặc Streetwear Unisex.",
                  tag: "Xu hướng thời trang",
                  img: "https://images.unsplash.com/photo-1613728455120-d00493b5e77e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  slug: "thoi-trang-mix-match"
                },
                {
                  title: "Mỹ phẩm & Chăm sóc cá nhân",
                  desc: "Dụng cụ nail thủ công (press-on nails), và các thiết bị chăm sóc da mini tại nhà (máy rửa mặt, máy massage).",
                  tag: "Skincare",
                  img: "https://tint.creativemarket.com/n5FB40tiOuSCkdlSyWK94UokNgpfOE1xi-OEd6P72oU/width:1200/height:800/gravity:ce/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzUxMDQvNTEwNDUvNTEwNDU5MjkvOC1iZWF1dHktYW5kLXNraW5jYXJlLW51c2luZXNzLXN0b2NrLWltYWdlLWJ1bmRsZS1vLmpwZyMxNzE5NDMzNjY0?1719433664",
                  slug: "my-pham-cham-soc"
                },
                {
                  title: "Đồ gia dụng & Decor thông minh",
                  desc: "Những món đồ (vô tri) nhưng tiện ích như đèn LED decor góc làm việc, máy in nhãn mini, kệ nhựa đa năng hoặc các sản phẩm Smart Home giá rẻ.",
                  tag: "Decor",
                  img: "https://furaka.vn/wp-content/uploads/2024/09/Thiet-ke-ban-lam-viec-gan-tuong-1.jpg",
                  slug: "do-gia-dung-decor"
                },
                {
                  title: "Sản phẩm cho thú cưng",
                  desc: "Các loại hạt dinh dưỡng, quần áo thời trang cho chó mèo và đồ chơi thông minh cho thú cưng.",
                  tag: "Pet care",
                  img: "https://finterior.com.vn/wp-content/uploads/2024/07/mau-thiet-ke-spa-thu-cung.jpg",
                  slug: "san-pham-thu-cung"
                },
                {
                  title: "Thực phẩm healty & Đặc sản vùng miền",
                  desc: "Trà Kombucha, bánh ăn kiêng, hạt dinh dưỡng và các sản phẩm đạt chứng nhận OCOP.",
                  tag: "Healthy",
                  img: "https://images.unsplash.com/photo-1567769541495-338ee7203e3c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  slug: "thuc-pham-healthy"
                },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
          
                  {/* PHẦN 1: ẢNH VÀ THÔNG TIN ĐƯỢC BỌC BỞI LINK */}
                  <Link 
                    href={`/san-pham/${item.slug}`} 
                    onClick={() => sessionStorage.setItem('homeScrollY', window.scrollY.toString())}
                    className="flex flex-col flex-grow cursor-pointer">
                    <div className="h-56 overflow-hidden relative flex-shrink-0">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        {item.tag}
                      </div>
                    </div>

                    <div className="px-6 pt-6 pb-4 flex flex-col flex-grow">
                      <h4 className="font-bold text-xl text-blue-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </Link>

                  {/* PHẦN 2: NÚT ĐẶT HÀNG TÁCH RIÊNG ĐỂ TRẢ VỀ TAB HOME CÓ FORM CHỨ KHÔNG CHUYỂN TRANG */}
                  <div className="px-6 pb-6 mt-auto">
                    <button 
                      onClick={() => setActiveTab('home')} 
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                      Đặt hàng ngay
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRANG CỘNG ĐỒNG & FEEDBACK */}
        {activeTab === 'community' && (
           <div className="space-y-12 animate-fade-in mt-10">
              <div className="text-center">
                <h2 className="text-3xl font-black text-blue-900 uppercase">Góc Chia Sẻ</h2>
                <p className="text-gray-500 mt-2">Nơi khách hàng để lại đánh giá và phản hồi về sản phẩm</p>
              </div>

              {/* Giao diện khu vực Bình luận */}
              <div className="max-w-4xl mx-auto bg-white p-2 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div key={activeTab} className="w-full min-h-[300px] flex justify-center">
                  
                  {/* ĐÂY CHÍNH LÀ THẺ QUAN TRỌNG NHẤT MÀ BẠN ĐANG THIẾU */}
                  <div 
                    className="fb-comments" 
                    data-href="https://developers.facebook.com/docs/plugins/comments/"
                    data-width="100%" 
                    data-numposts="10"
                    data-order-by="reverse_time"
                  ></div>
                  
                </div>
              </div>
           </div>
        )}
        {/* TRANG HỢP TÁC & LIÊN KẾT */}
        {activeTab === 'partnership' && (
          <div className="space-y-16 animate-fade-in mt-10">
            <div className="text-center">
              <h2 className="text-3xl font-black text-blue-900 uppercase">Đối tác & Liên kết</h2>
              <p className="text-gray-500 mt-2">Mạng lưới phân phối, dropshipping và không gian quảng cáo</p>
            </div>

            {/* KHU VỰC 1: BANNER QUẢNG CÁO (Dành cho thuê) */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Không Gian Tài Trợ</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Banner 1 */}
                <a href="#lien-he" className="block relative h-48 bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl overflow-hidden group shadow-md hover:shadow-lg transition-all">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="font-black text-2xl tracking-wider uppercase mb-2">Vị trí Quảng Cáo 1</span>
                    <span className="bg-white text-blue-800 px-4 py-1 rounded-full text-sm font-bold group-hover:scale-105 transition-transform">Liên hệ đặt chỗ ngay</span>
                  </div>
                </a>
        
                {/* Banner 2 */}
                <a href="#lien-he" className="block relative h-48 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl overflow-hidden group shadow-md hover:shadow-lg transition-all">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="font-black text-2xl tracking-wider uppercase mb-2">Vị trí Quảng Cáo 2</span>
                    <span className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-bold group-hover:scale-105 transition-transform">Liên hệ đặt chỗ ngay</span>
                  </div>
                </a>
              </div>
            </div>

            {/* KHU VỰC 2: MẠNG LƯỚI ĐỐI TÁC */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Mạng Lưới Phân Phối</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
                {/* Các đối tác mẫu */}
                {[
                  { name: "Nidec", desc: "Đối tác thiết bị", color: "bg-blue-50 text-blue-700 border-blue-100" },
                  { name: "Schneider", desc: "Tự động hóa", color: "bg-green-50 text-green-700 border-green-100" },
                  { name: "Zebra", desc: "Giải pháp mã vạch", color: "bg-gray-50 text-gray-800 border-gray-200" },
                  { name: "Jabil", desc: "Đối tác sản xuất", color: "bg-indigo-50 text-indigo-700 border-indigo-100" }
                ].map((partner, idx) => (
                  <div key={idx} className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow ${partner.color}`}>
                    <span className="font-black text-xl mb-1">{partner.name}</span>
                     <span className="text-xs font-medium uppercase tracking-wider opacity-80">{partner.desc}</span>
                  </div>
                ))}
        
              </div>
            </div>

          </div>
        )}
      </div> 

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 pt-16 pb-8 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* Cột 1: Giới thiệu */}
          <div>
            <h4 className="text-white font-black text-2xl mb-5 tracking-tight">AllInOneVN</h4>
            <p className="text-white text-sm leading-relaxed">
              Giải pháp mua sắm trực tuyến. Chúng tôi giúp bạn kết nối với nguồn hàng uy tín từ khắp nơi chỉ với một cú click.
            </p>
          </div>
    
          {/* Cột 2: Liên hệ */}
          <div>
            <h4 className="text-white font-black text-2xl mb-5 tracking-tight">Liên hệ</h4>
            <ul className="text-white text-sm space-y-3">
              <li>📍 Hà Nội: [Trung Kính, Trung Hòa, Cầu Giấy, Hà Nội]</li>
              <li>📍 Quảng Ninh: [Tổ 23, Khu 2B, Hà Tu, Quảng Ninh]</li>
              <li>📞 Hotline: 0782059679</li>
    
              {/* Phần Fanpage được bọc gọn trong một thẻ li */}
              <li className="pt-4">
                <a 
                  href="https://www.facebook.com/share/1ArB6cRu9A/?mibextid=wwXlFr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold transition-all shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Ghé thăm Fanpage</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-xs">
          © 2026 AllInOneVN.
       </div>
      </footer>
      {/* ZALO BUTTON */}
      <a 
        href="https://zalo.me/0782059679" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9999] hover:scale-110 transition-transform animate-bounce"
      >
        <div className="w-16 h-16 bg-[#0068ff] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
           <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 13.591 2.369 15.093 3.024 16.425L2.012 21.056C1.933 21.417 2.247 21.731 2.608 21.652L7.239 20.64C8.571 21.295 10.073 21.664 11.664 21.664C17.187 21.664 21.664 17.187 21.664 11.664C21.664 6.141 17.187 1.664 11.664 1.664L12 2Z"/>
          </svg>
        </div>
      </a>
    </main>
  );
}

// ==========================================
// COMPONENT CHÍNH: CHỈ ĐỂ BỌC SUSPENSE
// ==========================================
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-blue-900 font-bold">
        Đang tải dữ liệu...
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}