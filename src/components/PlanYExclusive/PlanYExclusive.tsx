"use client";
import { useState } from "react";
import { FaCheckSquare, FaUserCog, FaPlay, FaFileImport, FaFileExcel
    , FaDollarSign, FaHistory, FaSave, FaPlus, FaTrash, FaArrowCircleUp
    , FaArrowCircleDown, FaCopy, FaMapMarkerAlt } from "react-icons/fa";
import './css/PlanYExclusive.css';

export default function PlanYExclusive() {

    const [filters, setFilters] = useState({
        region: "Northern - ภาคเหนือ",
        province: "ทั้งหมด",
        account: "ทั้งหมด",
        store: "ทั้งหมด",
        supervisor: "ทั้งหมด",
        outsource: "ทั้งหมด",
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };
    return (
        <div className="p-2 min-h-screen">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold flex items-center text-black">
                    📌 Plan Y Exclusive
                </h1>
            </div>

            {/* Project Information */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6" id="project-info">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-black">📌 Project Information</h2>
                        <div className="flex items-center gap-4">
                            <p><strong className="text-black">Request:</strong> <span className="text-blue-500">ทดสอบขอ อนุมัติ</span></p>
                            <p className="flex items-center gap-2">
                                <strong className="text-black">Approve:</strong> 
                                <span className="text-green-500">ทดสอบ อนุมัติแผน</span>
                                <button className="text-green-500">
                                    <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"></path>
                                    </svg>
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Row 1: PR NO, AL NO, Quotation, Date, Work Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
                        <p><strong className="text-black">PR NO:</strong> <span className="text-blue-500 cursor-pointer">PR123456789</span></p>
                        <p><strong className="text-black">AL NO:</strong> <span className="text-green-500">AL123456789</span></p>
                        <p><strong className="text-black">Quotation:</strong> <span className="text-amber-500">QT2025022501</span></p>
                        <p><strong className="text-black">Date:</strong> <span className="text-blue-500">2025-01-18</span> <span className="text-black">to</span> <span className="text-blue-500">2025-02-28</span></p>
                        <p><strong className="text-black">Work Time:</strong> <span className="text-indigo-600">11:00 - 20:00</span></p>
                    </div>

                    {/* Row 2: Project, Job Type, Remark */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <p><strong className="text-black">Project:</strong> <span className="text-indigo-600">New Project</span></p>
                        <p><strong className="text-black">Job Type:</strong> <span className="text-indigo-600">2.1 PG/BA</span></p>
                        <p><strong className="text-black">Remark:</strong> <span className="text-indigo-600">ค่าจ้าง(รายวัน) งาน Sino ทำงาน 1 - 3 DEC 24 (ออกรอบ 31 Dec 24)</span></p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6" id="project-info-sum">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 text-xs w-full">
                    {[
                        { label: "จำนวนวันทำงาน", code: "Y", value: 100, color: "bg-gray-500" },
                        { label: "ทำงานเต็มวัน", code: "1", value: 20, color: "bg-green-500" },
                        { label: "ทำงานครึ่งวัน", code: "0.5", value: 12, color: "bg-green-500" },
                        { label: "ภายใน", code: "S", value: 8, color: "bg-red-500" },
                        { label: "เช็คอินเเล้วรอคีย์ยอด", code: "W", value: 8, color: "bg-orange-500" },
                        { label: "คีย์ยอดเเล้วรอ Monitor ตรวจสอบ", code: "W1", value: 8, color: "bg-yellow-500" },
                        { label: "รอ Data ตรวจสอบ", code: "W2", value: 8, color: "bg-blue-500" },
                        { label: "รอแก้ไขยอด", code: "WE", value: 8, color: "bg-fuchsia-500" },
                        { label: "อนุมัติส่งข้อมูลให้เเล้ว", code: "P", value: 8, color: "bg-emerald-500" },
                    ].map((item, index) => (
                        <div key={index} className={`flex flex-col items-center pl-4 border-l border-gray-300 first:border-l-0`}>
                            <span className="text-gray-600 text-[10px] mb-1">{item.label}</span>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700">{item.code}:</span>
                                <span className={`text-white font-medium px-3 py-0.5 rounded-md ${item.color}`}>
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg max-h-[600px] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-black">📅 Work Schedule [PlanY]</h4>
                <div className="flex gap-2">
                    {[
                        { icon: FaCheckSquare, text: "Request Approve", color: "bg-green-500" },
                        { icon: FaUserCog, text: "Position/KPI", color: "bg-fuchsia-500" },
                        { icon: FaPlay, text: "PlanY Start", color: "bg-violet-500" },
                        { icon: FaFileImport, text: "Import PlanY", color: "bg-sky-500" },
                        { icon: FaFileExcel, text: "Template", color: "bg-amber-500" },
                        { icon: FaDollarSign, text: "To Pay", color: "bg-yellow-500" },
                        { icon: FaHistory, text: "History", color: "bg-blue-500" },
                    ].map((btn, index) => (
                        <button key={index} className={`${btn.color} text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md`}>
                            <btn.icon className="w-4 h-4" /> {btn.text}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-7 gap-2 text-sm mb-4 items-end">
                {[
                    { label: "Region", key: "region", options: ["Northern - ภาคเหนือ", "Central - ภาคกลาง", "Northeastern - อีสาน", "Eastern - ภาคตะวันออก", "Southern - ภาคใต้", "Western - ภาคตะวันตก"] },
                    { label: "Province", key: "province", options: ["ทั้งหมด", "เชียงราย", "น่าน", "เชียงใหม่", "พิษณุโลก", "สุโขทัย"] },
                    { label: "Account", key: "account", options: ["ทั้งหมด", "LOTUS", "BIGC", "TOPS"] },
                    { label: "Store", key: "store", options: ["ทั้งหมด", "Store A", "Store B", "Store C"] },
                    { label: "Supervisor", key: "supervisor", options: ["ทั้งหมด", "EMP-001 John", "EMP-002 Jane", "EMP-003 Michael"] },
                    { label: "Outsource", key: "outsource", options: ["ทั้งหมด", "OUT-001 น้องหนึ่ง", "OUT-002 น้องสอง", "OUT-003 น้องสาม"] },
                ].map((filter, index) => (
                    <div key={index} className="min-w-[140px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">{filter.label}</label>
                        <select 
                            className="border border-gray-300 rounded p-2 w-full text-sm text-black"
                            value={filters[filter.key as keyof typeof filters]}
                            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        >
                            {filter.options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}

                {/* ✅ ทำให้ปุ่มอยู่ในแถวเดียวกัน */}
                <div className="flex items-center justify-end min-w-[140px]">
                    <button className="bg-slate-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaTrash className="w-4 h-4" /> Original PlanY
                    </button>
                </div>
            </div>


            {/* Table Container */}
            <div id="work-schedule-container" className="overflow-x-auto max-w-full">
                <table id="work-schedule" className="w-full border-collapse text-sm">
                    <thead className="sticky top-0 bg-gray-200 text-gray-900 z-10">
                        {/* Row 1: คอลัมน์หลัก */}
                        <tr>
                            {[
                                { label: "ID", minWidth: "50px", rowspan: 4, className: "id-column" },
                                { label: "Manage", minWidth: "100px", rowspan: 4, className: "manage-column" },
                                { label: "Job", minWidth: "130px", rowspan: 4 },
                                { label: "Region", minWidth: "150px", rowspan: 4, className: "region-column" },
                                { label: "Province", minWidth: "150px", rowspan: 4 },
                                { label: "Account", minWidth: "130px", rowspan: 4 },
                                { label: "Store", minWidth: "130px", rowspan: 4 },
                                { label: "Supervisor", minWidth: "130px", rowspan: 4 },
                                { label: "Outsource", minWidth: "130px", rowspan: 4 },
                                { label: "Position", minWidth: "120px", rowspan: 4 },
                                { label: "Amount", minWidth: "80px", rowspan: 4, className: "amount-column" },
                                { label: "Plan Days", minWidth: "120px", rowspan: 4 }
                            ].map((col, index) => (
                                <th key={index} className={`border p-2 border-gray-300 text-center ${col.className || ''}`} 
                                    style={{ minWidth: col.minWidth }} 
                                    rowSpan={col.rowspan}>
                                    {col.label}
                                </th>
                            ))}

                            {/* Header เดือน */}
                            <th className="border p-2 bg-gray-300 text-center border-gray-300" colSpan={14}>JAN</th>
                            <th className="border p-2 bg-gray-300 text-center border-gray-300" colSpan={28}>FEB</th>
                        </tr>

                        {/* Row 2: วันที่ของแต่ละเดือน */}
                        <tr>
                            {[...Array(14).keys()].map(i => (
                                <th key={i} className="border bg-gray-200 p-2 text-center border-gray-300">{18 + i}</th>
                            ))}
                            {[...Array(28).keys()].map(i => (
                                <th key={14 + i} className="border bg-gray-200 p-2 text-center border-gray-300">{i + 1}</th>
                            ))}
                        </tr>

                        {/* Row 3: วันของแต่ละเดือน */}
                        <tr>
                            {[
                                "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
                                "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
                                "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"
                            ].map((day, i) => (
                                <th key={i} className="border bg-gray-300 p-2 text-xs text-center border-gray-300">{day}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b">
                            <td className="border p-2 text-center">1</td>
                            <td className="border p-2 text-center">
                                <div className="flex justify-center gap-2">
                                    <button className="text-red-500"><FaTrash /></button>
                                    <button className="text-indigo-500"><FaArrowCircleUp /></button>
                                    <button className="text-indigo-500"><FaArrowCircleDown /></button>
                                    <button className="text-sky-500"><FaCopy /></button>
                                    <button className="text-green-500"><FaMapMarkerAlt /></button>
                                </div>
                            </td>
                            <td className="border p-2 text-center">
                                <button 
                                    className="bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center justify-center gap-1 w-full shadow-md"
                                    onClick={() => console.log("รอส่งใบ Job")}
                                >
                                    📄 รอส่งใบ Job
                                </button>
                            </td>
                            {Array(9).fill("").map((_, i) => (
                                <td key={i} className="border p-2"><input type="text" className="w-full border p-1" /></td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white text-xs px-3 py-2 rounded flex gap-1 shadow-md">
                    <FaPlus className="w-4 h-4" /> Add Row
                </button>
                <button className="bg-green-500 text-white text-xs px-3 py-2 rounded flex gap-1 shadow-md">
                    <FaSave className="w-4 h-4" /> Save
                </button>
            </div>
        </div>


        </div>
    );
}
