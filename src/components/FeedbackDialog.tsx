
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messageType: 'result' | 'product';
  onSubmit: (reason: string) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  isOpen,
  onClose,
  messageType,
  onSubmit,
}) => {
  const reasons = messageType === 'result' 
    ? ['Kết quả không chính xác', 'Giải thích không rõ ràng', 'Quá chung chung', 'Lý do khác']
    : ['Không phù hợp với da của tôi', 'Quá đắt', 'Đã dùng thử', 'Lý do khác'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {messageType === 'result'
              ? 'Cảm ơn phản hồi — điều gì không phù hợp với bạn?'
              : 'Cảm ơn đã cho chúng tôi biết — tại sao bạn không thích gợi ý này?'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {reasons.map((reason) => (
            <Button
              key={reason}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => {
                onSubmit(reason);
                onClose();
              }}
            >
              {reason}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
