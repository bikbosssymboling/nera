import api from "@/lib/api";

export const regionList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupRegion/region");
        return response.data;
    } catch (error) {
        console.error("Region List API Error:", error);
        throw error;
    }
};

export const regionAdd = async (regionCode: string, name: string, nameEng: string) => {
    try {
        const response = await api.put("/PlanYMasterSetupRegion/region", { regionCode, name, nameEng });
        return response.data;
    } catch (error) {
        console.error("Region Add API Error:", error);
        throw error;
    }
};
export const regionEdit = async (regionCode: string, name: string, nameEng: string) => {
    try {
        const response = await api.post("/PlanYMasterSetupRegion/region", { regionCode, name, nameEng });
        return response.data;
    } catch (error) {
        console.error("Region Edit API Error:", error);
        throw error;
    }
};
// export const regionDelete = async (regionId: string) => {
//     try {
//         const response = await api.delete("/PlanYMasterSetupRegion/region", { regionId });
//         return response.data;
//     } catch (error) {
//         console.error("Region Delete API Error:", error);
//         throw error;
//     }
// };
