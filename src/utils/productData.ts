
export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  concern: 'dry' | 'acne' | 'brightening';
  imageUrl: string;
  description: string;
  ingredients: string[];
  badges: string[];
};

export const products: Product[] = [
  {
    id: 'product-1',
    name: 'Serum Dưỡng Ẩm',
    price: '320.000₫',
    category: 'Serum',
    concern: 'dry',
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=400&auto=format&fit=crop',
    description: 'Serum cấp ẩm chuyên sâu, giúp da căng mọng và ngậm nước. Phù hợp cho da khô, thiếu nước và da thường.',
    ingredients: [
      'Hyaluronic Acid giúp da ngậm nước',
      'Ceramide củng cố hàng rào bảo vệ da',
      'Glycerin dưỡng ẩm suốt ngày dài'
    ],
    badges: ['Dưỡng ẩm siêu cấp 💦', 'Da căng bóng ✨']
  },
  {
    id: 'product-2',
    name: 'Kem Dưỡng Làm Dịu',
    price: '280.000₫',
    category: 'Kem dưỡng',
    concern: 'acne',
    imageUrl: 'https://images.unsplash.com/photo-1556229174-5e42a09e36c5?q=80&w=400&auto=format&fit=crop',
    description: 'Kem dưỡng làm dịu da, giảm mụn và kiểm soát dầu. Không gây bít tắc lỗ chân lông, phù hợp cho da dầu và da mụn.',
    ingredients: [
      'Tea Tree Oil kháng khuẩn, giảm mụn',
      'Niacinamide làm dịu và cân bằng da',
      'Cica (Centella Asiatica) phục hồi da'
    ],
    badges: ['Giảm mụn nhanh chóng 🌿', 'Không gây kích ứng 🌱']
  },
  {
    id: 'product-3',
    name: 'Tinh Chất Làm Sáng',
    price: '420.000₫',
    category: 'Tinh chất',
    concern: 'brightening',
    imageUrl: 'https://images.unsplash.com/photo-1610113774929-95a3c9ff053e?q=80&w=400&auto=format&fit=crop',
    description: 'Tinh chất làm sáng da, giảm thâm nám và đốm nâu. Giúp da đều màu và rạng rỡ hơn sau vài tuần sử dụng.',
    ingredients: [
      'Vitamin C làm sáng và chống oxy hóa',
      'Alpha Arbutin giảm thâm nám hiệu quả',
      'Tranexamic Acid ngăn ngừa tăng sắc tố'
    ],
    badges: ['Da sáng như gương 🌟', 'Chống oxy hóa 🍊']
  },
  {
    id: 'product-4',
    name: 'Mặt Nạ Dưỡng Ẩm',
    price: '35.000₫',
    category: 'Mặt nạ',
    concern: 'dry',
    imageUrl: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=400&auto=format&fit=crop',
    description: 'Mặt nạ giấy cấp ẩm tức thì, phục hồi độ ẩm cho da khô. Làm dịu da căng và khó chịu chỉ trong 15 phút.',
    ingredients: [
      'Hyaluronic Acid cấp ẩm sâu',
      'Chiết xuất Lô Hội làm dịu da',
      'Vitamin E chống oxy hóa'
    ],
    badges: ['Cấp ẩm tức thì 💧', 'Làm dịu da căng 😌']
  },
  {
    id: 'product-5',
    name: 'Gel Rửa Mặt Trị Mụn',
    price: '180.000₫',
    category: 'Sữa rửa mặt',
    concern: 'acne',
    imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=400&auto=format&fit=crop',
    description: 'Gel rửa mặt nhẹ nhàng làm sạch sâu, không gây khô căng. Giúp ngừa mụn và kiểm soát bã nhờn hiệu quả.',
    ingredients: [
      'Salicylic Acid làm sạch lỗ chân lông',
      'Tea Tree Oil kháng khuẩn tự nhiên',
      'Glycerin duy trì độ ẩm cần thiết'
    ],
    badges: ['Làm sạch sâu 🧼', 'Giảm mụn đáng kể 🌿']
  },
  {
    id: 'product-6',
    name: 'Kem Chống Nắng Làm Sáng',
    price: '250.000₫',
    category: 'Chống nắng',
    concern: 'brightening',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop',
    description: 'Kem chống nắng kết hợp thành phần làm sáng da, bảo vệ khỏi tia UV và ngăn sạm da. Finish mịn không bóng nhờn.',
    ingredients: [
      'SPF 50+ PA++++ bảo vệ toàn diện',
      'Niacinamide làm sáng và đều màu da',
      'Adenosine chống lão hóa'
    ],
    badges: ['Chống nắng toàn diện ☀️', 'Làm sáng dần 🌟']
  }
];

// Function to filter products by skin concern
export const getProductsByConcern = (concern: 'dry' | 'acne' | 'brightening'): Product[] => {
  return products.filter(product => product.concern === concern);
};
