"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaFileExcel, FaWrench, FaUsers, FaIdCard
    ,FaSearch
 } from "react-icons/fa";
import * as XLSX from "xlsx";
import EmployeeTypeModal from "./EmployeeTypeModal";
import EmployeeChangeModal from "./EmployeeChangeModal";
import EmployeeDepartmentModal from "./EmployeeDepartmentModal";
import EmployeeRoleModal from "./EmployeeRoleModal";
import {useEmployeeFilterSearchState, useMasterDepartmentGETState, useMasterRoleGETState} from "./Hook/EmployeeManageHook";
import type { DepartmentMasterData, RoleMasterData } from "../../types/EmployeeManage/Types"; // ✅ Import type จาก Hook

const fixDataEmployee = [
    {"employeeID": 1, "employeeTypeName": "O1 - พนักงานประจำ MCA", "employeeCode": "100001", "fullName": "TEST1 TEST1", "departmentName": "Department Test 1", "roleName": "Role Test 1", "employeeStatus": "0", "personalCardExpired": "15/08/2026", "blackListDate": ""},
    {"employeeID": 2, "employeeTypeName": "O2 - พนักงาน Outsource", "employeeCode": "100002", "fullName": "TEST2 TEST2", "departmentName": "Department Test 2", "roleName": "Role Test 2", "employeeStatus": "0", "personalCardExpired": "", "blackListDate": "13/03/2025"},
    {"employeeID": 3, "employeeTypeName": "O3 - พนักงาน Contract", "employeeCode": "100003", "fullName": "TEST3 TEST3", "departmentName": "Department Test 3", "roleName": "Role Test 3", "employeeStatus": "1", "personalCardExpired": "20/11/2025", "blackListDate": ""},
    {"employeeID": 4, "employeeTypeName": "O1 - พนักงาน Key Account", "employeeCode": "100004", "fullName": "TEST4 TEST4", "departmentName": "Department Test 4", "roleName": "Role Test 4", "employeeStatus": "3", "personalCardExpired": "", "blackListDate": "13/03/2025"},
    {"employeeID": 5, "employeeTypeName": "O1 - พนักงานประจำ MCA", "employeeCode": "100005", "fullName": "TEST5 TEST5", "departmentName": "Department Test 5", "roleName": "Role Test 5", "employeeStatus": "2", "personalCardExpired": "01/07/2026", "blackListDate": ""},
    {"employeeID": 6, "employeeTypeName": "O2 - พนักงาน Outsource", "employeeCode": "100006", "fullName": "TEST6 TEST6", "departmentName": "Department Test 6", "roleName": "Role Test 6", "employeeStatus": "4", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 7, "employeeTypeName": "O3 - พนักงาน Contract", "employeeCode": "100007", "fullName": "TEST7 TEST7", "departmentName": "Department Test 7", "roleName": "Role Test 7", "employeeStatus": "0", "personalCardExpired": "05/09/2024", "blackListDate": "13/03/2025"},
    {"employeeID": 8, "employeeTypeName": "O1 - พนักงาน Key Account", "employeeCode": "100008", "fullName": "TEST8 TEST8", "departmentName": "Department Test 8", "roleName": "Role Test 8", "employeeStatus": "1", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 9, "employeeTypeName": "O1 - พนักงานประจำ MCA", "employeeCode": "100009", "fullName": "TEST9 TEST9", "departmentName": "Department Test 9", "roleName": "Role Test 9", "employeeStatus": "3", "personalCardExpired": "30/12/2025", "blackListDate": ""},
    {"employeeID": 10, "employeeTypeName": "O2 - พนักงาน Outsource", "employeeCode": "100010", "fullName": "TEST10 TEST10", "departmentName": "Department Test 10", "roleName": "Role Test 10", "employeeStatus": "2", "personalCardExpired": "", "blackListDate": "13/03/2025"},
    {"employeeID": 11, "employeeTypeName": "O3 - พนักงาน Contract", "employeeCode": "100011", "fullName": "TEST11 TEST11", "departmentName": "Department Test 11", "roleName": "Role Test 11", "employeeStatus": "4", "personalCardExpired": "22/06/2026", "blackListDate": ""},
    {"employeeID": 12, "employeeTypeName": "O1 - พนักงาน Key Account", "employeeCode": "100012", "fullName": "TEST12 TEST12", "departmentName": "Department Test 12", "roleName": "Role Test 12", "employeeStatus": "0", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 13, "employeeTypeName": "O1 - พนักงานประจำ MCA", "employeeCode": "100013", "fullName": "TEST13 TEST13", "departmentName": "Department Test 13", "roleName": "Role Test 13", "employeeStatus": "1", "personalCardExpired": "", "blackListDate": "13/03/2025"},
    {"employeeID": 14, "employeeTypeName": "O2 - พนักงาน Outsource", "employeeCode": "100014", "fullName": "TEST14 TEST14", "departmentName": "Department Test 14", "roleName": "Role Test 14", "employeeStatus": "3", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 15, "employeeTypeName": "O3 - พนักงาน Contract", "employeeCode": "100015", "fullName": "TEST15 TEST15", "departmentName": "Department Test 15", "roleName": "Role Test 15", "employeeStatus": "2", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 16, "employeeTypeName": "O1 - พนักงาน Key Account", "employeeCode": "100016", "fullName": "TEST16 TEST16", "departmentName": "Department Test 16", "roleName": "Role Test 16", "employeeStatus": "4", "personalCardExpired": "", "blackListDate": "13/03/2025"},
    {"employeeID": 17, "employeeTypeName": "O1 - พนักงานประจำ MCA", "employeeCode": "100017", "fullName": "TEST17 TEST17", "departmentName": "Department Test 17", "roleName": "Role Test 17", "employeeStatus": "0", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 18, "employeeTypeName": "O2 - พนักงาน Outsource", "employeeCode": "100018", "fullName": "TEST18 TEST18", "departmentName": "Department Test 18", "roleName": "Role Test 18", "employeeStatus": "1", "personalCardExpired": "", "blackListDate": ""},
    {"employeeID": 19, "employeeTypeName": "O3 - พนักงาน Contract", "employeeCode": "100019", "fullName": "TEST19 TEST19", "departmentName": "Department Test 19", "roleName": "Role Test 19", "employeeStatus": "3", "personalCardExpired": "", "blackListDate": "13/03/2025"},
    {"employeeID": 20, "employeeTypeName": "O1 - พนักงาน Key Account", "employeeCode": "100020", "fullName": "TEST20 TEST20", "departmentName": "Department Test 20", "roleName": "Role Test 20", "employeeStatus": "2", "personalCardExpired": "", "blackListDate": ""}
];

