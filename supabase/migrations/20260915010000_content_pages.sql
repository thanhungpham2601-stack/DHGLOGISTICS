-- Bảng "Nội dung SEO" (Dịch vụ /dich-vu + Kiến thức /kien-thuc) quản lý qua trang admin,
-- thay thế dữ liệu hardcode trước đây ở src/data/seoContent.ts
-- Chạy file này trong Supabase Dashboard -> SQL Editor -> Run

create table if not exists public.content_pages (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('service', 'knowledge')),
  slug text not null,
  title text not null default '',
  description text not null default '',
  question text not null default '',
  answer text not null default '',
  details text[] not null default '{}',
  related_services text[] not null default '{}',
  faqs jsonb not null default '[]',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, slug)
);

drop trigger if exists set_content_pages_updated_at on public.content_pages;
create trigger set_content_pages_updated_at
  before update on public.content_pages
  for each row execute function public.set_updated_at();

-- ============ QUYỀN MỚI: content.manage ============

insert into public.permissions (code, description) values
  ('content.manage', 'Thêm / sửa / xóa nội dung trang Dịch vụ và Kiến thức')
on conflict (code) do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.code = 'content.manage'
where r.name in ('admin', 'editor')
on conflict do nothing;

-- ============ ROW LEVEL SECURITY ============

alter table public.content_pages enable row level security;

drop policy if exists "content_pages_public_select_active" on public.content_pages;
create policy "content_pages_public_select_active" on public.content_pages
  for select using (is_active = true or public.has_permission('content.manage'));

drop policy if exists "content_pages_write_manage" on public.content_pages;
create policy "content_pages_write_manage" on public.content_pages
  for all using (public.has_permission('content.manage'))
  with check (public.has_permission('content.manage'));

-- ============ DỮ LIỆU MẶC ĐỊNH (di chuyển từ src/data/seoContent.ts, chỉ seed nếu bảng đang trống) ============

