import api from "@/lib/api";
import { checkErrorMassage } from "../../errorResponse";

// ดึง user ที่ login อยู่ใน localStorage
const loggedInUser = localStorage.getItem("employeeCode") || "unknown user";

export const storeList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupStore/store");
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const storeAdd = async (
    storeCode: string,
    storeNameThai: string,
    storeNameEnglish: string,
    regionID: string,
    provinceID: string,
    accountID: string,
    latitude: string,
    longtitude: string,
    distance: number
) => {
    const createdBy = loggedInUser; // ให้ตรง case

    try {
        const response = await api.post("/PlanYMasterSetupStore/store", {
            storeCode,
            storeNameThai,
            storeNameEnglish,
            regionID,
            provinceID,
            accountID,
            latitude,
            longtitude,
            distance,
            createdBy
        });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};


export const storeEdit = async (
    storeID: string,
    storeCode: string,
    storeNameThai: string,
    storeNameEnglish: string,
    regionID: string,
    provinceID: string,
    accountID: string,
    latitude: string,
    longtitude: string,
    distance: number
) => {
    const updatedBy = loggedInUser;

    try {
        const response = await api.put("/PlanYMasterSetupStore/store", {
            storeID,
            storeCode,
            storeNameThai,
            storeNameEnglish,
            regionID,
            provinceID,
            accountID,
            latitude,
            longtitude,
            distance,
            updatedBy
        });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};


export const storeDelete = async (storeId: number) => {
    const updatedBy = loggedInUser;
    try {
        const response = await api.delete("/PlanYMasterSetupStore/store", { data: { storeId, updatedBy } });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
