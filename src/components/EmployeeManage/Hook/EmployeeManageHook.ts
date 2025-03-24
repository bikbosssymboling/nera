import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import type { 
    EmployeeSearchData, RoleMasterData, DepartmentMasterData, 
} from "../../../types/EmployeeManage/Types"; // ✅ Import type จาก Hook
import {
    masterDepartmantGET, masterRoleGET, employeeALLGET, 
} from "@/services/callAPI/ManageEmployee/apiEmployeeManageService";

export function useEmployeeFilterSearchState() {
    const [filterEmployeeType, setFilterEmployeeType] = useState("");
    const [filterEmployeeStatus, setFilterEmployeeStatus] = useState("");
    const [filterBlackList, setFilterBlackList] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterPosition, setFilterPosition] = useState("");

    // ✅ กำหนด Type ให้ `employees`
    const [employees, setEmployees] = useState<EmployeeSearchData[]>([]);

    const handleSearchEmployeeALL = async () => {
        try {
            const data = await employeeALLGET(filterEmployeeType, filterEmployeeStatus, filterBlackList, filterDepartment, filterPosition); // ✅ เรียก API ผ่าน Service
                if (data.length > 0) {
                    setEmployees(data);
                } else {
                    setEmployees([]);
                }
        } catch (error: unknown) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: `<span class="text-red-500">${error}</span>`
            });
        }        
    };

    return {
        filterEmployeeType, setFilterEmployeeType,
        filterEmployeeStatus, setFilterEmployeeStatus,
        filterBlackList, setFilterBlackList,
        filterDepartment, setFilterDepartment,
        filterPosition, setFilterPosition,
        employees, // ✅ ตอนนี้ `employees` มี Type ที่ถูกต้องแล้ว
        handleSearchEmployeeALL,
    };
}

export function useMasterDepartmentGETState() {
    const [departmentMasterData, setDepartmentMasterData] = useState<DepartmentMasterData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await masterDepartmantGET();
                if (data.length > 0) {
                    setDepartmentMasterData(data);
                } else {
                    setDepartmentMasterData([]);
                }
            } catch (error: unknown) {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    html: `<span class="text-red-500">${error}</span>`
                });
            }
        };

        fetchData();
    }, []);

    return { departmentMasterData }; // ✅ ตรวจสอบให้ return ค่าถูกต้อง
}


export function useMasterRoleGETState() {
    const [roleMasterData, setRoleMasterData] = useState<RoleMasterData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await masterRoleGET();
                if (data.length > 0) {
                    setRoleMasterData(data);
                } else {
                    setRoleMasterData([]);
                }
            } catch (error: unknown) {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    html: `<span class="text-red-500">${error}</span>`
                });
            }
        };

        fetchData();
    }, []);

    return { roleMasterData }; // ✅ ตรวจสอบให้ return ค่าถูกต้อง
}
