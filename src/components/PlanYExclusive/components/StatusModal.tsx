import React, { useState } from 'react';
import Modal from 'react-modal';

interface Status {
  code: string;
  color: string;
  description: string;
}

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (status: Status) => void;
}

const statusList: Status[] = [
  { code: "Y", color: "#6B7280", description: "Visit ทำงานนอกสถานที่" },
  { code: "SH", color: "#EAB308", description: "ย้าย" },
  { code: "S", color: "#0EA5E9", description: "ภายใน" },
  { code: "X", color: "#DC2626", description: "วันหยุดคิดเงิน" },
  { code: "X1", color: "#DC2626", description: "ให้หยุด" },
  { code: "1", color: "#16A34A", description: "ทำงานเต็มวัน" },
  { code: "0.5", color: "#16A34A", description: "ทำงานครึ่งวัน" },
  { code: "S1", color: "#EA580C", description: "ลากิจ" },
  { code: "S2", color: "#EA580C", description: "ลาป่วย (ไม่คิดเงิน)" },
  { code: "S3", color: "#EA580C", description: "ลาพักร้อน (ไม่คิดเงิน)" },
  { code: "S4", color: "#DC2626", description: "ขาดงาน" },
  { code: "S5", color: "#EA580C", description: "ลาพักร้อน (คิดเงิน)" },
  { code: "S6", color: "#EA580C", description: "ลากิจ (คิดเงิน)" },
  { code: "S7", color: "#EA580C", description: "ลาคลอด (คิดเงิน)" },
  { code: "S8", color: "#EA580C", description: "ลากิจ (ไม่คิดเงิน)" },
  { code: "S9", color: "#EA580C", description: "ลากิจอื่นๆ (ไม่คิดเงิน)" },
  { code: "S10", color: "#EA580C", description: "ลากิจอื่นๆ (คิดเงิน)" },
  { code: "S11", color: "#EA580C", description: "ลาพักผ่อน (ไม่คิดเงิน)" },
  { code: "S12", color: "#EA580C", description: "ลาพักผ่อน (คิดเงิน)" },
  { code: "S13", color: "#EA580C", description: "ลาพักใหม่ (ไม่คิดเงิน)" },
  { code: "S14", color: "#EA580C", description: "ลาพักใหม่ (คิดเงิน)" },
  { code: "W", color: "#F59E0B", description: "เช็คอิน รอคีย์ยอด" },
  { code: "W1", color: "#F59E0B", description: "คีย์ยอดรอ Monitor ตรวจสอบ" },
  { code: "W2", color: "#2563EB", description: "รอทีม Data อนุมัติยอด" },
  { code: "WE", color: "#DC2626", description: "ยอดไม่ผ่าน รอแก้ไข" },
  { code: "P", color: "#16A34A", description: "ยอดได้รับการอนุมัติขึ้น Report" }
];

export const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      className={`rounded-lg shadow-xl bg-white flex flex-col h-[70vh] w-[800px] border border-gray-200 ${
        isClosing ? "pop-out-reverse" : "pop-out"
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">เลือกสถานะ</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {statusList.map((status) => (
            <button
              key={status.code}
              onClick={() => {
                onSelect(status);
                handleClose();
              }}
              className="flex flex-col h-[80px] justify-center items-center gap-2 p-3 rounded-lg hover:brightness-90 transition-all w-full cursor-pointer"
              style={{ 
                backgroundColor: `${status.color}`,
                color: '#ffffff',
                minWidth: '300px'
              }}
            >
              <span className="font-bold text-2xl leading-none">{status.code}</span>
              <span className="text-sm font-medium opacity-90">{status.description}</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export type { Status };
export { statusList };
