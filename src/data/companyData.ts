import { ServiceItem, VehicleSpec, ProcessStep, ProjectCase, RouteSurveyItem } from '../types';

import bannerWindBlade from '../assets/images/dhg_heavy_haul_wind_blade_1786671304592.jpg';
import bannerTransformer from '../assets/images/dhg_heavy_haul_transformer_1786671321288.jpg';
import bannerRefinerySilo from '../assets/images/dhg_heavy_haul_refinery_silo_1786671334428.jpg';
import bannerExcavatorLowbed from '../assets/images/dhg_heavy_haul_excavator_lowbed_1786671346913.jpg';

export const COMPANY_INFO = {
  name: "DHG HEAVY HAUL",
  tagline: "ENGINEERING • LOGISTICS • HEAVY HAUL",
  slogan: "VẬN CHUYỂN SIÊU TRƯỜNG – SIÊU TRỌNG",
  subSlogan: "Giải pháp vận chuyển cho những tải trọng đặc biệt",
  description: "Từ máy móc công trình, thiết bị công nghiệp đến hàng hóa có kích thước và trọng lượng vượt quy định thông thường, chúng tôi cung cấp giải pháp vận chuyển trọn gói – an toàn – đúng kế hoạch trên toàn quốc.",
  hotline: "0798.600.600",
  hotlineFormatted: "0798 600 600",
  support247: "1900 6868",
  email: "contact@dhg-heavyhaul.vn",
  quoteEmail: "baogia@dhg-heavyhaul.vn",
  addressMain: "Tòa nhà DHG Logistics, Đường 356, Đình Vũ, TP. Hải Phòng",
  offices: [
    { city: "Hải Phòng", address: "Khu Kinh tế Đình Vũ, Q. Hải An, TP. Hải Phòng", phone: "0225 3888 668" },
    { city: "Hà Nội", address: "Tầng 8, Tòa tháp Diamond, Đường Phạm Hùng, Cầu Giấy, Hà Nội", phone: "024 3999 778" },
    { city: "Đà Nẵng", address: "Số 45 Đường số 3, KCN Hòa Cầm, Cẩm Lệ, Đà Nẵng", phone: "0236 3777 556" },
    { city: "TP. Hồ Chí Minh", address: "Cảng Cát Lái, Đường Nguyễn Thị Định, TP. Thủ Đức, TP. HCM", phone: "028 3666 990" },
  ],
  stats: [
    { value: "20+", label: "NĂM KINH NGHIỆM", sub: "Tiên phong ngành vận tải siêu trọng" },
    { value: "500+", label: "DỰ ÁN ĐÃ THỰC HIỆN", sub: "Dự án năng lượng, công nghiệp nặng" },
    { value: "100+", label: "THIẾT BỊ CHUYÊN DỤNG", sub: "Đầu kéo công suất lớn, rơ mooc thủy lực" },
    { value: "63", label: "TỈNH THÀNH PHỤC VỤ", sub: "Mạng lưới kết nối xuyên suốt Bắc - Nam" },
    { value: "0", label: "TAI NẠN LỚN", sub: "Cam kết chuẩn mực an toàn tuyệt đối" },
  ]
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "sieu-truong-sieu-trong",
    number: "01",
    title: "Vận Chuyển Hàng Quá Khổ – Siêu Trường Siêu Trọng",
    shortDesc: "Vận chuyển an toàn các tải trọng lớn, kích thước vượt giới hạn thông thường.",
    fullDesc: "Nhận vận chuyển các loại hàng hóa có chiều dài, chiều rộng, chiều cao hoặc trọng lượng lớn, không thể vận chuyển bằng phương tiện thông thường. Chúng tôi khảo sát đặc tính hàng hóa, lựa chọn thiết bị phù hợp và xây dựng phương án vận chuyển tối ưu cho từng dự án.",
    iconName: "Truck",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80",
    suitableFor: [
      "Bồn, Silo, thiết bị áp lực công nghiệp",
      "Máy biến áp và thiết bị truyền tải điện 110kV - 500kV",
      "Dây chuyền sản xuất đồng bộ nhà máy",
      "Kết cấu thép, dầm thép khẩu độ lớn, kết cấu cơ khí",
      "Cánh quạt & trụ điện gió, turbine năng lượng",
      "Các loại hàng hóa đặc thù vượt chuẩn lưu hành"
    ],
    features: [
      "Mooc thủy lực ghép trục linh hoạt tải trọng lên đến 500+ tấn",
      "Khảo sát chướng ngại vật và lập bản vẽ phương án chạy xe",
      "Đội xe dẫn đường cảnh báo an toàn chuyên nghiệp",
      "Bảo hiểm hàng hóa giá trị cao trọn gói"
    ],
    equipmentUsed: ["Mooc thủy lực Goldhofer/Scheuerle", "Đầu kéo Man/Volvo 8x4 600-800HP", "Xe cảnh báo áp tải"]
  },
  {
    id: "thiet-bi-cong-trinh",
    number: "02",
    title: "Vận Chuyển Máy Móc & Thiết Bị Dự Án",
    shortDesc: "Giải pháp vận chuyển thiết bị nhà máy, công trình, năng lượng, cơ giới nặng.",
    fullDesc: "Đưa thiết bị đến đúng công trường – đúng tiến độ. Với hệ thống phương tiện chuyên dụng, chúng tôi đáp ứng nhu cầu vận chuyển máy móc, thiết bị xây dựng và thiết bị công trình giữa các tỉnh thành. Từ bãi tập kết → cảng → kho → công trường, phương án vận chuyển được xây dựng dựa trên kích thước, trọng lượng và điều kiện thực tế của từng loại thiết bị.",
    iconName: "HardHat",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80",
    suitableFor: [
      "Máy xúc, máy đào gầu lớn, máy lu rung, máy ủi bánh xích",
      "Cẩu bánh lốp, cẩu bánh xích tải trọng 50 - 500 tấn",
      "Máy khoan cọc nhồi, máy đóng cọc công trình ngầm",
      "Thiết bị trạm trộn bê tông, máy nghiền đá",
      "Vận chuyển máy móc từ cảng nhập khẩu về công trường",
      "Điều chuyển thiết bị thi công giữa các dự án"
    ],
    features: [
      "Sơ-mi rơ-moóc sàn thấp (Lowbed) hạ sàn chỉ từ 40 - 60cm",
      "Cầu thang lên xuống tự động tiện lợi cho xe cơ giới tự hành",
      "Lái xe và phụ xe giàu kinh nghiệm điều khiển máy thi công",
      "Đáp ứng điều phối tiến độ 24/7 không làm gián đoạn thi công"
    ],
    equipmentUsed: ["Mooc lùn 3-8 trục", "Mooc sàn võng rút dài", "Đầu kéo chuyên dùng"]
  },
  {
    id: "khao-sat-tuyen",
    number: "03",
    title: "Khảo Sát & Thiết Kế Tuyến Vận Chuyển",
    shortDesc: "Khảo sát hiện trường, tính toán phương án, thiết kế tuyến tối ưu, đảm bảo an toàn.",
    fullDesc: "Không chỉ là chở hàng – chúng tôi thiết kế cả hành trình. Đối với hàng hóa siêu trường, chỉ cần một điểm hạn chế trên tuyến đường cũng có thể ảnh hưởng đến toàn bộ phương án vận chuyển. Trước mỗi dự án, đội ngũ kỹ thuật tiến hành đánh giá toàn diện hành trình từ điểm xuất phát đến đích.",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    suitableFor: [
      "Đo đạc kiểm tra chiều cao tĩnh không (cầu vượt, dây điện, cổng chào)",
      "Kiểm định tải trọng cầu đường và công trình giao thông",
      "Mô phỏng 3D bán kính quay xe tại các nút giao hẹp, đèo dốc",
      "Lập phương án nâng hạ tạm thời dây điện, cáp viễn thông",
      "Khảo sát địa hình hạ tầng cảng, đường nội bộ nhà máy",
      "Lập hồ sơ thuyết minh kỹ thuật trình cơ quan quản lý"
    ],
    features: [
      "Thiết bị đo khoảng cách Laser & Drone định vị 3D chuẩn xác",
      "Hệ thống phần mềm mô phỏng quay xe AutoTURN tiêu chuẩn quốc tế",
      "Đội ngũ kỹ sư giao thông và cầu đường dày dặn kinh nghiệm",
      "Báo cáo phân tích rủi ro và giải pháp xử lý điểm nghẽn chi tiết"
    ],
    equipmentUsed: ["Flycam 4K Mapping", "Máy đo cao độ laser", "Thiết bị đo góc nghiêng & tải trọng trục"]
  },
  {
    id: "thu-tuc-phap-ly",
    number: "04",
    title: "Thủ Tục Pháp Lý & Giấy Phép Lưu Hành",
    shortDesc: "Hỗ trợ đầy đủ thủ tục, giấy phép lưu hành, phối hợp cơ quan chức năng.",
    fullDesc: "Chủ động từ hồ sơ đến hành trình. Đối với hàng hóa quá khổ, quá tải, việc chuẩn bị hồ sơ và tuân thủ các quy định liên quan là một phần quan trọng của phương án vận chuyển. Chúng tôi hỗ trợ khách hàng thực hiện mọi thủ tục cấp phép theo đúng quy định của Bộ GTVT và Cục Đường bộ Việt Nam.",
    iconName: "FileCheck",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
    suitableFor: [
      "Tư vấn thủ tục hồ sơ vận chuyển hàng siêu trường siêu trọng",
      "Chuẩn bị hồ sơ kỹ thuật phương tiện và hàng hóa theo quy chuẩn",
      "Thực hiện xin cấp Giấy phép lưu hành xe quá khổ, quá tải",
      "Phối hợp với Sở GTVT, Cảnh sát giao thông các tỉnh thành",
      "Lập phương án phân luồng, đảm bảo an toàn giao thông khi chạy đêm",
      "Phối hợp đơn vị quản lý điện lực nâng hạ đường dây điện cao thế"
    ],
    features: [
      "Quy trình xin phép chuyên nghiệp, rút ngắn thời gian chuẩn bị",
      "Đảm bảo 100% hợp pháp và an toàn theo thông tư hiện hành",
      "Chủ động xử lý giấy phép liên tỉnh xuyên suốt chiều dài tuyến đường",
      "Cung cấp lộ trình và mốc thời gian lưu hành chuẩn xác"
    ],
    equipmentUsed: ["Hồ sơ phương án kỹ thuật", "Giấy phép lưu hành đặc biệt Cục Đường Bộ", "Văn bản hiệp đồng lực lượng dẫn đường"]
  },
  {
    id: "giam-sat-dieu-phoi",
    number: "05",
    title: "Giám Sát & Điều Phối Vận Chuyển 24/7",
    shortDesc: "Giám sát hành trình, điều phối chuyên nghiệp, xử lý kịp thời mọi tình huống.",
    fullDesc: "Theo dõi hành trình – chủ động xử lý. Vận chuyển hàng siêu trường siêu trọng đòi hỏi khả năng điều phối chính xác và phản ứng nhanh trong suốt hành trình. Đội ngũ điều phối trung tâm theo dõi quá trình vận chuyển qua GPS & Camera hành trình, phối hợp chặt chẽ giữa lái xe, kỹ thuật, khách hàng và các cơ quan chức năng.",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    suitableFor: [
      "Theo dõi tiến độ di chuyển thực tế theo thời gian thực",
      "Cập nhật trạng thái chuyến hàng liên tục cho chủ hàng",
      "Điều phối xe dẫn đường, cảnh báo từ xa cho các phương tiện khác",
      "Chủ động ứng phó thời tiết xấu, sạt lở hoặc ùn tắc giao thông",
      "Phối hợp đồng bộ tại các điểm giao nhận và trạm cân xe",
      "Kiểm soát nghiêm ngặt kế hoạch thời gian và mốc cam kết của dự án"
    ],
    features: [
      "Hệ thống giám sát GPS & Telematics kết nối trực tiếp đến trung tâm",
      "Bộ đàm vô tuyến cự ly xa liên lạc liên tục giữa đoàn xe",
      "Quy trình báo cáo định kỳ tự động qua email & dashboard",
      "Trực ban kỹ thuật và cứu hộ túc trực 24/7 trên suốt hành trình"
    ],
    equipmentUsed: ["Hệ thống quản lý hành trình Fleet Telematics", "Bộ đàm UHF/VHF", "Xe hoa tiêu dẫn đoàn chuyên trách"]
  },
  {
    id: "chang-buoc-an-toan",
    number: "06",
    title: "Bốc Xếp – Chằng Buộc – Cố Định Hàng Hóa",
    shortDesc: "Quy trình an toàn nghiêm ngặt, cố định hàng hóa chuẩn quốc tế, bảo vệ tài sản.",
    fullDesc: "An toàn hàng hóa bắt đầu từ khâu xếp đặt. Đối với máy móc và thiết bị có kích thước lớn, việc phân bổ tải trọng và cố định hàng hóa đúng phương pháp đóng vai trò sống còn trong suốt hành trình. Tùy từng loại hàng, chúng tôi xây dựng phương án bốc dỡ và chằng buộc đạt tiêu chuẩn an toàn hàng hải và đường bộ.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    suitableFor: [
      "Tính toán trọng tâm và phân bổ tải trọng đều trên các trục xe",
      "Sử dụng xích chịu lực tải trọng cao Grade 80 / 100",
      "Dây cáp thép, tăng đơ chuyên dụng, cáp vải bản rộng tải nặng",
      "Chêm gỗ chuyên dụng, đệm cao su chống trượt ma sát cao",
      "Kiểm tra lực siết và liên kết điểm neo trước khi xuất phát",
      "Tái kiểm tra định kỳ tình trạng chằng buộc sau mỗi 50km - 100km"
    ],
    features: [
      "Đội ngũ kỹ thuật viên chằng buộc (Lashing) được cấp chứng chỉ",
      "Thiết bị chằng buộc nhập khẩu có tem kiểm định chất lượng",
      "Phương án chằng buộc được tính toán lực quán tính và góc nghiêng",
      "Bảo đảm an toàn tuyệt đối, không trầy xước, móp méo hàng hóa"
    ],
    equipmentUsed: ["Xích chằng hàng Grade 100", "Tăng đơ Ratchet Tie-Down", "Gối đỡ chêm cao su chống rung"]
  }
];

