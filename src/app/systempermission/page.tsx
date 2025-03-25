'use client'
import { useState } from "react";
import { FaUserGear, FaFloppyDisk } from "react-icons/fa6";

interface MenuFunction {
  module: string;
  menuName: string;
  functionName: string;
}

export default function SystemPermissionPage() {
  const plans: Record<string, string[]> = {
    "IT Department": ["IT Support", "System Administrator", "Network Admin", "Developer", "IT Manager"],
    "HR Department": ["HR Specialist", "Recruiter", "HR Manager", "Payroll Officer", "Training Officer"],
    "Finance Department": ["Finance Officer", "Accountant", "Financial Analyst", "Auditor", "Finance Manager"],
    "Finance Department1": ["Finance Officer", "Accountant", "Financial Analyst", "Auditor", "Finance Manager"],
    "Finance Department2": ["Finance Officer", "Accountant", "Financial Analyst", "Auditor", "Finance Manager"],
    "Finance Department3": ["Finance Officer", "Accountant", "Financial Analyst", "Auditor", "Finance Manager"],
  };

  const menuFunctions: MenuFunction[] = [
    { module: "Transaction", menuName: "Setup Labour", functionName: "Setup Labour Plan" },
    { module: "Transaction", menuName: "Labour To Pay", functionName: "Process Employee Payment" },
    { module: "Transaction", menuName: "Reject Status(RO)", functionName: "Review Rejected Requests" },
    { module: "Master", menuName: "Setup Outsource", functionName: "Manage External Workers" },
    { module: "Master", menuName: "Setup KPI", functionName: "Define KPI Metrics" },
    { module: "Report", menuName: "Report Labour", functionName: "Generate Labour Report" },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  const groupedMenus = menuFunctions.reduce((acc, item) => {
    acc[item.module] = acc[item.module] || [];
    acc[item.module].push(item);
    return acc;
  }, {} as Record<string, MenuFunction[]>);

  const handleCheckboxChange = (id: string) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (type: string) => {
    const newPermissions = { ...permissions };
    menuFunctions.forEach((_, index) => {
      newPermissions[`${type}-${index}`] = !permissions[`selectAll-${type}`];
    });
    newPermissions[`selectAll-${type}`] = !permissions[`selectAll-${type}`];
    setPermissions(newPermissions);
  };

  const savePermissions = () => {
    console.log("Saved Permissions:", permissions);
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaUserGear /> System Permissions
        </h2>

        {/* Grid แผนก / ตำแหน่ง */}
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
                  {Object.keys(plans).map((dept) => (
                    <tr
                      key={dept}
                      className={`cursor-pointer hover:bg-blue-100 ${selectedDepartment === dept ? 'bg-blue-200 font-semibold' : ''}`}
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setSelectedPosition("");
                      }}
                    >
                      <td className="border p-2 text-center">{dept}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
                  {plans[selectedDepartment]?.map((position) => (
                    <tr
                      key={position}
                      className={`cursor-pointer hover:bg-green-100 ${selectedPosition === position ? 'bg-green-200 font-semibold' : ''}`}
                      onClick={() => setSelectedPosition(position)}
                    >
                      <td className="border p-2 text-center">{position}</td>
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
                {Object.keys(groupedMenus).map((module) => (
                  <>
                    <tr key={module}>
                      <td colSpan={6} className="bg-gray-300 font-semibold text-left p-2">{module}</td>
                    </tr>
                    {groupedMenus[module].map((item, index) => (
                      <tr key={`${module}-${item.menuName}`} className="hover:bg-gray-50">
                        <td className="border p-2">{item.menuName}</td>
                        <td className="border p-2">{item.functionName}</td>
                        {['ค้นหา', 'เพิ่ม', 'ลบ', 'แก้ไข'].map((action) => (
                          <td key={action} className={`border p-2 text-center ${action === 'ค้นหา' ? 'bg-blue-50' : action === 'เพิ่ม' ? 'bg-green-50' : action === 'ลบ' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                            <input
                              type="checkbox"
                              checked={permissions[`${action}-${index}`] || false}
                              onChange={() => handleCheckboxChange(`${action}-${index}`)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
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
