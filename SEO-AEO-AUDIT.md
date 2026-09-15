# SEO/AEO audit — DHG Transport

## 1. Tình trạng ban đầu

- Ứng dụng là Vite + React 19 client-side rendered, dùng `BrowserRouter`. Ban đầu chỉ có hai public routes: `/` và `/admin/*`.
- `vercel.json` đã rewrite mọi đường dẫn về `index.html`; vì vậy refresh SPA hoạt động nhưng tất cả URL ban đầu đều nhận một HTML shell và metadata trang chủ.
- `index.html` đã có title, description, canonical, Open Graph, Twitter card và một `LocalBusiness` JSON-LD cho trang chủ. `robots.txt` đã khai báo sitemap; sitemap mới chỉ có trang chủ.
- Trang chủ có một H1 trong hero và các section dùng H2/H3 phù hợp phần lớn. Tuy nhiên dịch vụ và dự án chỉ mở modal, không có URL nội dung/indexable.
- Nhiều ảnh below-the-fold đã `loading="lazy"`; ảnh dịch vụ đang dùng Unsplash bên ngoài. Ảnh hero không lazy-load, phù hợp với vai trò LCP. Một số ảnh động/thumbnails không có `width`/`height` HTML nên cần kiểm tra CLS bằng Lighthouse trên production.

## 2. Vấn đề đã xử lý

- Thêm 15 public SEO URLs, route fallback cho refresh tiếp tục do Vercel rewrite hiện hữu.
- Thêm quản lý title, description, canonical, robots, Open Graph và Twitter theo từng route bằng `SEO` component.
- Thêm breadcrumb hiển thị và `BreadcrumbList`, `WebPage`, `Service`, `Article`, `Organization`, `WebSite` JSON-LD đúng theo nội dung trang.
- Thêm trang dịch vụ/kiến thức với một H1, câu trả lời trực tiếp ngay sau heading, phần giải thích, FAQ và liên kết nội bộ.
- Thêm trang `/du-an` để tạo điểm vào indexable; nội dung dự án chi tiết vẫn được lấy động từ Supabase trên trang chủ nên không tạo claim/dự án giả.
- Mở rộng sitemap, giữ `/admin` ngoài sitemap và robots. Cập nhật các liên kết dịch vụ/dự án/kiến thức trong navigation/footer.

## 3. Files đã sửa

- `src/App.tsx`
- `src/main.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `public/sitemap.xml`

## 4. Files đã tạo

- `src/components/SEO.tsx`
- `src/components/SeoContent.tsx`
- `src/lib/structuredData.ts`
- `src/data/seoContent.ts`
- `src/pages/SeoPages.tsx`
- `SEO-AEO-AUDIT.md`

## 5. Public URLs

- `/`, `/dich-vu`, `/du-an`, `/kien-thuc`
- `/dich-vu/van-chuyen-hang-sieu-truong-sieu-trong`
- `/dich-vu/van-chuyen-hang-qua-kho-qua-tai`
- `/dich-vu/van-chuyen-may-moc-cong-nghiep`
- `/dich-vu/khao-sat-tuyen-duong`
- `/dich-vu/thu-tuc-giay-phep`
- `/dich-vu/boc-xep-chang-buoc-hang-hoa`
- Năm URL kiến thức được yêu cầu trong sitemap.

## 6. Lưu ý quan trọng về SPA và crawl

Metadata route-level được cập nhật khi React chạy. Google thường render JavaScript, nhưng bot không render JavaScript, social preview crawler và phần HTML response ban đầu vẫn nhận metadata của `index.html`, không phải metadata riêng của từng route. Đây là giới hạn kiến trúc SPA hiện tại, chưa chuyển sang SSR/prerender để tránh rủi ro thay đổi production.

Để đạt metadata HTML riêng chắc chắn cho mọi bot, bước tiếp theo là triển khai prerender/static generation cho 15 public routes hoặc chuyển public marketing layer sang SSR. Cần kiểm thử preview social và Google URL Inspection sau deploy trước khi chọn giải pháp.

## 7. Image SEO và performance

- Alt text hiện có trên ảnh content; ảnh dưới fold phần lớn lazy-load và ảnh hero không lazy-load.
- Không đổi filename/nguồn ảnh để tránh làm hỏng asset hoặc giả định quyền sở hữu. Các URL Unsplash là dependency bên thứ ba: nên thay bằng ảnh DHG có tên mô tả, kích thước xác định và tối ưu WebP/AVIF khi có asset được duyệt.
- Các public route được import cùng entry hiện tại. Có thể lazy-load route pages ở một vòng tối ưu bundle sau khi đo build/Lighthouse; chưa thay đổi animation/UX hiện có.

## 8. Claims cần DHG xác minh — NEEDS BUSINESS VERIFICATION

Các claim sau đã tồn tại trong source và được giữ nguyên, không được dùng để tạo content mới:

- `20+ năm kinh nghiệm`, `500+ dự án`, `100+ thiết bị`, phục vụ `63 tỉnh thành`, `0 tai nạn lớn` (`src/data/companyData.ts`).
- Các tải trọng/công suất/kích thước và nhãn thiết bị như `500+ tấn`, `600–800 HP`, `350+ tấn`, `55m`, `500kV`, `200+ tấn` (`src/data/companyData.ts`, `Hero.tsx`).
- Claim bảo hiểm, chứng chỉ, ISO 9001:2015, giấy phép, “100% hợp pháp/an toàn”, “nghiệm thu an toàn 100%”, “24/7” (`companyData.ts`, `Footer.tsx`, `ProjectsSection.tsx`).
- Địa chỉ, số điện thoại, email, tên pháp lý và mạng lưới văn phòng trong `COMPANY_INFO` cần được nghiệp vụ xác nhận trước khi coi là entity data chính thức trong schema.

## 9. Việc cần làm ngoài source code

1. Xác minh các claim ở trên và sửa source/schema theo dữ liệu đã được duyệt.
2. Triển khai prerender hoặc SSR cho public landing pages nếu cần đảm bảo HTML metadata cho non-JS crawlers.
3. Trong Google Search Console: xác minh domain, gửi `https://dhgtransport.vn/sitemap.xml`, dùng URL Inspection cho homepage và từng nhóm URL, sau đó yêu cầu indexing.
4. Kiểm tra Rich Results Test/Schema Validator với URL production; kiểm tra canonical, Open Graph preview và redirect HTTP→HTTPS/www nhất quán.
5. Chạy Lighthouse mobile trên production, ưu tiên LCP hero, CLS của ảnh, cache/CDN và ảnh bên thứ ba.

## 10. Checklist production

- [ ] `robots.txt` và sitemap trả HTTP 200 và sitemap chỉ chứa URL canonical public.
- [ ] Mọi URL mới refresh HTTP 200 qua Vercel rewrite.
- [ ] Canonical/metadata được kiểm tra trong URL Inspection sau JavaScript render.
- [ ] JSON-LD không báo lỗi cú pháp trong Rich Results Test.
- [ ] Không index `/admin` hoặc login.
- [ ] Xác minh claim doanh nghiệp trước khi dùng cho sales/SEO.