export const FLEET_SPECS: VehicleSpec[] = [
  {
    id: "mooc-thuy-luc",
    name: "Mooc Thủy Lực Đa Trục (Hydraulic Modular Trailer)",
    category: "Siêu trọng",
    payload: "Lên đến 500+ Tấn",
    dimensions: "Dài tự do (ghép module) × Rộng 3.0m - 6.5m",
    description: "Dòng rơ mooc thủy lực chuyên dụng Goldhofer, Scheuerle với khả năng ghép nối linh hoạt theo chiều dọc và chiều ngang. Hệ thống nâng hạ thủy lực độc lập từng trục giúp cân bằng tải trọng hoàn hảo trên địa hình hiểm trở.",
    image: bannerTransformer,
    features: ["Hệ thống lái thủy lực đa chế độ (cua tròn, đi ngang)", "Khả năng nâng hạ gầm ±300mm", "Ghép nối không giới hạn theo cấu hình dự án"],
    axleCount: "4 - 48 Trục",
    enginePower: "Kết hợp Power Booster"
  },
  {
    id: "dau-keo-cong-suat-lon",
    name: "Đầu Kéo Chuyên Dụng 600 - 800 HP",
    category: "Đầu kéo tải nặng",
    payload: "Sức kéo đoàn xe đến 350+ Tấn",
    dimensions: "Cấu hình 6x4, 8x4 Heavy Duty",
    description: "Đội ngũ đầu kéo Man TGX, Volvo FH16, Scania công suất siêu khủng được trang bị hộp số thủy lực Turbo Retarder Clutch, cho phép khởi hành êm ái trên đèo dốc với tải trọng hàng trăm tấn.",
    image: bannerRefinerySilo,
    features: ["Động cơ 16 lít V8 / I6 Turbo Diesel", "Hệ thống phanh phụ thủy lực chống trôi", "Trang bị tời kéo cứu hộ chuyên dụng"],
    enginePower: "600 - 800 Mã lực",
    axleCount: "3 - 4 Cầu chủ động"
  },
  {
    id: "mooc-lun-lowbed",
    name: "Sơ-mi Rơ-moóc Sàn Thấp (Lowbed Trailer)",
    category: "Quá khổ - Quá tải",
    payload: "40 - 120 Tấn",
    dimensions: "Sàn dài 9m - 16m × Cao 0.5m - 0.9m",
    description: "Chuyên dụng vận chuyển máy đào bánh xích, cẩu bánh lốp, máy ủi và thiết bị có chiều cao lớn cần hạ thấp trọng tâm để lọt qua tĩnh không cầu vượt.",
    image: bannerExcavatorLowbed,
    features: ["Cổ ngỗng tháo rời (Gooseneck) tự hành", "Sàn võng hạ cực thấp sát mặt đường", "Cầu dẫn thủy lực lên xuống xe máy móc"],
    axleCount: "3 - 6 Trục"
  },
  {
    id: "mooc-rut-extendable",
    name: "Rơ-moóc Rút Dài Chuyên Dụng (Extendable Trailer)",
    category: "Siêu trường",
    payload: "50 - 90 Tấn",
    dimensions: "Rút dài từ 14m đến 55m",
    description: "Thiết kế đặc biệt để chuyên chở kết cấu thép dài, dầm cầu bê tông dự ứng lực, tháp giải nhiệt và cánh quạt điện gió có chiều dài ngoại cỡ.",
    image: bannerWindBlade,
    features: ["Khung rút lồng nhiều đoạn khóa khí nén", "Hệ thống bánh sau bẻ lái tự động theo góc cua xe đầu", "Đèn cảnh báo kéo dài theo biên dạng hàng"],
    axleCount: "4 - 8 Trục lái"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Tiếp Nhận Yêu Cầu",
    desc: "Tiếp nhận thông tin về hàng hóa, kích thước, trọng lượng, địa điểm lấy và giao hàng.",
    details: [
      "Thu thập bản vẽ kích thước chi tiết (Dài x Rộng x Cao, Vị trí trọng tâm)",
      "Xác định đặc tính kỹ thuật, phụ kiện kèm theo và yêu cầu bảo quản",
      "Tiếp nhận thông tin mốc tiến độ dự án từ chủ đầu tư"
    ],
    icon: "ClipboardList"
  },
  {
    step: "02",
    title: "Khảo Sát Thực Tế",
    desc: "Đánh giá đặc tính hàng hóa và điều kiện thực tế tại điểm nhận – điểm giao.",
    details: [
      "Kiểm tra vị trí móc cẩu, tai nâng hạ trên thân thiết bị",
      "Đánh giá độ chịu tải của nền bãi tại nơi lấy hàng và trả hàng",
      "Lập phương án đưa xe chuyên dụng tiếp cận an toàn"
    ],
    icon: "Search"
  },
  {
    step: "03",
    title: "Khảo Sát Tuyến Đường",
    desc: "Xác định tuyến đường khả thi, các điểm hạn chế và phương án xử lý chướng ngại vật.",
    details: [
      "Kiểm tra tải trọng toàn bộ cầu cống trên hành trình",
      "Đo đạc tĩnh không cầu vượt, dây điện, trạm thu phí",
      "Mô phỏng bán kính quay xe tại nút giao ngã ba, ngã tư, khúc cua dốc"
    ],
    icon: "MapPin"
  },
  {
    step: "04",
    title: "Lập Phương Án Vận Chuyển",
    desc: "Lựa chọn phương tiện, cấu hình vận chuyển và phương án đảm bảo an toàn kỹ thuật.",
    details: [
      "Lựa chọn loại đầu kéo, số trục mooc phù hợp với tải trọng",
      "Tính toán bản vẽ chằng buộc (Lashing plan) và phân bổ tải trọng trục",
      "Lập kế hoạch tiến độ chi tiết từng chặng di chuyển"
    ],
    icon: "FileSpreadsheet"
  },
  {
    step: "05",
    title: "Hoàn Thiện Thủ Tục & Cấp Phép",
    desc: "Chuẩn bị hồ sơ và phối hợp thực hiện các thủ tục cần thiết theo đúng quy định.",
    details: [
      "Nộp hồ sơ xin Giấy phép lưu hành xe quá khổ quá tải tại Cục Đường Bộ",
      "Ký hợp đồng bảo hiểm hàng hóa giá trị cao",
      "Phối hợp đơn vị cảnh sát giao thông, công ty điện lực trên tuyến"
    ],
    icon: "Stamp"
  },
  {
    step: "06",
    title: "Điều Phối Vận Chuyển",
    desc: "Tổ chức phương tiện, nhân sự kỹ thuật, xe áp tải và điều phối hành trình.",
    details: [
      "Bốc xếp, cố định thiết bị lên rơ mooc theo đúng bản vẽ kỹ thuật",
      "Bố trí xe dẫn đường hoa tiêu đi trước cảnh báo chướng ngại vật",
      "Khởi hành theo khung giờ được cấp phép (thường ban đêm)"
    ],
    icon: "Navigation"
  },
  {
    step: "07",
    title: "Giám Sát Hành Trình",
    desc: "Theo dõi quá trình vận chuyển 24/7 và chủ động xử lý các tình huống phát sinh.",
    details: [
      "Truyền dữ liệu GPS, tốc độ và góc nghiêng xe về trung tâm điều hành",
      "Dừng kiểm tra lực siết chằng buộc định kỳ trên đường",
      "Cập nhật báo cáo vị trí tức thời cho khách hàng"
    ],
    icon: "ShieldAlert"
  },
  {
    step: "08",
    title: "Bàn Giao & Nghiệm Thu",
    desc: "Kiểm tra tình trạng hàng hóa và hoàn tất bàn giao an toàn tại điểm đến.",
    details: [
      "Đưa phương tiện vào vị trí hạ hàng tại công trường/nhà máy",
      "Hỗ trợ tháo dỡ chằng buộc và phối hợp cẩu đặt vào bệ móng",
      "Ký biên bản giao nhận hoàn thành dự án"
    ],
    icon: "CheckCircle2"
  }
];

