"use client";
import { useState } from "react";
import { FaBriefcase, FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import KPIModal from "./PlanYSetMasterKPIModalChange";
import { KPIDelete } from "../../../services/callAPI/PlanYMasterSetup/KPI/apiKPIService";

// 🔧 ปรับ Interface ให้รองรับ `id: number` และ `KPICode`
interface KPI {
    id: number;
    KPISetName: string;
    TotalKPIs: string;
}

export default function PlanYSetMasterKPI() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editKPI, setEditKPI] = useState<KPI | null>(null); // ✅ กำหนด Type

    const KPIs: KPI[] = [
        { id: 1, KPI Set Namee: "TW01", name: "Thai Watsadu", nameEng: "Thai Watsadu" },
        { id: 2, KPI Set Name: "KIS002", name: "KIS - UPC", nameEng: "KIS - UPC" },
        { id: 3, KPI Set Name: "KIS001", name: "KIS - BKK", nameEng: "KIS - BKK" },
    ];
    
    const filteredKPIs = KPIs.filter(KPI =>
        KPI.KPICode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        KPI.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        KPI.nameEng.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    // ✅ ฟังก์ชันเปิด Modal สำหรับ "เพิ่ม" หรือ "แก้ไข"
    const handleEdit = (KPI?: KPI) => {
        setEditKPI(KPI || null);
        setIsModalOpen(true);
    };

    // ✅ ฟังก์ชันลบข้อมูลออกจาก state
    const handleDelete = async (KPICode: string) => {
        Swal.fire({
            icon: "warning",
            text: "คุณต้องการลบ KPI นี้ใช่หรือไม่?",
            showCancelButton: true,
            confirmButtonColor: "#007BFF",
            cancelButtonColor: "#6C757D",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // ✅ เรียก API ลบข้อมูล โดยส่ง `KPICode`
                    const data = await KPIDelete(KPICode);

                    // ✅ เช็คสถานะการลบ
                    if (data.status === "Success") {
                        Swal.fire({
                            icon: "success",
                            title: "ลบข้อมูลเรียบร้อย",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "ไม่สามารถลบข้อมูลได้",
                            text: data.error_message || "เกิดข้อผิดพลาด",
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
                        html: errorMessage,
                    });
                }
            }
        });
    };

    return (
        <div className="p-2">
            {/* Header */}
            <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
                <FaBriefcase className="mr-2" /> Setup Master KPI
            </h2>

            {/* Search and Add Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="ค้นหา KPI..."
                        className="border p-2 rounded-md w-72"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaSearch /> Search
                    </button>
                </div>
                <button
                    className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    onClick={() => handleEdit()} // ✅ เปิด Modal โดยไม่มีข้อมูล (เพิ่มใหม่)
                >
                    <FaPlus className="mr-1 inline-block" /> Add KPI
                </button>
            </div>

            {/* KPI Table */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
                        <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
                            <tr className="bg-gray-200 text-xs">
                                <th className="border border-gray-300 p-2">#</th>
                                <th className="border border-gray-300 p-2">KPI Code</th>
                                <th className="border border-gray-300 p-2">KPI Name</th>
                                <th className="border border-gray-300 p-2">KPI Name (English)</th>
                                <th className="border border-gray-300 p-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredKPIs.map((KPI, index) => (
                                <tr key={KPI.id} className="text-xs text-gray-900">
                                    <td className="border p-2 border-gray-300 text-center">{index + 1}</td>
                                    <td className="border p-2 border-gray-300">{KPI.KPICode}</td>
                                    <td className="border p-2 border-gray-300">{KPI.name}</td>
                                    <td className="border p-2 border-gray-300">{KPI.nameEng}</td>
                                    <td className="border p-2 border-gray-300">
                                        <div className="flex justify-center items-center space-x-1">
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleEdit(KPI)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleDelete(KPI.KPICode)}
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


            {/* ✅ Modal */}
            <KPIModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} KPI={editKPI} />
        </div>
    );
}
