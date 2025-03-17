import api from "@/lib/api";

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