export default function EmployeeManage() {
    const { departmentMasterData } = useMasterDepartmentGETState();
    const [department, setDepartment] = useState<DepartmentMasterData[]>([]);
    const { roleMasterData } = useMasterRoleGETState();
    const [role, setRole] = useState<RoleMasterData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const hookuseEmployeeFilterSearchState = useEmployeeFilterSearchState();
    const [employees, setEmployees] = useState(hookuseEmployeeFilterSearchState.employees);

    // ✅ State สำหรับเปิด/ปิด Modal
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
    const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
    const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(""); // ✅ เก็บประเภทพนักงานที่เลือก

    useEffect(() => {
        setDepartment(departmentMasterData);
    }, [departmentMasterData]);


    useEffect(() => {
        setRole(roleMasterData);
    }, [roleMasterData]);
    
    const filteredData = fixDataEmployee.filter((emp) =>
        Object.values(emp).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // ✅ Handle State สำหรับค้นหาข้อมูลพนักงาน
    const handleSearchEmployeeALL = async () => {
        const data = await hookuseEmployeeFilterSearchState.handleSearchEmployeeALL();
        if (data) {
            setEmployees(data);
        }
    }; 
    // ✅ Handle State สำหรับเปิด Modal ตรวจสอบข้อมูลพนักงาน
    const handleSelectTypeEmployeeForAdd = (type: string) => {
        setSelectedType(type); // บันทึกประเภทพนักงาน
        setIsTypeModalOpen(false); // ปิด EmployeeTypeModal
        setTimeout(() => setIsChangeModalOpen(true), 300); // ✅ เปิด EmployeeChangeModal
    };
    // ✅ Handle State สำหรับเปิด Modal Deparetment
    const handleDepartment = () => {
        setTimeout(() => setIsDepartmentModalOpen(true), 300); // ✅ เปิด DepartmentModal
    };
    // ✅ Handle State สำหรับเปิด Modal Role
    const handleRole = () => {
        setTimeout(() => setIsRoleModalOpen(true), 300); // ✅ เปิด RoleModal
    };

    
    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(fixDataEmployee);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "EmployeeData");
    
        // ✅ สร้างวันที่แบบ YYYYMMDD_HHMMSS
        const now = new Date();
        const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
            .toString()
            .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now
            .getHours()
            .toString()
            .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
            .getSeconds()
            .toString()
            .padStart(2, '0')}`;
    
        // ✅ ใส่ชื่อไฟล์พร้อมวันที่
        XLSX.writeFile(workbook, `EmployeeData_${formattedDate}.xlsx`);
    };
    
    return (
        <div className="p-2">
            {/* Header */}
            <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
                <FaUsers className="mr-2" /> จัดการข้อมูลพนักงาน
            </h2>

            {/* 🔹 EmployeeTypeModal (เลือกประเภทพนักงาน) */}
            <EmployeeTypeModal
                isOpen={isTypeModalOpen}
                onClose={() => setIsTypeModalOpen(false)}
                onSelect={handleSelectTypeEmployeeForAdd}
            />

            {/* 🔹 EmployeeChangeModal (หน้าฟอร์ม) */}
            <EmployeeChangeModal
                isOpen={isChangeModalOpen}
                onClose={() => setIsChangeModalOpen(false)}
                employeeType={selectedType} // ✅ ส่งประเภทพนักงานที่เลือกไป
            />

            {/* 🔹 EmployeeDepartmentModal (หน้าฟอร์ม) */}
            <EmployeeDepartmentModal
                isOpen={isDepartmentModalOpen} // ✅ ส่ง state ให้ตรง
                onClose={() => setIsDepartmentModalOpen(false)} // ✅ onClose ต้องปิด modal
            />

            {/* 🔹 EmployeeRoleModal (หน้าฟอร์ม) */}
            <EmployeeRoleModal
                isOpen={isRoleModalOpen} // ✅ ส่ง state ให้ตรง
                onClose={() => setIsRoleModalOpen(false)} // ✅ onClose ต้องปิด modal
            />

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center mb-4">
                <div className="flex flex-wrap gap-4 w-full">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-900 mb-1">ประเภทพนักงาน:</label>
                        <select
                            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white h-9"
                            value={hookuseEmployeeFilterSearchState.filterEmployeeType} // ✅ ดึงค่าจาก filters
                            onChange={(e) => hookuseEmployeeFilterSearchState.setFilterEmployeeType(e.target.value)} // ✅ ใช้ฟังก์ชันจาก filters
                        >
                            <option value="">ทั้งหมด</option>
                            <option value="O1">O1 - พนักงานประจำ MCA</option>
                            <option value="O2">O2 - พนักงาน Outsource</option>
                            <option value="O3">O3 - พนักงาน Contract</option>
                            <option value="Key Account">O1 - พนักงาน Key Account</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-900 mb-1">สถานะ:</label>
                        <select
                            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white h-9"
                            value={hookuseEmployeeFilterSearchState.filterEmployeeStatus} // ✅ ใช้ filters
                            onChange={(e) => hookuseEmployeeFilterSearchState.setFilterEmployeeStatus(e.target.value)}
                        >
                            <option value="">ทั้งหมด</option>
                            <option value="0">⏳ รอตรวจสอบ</option>
                            <option value="1">✅ ผ่านการตรวจสอบ</option>
                            <option value="2">⚠️ ไม่ผ่านการตรวจสอบ</option>
                            <option value="3">❌ ยกเลิกสิทธิ์</option>
                            <option value="4">👋 ลาออก</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-900 mb-1">Blacklist:</label>
                        <select
                            id="blackList"
                            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white h-9"
                            value={hookuseEmployeeFilterSearchState.filterBlackList} // ✅ ดึงค่าจาก filters
                            onChange={(e) => hookuseEmployeeFilterSearchState.setFilterBlackList(e.target.value)} // ✅ ใช้ฟังก์ชันจาก filters
                        >
                            <option value="">ทั้งหมด</option>
                            <option value="Black List">❌ Blacklist</option>
                            <option value="Not Black List">✅ Not Blacklist</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-900 mb-1">แผนก:</label>
                        <select
                            id="department"
                            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white h-9"
                            value={hookuseEmployeeFilterSearchState.filterDepartment} // ✅ ดึงค่าจาก filters
                            onChange={(e) => hookuseEmployeeFilterSearchState.setFilterDepartment(e.target.value)} // ✅ ใช้ฟังก์ชันจาก filters
                        >
                            <option value="">ทั้งหมด</option>
                            {department.map((dep) => (
                                <option key={dep.departmentID} value={dep.departmentID}>
                                    {dep.departmentName.trim()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-900 mb-1">ตำแหน่ง:</label>
                        <select
                            id="position"
                            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white h-9"
                            value={hookuseEmployeeFilterSearchState.filterPosition} // ✅ ดึงค่าจาก filters
                            onChange={(e) => hookuseEmployeeFilterSearchState.setFilterPosition(e.target.value)} // ✅ ใช้ฟังก์ชันจาก filters
                        >
                            <option value="">ทั้งหมด</option>
                            {role.map((role) => (
                                <option key={role.roleID} value={role.roleID}>
                                    {role.roleName.trim()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label htmlFor="searchInput" className="block text-sm font-medium text-gray-900 mb-1">
                            ค้นหา:
                        </label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded h-9 w-full px-3 py-1 text-sm text-gray-900 bg-white"
                            placeholder="พิมพ์เพื่อค้นหา..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-end min-w-[150px]">
                        <button
                            className="cursor-pointer bg-green-500 text-black text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md h-9 w-auto"
                            onClick={handleSearchEmployeeALL} // ✅ กดแล้วเรียก API
                        >
                            <FaSearch /> ค้นหา
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between mb-3">
                <div className="flex gap-2 items-center">

                    <button 
                        onClick={() => setIsTypeModalOpen(true)} 
                        className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    >
                        <FaPlus/> เพิ่มพนักงาน
                    </button>
                    <button 
                        onClick={handleDepartment}
                        className="cursor-pointer bg-yellow-400 text-black text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    >
                        <FaWrench/> แผนก
                    </button>
                    <button 
                        onClick={handleRole}
                        className="cursor-pointer bg-amber-500 text-black text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    >
                        <FaWrench/> ตำแหน่ง
                    </button>
                    <button className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaWrench/> สัญญาจ้าง
                    </button>
                </div>
                <button
                    className="cursor-pointer bg-cyan-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md ml-auto"
                    onClick={handleExportExcel}
                >
                    <FaFileExcel /> Export Excel
                </button>
            </div>

            {/* ตารางพนักงาน */}
            <div className="bg-white rounded-lg shadow-md p-4">
                {/* กำหนดความสูงของตาราง และเพิ่ม scroll แนวตั้ง */}
                <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
                        <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
                            <tr>
                                <th className="border border-gray-300 p-2">ลำดับ</th>
                                <th className="border border-gray-300 p-2">ประเภทพนักงาน</th>
                                <th className="border border-gray-300 p-2">รหัสพนักงาน</th>
                                <th className="border border-gray-300 p-2">ชื่อ-นามสกุล</th>
                                <th className="border border-gray-300 p-2">แผนก</th>
                                <th className="border border-gray-300 p-2">ตำแหน่ง</th>
                                <th className="border border-gray-300 p-2">สถานะ</th>
                                <th className="border border-gray-300 p-2">Blacklist</th>
                                <th className="border border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.length > 0 ? (
                                filteredData.map((emp, index) => (
                                    <tr key={emp.employeeID} className="border border-gray-300 text-gray-900">
                                        <td className="border border-gray-300 p-3 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 p-3 text-center">{emp.employeeTypeName}</td>
                                        <td className="border border-gray-300 p-3 text-center">{emp.employeeCode}</td>
                                        <td className="border border-gray-300 p-3">{emp.fullName}</td>
                                        <td className="border border-gray-300 p-3">{emp.departmentName}</td>
                                        <td className="border border-gray-300 p-3">{emp.roleName}</td>
                                        <td className="border border-gray-300 p-3 text-center relative">
                                            {/* แจ้งเตือนบัตรประชาชนหมดอายุ */}
                                            {emp.personalCardExpired && (
                                                <span className="text-red-500 text-xs absolute top-1 right-1">
                                                    <FaIdCard />
                                                </span>
                                            )}
                                            {/* แสดงสถานะพนักงาน */}
                                            {emp.employeeStatus === "0" && (
                                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                                                    ⏳ รอตรวจสอบ
                                                </span>
                                            )}
                                            {emp.employeeStatus === "1" && (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                                    ✅ ผ่านการตรวจสอบ
                                                </span>
                                            )}
                                            {emp.employeeStatus === "2" && (
                                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium">
                                                    ⚠️ ไม่ผ่านการตรวจสอบ
                                                </span>
                                            )}
                                            {emp.employeeStatus === "3" && (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                                                    ❌ ยกเลิกสิทธิ์
                                                </span>
                                            )}
                                            {emp.employeeStatus === "4" && (
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">
                                                    👋 ลาออก
                                                </span>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">{emp.blackListDate || "-"}</td>
                                        <td className="border border-gray-300 p-3 flex items-center justify-center gap-2">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded shadow-md">
                                                <FaEdit />
                                            </button>
                                            <button className="bg-red-500 text-white px-2 py-1 rounded shadow-md">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center p-3 text-gray-500">ไม่มีข้อมูลพนักงาน</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
}
