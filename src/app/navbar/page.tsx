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
const PlanYSetMasterAccount = dynamic(() => import("@/app/planymaster/account/page"));
const PlanYSetMasterRegion = dynamic(() => import("@/app/planymaster/region/page"))


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
            <div className={`bg-gray-600 text-white w-64 p-4 fixed top-0 left-0 h-full transition-transform duration-300 z-30 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
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
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planYexclusive" ? "bg-blue-500" : "hover:bg-gray-600"}`}  
                                onClick={() => setActivePage("planYexclusive")}>
                                <FaCalendar /> Plan Y Exclusive
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "dashboardexclusive" ? "bg-blue-500" : "hover:bg-gray-600"}`} 
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
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasteraccount" ? "bg-blue-500" : "hover:bg-gray-600"}`}  onClick={() => setActivePage("planysetmasteraccount")}>
                                <FaBriefcase /> Account
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasterregion" ? "bg-blue-500" : "hover:bg-gray-600"}`} onClick={() => setActivePage("planysetmasterregion")}>
                                <FaGlobe /> Region
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasterprovince" ? "bg-blue-500" : "hover:bg-gray-600"}`} onClick={() => setActivePage("planysetmasterprovince")}>
                                <FaMapMarkerAlt /> Province
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasterstore" ? "bg-blue-500" : "hover:bg-gray-600"}`} onClick={() => setActivePage("planysetmasterstore")}>
                                <FaStore /> Store
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasterkpi" ? "bg-blue-500" : "hover:bg-gray-600"}`} onClick={() => setActivePage("planysetmasterkpi")}>
                                <FaChartLine /> KPI
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasterposition" ? "bg-blue-500" : "hover:bg-gray-600"}`} onClick={() => setActivePage("planysetmasterposition")}>
                                <FaClipboardList /> Position
                            </li>
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "planysetmasterjob" ? "bg-blue-500" : "hover:bg-gray-600"}`} onClick={() => setActivePage("planysetmasterjob")}>
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
                            <li className={`p-2 flex items-center gap-2 cursor-pointer text-sm ${activePage === "systempermission" ? "bg-blue-500" : "hover:bg-gray-600"}`} 
                                onClick={() => setActivePage("systempermission")}>
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
                    {activePage === "planysetmasterregion" && <PlanYSetMasterRegion />}
                </div>
            </div>
        </div>
    );
}
