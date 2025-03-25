import api from "@/lib/api";
import {checkErrorMassage} from "../errorResponse";

export const permissionCriteriaGET = async () => {
    try {
        const response = await api.get("/permission/criteria");
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};