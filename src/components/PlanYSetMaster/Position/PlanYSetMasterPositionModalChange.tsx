"use client";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaBriefcase, FaSave, FaTimes } from "react-icons/fa";
import { PositionAdd, PositionEdit, PositionList } from "../../../services/callAPI/PlanYMasterSetup/Position/apiPositionService";
import Swal from "sweetalert2";

interface Position {
  positionID: number;
  positionCode: string;
  positionName: string;
  positionDescription: string;
  createdBy?: string;
  updatedBy?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  position: Position | null;
  getListData: (showLoading: boolean) => void;
}
const PositionModal: React.FC<Props> = ({
    isOpen,
    onClose,
    position,
    getListData,
  }) => {

// export default function PositionModal({ isOpen, onClose, position, getListData }: Props) {
//   const [form, setForm] = useState({ positionCode: "", positionName: "", positionDescription: "" });
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<{ positionCode?: string; positionName?: string; positionDescription?: string }>(
        {}
    );

    const [formData, setFormData] = useState<Position>({
      positionID: 0,
      positionCode: "",
      positionName: "",
      positionDescription: "",
  });
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
        Modal.setAppElement(document.body);
    }
}, []);
useEffect(() => {
  if (position) {
      setFormData({
          positionID: position.positionID,
          positionCode: position.positionCode,
          positionName: position.positionName,
          positionDescription: position.positionDescription,
          createdBy: position.createdBy
      });
  } else {
      setFormData({ positionID: 0, positionCode: "", positionName: "", positionDescription: "" });
  }
}, [position]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const handleSave = async () => {
    let newErrors: { positionCode?: string; positionName?: string; positionDescription?: string } = {};

    if (!formData.positionCode.trim()) newErrors.positionCode = "กรุณากรอก Position Code";
    if (!formData.positionName.trim()) newErrors.positionName = "กรุณากรอก Position Name";
    if (!formData.positionDescription.trim()) newErrors.positionDescription = "กรุณากรอก Description";


    // ✅ ถ้ามี Error ให้หยุดการทำงาน
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    try {

        let response;
        if (position) {
            Swal.fire({
                title: "กำลังแก้ไขข้อมูล...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            response = await PositionEdit(
                formData.positionID,
                formData.positionCode,
                formData.positionName,
                formData.positionDescription
            );
        } else {
            Swal.fire({
                title: "กำลังเพิ่มข้อมูล...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            response = await PositionAdd(
                formData.positionCode,
                formData.positionName,
                formData.positionDescription,
            );
        }

        if (response.status === "Success") {
            Swal.fire({
                icon: "success",
                title: position ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย",
            });
            getListData(false); // ✅ โหลดข้อมูลใหม่โดยไม่แสดง loading
            handleClearError(); // ✅ ล้าง Error หลังจากบันทึกข้อมูลสำเร็จ
            handleClearForm(); // ✅ ล้างค่าในฟอร์ม
            onClose(); // ปิด Modal
        } else {
            Swal.fire({
                icon: "error",
                title: "ไม่สามารถบันทึกข้อมูลได้",
                text: response.error_message || "เกิดข้อผิดพลาด",
            });
        }
      } catch (error: unknown) {
        let errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้<br>";
        if (error instanceof Error) {
            errorMessage += `<span class="text-red-500">${error.message}</span>`; // ✅ ใช้ `class` แทน `className`
        }
        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            html: errorMessage, // ✅ ใช้ `html` เพื่อให้ตีความเป็น HTML ได้
        });
    }
};

const handleClearError = () => {
  setErrors({ positionCode: "", positionName: "", positionDescription: "" });
}
const handleClearForm = () => {
  setFormData({ positionID: 0, positionCode: "", positionName: "", positionDescription: "" });
}

if (!mounted) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg shadow-lg p-6 w-[400px] mx-auto transition-all duration-300 transform scale-100 opacity-100"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
    >
      {/* Header */}
      <div className="border-b pb-3 flex justify-center">
                <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                    <FaBriefcase className="mr-2 text-gray-600" />
                    {position ? "Edit Position" : "Add Position"}
                </h3>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[70vh] p-4 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Position Code
                    </label>
                    <input
                        type="text"
                        name="positionCode"
                        className={`border p-2 rounded w-full ${errors.positionCode ? "border-red-500" : ""
                            }`}
                        value={formData.positionCode}
                        onChange={(e) => {
                            setFormData({ ...formData, positionCode: e.target.value });

                            // ✅ ล้าง Error เมื่อผู้ใช้เริ่มพิมพ์
                            setErrors({ ...errors, positionCode: "" });
                        }}
                    />
                    {errors.positionCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.positionCode}</p>
                    )}
                </div>

                {/* Position Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Position Name
                    </label>
                    <input
                        type="text"
                        name="positionName"
                        className={`border p-2 rounded w-full ${errors.positionName ? "border-red-500" : ""
                            }`}
                        value={formData.positionName}
                        onChange={(e) => {
                            setFormData({ ...formData, positionName: e.target.value });
                            setErrors({ ...errors, positionName: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.positionName && (
                        <p className="text-red-500 text-xs mt-1">{errors.positionName}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                    Description
                    </label>
                    <input
                        type="text"
                        name="positionDescription"
                        className="border p-2 rounded w-full"
                        value={formData.positionDescription}
                        onChange={(e) => {
                          setFormData({ ...formData, positionDescription: e.target.value });

                          // ✅ ล้าง Error เมื่อผู้ใช้เริ่มพิมพ์
                          setErrors({ ...errors, positionDescription: "" });
                      }}
                  />
                    {errors.positionDescription && (
                        <p className="text-red-500 text-xs mt-1">{errors.positionDescription}</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t gap-2 pt-3 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2"
                >
                    <FaSave className="text-lg" /> Save
                </button>
                <button
                    onClick={() => {
                        handleClearError();
                        onClose();
                    }}
                    className="bg-gray-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2"
                >
                    <FaTimes className="text-lg" /> Cancel
                </button>
            </div>
        </Modal>
    );
};

export default PositionModal;
      

