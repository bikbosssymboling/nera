"use client";
import { useState } from "react";
import { FaBriefcase, FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import KPIModal from "./PlanYSetMasterKPIModalChange";
import { KPIDelete } from "../../../services/callAPI/PlanYMasterSetup/KPI/apiKPIService";

interface KPI {
    KPIID: number;
    KPISetName: string;
    TotalKPIs: string;
}

export default function PlanYSetMasterKPI() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editKPI, setEditKPI] = useState<KPI | null>(null); 

    const kpi: KPI[] = [
        { KPIID: 1, KPISetName: "รายการ ตัวชี้วัดความสำเร็จ(Key Performance Indicators)", TotalKPIs: "11 KPIs"},
        { KPIID: 2, KPISetName: "รายการ ตัวชี้วัดความสำเร็จ (Key Performance Indicators) MER SHARE", TotalKPIs: "13 KPIs" },
        { KPIID: 3, KPISetName: "รายการ ตัวชี้วัดความสำเร็จ (Key Performance Indicators) CVS Share Service", TotalKPIs: "15 KPIs" },
    ];
    
    const filteredKPIs = kpi.filter(kpi =>
        kpi.KPISetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kpi.TotalKPIs.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    // ✅ ฟังก์ชันเปิด Modal สำหรับ "เพิ่ม" หรือ "แก้ไข"
    const handleEdit = (kpi?: KPI) => {
        setEditKPI(kpi || null);
        setIsModalOpen(true);
    };

    // ✅ ฟังก์ชันลบข้อมูลอaอกจาก state
    const handleDelete = async (kpiSetName: string) => {
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
                    // ✅ เรียก API ลบข้อมูล โดยส่ง `KPISetName`
                    const data = await KPIDelete(kpiSetName);

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
                <FaBriefcase className="mr-2" /> KPI Management

            </h2>

            {/* Search and Add Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="ค้นหา KPI Set..."
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
                    <FaPlus className="mr-1 inline-block" /> Add KPI Set
                </button>
            </div>

            {/* KPI Table */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
                        <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
                            <tr className="bg-gray-200 text-xs">
                                <th className="border border-gray-300 p-2">#</th>
                                <th className="border border-gray-300 p-2">KPI Set Name</th>
                                <th className="border border-gray-300 p-2">Total KPIs</th>
                                <th className="border border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredKPIs.map((kpi, index) => (
                                <tr key={kpi.KPIID} className="text-xs text-gray-900">
                                    <td className="border p-2 border-gray-300 text-center">{index + 1}</td>
                                    <td className="border p-2 border-gray-300">{kpi.KPISetName}</td>
                                    <td className="border p-2 border-gray-300">{kpi.TotalKPIs}</td>
                                    <td className="border p-2 border-gray-300">
                                        <div className="flex justify-center items-center space-x-1">
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleEdit(kpi)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleDelete(kpi.KPISetName)}
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
            <KPIModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                kpi={editKPI} 
                mode={editKPI ? "edit" : "add"} 
                />
            </div>
    );
}

