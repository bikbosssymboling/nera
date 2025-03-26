import api from "@/lib/api";
import { checkErrorMassage } from "../../errorResponse";

// ดึง user ที่ login อยู่ใน localStorage
const loggedInUser = localStorage.getItem("employeeCode") || "unknown user";

export const regionList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupRegion/region");
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const regionAdd = async (regionCode: string, regionNameThai: string, regionNameEnglish: string) => {
    let createdBy = loggedInUser;
    try {
        const response = await api.post("/PlanYMasterSetupRegion/region", { RegionCode: regionCode, RegionNameThai: regionNameThai, RegionNameEnglish: regionNameEnglish, CreatedBy: createdBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const regionEdit = async (regionId: string, regionCode: string, regionNameThai: string, regionNameEnglish: string,) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.put("/PlanYMasterSetupRegion/region", { regionId, regionCode, regionNameThai, regionNameEnglish, updatedBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const regionDelete = async (regionId: string) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.delete(`/PlanYMasterSetupRegion/region`, { data: { regionId, updatedBy } });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};