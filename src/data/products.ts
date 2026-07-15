export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceValue: number;
  originalPrice?: string;
  originalPriceValue?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  shortDescription: string;
  colors: string[]; // Gradients for visual placeholders
  benefits: string[];
  ingredients: string[];
  usage: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dầu rạn da Orya cho mẹ bầu",
    category: "Chăm sóc mẹ bầu",
    price: "350.000đ",
    priceValue: 350000,
    originalPrice: "450.000đ",
    originalPriceValue: 450000,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 120,
    description:
      "Dầu massage chuyên biệt ngăn ngừa và làm mờ các vết rạn da trong suốt thai kỳ và sau sinh. Chiết xuất 100% từ thảo dược thiên nhiên, an toàn tuyệt đối cho mẹ và bé, giúp da đàn hồi, mềm mịn và ngăn ngừa thâm sạm.",
    shortDescription:
      "Dầu massage ngăn ngừa và giảm rạn da cho mẹ bầu. Chiết xuất 100% từ thảo dược thiên nhiên, an toàn tuyệt đối cho mẹ và bé.",
    colors: [
      "from-[#5D8D4A] via-[#6CA356] to-[#4A7A38]",
      "from-[#6CA356] via-[#81c76f] to-[#5D8D4A]",
      "from-[#4A7A38] via-[#5D8D4A] to-[#3a612b]"
    ],
    benefits: [
      "Ngăn ngừa tối đa sự hình thành của các vết rạn nứt da mới.",
      "Hỗ trợ làm mờ các vết rạn nứt cũ, làm mờ thâm sạm và giúp đều màu da.",
      "Cung cấp độ ẩm chuyên sâu, cải thiện độ đàn hồi tự nhiên của da bụng, đùi và ngực.",
      "Giảm cảm giác ngứa ngáy khó chịu do da căng giãn ở các tháng cuối thai kỳ."
    ],
    ingredients: [
      "Dầu Hạnh Nhân Ngọt (Sweet Almond Oil): Dưỡng ẩm sâu, tăng sản xuất collagen tự nhiên giúp da đàn hồi.",
      "Dầu Jojoba Hữu Cơ: Cân bằng tuyến bã nhờn, thấm cực nhanh không để lại cảm giác nhờn rít.",
      "Chiết xuất Lô Hội (Aloe Vera): Làm dịu làn da bị căng rát, tái tạo vùng da bị tổn thương.",
      "Tinh dầu oải hương thiên nhiên: Tạo hương thơm dịu nhẹ, giải tỏa căng thẳng cho mẹ bầu.",
      "Sản phẩm 5 KHÔNG: Không SLS/SLES, không Paraben, không cồn, không dầu khoáng, không hương liệu hóa học."
    ],
    usage: [
      "Làm sạch và lau khô vùng da cần massage (bụng, đùi, mông, ngực).",
      "Lấy một lượng dầu vừa đủ (khoảng 3-5 giọt) ra lòng bàn tay, xoa nhẹ hai tay vào nhau để làm ấm dầu.",
      "Massage nhẹ nhàng lên da theo chuyển động tròn từ ngoài vào trong, từ dưới lên trên khoảng 5-10 phút.",
      "Sử dụng đều đặn mỗi ngày 2 lần từ tháng thứ 3 của thai kỳ để đạt hiệu quả tốt nhất."
    ]
  },
  {
    id: 2,
    name: "Kem bôi ngực Orya sau sinh",
    category: "Chăm sóc sau sinh",
    price: "280.000đ",
    priceValue: 280000,
    originalPrice: "380.000đ",
    originalPriceValue: 380000,
    badge: "Mới",
    rating: 4.8,
    reviewsCount: 85,
    description:
      "Kem dưỡng da vùng ngực chuyên biệt dành cho phụ nữ sau sinh. Sản phẩm giúp dưỡng ẩm, làm dịu da ngực khô ráp, phục hồi và cải thiện độ săn chắc của bầu ngực. Thành phần 100% chuẩn thực phẩm an toàn tuyệt đối cho bé bú.",
    shortDescription:
      "Kem dưỡng da ngực chuyên biệt sau sinh, giúp phục hồi và săn chắc da. Thành phần lành tính, không ảnh hưởng sữa mẹ.",
    colors: [
      "from-[#F6ABB4] via-[#e8899a] to-[#d47281]",
      "from-[#e8899a] via-[#f7cbd1] to-[#F6ABB4]",
      "from-[#d47281] via-[#F6ABB4] to-[#b35261]"
    ],
    benefits: [
      "Làm dịu nhanh chóng tình trạng đau rát, nứt nẻ đầu ti (nứt cổ gà) khi cho con bú.",
      "Cải thiện độ đàn hồi và săn chắc cho da vùng ngực, hạn chế tình trạng chảy xệ sau sinh.",
      "Dưỡng ẩm sâu, ngăn ngừa nếp nhăn và khô sạm da bầu ngực.",
      "Thành phần tinh khiết chuẩn thực phẩm (food-grade), không cần lau lại trước khi cho bé bú."
    ],
    ingredients: [
      "Mỡ Cừu Lanolin Tinh Khiết: Tạo màng bảo vệ tối ưu cho đầu ti, ngăn nứt nẻ hiệu quả.",
      "Bơ Hạt Mỡ (Shea Butter) & Dầu Dừa: Cung cấp lipid tự nhiên nuôi dưỡng da mềm mại.",
      "Chiết xuất Cúc La Mã: Kháng viêm, làm dịu vùng da sưng đỏ hoặc nứt rát.",
      "Vitamin E tự nhiên: Chống oxy hóa mạnh mẽ, kích thích tái tạo da ngực săn chắc.",
      "Sản phẩm 5 KHÔNG: Không SLS/SLES, không Paraben, không cồn, không màu nhân tạo, không hương liệu hóa học."
    ],
    usage: [
      "Sau khi cho bé bú hoặc vắt sữa, vệ sinh sạch vùng ngực bằng nước ấm và thấm khô.",
      "Lấy một lượng kem nhỏ bằng hạt đậu ra đầu ngón tay sạch.",
      "Thoa đều lên bầu ngực và núm vú, kết hợp massage nhẹ nhàng theo chiều kim đồng hồ.",
      "Thoa liên tục sau mỗi cữ bú hoặc bất cứ khi nào thấy vùng da đầu ti có dấu hiệu khô, nứt rát."
    ]
  },
  {
    id: 3,
    name: "Nước tắm gội Orya Kids",
    category: "Chăm sóc em bé",
    price: "195.000đ",
    priceValue: 195000,
    originalPrice: "250.000đ",
    originalPriceValue: 250000,
    badge: "Vegan",
    rating: 4.9,
    reviewsCount: 145,
    description:
      "Sữa tắm gội thảo dược 2 trong 1 cực kỳ dịu nhẹ dành riêng cho trẻ sơ sinh và trẻ nhỏ. Độ pH 5.5 cân bằng sinh lý da bé, không gây cay mắt, giúp bảo vệ lớp màng ẩm tự nhiên và ngăn ngừa rôm sảy, hăm tã hiệu quả.",
    shortDescription:
      "Nước tắm gội 2 trong 1 dành cho trẻ sơ sinh và trẻ nhỏ. pH cân bằng 5.5, không SLS, không cồn, không gây kích ứng.",
    colors: [
      "from-[#5CC9FF] via-[#3ab5ed] to-[#1e9ad4]",
      "from-[#3ab5ed] via-[#85dbff] to-[#5CC9FF]",
      "from-[#1e9ad4] via-[#5CC9FF] to-[#107aa8]"
    ],
    benefits: [
      "Làm sạch nhẹ nhàng bụi bẩn, mồ hôi và vảy da đầu của bé (cứt trâu) mà không làm khô da.",
      "Hỗ trợ kháng khuẩn tự nhiên, giảm ngứa, ngừa rôm sảy, mụn nhọt và hăm tã.",
      "Độ pH 5.5 lý tưởng giúp duy trì hàng rào bảo vệ da tự nhiên của trẻ.",
      "Công thức không cay mắt (No Tears), mang lại sự dễ chịu tuyệt đối cho bé khi tắm."
    ],
    ingredients: [
      "Chiết xuất Khổ Qua & Trà Xanh: Kháng khuẩn tự nhiên, làm mát da và phòng ngừa rôm sảy.",
      "Chiết xuất Ké Đầu Ngựa & Sài Đất: Thảo dược Đông y giúp thải độc da, giảm mẩn ngứa.",
      "Dầu Màng Tang & Tinh dầu Tràm Gió: Giúp làm ấm cơ thể bé, chống cảm lạnh khi tắm.",
      "Panthenol (Vitamin B5): Dưỡng ẩm tối ưu, xoa dịu các nốt mẩn đỏ.",
      "Sản phẩm 5 KHÔNG: Không SLS/SLES, không cồn, không Paraben, không hương liệu hóa học, không cay mắt."
    ],
    usage: [
      "Chuẩn bị nước tắm ấm (khoảng 37 độ C) trong chậu tắm cho bé.",
      "Lấy một lượng nhỏ sữa tắm gội xoa đều lên tóc và cơ thể bé để tạo bọt nhẹ dịu.",
      "Massage nhẹ nhàng da đầu và toàn thân bé để làm sạch hoàn toàn bụi bẩn.",
      "Tắm sạch lại bằng nước ấm sạch và dùng khăn mềm lau khô người bé ngay lập tức."
    ]
  },
  {
    id: 4,
    name: "Dưỡng thể Orya Baby",
    category: "Chăm sóc em bé",
    price: "220.000đ",
    priceValue: 220000,
    originalPrice: "290.000đ",
    originalPriceValue: 290000,
    badge: "Mềm mịn",
    rating: 4.7,
    reviewsCount: 64,
    description:
      "Sữa dưỡng thể dịu nhẹ, thẩm thấu nhanh giúp dưỡng ẩm tối ưu cho làn da mỏng manh của bé. Công thức giàu lipid thực vật và vitamin giúp phục hồi hàng rào bảo vệ da, ngăn chặn tình trạng da khô ráp nứt nẻ vào mùa đông.",
    shortDescription:
      "Kem dưỡng ẩm toàn thân cho bé, giúp da mềm mại mịn màng suốt cả ngày. Công thức nhẹ nhàng, thẩm thấu nhanh.",
    colors: [
      "from-[#ED9717] via-[#c07a0e] to-[#a36402]",
      "from-[#c07a0e] via-[#f2b350] to-[#ED9717]",
      "from-[#a36402] via-[#ED9717] to-[#7d4b00]"
    ],
    benefits: [
      "Cung cấp và khóa ẩm liên tục trong 24h, giữ cho làn da bé luôn mềm mịn như nhung.",
      "Làm dịu vùng da bị nẻ, khô ráp, kích ứng do thời tiết hanh khô.",
      "Thấm cực nhanh, không gây nhờn rít, bít tắc lỗ chân lông của bé.",
      "Hương thơm thảo dược nhẹ dịu, giúp bé ngủ ngon và thư giãn hơn."
    ],
    ingredients: [
      "Chiết xuất Yến Mạch Hữu Cơ: Khóa ẩm, làm dịu kích ứng và phục hồi màng bảo vệ da.",
      "Dầu Hạt Hướng Dương & Dầu Quả Bơ: Giàu acid béo thiết yếu, tái tạo độ ẩm sâu.",
      "Glycerin Thực Vật: Hút ẩm tự nhiên từ không khí để cung cấp liên tục cho da bé.",
      "Chiết xuất Rau Má: Tăng tốc độ phục hồi các tổn thương nhỏ trên da.",
      "Sản phẩm 5 KHÔNG: Không SLS/SLES, không cồn, không Paraben, không dầu khoáng, không hương liệu hóa học."
    ],
    usage: [
      "Sau khi tắm sạch cho bé bằng nước ấm, lau khô người bằng khăn mềm.",
      "Lấy một lượng vừa đủ sữa dưỡng thể ra lòng bàn tay và xoa ấm.",
      "Thoa đều lên toàn bộ cơ thể bé (tay, chân, lưng, bụng).",
      "Massage nhẹ nhàng theo chiều vuốt lên để kích thích tuần hoàn máu và giúp kem thấm sâu."
    ]
  }
];