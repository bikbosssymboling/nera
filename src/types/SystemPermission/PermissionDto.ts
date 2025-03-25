export interface PermissionDto {
    departmentID: number;
    roleID: number;
    roleName: string | null;
    systemID: number;
    systemName: string | null;
    systemFunctionID: number;
    systemFunctionName: string | null;
    permissionID: number;
    canSearch: number;
    canAdd: number;
    canDelete: number;
    canEdit: number;
}

export interface DepartmentDto {
    departmentId: number;
    departmentName: string | null;
}

export interface RoleDto {
    roleId: number;
    roleName: string | null;
    departmentId: number;
    departmentName: string | null;
}

export interface PermissionCriteria {
    departments: DepartmentDto[];
    roles: RoleDto[];
    permissions : PermissionDto[];
}
