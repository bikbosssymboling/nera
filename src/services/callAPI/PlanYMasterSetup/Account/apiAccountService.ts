import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.200.69:5001/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;"
    }
});

export const accountAdd = async (accountCode: string, name: string, nameEng: string) => {
    try {
        const response = await api.post("/PlanYMasterSetup/accountAdd", {accountCode, name, nameEng });
        return response.data;
    } catch (error) {
        console.error("Account Add API Error:", error);
        throw error;
    }
};
export const accountEdit = async (id: number, accountCode: string, name: string, nameEng: string) => {
    try {
        const response = await api.post("/PlanYMasterSetup/accountEdit", { id, accountCode, name, nameEng });
        return response.data;
    } catch (error) {
        console.error("Account Edit API Error:", error);
        throw error;
    }
};
export const accountDelete = async (accountID: string) => {
    try {
        const response = await api.post("/PlanYMasterSetup/accountDelete", { accountID });
        return response.data;
    } catch (error) {
        throw error;
    }
};
