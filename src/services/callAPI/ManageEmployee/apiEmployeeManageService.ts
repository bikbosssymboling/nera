import axios from "axios";

/* ตั้งค่า API Base URL */
const API_BASE_URL = "https://nera.mcaplc.com:8090/nera_api";

/* สร้างอินสแตนซ์ axios */
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // Timeout 5 วินาที
});

/* =============================================================================================================== */
export const masterDepartmantGET = async () => {
    try {
        const response = await api.get("/auth/masterDepartmantGET", {});
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const masterRoleGET = async () => {
    try {
        const response = await api.get("/auth/masterRoleGET", {});
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const employeeALLGET = async (filterEmployeeType: string, filterEmployeeStatus: string, filterBlackList: string, filterDepartment: string, positionID: string, searchQuery: string) => {
    try {
        const response = await api.get("/auth/employeeALLGET", {
            params: { employeeType: filterEmployeeType, employeeStatus: filterEmployeeStatus, blackList: filterBlackList, departmentID: filterDepartment, positionID: positionID, searchQuery: searchQuery },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
