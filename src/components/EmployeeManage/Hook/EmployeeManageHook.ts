import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import type { EmployeeSearchData, DepartmentMasterData } from "../Types/Types"; // ✅ Import type จาก Hook
import {
    masterDepartmantGET, employeeALLGET
} from "@/services/callAPI/ManageEmployee/apiEmployeeManageService";





export function useMasterDepartmentGETState() {
    const [departmentMasterData, setDepartmentMasterData] = useState<DepartmentMasterData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await masterDepartmantGET();
                if (data.Status === "Success") {
                    console.log(data);
                    setDepartmentMasterData(data.Data);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "ไม่สามารถดึงข้อมูลได้",
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
        };

        fetchData();
    }, []);

    return { departmentMasterData }; // ✅ ตรวจสอบให้ return ค่าถูกต้อง
}

export function useEmployeeFilterSearchState() {
    const [filterEmployeeType, setFilterEmployeeType] = useState("");
    const [filterEmployeeStatus, setFilterEmployeeStatus] = useState("");
    const [filterBlackList, setFilterBlackList] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterPosition, setFilterPosition] = useState("");
    const [filterSearchQuery, setFilterSearchQuery] = useState("");

    // ✅ กำหนด Type ให้ `employees`
    const [employees, setEmployees] = useState<EmployeeSearchData[]>([]);

    const handleSearchEmployeeALL = async () => {
        try {
            const data = await employeeALLGET(filterEmployeeType, filterEmployeeStatus, filterBlackList, filterDepartment, filterPosition, filterSearchQuery); // ✅ เรียก API ผ่าน Service
            if (data.Status == "Success") {
                setEmployees(data.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ไม่สามารถค้นหาข้อมูลได้",
                    text: data.error_message || ""
                });
            }
            return data.data;
        }catch (error: unknown) {
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
    };

    return {
        filterEmployeeType, setFilterEmployeeType,
        filterEmployeeStatus, setFilterEmployeeStatus,
        filterBlackList, setFilterBlackList,
        filterDepartment, setFilterDepartment,
        filterPosition, setFilterPosition,
        filterSearchQuery, setFilterSearchQuery,
        employees, // ✅ ตอนนี้ `employees` มี Type ที่ถูกต้องแล้ว
        handleSearchEmployeeALL,
    };
}

