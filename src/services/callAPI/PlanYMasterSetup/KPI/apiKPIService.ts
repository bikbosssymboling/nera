import api from "@/lib/api";
const loggedInUser = localStorage.getItem("employeeFullName") || "unknown user";

export const KPIList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupKPI/KPI");
        return response.data;
    } catch (error) {
        console.error("KPI List API Error:", error);
        throw error;
    }
};

export const KPIAdd = async (KPISetName: string, TotalKPIs: string) => {

    let createdBy = loggedInUser; 
    try {
        const response = await api.put("/PlanYMasterSetupKPI/KPI", { KPISetName, TotalKPIs, createdBy });
        return response.data;
    } catch (error) {
        console.error("KPI Add API Error:", error);
        throw error;
    }
};

export const KPIEdit = async (id:number, KPISetName: string, TotalKPIs: string ) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.post("/PlanYMasterSetupKPI/KPI", { id, KPISetName, TotalKPIs, updatedBy });
        return response.data;
    } catch (error) {
        console.error("KPI Edit API Error:", error);
        throw error;
    }
};

export const KPIDelete = async (id: string) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.delete("/PlanYMasterSetupKPI/KPI", { data: { id, updatedBy } });
        return response.data;
    } catch (error) {
        console.error("KPI Delete API Error:", error);
        throw error;
    }
};
// import api from "@/lib/api";

// export const KPIAdd = async (KPISetName: string, TotalKPIs: string) => {
//     try {
//         const response = await api.post("/PlanYMasterSetup/KPIAdd", {KPISetName, TotalKPIs, nameEng });
//         return response.data;
//     } catch (error) {
//         console.error("Account Add API Error:", error);
//         throw error;
//     }
// };
// export const KPIEdit = async (id: number, KPISetName: string, name: string, nameEng: string) => {
//     try {
//         const response = await api.post("/PlanYMasterSetup/KPIEdit", { id, KPISetName, name, nameEng });
//         return response.data;
//     } catch (error) {
//         console.error("Account Edit API Error:", error);
//         throw error;
//     }
// };
// export const KPIDelete = async (KPIID: string) => {
//     try {
//         const response = await api.post("/PlanYMasterSetup/KPIDelete", { KPIID });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

