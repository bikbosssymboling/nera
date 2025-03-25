import api from "@/lib/api";
import {checkErrorMassage} from "../errorResponse";
import { PermissionCriteria } from "@/types/SystemPermission/PermissionDto";

export const permissionCriteriaGET = async (): Promise<PermissionCriteria> => {
    try {
        const response = await api.get("/permission/criteria");
        debugger;
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};