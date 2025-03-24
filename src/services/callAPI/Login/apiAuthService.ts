import api from "@/lib/api";
import {checkErrorMassage} from "../errorResponse";
// ฟังก์ชันล็อกอิน
export const authLogin = async (username: string, password: string) => {
    try {
        const response = await api.post("/Auth/logins", { username, password });
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};