export const SURVEY_PILLARS: RouteSurveyItem[] = [
  {
    title: "Kiểm tra Kích thước & Trọng lượng",
    desc: "Xác định chuẩn xác thông số hàng hóa, vị trí trọng tâm và điểm tỳ chịu lực để chọn mooc.",
    icon: "Ruler",
    criticalPoints: ["Trọng tâm hình học và vật lý", "Điểm nâng hạ cẩu và kích", "Khối lượng thực tế cân trục"]
  },
  {
    title: "Đánh giá Điểm Lấy & Điểm Giao",
    desc: "Khảo sát mặt bằng bãi, độ dốc ram dốc, bán kính quay trong khuôn viên nhà máy.",
    icon: "Building2",
    criticalPoints: ["Độ lún sụt mặt nền", "Cổng ra vào nhà máy", "Bán kính quay trong kho xưởng"]
  },
  {
    title: "Kiểm tra Cầu Đường & Bán Kính Quay",
    desc: "Kiểm tra tải trọng cấp phép của các cây cầu, tính toán góc quét đuôi rơ mooc tại các khúc cua.",
    icon: "Spline",
    criticalPoints: ["Kiểm định tải trọng cầu", "Mô phỏng góc cua ngã ba", "Góc vượt dốc đèo hiểm trở"]
  },
  {
    title: "Đánh giá Tĩnh Không & Chướng Ngại Vật",
    desc: "Khảo sát chiều cao hệ thống lưới điện cao thế/hạ thế, biển báo giao thông, cổng vòm đô thị.",
    icon: "Eye",
    criticalPoints: ["Chiều cao đường dây điện cắt ngang", "Cổng chào đô thị và camera phạt nguội", "Trạm thu phí có làn quá khổ"]
  }
];

