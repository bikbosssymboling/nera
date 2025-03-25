import api from "@/lib/api";
import { checkErrorMassage } from "../../errorResponse";

// ดึง user ที่ login อยู่ใน localStorage
const loggedInUser = localStorage.getItem("employeeCode") || "unknown user";


export const accountList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupAccount/account");
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};

export const accountAdd = async (accountCode: string, accountNameThai: string, accountNameEnglish: string) => {
    const CreatedBy = loggedInUser
    try {
        const response = await api.post("/PlanYMasterSetupAccount/account", { accountCode, accountNameThai, accountNameEnglish, CreatedBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
export const accountEdit = async (AccountID: number, accountCode: string, accountNameThai: string, accountNameEnglish: string) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.put("/PlanYMasterSetupAccount/account", { AccountID, accountCode, accountNameThai, accountNameEnglish, updatedBy });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};

export const accountDelete = async (accountId: number) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.delete(`/PlanYMasterSetupAccount/account`, { data: { accountId, updatedBy } });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};

