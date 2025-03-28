"use client";
import React, { useEffect, useState, ReactElement } from "react";
import {
  FaCheckSquare,
  FaUserCog,
  FaPlay,
  FaFileImport,
  FaFileExcel,
  FaDollarSign,
  FaHistory,
  FaSave,
  FaPlus,
  FaTrash,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaCopy,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./css/PlanYExclusive.css";
import SetPositionModal from "./components/SetPositionModal";
import HistoryModal from "./components/HistoryModal";

// First, update the Row interface to include all necessary fields
interface Row {
  id: number;
  region?: string;
  province?: string;
  account?: string;
  store?: string;
  supervisor?: string;
  outsource?: string;
  position?: string;
  amount?: number;
  planDays?: number;
  [key: string]: string | number | undefined;
}

export default function PlanYExclusiveDetail() {
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      region: "Northern - ภาคเหนือ",
      province: "เชียงใหม่",
      account: "LOTUS",
      store: "Store A",
      supervisor: "EMP-001 John",
      outsource: "OUT-001 น้องหนึ่ง",
      position: "Position A",
      amount: 500,
      planDays: 30
    },
    {
      id: 2,
      region: "Central - ภาคกลาง",
      province: "เชียงราย",
      account: "BIGC",
      store: "Store B",
      supervisor: "EMP-002 Jane",
      outsource: "OUT-002 น้องสอง",
      position: "Position B",
      amount: 750,
      planDays: 25
    },
    {
      id: 3,
      region: "Eastern - ภาคตะวันออก",
      province: "น่าน",
      account: "TOPS",
      store: "Store C",
      supervisor: "EMP-003 Michael",
      outsource: "OUT-003 น้องสาม",
      position: "Position C",
      amount: 600,
      planDays: 20
    }
  ]);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
    // Reorder remaining rows' IDs
    setRows((prevRows) =>
      prevRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }))
    );
  };

  const handleMoveRowUp = (index: number) => {
    if (index === 0) return; // ไม่ต้องเช็ค id แล้ว เช็ค index แทน
    const newRows = [...rows];
    [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
    setRows(newRows);
  };

  const handleMoveRowDown = (index: number) => {
    if (index === rows.length - 1) return; // ไม่ต้องเลื่อนถ้าเป็นแถวสุดท้าย
    const newRows = [...rows];
    [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
    setRows(newRows);
  };

  // Add handleCopyRow function
  const handleCopyRow = (index: number) => {
    const newRows = [...rows];

    const copiedRow = { ...newRows[index] }; // Clone ค่าในแถวนั้น
    copiedRow.id = newRows.length + 1; // ตั้ง id ใหม่ (หรือให้ auto ก็ได้)

    // แทรกแถวใหม่ใต้แถวเดิม
    newRows.splice(index + 1, 0, copiedRow);

    // อัปเดต id ทุกแถวให้เรียงใหม่ (optional)
    const updatedRows = newRows.map((row, idx) => ({
      ...row,
      id: idx + 1,
    }));

    setRows(updatedRows);
  };

  const [filters, setFilters] = useState({
    region: "Northern - ภาคเหนือ",
    province: "ทั้งหมด",
    account: "ทั้งหมด",
    store: "ทั้งหมด",
    supervisor: "ทั้งหมด",
    outsource: "ทั้งหมด",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // Add options for select inputs
  const selectOptions = {
    region: [
      "Northern - ภาคเหนือ",
      "Central - ภาคกลาง",
      "Northeastern - อีสาน",
      "Eastern - ภาคตะวันออก",
      "Southern - ภาคใต้",
      "Western - ภาคตะวันตก",
    ],
    province: ["เชียงราย", "น่าน", "เชียงใหม่", "พิษณุโลก", "สุโขทัย"],
    account: ["LOTUS", "BIGC", "TOPS"],
    store: ["Store A", "Store B", "Store C"],
    supervisor: ["EMP-001 John", "EMP-002 Jane", "EMP-003 Michael"],
    outsource: ["OUT-001 น้องหนึ่ง", "OUT-002 น้องสอง", "OUT-003 น้องสาม"],
    position: ["Position A", "Position B", "Position C", "Position D"],
  };

  // Add mapping for placeholders
  const placeholders = {
    region: "เลือก Region",
    province: "เลือก Province",
    account: "เลือก Account",
    store: "เลือก Store",
    supervisor: "เลือก Supervisor",
    outsource: "เลือก Outsource",
    position: "เลือก Position",
  };

  // เพิ่มฟังก์ชันตรวจสอบข้อมูลครบถ้วน
  const isRowComplete = (row: Row): boolean => {
    return !!(
      row.region &&
      row.province &&
      row.account &&
      row.store &&
      row.supervisor &&
      row.outsource &&
      row.position &&
      row.amount &&
      row.planDays
    );
  };

  const isAllRowsComplete = (): boolean => {
    return rows.every(isRowComplete);
  };

  // เพิ่ม state สำหรับวันที่
  const [dateRange] = useState({
    start: new Date('2025-01-18'),
    end: new Date('2025-03-28')
  });

  // ฟังก์ชันสร้าง array ของวันที่ระหว่าง start ถึง end
  const getDatesInRange = () => {
    const dates = [];
    const currentDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // สร้าง array ของวันที่ทั้งหมดในช่วง
  const dates = getDatesInRange();

  // เพิ่มฟังก์ชันสำหรับตรวจสอบเดือน
  const isAlternateMonth = (date: Date): boolean => {
    return date.getMonth() % 2 === 0;
  };

  return (
    <>
      <div>
        {/* Project Information */}
        <div
          className="w-full bg-white p-6 rounded-lg shadow-lg mb-6"
          id="project-info"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">
                📌 Project Information
              </h2>
              <div className="flex items-center gap-4">
                <p>
                  <strong className="text-black">Request:</strong>{" "}
                  <span className="text-blue-500">ทดสอบขอ อนุมัติ</span>
                </p>
                <p className="flex items-center gap-2">
                  <strong className="text-black">Approve:</strong>
                  <span className="text-green-500">ทดสอบ อนุมัติแผน</span>
                  <button className="text-green-500">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-check"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                      ></path>
                    </svg>
                  </button>
                </p>
              </div>
            </div>

            {/* Row 1: PR NO, AL NO, Quotation, Date, Work Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
              <p>
                <strong className="text-black">PR NO:</strong>{" "}
                <span className="text-blue-500 cursor-pointer">
                  PR123456789
                </span>
              </p>
              <p>
                <strong className="text-black">AL NO:</strong>{" "}
                <span className="text-green-500">AL123456789</span>
              </p>
              <p>
                <strong className="text-black">Quotation:</strong>{" "}
                <span className="text-amber-500">QT2025022501</span>
              </p>
              <p>
                <strong className="text-black">Date:</strong>{" "}
                <span className="text-blue-500">2025-01-18</span>{" "}
                <span className="text-black">to</span>{" "}
                <span className="text-blue-500">2025-02-28</span>
              </p>
              <p>
                <strong className="text-black">Work Time:</strong>{" "}
                <span className="text-indigo-600">11:00 - 20:00</span>
              </p>
            </div>
            {/* Row 2: Project, Job Type, Remark */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <p>
                <strong className="text-black">Project:</strong>{" "}
                <span className="text-indigo-600">New Project</span>
              </p>
              <p>
                <strong className="text-black">Job Type:</strong>{" "}
                <span className="text-indigo-600">2.1 PG/BA</span>
              </p>
              <p>
                <strong className="text-black">Remark:</strong>{" "}
                <span className="text-indigo-600">
                  ค่าจ้าง(รายวัน) งาน Sino ทำงาน 1 - 3 DEC 24 (ออกรอบ 31 Dec 24)
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6" id="project-info-sum">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 text-xs w-full">
            {[
              {
                label: "จำนวนวันทำงาน",
                code: "Y",
                value: 100,
                color: "bg-gray-600 hover:bg-gray-700",
              },
              {
                label: "ทำงานเต็มวัน",
                code: "1",
                value: 20,
                color: "bg-green-600 hover:bg-green-700",
              },
              {
                label: "ทำงานครึ่งวัน",
                code: "0.5",
                value: 12,
                color: "bg-green-600 hover:bg-green-700",
              },
              { label: "ภายใน", code: "S", value: 8, color: "bg-red-600 hover:bg-red-700" },
              {
                label: "เช็คอินเเล้วรอคีย์ยอด",
                code: "W",
                value: 8,
                color: "bg-orange-600 hover:bg-orange-700",
              },
              {
                label: "คีย์ยอดเเล้วรอ Monitor",
                code: "W1",
                value: 8,
                color: "bg-yellow-600 hover:bg-yellow-700",
              },
              {
                label: "รอ Data ตรวจสอบ",
                code: "W2",
                value: 8,
                color: "bg-blue-600 hover:bg-blue-700",
              },
              {
                label: "รอแก้ไขยอด",
                code: "WE",
                value: 8,
                color: "bg-fuchsia-600 hover:bg-fuchsia-700",
              },
              {
                label: "อนุมัติส่งข้อมูลให้เเล้ว",
                code: "P",
                value: 8,
                color: "bg-emerald-600 hover:bg-emerald-700",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center pl-4 border-l border-gray-200 first:border-l-0 transition-all duration-200 hover:shadow-md rounded-lg py-2"
              >
                <span className="text-gray-700 text-[12px] font-medium mb-1.5">
                  {item.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-800">
                    {item.code}:
                  </span>
                  <span
                    className={`text-white font-medium px-3 py-1 rounded-md transition-colors duration-200 ${item.color}`}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 w-full rounded-lg shadow-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h4 className="text-xl font-semibold text-gray-800">
              📅 Work Schedule [PlanY]
            </h4>
            <div className="flex gap-2.5">
              {[
                {
                  icon: FaCheckSquare,
                  text: "Request Approve",
                  color: "bg-green-600 hover:bg-green-700",
                  onClick: () => console.log("Request Approve button clicked"),
                },
                {
                  icon: FaUserCog,
                  text: "Position/KPI",
                  color: "bg-fuchsia-600 hover:bg-fuchsia-700",
                  onClick: () => setShowPositionModal(true),
                },
                {
                  icon: FaPlay,
                  text: "PlanY Start",
                  color: "bg-violet-600 hover:bg-violet-700",
                  onClick: () => console.log("start"),
                },
                {
                  icon: FaFileImport,
                  text: "Import PlanY",
                  color: "bg-sky-600 hover:bg-sky-700",
                  onClick: () => console.log("Import PlanY button clicked"),
                },
                {
                  icon: FaFileExcel,
                  text: "Template",
                  color: "bg-amber-600 hover:bg-amber-700",
                  onClick: () => console.log("Template button clicked"),
                },
                {
                  icon: FaDollarSign,
                  text: "To Pay",
                  color: "bg-yellow-600 hover:bg-yellow-700",
                  onClick: () => console.log("To Pay button clicked"),
                },
                {
                  icon: FaHistory,
                  text: "History",
                  color: "bg-blue-600 hover:bg-blue-700",
                  onClick: () => setShowHistoryModal(true),
                },
              ].map((btn, index) => (
                <button
                  key={index}
                  className={`${btn.color} text-white text-xs px-4 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:transform active:scale-95`}
                  onClick={btn.onClick}
                >
                  <btn.icon className="w-3.5 h-3.5" /> {btn.text}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-7 gap-4 text-sm mb-6 items-end bg-gray-50 p-4 rounded-lg">
            {[
              {
                label: "Region",
                key: "region",
                options: [
                  "Northern - ภาคเหนือ",
                  "Central - ภาคกลาง",
                  "Northeastern - อีสาน",
                  "Eastern - ภาคตะวันออก",
                  "Southern - ภาคใต้",
                  "Western - ภาคตะวันตก",
                ],
              },
              {
                label: "Province",
                key: "province",
                options: [
                  "ทั้งหมด",
                  "เชียงราย",
                  "น่าน",
                  "เชียงใหม่",
                  "พิษณุโลก",
                  "สุโขทัย",
                ],
              },
              {
                label: "Account",
                key: "account",
                options: ["ทั้งหมด", "LOTUS", "BIGC", "TOPS"],
              },
              {
                label: "Store",
                key: "store",
                options: ["ทั้งหมด", "Store A", "Store B", "Store C"],
              },
              {
                label: "Supervisor",
                key: "supervisor",
                options: [
                  "ทั้งหมด",
                  "EMP-001 John",
                  "EMP-002 Jane",
                  "EMP-003 Michael",
                ],
              },
              {
                label: "Outsource",
                key: "outsource",
                options: [
                  "ทั้งหมด",
                  "OUT-001 น้องหนึ่ง",
                  "OUT-002 น้องสอง",
                  "OUT-003 น้องสาม",
                ],
              },
            ].map((filter, index) => (
              <div key={index} className="min-w-[140px]">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {filter.label}
                </label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full text-sm text-gray-800 bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                  value={filters[filter.key as keyof typeof filters]}
                  onChange={(e) =>
                    handleFilterChange(filter.key, e.target.value)
                  }
                >
                  {filter.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* ✅ ทำให้ปุ่มอยู่ในแถวเดียวกัน */}
            <div className="flex items-center justify-end min-w-[140px]">
              <button className="bg-slate-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                <FaTrash className="w-4 h-4" /> Original PlanY
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div id="work-schedule-container" className="w-full overflow-x-auto rounded-lg border border-gray-200 grid grid-cols-1">
            <table id="work-schedule" className="border-collapse text-sm w-full">
              <thead className="sticky top-0 bg-gray-100 text-gray-800 z-10">
                <tr>
                  {[
                    {
                      label: "ID",
                      minWidth: "50px",
                      rowspan: 4,
                      className: "id-column",
                    },
                    {
                      label: "Manage",
                      minWidth: "100px",
                      rowspan: 4,
                      className: "manage-column",
                    },
                    { label: "Job", minWidth: "130px", rowspan: 4 },
                    {
                      label: "Region",
                      minWidth: "150px",
                      rowspan: 4,
                      className: "region-column",
                    },
                    { label: "Province", minWidth: "150px", rowspan: 4 },
                    { label: "Account", minWidth: "130px", rowspan: 4 },
                    { label: "Store", minWidth: "130px", rowspan: 4 },
                    { label: "Supervisor", minWidth: "130px", rowspan: 4 },
                    { label: "Outsource", minWidth: "130px", rowspan: 4 },
                    { label: "Position", minWidth: "120px", rowspan: 4 },
                    {
                      label: "Amount",
                      minWidth: "80px",
                      rowspan: 4,
                      className: "amount-column",
                    },
                    { label: "Plan Days", minWidth: "120px", rowspan: 4 },
                  ].map((col, index) => (
                    <th
                      key={index}
                      className={`border p-2 border-gray-300 text-center ${
                        col.className || ""
                      }`}
                      style={{ minWidth: col.minWidth }}
                      rowSpan={col.rowspan}
                    >
                      {col.label}
                    </th>
                  ))}
                  {dates.reduce((acc: ReactElement[], date: Date, index: number) => {
                    const month = date.toLocaleString('th-TH', { month: 'short' });
                    const day = date.getDate();
                    const isAltMonth = isAlternateMonth(date);
                    
                    // ถ้าเป็นวันแรกของเดือนหรือวันแรกในช่วง
                    if (day === 1 || index === 0) {
                      acc.push(
                        <th
                          key={`month-${date}`}
                          className={`border p-2 text-center border-gray-300 ${
                            isAltMonth ? 'bg-blue-100' : 'bg-green-100'
                          }`}
                          colSpan={dates.filter(d => 
                            d.getMonth() === date.getMonth() && 
                            d.getFullYear() === date.getFullYear()
                          ).length}
                        >
                          {month}
                        </th>
                      );
                    }
                    return acc;
                  }, [])}
                </tr>
                <tr>
                  {dates.map((date, i) => (
                    <th
                      key={i}
                      className={`border p-2 text-center border-gray-300 ${
                        isAlternateMonth(date) ? 'bg-blue-50' : 'bg-green-50'
                      }`}
                    >
                      {date.getDate()}
                    </th>
                  ))}
                </tr>
                <tr>
                  {dates.map((date, i) => (
                    <th
                      key={i}
                      className={`border p-2 text-xs text-center border-gray-300 ${
                        isAlternateMonth(date) ? 'bg-blue-50' : 'bg-green-50'
                      }`}
                    >
                      {date.toLocaleString('th-TH', { weekday: 'short' })}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border p-2 text-center">{row.id}</td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center gap-2 ">
                        <button
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="text-indigo-500 cursor-pointer"
                          onClick={() => handleMoveRowUp(index)}
                          disabled={index === 0} // Disable for first row
                        >
                          <FaArrowCircleUp />
                        </button>
                        <button
                          className="text-indigo-500 cursor-pointer"
                          onClick={() => handleMoveRowDown(index)}
                          disabled={index === rows.length - 1} // Disable for last row
                        >
                          <FaArrowCircleDown />
                        </button>
                        <button
                          className="text-sky-500 cursor-pointer"
                          onClick={() => handleCopyRow(index)}
                        >
                          <FaCopy />
                        </button>
                        <button className="text-green-500">
                          <FaMapMarkerAlt />
                        </button>
                      </div>
                    </td>
                    <td className="border p-2 text-center">
                      <button className="bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center justify-center gap-1 w-full shadow-md">
                        📄 รอส่งใบ Job
                      </button>
                    </td>
                    {Array(9)
                      .fill("")
                      .map((_, i) => (
                        <td key={i} className="border p-2">
                          {i < 7 ? (
                            <select
                              className="w-full border p-1 text-sm"
                              value={
                                row[
                                  [
                                    "region",
                                    "province",
                                    "account",
                                    "store",
                                    "supervisor",
                                    "outsource",
                                    "position",
                                  ][i] as keyof Row
                                ] || ""
                              }
                              onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index][
                                  [
                                    "region",
                                    "province",
                                    "account",
                                    "store",
                                    "supervisor",
                                    "outsource",
                                    "position",
                                  ][i] as keyof Row
                                ] = e.target.value;
                                setRows(newRows);
                              }}
                            >
                              <option value="" hidden>
                                {
                                  placeholders[
                                    [
                                      "region",
                                      "province",
                                      "account",
                                      "store",
                                      "supervisor",
                                      "outsource",
                                      "position",
                                    ][i] as keyof typeof placeholders
                                  ]
                                }
                              </option>
                              {selectOptions[
                                [
                                  "region",
                                  "province",
                                  "account",
                                  "store",
                                  "supervisor",
                                  "outsource",
                                  "position",
                                ][i] as keyof typeof selectOptions
                              ].map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="number"
                              className="w-full border p-1"
                              min="0"
                              step={i === 7 ? "0.01" : "1"} // Amount can have decimals
                              placeholder={i === 7 ? "Amount" : "Plan Days"}
                              value={row[i === 7 ? "amount" : "planDays"] || ""}
                              onChange={(e) => {
                                const newRows = [...rows];
                                newRows[index][
                                  i === 7 ? "amount" : ("planDays" as keyof Row)
                                ] = parseFloat(e.target.value);
                                setRows(newRows);
                              }}
                            />
                          )}
                        </td>
                      ))}
                    {dates.map((date, i) => (
                      <td 
                        key={i} 
                        className={`border p-2 text-center ${
                          isAlternateMonth(date) ? 'bg-blue-50/30' : 'bg-green-50/30'
                        }`}
                      >
                        <button className="bg-gray-300 text-xs px-2 py-1 rounded cursor-pointer">
                          Y
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-3 mt-6">
            <button
              onClick={handleAddRow}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:transform active:scale-95"
            >
              <FaPlus className="w-3.5 h-3.5" /> Add Row
            </button>
            <button 
              className={`text-white text-sm px-4 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition-all duration-200 ${
                isAllRowsComplete() 
                  ? 'bg-green-600 hover:bg-green-700 hover:shadow-md active:transform active:scale-95' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isAllRowsComplete()}
              onClick={() => console.log('Save clicked')}
            >
              <FaSave className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </div>
      <SetPositionModal
        isOpen={showPositionModal}
        onClose={() => setShowPositionModal(false)}
      />
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </>
  );
}