export const LOGISTICS_ROUTES = [
  { from: "CẢNG", to: "KHO BÃI", desc: "Tiếp nhận trực tiếp từ tàu biển tại Cảng Hải Phòng, Cái Mép, Cát Lái, Dung Quất...", icon: "Ship" },
  { from: "CẢNG", to: "NHÀ MÁY", desc: "Vận chuyển dây chuyền máy móc nguyên chiếc từ cảng biển về khu công nghiệp.", icon: "Factory" },
  { from: "KHO", to: "CÔNG TRƯỜNG", desc: "Điều chuyển cấu kiện tiền chế, vật tư siêu trường từ kho tổng ra dự án thi công.", icon: "HardHat" },
  { from: "NHÀ MÁY", to: "CÔNG TRƯỜNG", desc: "Giao nhận trực tiếp các bồn áp lực, kết cấu thép gia công đến công trình xây dựng.", icon: "Truck" },
  { from: "CÔNG TRƯỜNG", to: "CÔNG TRƯỜNG", desc: "Di chuyển thiết bị cơ giới nặng (cẩu 300T, máy đào) giữa các dự án trên toàn quốc.", icon: "ArrowLeftRight" },
];

export const INDUSTRIES_SERVED = [
  { name: "Xây Dựng & Cầu Đường", desc: "Dầm bê tông, máy ép cọc, cẩu tháp, kết cấu dầm thép khẩu độ lớn.", icon: "HardHat" },
  { name: "Năng Lượng & Điện Gió", desc: "Turbine cánh quạt điện gió, máy biến áp 220kV-500kV, máy phát điện dự phòng.", icon: "Zap" },
  { name: "Công Nghiệp & Lọc Hóa Dầu", desc: "Tháp chưng cất, bồn áp lực, lò hơi công nghiệp, bồn chứa khí hóa lỏng.", icon: "Flame" },
  { name: "Cơ Khí Chế Tạo & Luyện Kim", desc: "Máy cán thép, máy đúc áp lực, dây chuyền dập khung xe, trục turbine tàu thủy.", icon: "Cog" },
  { name: "Nhà Máy Sản Xuất & Chế Biến", desc: "Dây chuyền sản xuất đồng bộ, silo thức ăn chăn nuôi, thiết bị chế biến thực phẩm.", icon: "Boxes" },
  { name: "Hạ Tầng Giao Thông & Cảng Biển", desc: "Cẩu bờ STS, cẩu giàn RTG, thiết bị nạo vét luồng hàng hải.", icon: "Anchor" },
];

