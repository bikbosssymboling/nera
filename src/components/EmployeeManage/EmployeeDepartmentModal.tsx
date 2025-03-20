import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaTimes, FaPlusCircle, FaSave, FaTrash } from "react-icons/fa";
import {
    departmentINSERT
} from "@/services/callAPI/ManageEmployee/apiEmployeeManageService";

interface EmployeeDepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmployeeDepartmentModal: React.FC<EmployeeDepartmentModalProps> = ({ isOpen, onClose }) => {
    const [departments, setDepartments] = useState([
        { name: "Account Executive (BU1)" },
        { name: "Accounting & Finance" },
        { name: "B&O Support" },
        { name: "Business Development" },
        { name: "Data & IT Center" },
        { name: "Executive" },
        { name: "Graphic Design" },
        { name: "Human Resources & Administration" },
        { name: "Monitor" },
        { name: "Operation (BU1)" },
        { name: "Operation (BU2)" },
        { name: "Operation (BU3)" },
        { name: "Procurement" },
        { name: "Sale & Distribution Service" },
        { name: "Warehouse" },
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    }, []);

    const [newDepartmentName, setNewDepartmentName] = useState("");
    const [error, setError] = useState(""); // ✅ State สำหรับ error

    const handleAddDepartment = async () => {
        if (newDepartmentName.trim() === "") {
            setError("กรุณากรอกชื่อแผนก");
            return;
        } else {
            try {
                const data = await departmentINSERT(newDepartmentName); // ✅ ใช้ await ได้เพราะ async แล้ว
                if (data.Status == "Success") {
                    Swal.fire({
                        icon: "success",
                        title: "บันทีกข้อมูลสำเร็จ",
                        text: "เพิ่มแผนกเรียบร้อย"
                    });
                    setDepartments([...departments, { name: newDepartmentName }]);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "ไม่สามารถค้นหาข้อมูลได้",
                        text: data.error_message || ""
                    });
                }
            } catch (error: unknown) {
                let errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้<br>";
                if (error instanceof Error) {
                    errorMessage += `<span class="text-red-500">${error.message}</span>`;
                }
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    html: errorMessage
                });
            }
        }
        setError("");
    };
    


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="rounded-lg p-6 mx-auto relative z-50"
            overlayClassName="fixed inset-0 [background:var(--swal2-backdrop)] flex items-center justify-center z-40"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-[550px]">
                <div className="flex justify-center">
                    <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                        🛠️ จัดการแผนก
                    </h3>
                </div>
                <div className="mt-4 space-y-2">
                    {/* ✅ ส่วนเพิ่มแผนก */}
                    <div className="flex gap-2 mt-4 mb-3">
                    <input
                            type="text"
                            className={`border p-2 w-full text-sm ${error ? 'border-red-500' : ''}`}
                            placeholder="➕ เพิ่มชื่อแผนกใหม่..."
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                        />
                        
                        <button
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                            onClick={handleAddDepartment}
                        >
                            <FaPlusCircle />
                        </button>
                        
                    </div>
                    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}

                    {/* ✅ ตารางแผนก */}
                    <div className="overflow-auto max-h-[400px] border border-gray-300 rounded">
                        <table className="w-full border-collapse text-sm">
                            <thead className="sticky top-0 bg-gray-200 z-10">
                                <tr>
                                    <th className="border border-gray-300 p-2">ลำดับ</th>
                                    <th className="border border-gray-300 p-2">ชื่อแผนก</th>
                                    <th className="border border-gray-300 p-2">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                className="border p-1 w-full text-sm"
                                                value={dept.name}
                                                readOnly
                                            />
                                        </td>
                                        <td className="border p-2 border-gray-300 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    className="bg-green-600 text-white text-xs px-3 py-2 rounded hover:bg-green-700"
                                                >
                                                    <FaSave />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-red-500 text-white text-xs px-3 py-2 rounded hover:bg-red-600"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

export default EmployeeDepartmentModal;
