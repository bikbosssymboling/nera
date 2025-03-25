import api from "@/lib/api";
import { checkErrorMassage } from "../../errorResponse";

// ดึง user ที่ login อยู่ใน localStorage
const loggedInUser = localStorage.getItem("employeeCode") || "unknown user";

export const provinceList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupProvince/province");
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};

export const provinceAdd = async (provinceCode: string, provinceNameThai: string, provinceNameEnglish: string, regionID:number) => {
    const CreatedBy = loggedInUser;
    try {
        const response = await api.post("/PlanYMasterSetupProvince/province", { provinceCode, provinceNameThai, provinceNameEnglish, regionID, CreatedBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};

export const provinceEdit = async (provinceID: number, provinceCode: string, provinceNameThai: string, provinceNameEnglish: string, regionID:number) => {
    const updatedBy = loggedInUser;
    try {
        const response = await api.put("/PlanYMasterSetupProvince/province", { provinceID, provinceCode, provinceNameThai, provinceNameEnglish, regionID, updatedBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};


export const provinceDelete = async (provinceId: number) => {
    const updatedBy = loggedInUser;
    try {
        const response = await api.delete("/PlanYMasterSetupProvince/province", { data: { provinceId, updatedBy } });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};