export const WHY_CHOOSE_US = [
  {
    title: "Kinh Nghiệm Thực Tế",
    desc: "Am hiểu sâu sắc đặc thù vận chuyển máy móc, thiết bị nặng và hàng hóa có kích thước, tải trọng ngoại cỡ.",
    icon: "Award"
  },
  {
    title: "Phương Tiện Chuyên Dụng",
    desc: "Sở hữu đội xe mooc thủy lực, mooc lùn, đầu kéo công suất khủng 600-800HP đáp ứng cấu hình từng loại hàng.",
    icon: "Truck"
  },
  {
    title: "Khảo Sát Tuyến Chuyên Sâu",
    desc: "Không vận chuyển theo một phương án cố định. Mỗi cung đường đều được khảo sát thực tế và lập mô phỏng an toàn.",
    icon: "MapPin"
  },
  {
    title: "Quản Lý An Toàn Tuyệt Đối",
    desc: "An toàn cho hàng hóa, phương tiện, con người và hạ tầng giao thông là nguyên tắc cốt lõi xuyên suốt.",
    icon: "ShieldCheck"
  },
  {
    title: "Điều Phối Chủ Động 24/7",
    desc: "Theo dõi hành trình qua GPS telematics và xử lý kịp thời các tình huống phát sinh trên toàn tuyến.",
    icon: "Radio"
  },
  {
    title: "Minh Bạch Phương Án & Chi Phí",
    desc: "Khách hàng được tư vấn tường minh về giải pháp kỹ thuật, lộ trình, thời gian và bảng giá trọn gói không phát sinh.",
    icon: "FileText"
  }
];

