import api from "@/lib/api";
const loggedInUser = localStorage.getItem("employeeFullName") || "unknown user";

export const PositionList = async () => {
    try {
        const response = await api.get("/PlanYMasterSetupPosition/position");
        return response.data;
    } catch (error) {
        console.error("Position List API Error:", error);
        throw error;
    }
};

export const PositionAdd = async (positionCode: string, positionName: string, positionDescription: string) => {

    let createdBy = loggedInUser; 
    try {
        const response = await api.put("/PlanYMasterSetupPosition/position", { positionCode, positionName, positionDescription, createdBy });
        return response.data;
    } catch (error) {
        console.error("Position Add API Error:", error);
        throw error;
    }
};
  
export const PositionEdit = async (positionID:number, positionCode: string, positionName: string, positionDescription: string ) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.post("/PlanYMasterSetupPosition/position", { positionID, positionCode, positionName, positionDescription, updatedBy });
        return response.data;
    } catch (error) {
        console.error("Position Edit API Error:", error);
        throw error;
    }
};

  export const PositionDelete = async (positionID: number) => {
    const updatedBy = loggedInUser
    try {
        const response = await api.delete("/PlanYMasterSetupPosition/position", { data: { positionID, updatedBy } });
        return response.data;
    } catch (error) {
        console.error("Position Delete API Error:", error);
        throw error;
    }
};

