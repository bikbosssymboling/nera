import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaTimes, FaPlusCircle, FaSave, FaTrash } from "react-icons/fa";
import {
    roleINSERT
} from "@/services/callAPI/ManageEmployee/apiEmployeeManageService";
// ✅ เพิ่ม type ให้ props
interface EmployeeRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmployeeRoleModal: React.FC<EmployeeRoleModalProps> = ({ isOpen, onClose }) => {
    const [Roles, setRoles] = useState([
        { department: "Accounting&Finance", role: "Account Executive" },
        { department: "Accounting&Finance", role: "Account Management Executive" },
        { department: "Accounting&Finance", role: "Account Payble Officer" },
        { department: "B&O Support", role: "B&O Support" },
        { department: "B&O Support", role: "B&O Manager" },
        { department: "Business Development", role: "BD Executive" },
        { department: "Business Development", role: "BD Manager" },
        { department: "Business Development", role: "BD Director" },
        { department: "Operation (BU1)", role: "Operation Executive BU1" },
        { department: "Operation (BU1)", role: "Field Sales Manager" },
        { department: "Operation (BU2)", role: "Operation Executive BU2" },
        { department: "Operation (BU3)", role: "Operation Executive BU3" },
        { department: "Procurement", role: "Procurement Officer" },
        { department: "Procurement", role: "Procurement Manager" },
        { department: "Human Resources & Administration", role: "Recruitment Officer" },
        { department: "Human Resources & Administration", role: "HR Payroll" },
        { department: "Data & IT Center", role: "IT Support & Infrastructure" },
        { department: "Data & IT Center", role: "Data & Prompt Analyst" },
        { department: "Graphic Design", role: "Graphic Designer" },
        { department: "Graphic Design", role: "Graphic Manager" },
        { department: "Sales & Distribution", role: "Sale Coordinator" },
        { department: "Sales & Distribution", role: "Field Sales and Marketing Operation Executive" },
        { department: "Warehouse", role: "Warehouse Admin Officer" },
        { department: "Warehouse", role: "Warehouse Officer" },
        { department: "Executive", role: "Chief Executive Officer" },
        { department: "Executive", role: "Deputy Chief Officer" },
        { department: "Finance", role: "Finance Officer" },
        { department: "Finance", role: "Senior Accounting Manager" },
        { department: "Legal", role: "Legal Relation Officer" },
        { department: "Messenger", role: "Messenger" },
        { department: "Project Management", role: "Project Coordinator" },
        { department: "Project Management", role: "Assistant Project Manager" },
        { department: "Training", role: "Training Officer" },
        { department: "Support", role: "Support Recruitment Outsources" },
        { department: "Monitor", role: "Monitor" },
    ]);
    
    // ✅ เพิ่ม state รับค่าจาก input
    const [newDepartment, setNewDepartment] = useState("");
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body); // ✅ ใช้ document.body แทน #__next
        }
    }, []);

    // ✅ ฟังก์ชันเพิ่มตำแหน่ง
    const handleAddRole = async () => {
        if (newDepartment === "" || newRole.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                text: "เลือกแผนก และ ใส่ชื่อตำแหน่งใหม่ก่อนกดเพิ่ม",
            });
            return;
        } else {
            try {
                const data = await roleINSERT(newDepartment, newRole); // ✅ ใช้ await ได้เพราะ async แล้ว
                if (data.Status == "Success") {
                    Swal.fire({
                        icon: "success",
                        title: "บันทีกข้อมูลสำเร็จ",
                        text: "เพิ่มตำแหน่งเรียบร้อย"
                    });
                    setNewDepartment("");
                    setNewRole("");
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
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="rounded-lg p-6 mx-auto relative z-50"
            overlayClassName="fixed inset-0 [background:var(--swal2-backdrop)] flex items-center justify-center z-40"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-[980px]">
                <div className="flex justify-center">
                    <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                    🛠️ จัดการตำแหน่ง
                    </h3>
                </div>
                <div className="mt-4 space-y-2">
                    {/* ✅ ส่วนเพิ่มแผนก */}
                    <div className="flex gap-2 mb-3">
                        {/* ✅ Select เลือกแผนก */}
                        <select
                            id="newDepartment"
                            className="border p-2 w-1/3"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                        >
                            <option value="">เลือกแผนก</option>
                            <option value="Accounting&Finance">Accounting & Finance</option>
                            <option value="B&O Support">B&O Support</option>
                        </select>

                        <input
                            type="text"
                            id="newRole"
                            className="border p-2 w-full"
                            placeholder="➕ เพิ่มชื่อตำแหน่งใหม่..."
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        />

                        {/* ✅ กดแล้วยิง handleAddRole */}
                        <button
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                            onClick={handleAddRole}
                        >
                            <FaPlusCircle />
                        </button>
                    </div>


                    {/* ✅ ตารางแผนก */}
                    <div className="overflow-auto max-h-[400px] border border-gray-300 rounded">
                        <table className="w-full border-collapse text-sm">
                            <thead className="sticky top-0 bg-gray-200 z-10">
                            <tr>
                                <th className="border border-gray-300 p-2">ลำดับ</th>
                                <th className="border border-gray-300 p-2">ชื่อแผนก</th>
                                <th className="border border-gray-300 p-2">ชื่อตำแหน่ง</th>
                                <th className="border border-gray-300 p-2">จัดการ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Roles.map((dept, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        className="border p-1 w-full text-sm !bg-gray-100"
                                        value={dept.department}
                                        disabled
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        className="border p-1 w-full text-sm"
                                        value={dept.role}
                                        onChange={(e) => {
                                        const updatedRoles = [...Roles];
                                        updatedRoles[index].role = e.target.value;
                                        setRoles(updatedRoles);
                                        }}
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
                                        onClick={() => {
                                            const updatedRoles = Roles.filter((_, i) => i !== index);
                                            setRoles(updatedRoles);
                                        }}
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

export default EmployeeRoleModal;
