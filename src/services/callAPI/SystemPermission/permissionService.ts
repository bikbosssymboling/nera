import api from "@/lib/api";
import {checkErrorMassage} from "../errorResponse";
import { PermissionConditionDto, PermissionCriteria, PermissionDto } from "@/types/SystemPermission/PermissionDto";

export const permissionCriteriaGET = async (): Promise<PermissionCriteria> => {
    try {
        const response = await api.get("/permission/criteria");
        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};

export const permissionConditionGET = async (condition : PermissionConditionDto): Promise<PermissionDto> => {
    
    try {
        const response = await api.get("/permission",{
            params:condition
        });

        return response.data;
    } catch (err: any) {
        const message = await checkErrorMassage(err);
        throw new Error(message);
    }
};