import api from "@/lib/api";
const loggedInUser = localStorage.getItem("employeeFullName") || "unknown user";

export const regionList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupRegion/region");
        return response.data;
    } catch (error) {
        console.error("Region List API Error:", error);
        throw error;
    }
};

export const regionAdd = async (regionCode: string, regionNameThai: string, regionNameEnglish: string) => {
    // ดึง user ที่ login อยู่ใน localStorage
    let createdBy = loggedInUser;  
 
    // const createdBy =   'test user'
    try {
        const response = await api.put("/PlanYMasterSetupRegion/region", { regionCode, regionNameThai, regionNameEnglish, createdBy });
        return response.data;
    } catch (error) {
        console.error("Region Add API Error:", error);
        throw error;
    }
};
export const regionEdit = async (regionId:number, regionCode: string, regionNameThai: string, regionNameEnglish: string, ) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.post("/PlanYMasterSetupRegion/region", { regionId, regionCode, regionNameThai, regionNameEnglish, updatedBy });
        return response.data;
    } catch (error) {
        console.error("Region Edit API Error:", error);
        throw error;
    }
};
export const regionDelete = async (regionId: number) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.delete(`/PlanYMasterSetupRegion/region`, { data: { regionId, updatedBy } });
        return response.data;
    } catch (error) {
        console.error("Region Delete API Error:", error);
        throw error;
    }
};