insert into public.content_pages (type, slug, title, description, question, answer, details, related_services, faqs, sort_order, is_active)
select * from (values
  ('service', 'van-chuyen-hang-sieu-truong-sieu-trong', 'Vận chuyển hàng siêu trường siêu trọng', 'Giải pháp vận chuyển hàng siêu trường siêu trọng: khảo sát tuyến, lựa chọn phương tiện, thủ tục và điều phối theo từng dự án.', 'Vận chuyển hàng siêu trường siêu trọng là gì?', 'Vận chuyển hàng siêu trường siêu trọng là việc tổ chức đưa hàng có kích thước hoặc trọng lượng vượt khả năng của phương tiện thông thường đến điểm giao bằng phương án kỹ thuật phù hợp. Phương án cần xem xét đặc tính hàng, tuyến đường, phương tiện, chằng buộc và các thủ tục liên quan trước khi khởi hành.', array['DHG tiếp nhận thông số hàng hóa, điểm lấy và điểm giao để đánh giá cấu hình vận chuyển phù hợp cho từng dự án.', 'Việc khảo sát tuyến và chuẩn bị hồ sơ được thực hiện trước khi điều phối, nhằm nhận diện các điểm hạn chế như tĩnh không, bán kính quay và điều kiện cầu đường.'], array['khao-sat-tuyen-duong', 'thu-tuc-giay-phep', 'boc-xep-chang-buoc-hang-hoa'], '[{"question":"Cần cung cấp gì để nhận tư vấn?","answer":"Nên cung cấp kích thước, trọng lượng, bản vẽ hoặc hình ảnh hàng hóa, điểm nhận, điểm giao và thời gian dự kiến."},{"question":"Thời gian vận chuyển phụ thuộc vào đâu?","answer":"Thời gian phụ thuộc vào điều kiện tuyến, khả năng bố trí phương tiện, công tác khảo sát và thủ tục cần thiết."}]'::jsonb, 0, true),
  ('service', 'van-chuyen-hang-qua-kho-qua-tai', 'Vận chuyển hàng quá khổ quá tải', 'Tư vấn vận chuyển hàng quá khổ quá tải theo đặc tính hàng hóa, điều kiện tuyến đường và yêu cầu thủ tục.', 'Hàng quá khổ quá tải là gì?', 'Hàng quá khổ quá tải là hàng hóa có kích thước hoặc khối lượng khiến phương án vận chuyển cần được đánh giá riêng về phương tiện, tải trọng trục, tuyến đường và điều kiện lưu hành. Thông số thực tế của hàng là cơ sở để xác định phương án phù hợp.', array['Mỗi lô hàng cần được xem xét cùng điều kiện điểm lấy, điểm giao và hạ tầng trên tuyến.', 'Phương án chỉ được chốt sau khi đủ dữ liệu kỹ thuật và đánh giá thực tế cần thiết.'], array['khao-sat-tuyen-duong', 'thu-tuc-giay-phep'], '[{"question":"Có cần khảo sát tuyến không?","answer":"Tùy đặc tính hàng và hành trình. Khảo sát giúp đánh giá các điểm hạn chế có thể ảnh hưởng đến việc di chuyển."}]'::jsonb, 1, true),
  ('service', 'van-chuyen-may-moc-cong-nghiep', 'Vận chuyển máy móc công nghiệp', 'Giải pháp vận chuyển máy móc, thiết bị công nghiệp từ cảng, kho bãi hoặc nhà máy đến công trường.', 'Vận chuyển máy móc công nghiệp cần lưu ý gì?', 'Vận chuyển máy móc công nghiệp cần xác định kích thước, khối lượng, điểm nâng hạ, trọng tâm và điều kiện tiếp cận tại nơi nhận, giao. Những thông tin này giúp lựa chọn phương tiện, cách xếp đặt và phương án chằng buộc phù hợp.', array['Thiết bị có thể được vận chuyển giữa cảng, kho bãi, nhà máy và công trường theo kế hoạch dự án.', 'Khâu bốc xếp và cố định hàng cần được phối hợp với phương án vận chuyển tổng thể.'], array['boc-xep-chang-buoc-hang-hoa', 'khao-sat-tuyen-duong'], '[{"question":"Có cần bản vẽ thiết bị không?","answer":"Bản vẽ hoặc thông số kỹ thuật hỗ trợ đánh giá chính xác hơn, đặc biệt với thiết bị có kích thước và trọng tâm đặc thù."}]'::jsonb, 2, true),
  ('service', 'khao-sat-tuyen-duong', 'Khảo sát tuyến đường vận chuyển', 'Khảo sát tuyến đường cho hàng siêu trường siêu trọng: kiểm tra điểm lấy giao, tĩnh không, cầu đường và bán kính quay.', 'Khảo sát tuyến đường gồm những gì?', 'Khảo sát tuyến đường là quá trình đánh giá khả năng di chuyển của hàng và phương tiện từ điểm xuất phát đến điểm giao. Nội dung có thể bao gồm điều kiện bãi, tĩnh không, cầu đường, nút giao, bán kính quay và các chướng ngại vật trên hành trình.', array['Kết quả khảo sát là đầu vào cho lựa chọn cấu hình phương tiện và kế hoạch điều phối.', 'Các điều kiện thực tế có thể yêu cầu điều chỉnh tuyến hoặc phương án kỹ thuật.'], array['van-chuyen-hang-sieu-truong-sieu-trong', 'thu-tuc-giay-phep'], '[{"question":"Khi nào nên khảo sát?","answer":"Nên khảo sát trước khi chốt phương án đối với lô hàng có yêu cầu đặc biệt về kích thước, trọng lượng hoặc điều kiện tiếp cận."}]'::jsonb, 3, true),
  ('service', 'thu-tuc-giay-phep', 'Thủ tục và giấy phép vận chuyển', 'Hỗ trợ chuẩn bị hồ sơ và phối hợp thủ tục vận chuyển hàng quá khổ quá tải theo phương án dự án.', 'Cần loại giấy phép nào để vận chuyển hàng quá khổ quá tải?', 'Yêu cầu hồ sơ và giấy phép phụ thuộc vào hàng hóa, phương tiện, tải trọng, kích thước và tuyến vận chuyển thực tế. DHG đánh giá từng phương án để hỗ trợ chuẩn bị hồ sơ và phối hợp các thủ tục liên quan theo quy định áp dụng.', array['Không nên giả định một bộ hồ sơ cố định cho mọi chuyến hàng vì điều kiện dự án khác nhau.', 'Thông tin kỹ thuật đầy đủ giúp quá trình chuẩn bị phương án và hồ sơ rõ ràng hơn.'], array['khao-sat-tuyen-duong', 'van-chuyen-hang-qua-kho-qua-tai'], '[{"question":"Khách hàng cần chuẩn bị gì?","answer":"Thông tin hàng hóa, hành trình dự kiến và các tài liệu kỹ thuật sẵn có là cơ sở ban đầu để tư vấn."}]'::jsonb, 4, true),
  ('service', 'boc-xep-chang-buoc-hang-hoa', 'Bốc xếp và chằng buộc hàng hóa', 'Phương án bốc xếp, cố định và chằng buộc hàng hóa phù hợp với đặc tính máy móc, thiết bị và hành trình vận chuyển.', 'Chằng buộc hàng hóa trong vận chuyển cần những gì?', 'Chằng buộc hàng hóa cần dựa trên trọng tâm, điểm neo, bề mặt tiếp xúc và đặc tính của từng thiết bị. Mục tiêu là cố định hàng trên phương tiện theo phương án phù hợp trước và trong quá trình vận chuyển.', array['Phương án bốc xếp cần được phối hợp với phương tiện và điều kiện tại điểm nhận, giao.', 'Việc kiểm tra tình trạng cố định hàng là một phần của quy trình điều phối an toàn.'], array['van-chuyen-may-moc-cong-nghiep', 'van-chuyen-hang-sieu-truong-sieu-trong'], '[{"question":"Có thể dùng một phương án chằng buộc cho mọi loại hàng không?","answer":"Không. Phương án cần phù hợp với đặc tính và điều kiện thực tế của từng lô hàng."}]'::jsonb, 5, true),
  ('knowledge', 'hang-sieu-truong-sieu-trong-la-gi', 'Hàng siêu trường siêu trọng là gì?', 'Giải thích khái niệm hàng siêu trường siêu trọng và các yếu tố cần đánh giá trước khi vận chuyển.', 'Hàng siêu trường siêu trọng là gì?', 'Hàng siêu trường siêu trọng là cách gọi phổ biến cho hàng hóa có kích thước hoặc trọng lượng đặc biệt, cần được đánh giá bằng phương án vận chuyển riêng thay vì áp dụng cách chở hàng thông thường. Việc phân loại thực tế cần dựa trên thông số hàng, phương tiện và yêu cầu lưu hành của hành trình.', array['Máy móc công nghiệp, thiết bị năng lượng, kết cấu lớn hoặc các cấu kiện đặc thù có thể cần một phương án vận chuyển chuyên biệt.', 'Đánh giá kỹ thuật giúp xác định thiết bị, tuyến và các bước chuẩn bị phù hợp.'], array['van-chuyen-hang-sieu-truong-sieu-trong'], '[{"question":"Vì sao cần đánh giá trước khi vận chuyển?","answer":"Để xác định cách tổ chức vận chuyển phù hợp với hàng hóa và điều kiện hành trình."}]'::jsonb, 0, true),
  ('knowledge', 'quy-trinh-van-chuyen-hang-sieu-truong-sieu-trong', 'Quy trình vận chuyển hàng siêu trường siêu trọng', 'Các bước chuẩn bị và điều phối vận chuyển hàng siêu trường siêu trọng theo từng dự án.', 'Quy trình vận chuyển hàng siêu trường siêu trọng như thế nào?', 'Quy trình thường bắt đầu bằng việc tiếp nhận thông tin hàng hóa và hành trình, sau đó đánh giá thực tế, xây dựng phương án, chuẩn bị thủ tục cần thiết, tổ chức bốc xếp và điều phối đến khi bàn giao. Trình tự cụ thể phụ thuộc vào phạm vi và điều kiện của từng dự án.', array['Thông số kỹ thuật, khả năng tiếp cận và điều kiện tuyến đều cần được xem xét trước khi phương tiện khởi hành.', 'Theo dõi hành trình và kiểm tra hàng hóa là các bước hỗ trợ việc điều phối theo kế hoạch.'], array['khao-sat-tuyen-duong', 'thu-tuc-giay-phep'], '[{"question":"Báo giá được chuẩn bị ở bước nào?","answer":"Báo giá được tư vấn sau khi có đủ thông tin để xác định phạm vi công việc và phương án phù hợp."}]'::jsonb, 1, true),
  ('knowledge', 'chi-phi-van-chuyen-hang-sieu-truong-sieu-trong', 'Chi phí vận chuyển hàng siêu trường siêu trọng', 'Các yếu tố ảnh hưởng đến chi phí vận chuyển hàng siêu trường siêu trọng và cách chuẩn bị thông tin báo giá.', 'Chi phí vận chuyển hàng siêu trường siêu trọng được tính như thế nào?', 'Chi phí được xác định theo phạm vi thực tế của từng dự án, như thông số hàng hóa, hành trình, cấu hình phương tiện, khảo sát, bốc xếp và thủ tục liên quan. Để nhận báo giá phù hợp, cần cung cấp thông tin kỹ thuật và địa điểm nhận giao cụ thể.', array['Không có một mức giá chung phù hợp cho mọi lô hàng đặc biệt.', 'Thông tin đầy đủ giúp việc tư vấn phương án và báo giá minh bạch hơn.'], array['van-chuyen-hang-sieu-truong-sieu-trong'], '[{"question":"Có thể báo giá chỉ từ ảnh hàng hóa không?","answer":"Ảnh hỗ trợ tham khảo, nhưng kích thước, trọng lượng và hành trình vẫn cần thiết để đánh giá phạm vi."}]'::jsonb, 2, true),
  ('knowledge', 'phuong-tien-van-chuyen-hang-sieu-truong-sieu-trong', 'Phương tiện vận chuyển hàng siêu trường siêu trọng', 'Tìm hiểu phương tiện vận chuyển hàng siêu trường siêu trọng và nguyên tắc lựa chọn cấu hình phù hợp.', 'Sử dụng loại xe hoặc moóc nào cho hàng siêu trường siêu trọng?', 'Loại đầu kéo và rơ moóc được lựa chọn theo kích thước, trọng lượng, trọng tâm hàng hóa, điều kiện tuyến và yêu cầu tiếp cận tại điểm giao nhận. Không có một cấu hình phương tiện phù hợp cho mọi loại hàng.', array['Rơ moóc sàn thấp, rơ moóc rút và cấu hình thủy lực có vai trò khác nhau tùy bài toán vận chuyển.', 'Kết quả khảo sát giúp xác định phương án sử dụng phương tiện sát thực tế hơn.'], array['khao-sat-tuyen-duong', 'van-chuyen-hang-sieu-truong-sieu-trong'], '[{"question":"Ai quyết định cấu hình phương tiện?","answer":"Cấu hình được tư vấn dựa trên đánh giá kỹ thuật của lô hàng và hành trình cụ thể."}]'::jsonb, 3, true),
  ('knowledge', 'giay-phep-van-chuyen-hang-qua-kho-qua-tai', 'Giấy phép vận chuyển hàng quá khổ quá tải', 'Thông tin chuẩn bị hồ sơ, điều kiện tuyến và thủ tục liên quan khi vận chuyển hàng quá khổ quá tải.', 'Giấy phép vận chuyển hàng quá khổ quá tải cần lưu ý gì?', 'Việc chuẩn bị hồ sơ cần căn cứ vào đặc điểm hàng hóa, phương tiện và tuyến dự kiến. Do yêu cầu có thể khác nhau theo phương án thực tế, nên cần đánh giá dự án và đối chiếu quy định áp dụng trước khi tổ chức vận chuyển.', array['Hồ sơ kỹ thuật và thông tin hành trình là đầu vào quan trọng để xác định các bước cần thực hiện.', 'Tuyến có thể cần được khảo sát trước khi hoàn thiện phương án.'], array['thu-tuc-giay-phep', 'khao-sat-tuyen-duong'], '[{"question":"Có thể dùng lại hồ sơ của chuyến trước không?","answer":"Cần xem xét lại vì hàng hóa, phương tiện và tuyến vận chuyển có thể khác nhau."}]'::jsonb, 4, true)
) as v(type, slug, title, description, question, answer, details, related_services, faqs, sort_order, is_active)
where not exists (select 1 from public.content_pages);
