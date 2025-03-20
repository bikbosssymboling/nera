import api from "@/lib/api";

/* =============================================================================================================== */
export const masterDepartmantGET = async () => {
    try {
        const response = await api.get("/HRManagement/departmentsGet", {});
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const masterRoleGET = async () => {
    try {
        const response = await api.get("/HRManagement/roleGet", {});
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const employeeALLGET = async (filterEmployeeType: string, filterEmployeeStatus: string, filterBlackList: string, filterDepartment: string, positionID: string) => {
    try {
        const response = await api.get("/HRManagement/employeeALLGET", {
            params: { employeeType: filterEmployeeType, employeeStatus: filterEmployeeStatus, blackList: filterBlackList, departmentID: filterDepartment, positionID: positionID},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const departmentINSERT = async (departmentName: string) => {
    try {
        const response = await api.get("/HRManagement/departmentINSERT", {
            params: { departmentName: departmentName},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const roleINSERT = async (newDepartment: string, newRole: string) => {
    try {
        const response = await api.get("/HRManagement/roleINSERT", {
            params: { newDepartment: newDepartment, newRole: newRole},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};