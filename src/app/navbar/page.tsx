"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaBars, FaUser, FaHome, FaUsers, FaFileAlt, FaCalendar, FaCogs, FaBriefcase,
    FaGlobe, FaMapMarkerAlt, FaStore, FaChartLine, FaClipboardList, FaUserCog, FaTools, FaSignOutAlt, FaEdit
} from "react-icons/fa";
import dynamic from "next/dynamic";

// Lazy Load Component
const EmployeeManage = dynamic(() => import("@/app/employeemanage/page"));
const PlanYExclusive = dynamic(() => import("@/app/planyexclusive/page"));
const PlanYSetMasterAccount = dynamic(() => import("@/app/planysetmasteraccount/page"));

export default function Layout() {
    const router = useRouter();
    const [activePage, setActivePage] = useState<string>("news");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleSubmenu = (menu: string) => {
        setSubmenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = () => {
        localStorage.removeItem("employeeID");
        localStorage.removeItem("employeeCode");
        localStorage.removeItem("employeeFullName");
        localStorage.removeItem("employeeDepartmentName");
        localStorage.removeItem("employeeRoleName");
        localStorage.removeItem("employeeTypeCode");
        localStorage.removeItem("employeeTypeName");
        router.push("/login");
    };

    return (
        <div className="flex h-screen">{/* overflow-hidden */} 
            {/* Sidebar */}
            <div className={`bg-gray-600 text-white w-64 p-4 fixed top-0 left-0 h-full transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
                <h2 className="text-xl font-bold mb-4">Nera</h2>
                <ul>
                    <li className={`p-2 flex items-center gap-2 cursor-pointer ${activePage === "news" ? "bg-blue-500" : "hover:bg-gray-600"}`} 
                        onClick={() => setActivePage("news")}>
                        <FaHome /> หน้าแรก
                    </li>
                    <li className={`p-2 flex items-center gap-2 cursor-pointer ${activePage === "employee" ? "bg-blue-500" : "hover:bg-gray-600"}`} 
                        onClick={() => setActivePage("employee")}>
                        <FaUsers /> จัดการข้อมูลพนักงาน
                    </li>
                    {/* Exclusive */}
                    <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600" 
                        onClick={() => toggleSubmenu("exclusive")}>
                        <FaCalendar /> Exclusive ▼
                    </li>
                    {submenuOpen["exclusive"] && (
                        <ul className="pl-6">
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" 
                                onClick={() => setActivePage("planYexclusive")}>
                                <FaCalendar /> Plan Y Exclusive
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" 
                                onClick={() => setActivePage("dashboardexclusive")}>
                                <FaCalendar /> Dashboard Exclusive
                            </li>
                        </ul>
                    )}

                    {/* PlanY Master Setup */}
                    <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600" 
                        onClick={() => toggleSubmenu("setup")}>
                        <FaCogs /> PlanY Master Setup ▼
                    </li>
                    {submenuOpen["setup"] && (
                        <ul className="pl-6">
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("planysetmasteraccount")}>
                                <FaBriefcase /> Account
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("region")}>
                                <FaGlobe /> Region
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("province")}>
                                <FaMapMarkerAlt /> Province
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("store")}>
                                <FaStore /> Store
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("kpi")}>
                                <FaChartLine /> KPI
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("position")}>
                                <FaClipboardList /> Position
                            </li>
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => setActivePage("job")}>
                                <FaClipboardList /> Job
                            </li>
                        </ul>
                    )}

                    {/* System Setup */}
                    <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600" 
                        onClick={() => toggleSubmenu("system")}>
                        <FaTools /> System Setup ▼
                    </li>
                    {submenuOpen["system"] && (
                        <ul className="pl-6">
                            <li className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-600 text-sm" 
                                onClick={() => setActivePage("system")}>
                                <FaUserCog /> System Permission
                            </li>
                        </ul>
                    )}
                </ul>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Navbar */}
                <nav className="w-full fixed top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-between items-center px-4 py-3 z-30 shadow-md">
                    <button className="text-white cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <FaBars />
                    </button>
                    <span className="text-xl font-bold">Nera</span>
                    <div className="relative">
                        <button className="text-white cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <FaUser />
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-md rounded">
                                <li className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    <FaEdit className="mr-2" /> แก้ไขข้อมูล
                                </li>
                                <li className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer" 
                                    onClick={handleLogout}>
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>

                {/* Dynamic Content */}
                <div className="flex-1 p-6 pt-20">
                    {activePage === "employee" && <EmployeeManage />}
                    {activePage === "planYexclusive" && <PlanYExclusive />}
                    {activePage === "planysetmasteraccount" && <PlanYSetMasterAccount />}
                    {activePage !== "employee" && <div className="text-center text-gray-500 text-xl mt-20">🔧 กำลังพัฒนา...</div>}
                </div>
            </div>
        </div>
    );
}
