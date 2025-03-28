'use client'
import { permissionCriteriaGET, permissionConditionGET } from "@/services/callAPI/SystemPermission/permissionService";
import { DepartmentDto, PermissionConditionDto, PermissionDto, RoleDto } from "@/types/SystemPermission/PermissionDto";
import { useEffect, useState } from "react";
import { FaUserGear, FaFloppyDisk } from "react-icons/fa6";

export default function SystemPermissionPage() {

    //for select
    const [departments, setDepartments] = useState<DepartmentDto[]>([]);
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [roleBydpm, setRoleByDpm] = useState<RoleDto[]>([]);
    const [permissionArr, setPermissionArr] = useState<PermissionDto[]>([]);

    const [permissionSystem, setPermissionSystem] = useState<PermissionDto[]>([]);
    const [permissionInput, setPermissionInput] = useState<PermissionDto[]>([]);

    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<string>("");

    // เพิ่ม State เก็บค่าการ check แต่ละ permissionFunctionID + action
    const [checkedPermissions, setCheckedPermissions] = useState<Record<string, boolean>>({});

    //Initail page
    useEffect(() => {
        fetchPermissionCriteria();
    }, []);

    const fetchPermissionCriteria = async () => {
        const data = await permissionCriteriaGET();


        setDepartments(data.departments);
        setRoles(data.roles);
        setPermissionArr(data.permissions);

        if (data.departments.length > 0) {
            setSelectedDepartment(data.departments[0].departmentName!);
            let rol = data.roles.filter(x => x.departmentId === data.departments[0].departmentId);
            if (rol.length > 0) {

                rolNameDistinct(rol)
                setSelectedRole(rol[0].roleName!)
                systemNameDistinct(data.permissions)
            }
        }
    };

    const systemNameDistinct = (per: PermissionDto[]) => {
        setPermissionSystem(per.filter((p, i, self) => i === self.findIndex(t => t.systemName === p.systemName)));
    }

    const rolNameDistinct = (rol: RoleDto[]) => {
        setRoleByDpm(rol.filter((p, i, self) => i === self.findIndex(t => t.roleName === p.roleName)));
    }

    const handleClickDepartment = async (id: number) => {
        setSelectedRole("");
        setPermissionArr([]);
        rolNameDistinct(roles.filter(x => x.departmentId === id));
    }

    const handleClickRole = async (idDpm: number, idRol: number) => {
        setPermissionArr([]);

        const condition: PermissionConditionDto = {
            departmentId: idDpm,
            roleId: idRol
        }

        const per = await permissionConditionGET(condition);
        
        setPermissionArr(per)
        setPermissionInput(per.map(p => ({ ...p }))); // << เก็บไว้เป็น working state
        systemNameDistinct(per);
    }

    const handleCheckboxChange = (per: PermissionDto, field: keyof PermissionDto) => {
        setPermissionArr(prev =>{
            return prev.map( item => {
                if(item.systemFunctionID === per.systemFunctionID){
                    return {
                        ...item,
                        [field]: item[field] === 1 ? 0 : 1
                    };
                }
                return item
            })
        })
    };

    const [permissions, setPermissions] = useState<Record<string, boolean>>({});

    /* const handleCheckboxChange = (id: string) => {
        setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
    }; */

    const toggleAll = (type: string) => {

    };

    const savePermissions = () => {

    };

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <div className="w-full mx-auto">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FaUserGear /> System Permissions
                </h2>

                {/* Grid แผนก  */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-bold mb-2">แผนก</h3>
                        <div className="overflow-y-auto max-h-[180px] border border-gray-300 rounded">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-200 sticky top-0">
                                    <tr>
                                        <th className="border p-2 text-center">ชื่อแผนก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dpm) => (
                                        <tr
                                            key={dpm.departmentId}
                                            className={`cursor-pointer hover:bg-blue-100 ${selectedDepartment === dpm.departmentName ? 'bg-blue-200 font-semibold' : ''}`}
                                            onClick={() => {
                                                handleClickDepartment(dpm.departmentId!);
                                                setSelectedDepartment(dpm.departmentName!)
                                            }}
                                        >
                                            <td className="border p-2 text-center">{dpm.departmentName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/*  ตำแหน่ง */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-bold mb-2">ตำแหน่ง</h3>
                        <div className="overflow-y-auto max-h-[180px] border border-gray-300 rounded">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-200 sticky top-0">
                                    <tr>
                                        <th className="border p-2 text-center">ชื่อตำแหน่ง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roleBydpm.map((rol) => (
                                        <tr
                                            key={rol.roleId}
                                            className={`cursor-pointer hover:bg-green-100 ${selectedRole === rol.roleName ? 'bg-green-200 font-semibold' : ''}`}
                                            onClick={() => {
                                                handleClickRole(rol.departmentId, rol.roleId);
                                                setSelectedRole(rol.roleName!)
                                            }}
                                        >
                                            <td className="border p-2 text-center">{rol.roleName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ตารางสิทธิ์ */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="overflow-auto max-h-[500px] border border-gray-300 rounded">
                        <table className="w-full border-collapse text-sm">
                            <thead className="sticky top-0 z-10 bg-gray-50">
                                <tr>
                                    <th className="border p-2 w-[20%]">Menu</th>
                                    <th className="border p-2 w-[25%]">Function</th>
                                    {['ค้นหา', 'เพิ่ม', 'ลบ', 'แก้ไข'].map((action) => (
                                        <th key={action} className={`border p-2 text-center ${action === 'ค้นหา' ? 'bg-blue-300' : action === 'เพิ่ม' ? 'bg-green-300' : action === 'ลบ' ? 'bg-red-300' : 'bg-yellow-300'}`}>
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold">{action}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={permissions[`selectAll-${action}`] || false}
                                                    onChange={() => toggleAll(action)}
                                                />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {permissionArr.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center p-4 text-gray-500">ไม่พบข้อมูล</td>
                                    </tr>
                                ) : (
                                    permissionSystem.map((per) => ( // system name
                                        <>
                                            <tr key={per.systemID}>
                                                <td colSpan={6} className="bg-gray-300 font-semibold text-left p-2">{per.systemName}</td>
                                            </tr>
                                            {
                                                permissionArr.filter(x => x.systemID === per.systemID).map((perFn) => (
                                                    <tr key={perFn.systemFunctionID} className="hover:bg-gray-50">
                                                        <td className="border p-2">{perFn.systemFunctionName}</td>
                                                        <td className="border p-2">{`test`}</td>
                                                        <td className="border p-2 text-center bg-blue-50">
                                                            <input
                                                                type="checkbox"
                                                                checked={ perFn.canSearch === 1 ? true : false }
                                                                onChange={() => handleCheckboxChange(perFn,`canSearch`)}
                                                            />
                                                        </td>
                                                        <td className="border p-2 text-center bg-green-50">
                                                            <input
                                                                type="checkbox"
                                                                checked={ perFn.canAdd === 1 ? true : false }
                                                                onChange={() => handleCheckboxChange(perFn,`canAdd`)}
                                                            />
                                                        </td>
                                                        <td className="border p-2 text-center bg-red-50">
                                                            <input
                                                                type="checkbox"
                                                                checked={ perFn.canDelete === 1 ? true : false  }
                                                                onChange={() => handleCheckboxChange(perFn,`canDelete`)}
                                                            />
                                                        </td>
                                                        <td className="border p-2 text-center bg-yellow-50">
                                                            <input
                                                                type="checkbox"
                                                                checked={ perFn.canEdit === 1 ? true : false  }
                                                                onChange={() => handleCheckboxChange(perFn,`canEdit`)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))

                                            }
                                        </>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md text-base"
                            onClick={savePermissions}
                        >
                            <FaFloppyDisk className="inline mr-2" /> บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
