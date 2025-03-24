import api from "@/lib/api";
<<<<<<< HEAD
=======
import { checkErrorMassage } from "../../errorResponse";

// ดึง user ที่ login อยู่ใน localStorage
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
const loggedInUser = localStorage.getItem("employeeFullName") || "unknown user";

export const regionList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupRegion/region");
        return response.data;
<<<<<<< HEAD
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
=======
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const regionAdd = async (regionCode: string, regionNameThai: string, regionNameEnglish: string) => {
    let createdBy = loggedInUser;
    try {
        const response = await api.post("/PlanYMasterSetupRegion/region", { regionCode, regionNameThai, regionNameEnglish, createdBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const regionEdit = async (regionId: number, regionCode: string, regionNameThai: string, regionNameEnglish: string,) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.put("/PlanYMasterSetupRegion/region", { regionId, regionCode, regionNameThai, regionNameEnglish, updatedBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
    }
};
export const regionDelete = async (regionId: number) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.delete(`/PlanYMasterSetupRegion/region`, { data: { regionId, updatedBy } });
        return response.data;
<<<<<<< HEAD
    } catch (error) {
        console.error("Region Delete API Error:", error);
        throw error;
=======
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
    }
};
