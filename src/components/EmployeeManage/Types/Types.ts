// ✅ กำหนด Type สำหรับพนักงาน
export interface EmployeeSearchData {
    employeeTypeID: string;
    employeeTypeName: string;
    employeeID: string;
    employeeCode: string;
    fullName: string;
    departmentName: string;
    roleName: string;
    employeeStatus: string;
    blackListDate: string;
    personalCardExpired: string;
}

export interface DepartmentMasterData {
    departmentID: string;
    departmentName: string;
}
