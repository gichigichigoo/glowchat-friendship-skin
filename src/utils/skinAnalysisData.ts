
import { SkinAnalysisData } from '../components/SkinAnalysisReport';

// Sample data for each skin concern type
export const skinAnalysisSamples: Record<'dry' | 'acne' | 'brightening', SkinAnalysisData> = {
  dry: {
    skinType: 'Da khô',
    hydrationLevel: 35,
    concerns: [
      {
        name: 'Khô da',
        severity: 3,
        description: 'Da khô, căng và có dấu hiệu bong tróc, đặc biệt ở vùng má và trán.'
      },
      {
        name: 'Nhạy cảm',
        severity: 2,
        description: 'Da có biểu hiện đỏ nhẹ khi sử dụng một số sản phẩm.'
      },
      {
        name: 'Thiếu sáng',
        severity: 1,
        description: 'Da hơi xỉn màu do thiếu độ ẩm.'
      }
    ],
    recommendations: [
      'Sử dụng sữa rửa mặt dạng kem không chứa sulfate.',
      'Bổ sung serum dưỡng ẩm chứa Hyaluronic Acid và Ceramide.',
      'Dùng kem dưỡng đậm đặc vào ban đêm để khóa ẩm.',
      'Uống đủ nước và tránh tắm nước quá nóng.'
    ]
  },
  acne: {
    skinType: 'Da hỗn hợp',
    hydrationLevel: 55,
    concerns: [
      {
        name: 'Mụn',
        severity: 3,
        description: 'Mụn viêm tập trung ở vùng chữ T, đặc biệt là trán và cằm.'
      },
      {
        name: 'Dầu thừa',
        severity: 2,
        description: 'Da tiết dầu nhiều ở vùng trán, mũi và cằm.'
      },
      {
        name: 'Thâm mụn',
        severity: 2,
        description: 'Có các vết thâm sau mụn, đặc biệt ở hai bên má.'
      }
    ],
    recommendations: [
      'Sử dụng sữa rửa mặt chứa Salicylic Acid để làm sạch sâu.',
      'Áp dụng toner không cồn để cân bằng da.',
      'Dùng sản phẩm mụn chứa Benzoyl Peroxide hoặc Tea Tree Oil.',
      'Không bỏ qua bước dưỡng ẩm với kem dưỡng oil-free.',
      'Đừng nặn mụn để tránh để lại sẹo và vết thâm.'
    ]
  },
  brightening: {
    skinType: 'Da thường',
    hydrationLevel: 65,
    concerns: [
      {
        name: 'Không đều màu',
        severity: 3,
        description: 'Da không đều màu, có nhiều đốm nâu và tàn nhang.'
      },
      {
        name: 'Thiếu sáng',
        severity: 2,
        description: 'Da thiếu sức sống, màu xỉn do tiếp xúc với ô nhiễm.'
      },
      {
        name: 'Cháy nắng',
        severity: 1,
        description: 'Có dấu hiệu cháy nắng nhẹ ở vùng gò má.'
      }
    ],
    recommendations: [
      'Làm sạch da kỹ với sữa rửa mặt dịu nhẹ.',
      'Sử dụng serum Vitamin C vào buổi sáng để làm sáng da.',
      'Áp dụng kem chống nắng SPF 50+ mỗi ngày, kể cả khi ở trong nhà.',
      'Dùng sản phẩm chứa AHA/BHA 1-2 lần/tuần để tẩy tế bào chết.',
      'Cân nhắc các sản phẩm chứa Niacinamide để giảm đốm nâu.'
    ]
  }
};

// Function to get skin analysis based on concern
export const getSkinAnalysisByConcern = (concern: 'dry' | 'acne' | 'brightening'): SkinAnalysisData => {
  return skinAnalysisSamples[concern];
};