export const PROJECT_CASES: ProjectCase[] = [
  {
    id: "du-an-dien-gio",
    title: "Vận Chuyển Cánh Quạt & Trụ Điện Gió 82m",
    clientType: "Dự Án Năng Lượng Tái Tạo",
    cargo: "Cánh quạt điện gió dài 78m - 82m, Trụ tháp nặng 95 tấn",
    weight: "95 Tấn / kiện",
    dimension: "Dài 82.5m × Rộng 4.2m × Cao 4.5m",
    route: "Cảng Cam Ranh → Dự án Điện gió Đắk Lắk",
    image: bannerWindBlade,
    highlight: "Vượt qua hơn 240km đường đèo dốc hiểm trở với xe mooc rút kéo dài có hệ thống bẻ lái trục sau tự động."
  },
  {
    id: "du-an-bon-loc-dau",
    title: "Vận Chuyển Tháp Chưng Cất & Bồn Áp Lực 140 Tấn",
    clientType: "Dự Án Lọc Hóa Dầu",
    cargo: "Tháp áp lực nguyên khối",
    weight: "140 Tấn",
    dimension: "Dài 34m × Đường kính Ø 5.6m",
    route: "Cảng Dung Quất → Khu liên hợp Lọc Hóa Dầu",
    image: bannerRefinerySilo,
    highlight: "Sử dụng cụm mooc thủy lực 16 trục Goldhofer tự hành kết hợp 2 đầu kéo 800HP đẩy kéo an toàn tuyệt đối."
  },
  {
    id: "du-an-may-bien-ap",
    title: "Vận Chuyển Máy Biến Áp 220kV Siêu Trọng",
    clientType: "Truyền Tải Điện Quốc Gia",
    cargo: "Máy biến áp 220kV - 250MVA",
    weight: "115 Tấn",
    dimension: "Dài 7.8m × Rộng 3.8m × Cao 4.4m",
    route: "Cảng Hải Phòng → Trạm Biến Áp 220kV Tây Bắc",
    image: bannerTransformer,
    highlight: "Khảo sát và nâng hạ hơn 18 điểm dây điện cao thế, thi công gia cường tạm 2 cầu yếu trên tuyến đường đèo dốc."
  },
  {
    id: "du-an-may-xuc-mo",
    title: "Điều Chuyển Máy Xúc Thủy Lực & Cẩu Bánh Xích 150T",
    clientType: "Khai Thác Mỏ & Xây Dựng Hạ Tầng",
    cargo: "Máy xúc gầu thuận Liebherr & Cẩu xích Kobelco",
    weight: "85 Tấn / thiết bị",
    dimension: "Dài 13.5m × Rộng 4.2m × Cao 4.1m",
    route: "Mỏ Than Quảng Ninh → Dự Án Cao Tốc Bắc - Nam",
    image: bannerExcavatorLowbed,
    highlight: "Sử dụng mooc sàn lùn hạ đáy tháo rời cổ ngỗng giúp xe máy xúc tự hành lên xuống an toàn trong 20 phút."
  }
];
