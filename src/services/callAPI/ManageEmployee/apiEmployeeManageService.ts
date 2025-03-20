import api from "@/lib/api";

/* =============================================================================================================== */
export const masterDepartmantGET = async () => {
    try {
        const response = await api.get("/HRManagement/departments", {});
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const masterRoleGET = async () => {
    try {
        const response = await api.get("/HRManagement/role", {});
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
export const employeeINSERT = async (formData: any) => {
    try {
        const response = await api.put("/HRManagement/employee", formData);  // ส่ง formData เป็น body
        return response.data;
    } catch (error) {
        throw error;
    }
};
