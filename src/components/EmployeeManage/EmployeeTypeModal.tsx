import React, { useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa"; // ✅ ใช้ react-icons
// ✅ เพิ่ม interface ที่ถูกต้อง
interface EmployeeTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: string) => void;
}

const EmployeeTypeModal: React.FC<EmployeeTypeModalProps> = ({ isOpen, onClose, onSelect }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body); // ✅ ใช้ document.body แทน #__next
        }
    }, []);

    const employeeTypes = [
        { id: "O1", label: "O1 - พนักงานประจำ MCA", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
        { id: "O2", label: "O2 - พนักงาน Outsource", color: "bg-green-100 text-green-700 hover:bg-green-200" },
        { id: "O3", label: "O3 - พนักงาน Contract", color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" },
        { id: "Key Account", label: "O1 - พนักงาน Key Account", color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="rounded-lg p-6 w-[350px] mx-auto relative z-50"
            overlayClassName="fixed inset-0 [background:var(--swal2-backdrop)] flex items-center justify-center z-40"
        >

            <div className="bg-white rounded-lg shadow-lg p-6 w-[350px]">
                <h2 className="text-lg font-bold text-center text-gray-900">เลือกประเภทพนักงานที่ต้องการเพิ่ม</h2>
                <div className="mt-4 space-y-2">
                    {employeeTypes.map((type) => (
                        <button
                            key={type.id}
                            className={`${type.color} px-4 py-2 rounded-md w-full shadow-sm transition font-medium text-left flex items-center cursor-pointer`}
                            onClick={() => onSelect(type.id)}
                        >
                            <span className="mr-2">●</span> {type.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-500 text-white px-3 py-2 rounded-md shadow-sm hover:bg-gray-600 transition w-24 mx-auto block text-center text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                    <FaTimes className="text-lg" />
                    <span>ยกเลิก</span>
                </button>

            </div>
        </Modal>
    );
};

export default EmployeeTypeModal;
