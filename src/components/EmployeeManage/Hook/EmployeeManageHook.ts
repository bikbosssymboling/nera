import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    masterDepartmantGET, employeeALLGET
} from "@/services/callAPI/ManageEmployee/apiEmployeeManageService";

// ✅ กำหนด Type สำหรับพนักงาน
interface EmployeeSearchData {
    employeeTypeID: string;
    employeeTypeName: string;
    employeeID: string;
    employeeCode: string;
    fullName: string;
    departmentName: string;
    roleName: string;
    employeeStatus: string;
    blackListDate: string;
    personalCardExpired: string;
}

interface departmentMasterData {
    departmentID: string;
    departmentName: string;
}

export function useMasterDepartmentGETState() {
    const [departmentMasterData, setDepartmentMasterData] = useState<departmentMasterData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await masterDepartmantGET(); // ✅ รอผลลัพธ์ของ API
                if (data.status === "Success") {
                    setDepartmentMasterData(data.data);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "ไม่สามารถดึงข้อมูลได้",
                        text: data.error_message || "เกิดข้อผิดพลาด",
                    });
                }
            } catch (error: unknown) {
                let errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้";
                if (error instanceof Error) {
                    errorMessage += `\n${error.message}`;
                }
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: errorMessage,
                });
            }
        };

        fetchData();
    }, []); // ✅ รันครั้งเดียวตอนโหลด

    return { departmentMasterData };
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
            if (data.status == "Success") {
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

