"use client";
import React, { useEffect, useState, ReactElement, useRef } from "react";
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
  FaTimes,
} from "react-icons/fa";
import "../css/PlanYExclusive.css"
import SetPositionModal from "./SetPositionModal";
import HistoryModal from "./HistoryModal";

interface Row {
  id?: number;
  region?: string;
  province?: string;
  account?: string;
  store?: string;
  supervisor?: string;
  outsource?: string;
  position?: string;
  amount?: number;
  planDays?: number;
  isDeleted?: boolean;
  [key: string]: string | number | boolean | undefined;
}

// เพิ่ม interface สำหรับ mock data
interface MockData {
  id: number;
  region: string;
  province: string;
  account: string;
  store: string;
  supervisor: string;
  outsource: string;
  position: string;
  amount: number;
  planDays: number;
}

// เพิ่ม mock data constant
const MOCK_DATA: MockData[] = [
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
    planDays: 30,
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
    planDays: 25,
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
    planDays: 20,
  },
];

export default function WorkSchedule() {
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
      planDays: 30,
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
      planDays: 25,
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
      planDays: 20,
    },
  ]);

  const lastRowRef = useRef<HTMLSelectElement>(null);

  const handleAddRow = () => {
    // Remove ID for new row
    const newRow = {};
    setRows([...rows, newRow]);

    // Focus the first select of the new row after render
    setTimeout(() => {
      const tableBody = document.querySelector("#work-schedule tbody");
      const lastRow = tableBody?.lastElementChild;
      const firstSelect = lastRow?.querySelector("select");
      (firstSelect as HTMLSelectElement)?.focus();
    }, 0);
  };

  const focusRow = (rowIndex: number) => {
    const tableBody = document.querySelector("#work-schedule tbody");
    const targetRow = tableBody?.children[rowIndex];
    if (targetRow) {
      const firstSelect = targetRow.querySelector("select");
      (firstSelect as HTMLSelectElement)?.focus();
    }
  };

  const handleDeleteRow = (id: number) => {
    const rowToDelete = rows.find(row => row.id === id);
    const deleteIndex = rows.findIndex(row => row.id === id);

    if (rowToDelete && isRowComplete(rowToDelete)) {
      // Row has complete data - mark as deleted for undo
      setRows(prevRows => 
        prevRows.map(row => 
          row.id === id 
            ? { ...row, isDeleted: !row.isDeleted }
            : row
        )
      );
    } else {
      // Row is incomplete - delete permanently
      setRows(prevRows => {
        const newRows = prevRows.filter(row => row.id !== id);
        return newRows.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
      });

      // Focus previous row or first row if deleting first row
      setTimeout(() => {
        const newIndex = Math.max(0, deleteIndex - 1);
        focusRow(newIndex);
      }, 0);
    }
  };

  const handleMoveRowUp = (index: number) => {
    if (index === 0) return; // ไม่ต้องเช็ค id แล้ว เช็ค index แทน
    const newRows = [...rows];
    [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
    setRows(newRows);
    // Focus moved row in new position
    setTimeout(() => focusRow(index - 1), 0);
  };

  const handleMoveRowDown = (index: number) => {
    if (index === rows.length - 1) return; // ไม่ต้องเลื่อนถ้าเป็นแถวสุดท้าย
    const newRows = [...rows];
    [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
    setRows(newRows);
    // Focus moved row in new position
    setTimeout(() => focusRow(index + 1), 0);
  };

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
    // Focus the newly copied row
    setTimeout(() => focusRow(index + 1), 0);
  };

  const [filters, setFilters] = useState({
    region: "ทั้งหมด", // เปลี่ยนค่าเริ่มต้นเป็น "ทั้งหมด"
    province: "ทั้งหมด",
    account: "ทั้งหมด",
    store: "ทั้งหมด",
    supervisor: "ทั้งหมด",
    outsource: "ทั้งหมด",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // Add clear filter handler
  const handleClearFilter = (key: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: "ทั้งหมด"
    }));
  };

  // Add options for select inputs
  const selectOptions = {
    region: [
      "ทั้งหมด", // เพิ่มตัวเลือก "ทั้งหมด"
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
    start: new Date("2025-01-18"),
    end: new Date("2025-03-28"),
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

  const renderManageButtons = (row: Row, index: number) => {
    if (row.isDeleted && isRowComplete(row)) {
      return (
        <button
          className="text-blue-500 cursor-pointer hover:text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded"
          onClick={() => handleDeleteRow(row.id!)}
        >
          ↩️ Undo Delete
        </button>
      );
    }

    return (
      <div className="flex justify-center gap-2">
        <button
          className="text-red-500 cursor-pointer"
          onClick={() => handleDeleteRow(row.id!)}
        >
          <FaTrash />
        </button>
        <button
          className="text-indigo-500 cursor-pointer"
          onClick={() => handleMoveRowUp(index)}
          disabled={index === 0}
        >
          <FaArrowCircleUp />
        </button>
        <button
          className="text-indigo-500 cursor-pointer"
          onClick={() => handleMoveRowDown(index)}
          disabled={index === rows.length - 1}
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
    );
  };

  // Add filter function
  const getFilteredRows = () => {
    return rows.filter(row => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (filterValue === "ทั้งหมด" || !filterValue) return true;
        return row[key] === filterValue;
      });
    });
  };

  const handleSave = () => {
    // Get current visible rows that aren't deleted
    const currentRows = getFilteredRows().filter(row => !row.isDeleted);
    
    // Map rows to include original order and current order
    const upsertRows = currentRows.map((row, currentIndex) => {
      const isNewRow = !row.id;
      const isCopiedRow = row.id && !MOCK_DATA.some(mock => mock.id === row.id);
      const originalRow = MOCK_DATA.find(mock => mock.id === row.id);
      const hasChanges = originalRow && JSON.stringify({
        id: row.id,
        region: row.region,
        province: row.province,
        account: row.account,
        store: row.store,
        supervisor: row.supervisor,
        outsource: row.outsource,
        position: row.position,
        amount: row.amount,
        planDays: row.planDays,
      }) !== JSON.stringify(originalRow);

      // Only include rows that are new, copied, moved, or modified
      if (isNewRow || isCopiedRow || hasChanges || currentIndex !== row.id - 1) {
        return {
          id: row.id,
          region: row.region,
          province: row.province,
          account: row.account,
          store: row.store,
          supervisor: row.supervisor,
          outsource: row.outsource,
          position: row.position,
          amount: row.amount,
          planDays: row.planDays,
          originalOrder: row.id || null,
          currentOrder: currentIndex + 1,
          operation: isNewRow ? 'new' : isCopiedRow ? 'copy' : hasChanges ? 'update' : 'move'
        };
      }
      return null;
    }).filter(Boolean);

    // Get rows marked for deletion (only from original data)
    const deleteIds = rows
      .filter(row => row.isDeleted && MOCK_DATA.some(mock => mock.id === row.id))
      .map(row => ({ id: row.id }));

    const payload = {
      projectId: "PLAN123",
      planDateRange: ["2025-03-15", "2025-04-20"],
      schedule: {
        upsert: upsertRows.map(row => ({
          ...row,
          calendarStatus: {
            "2025-03-15": "1",
            "2025-03-17": "0.5",
            "2025-04-20": row.id === 1 ? "W1" : "S"
          }
        })),
        delete: deleteIds,
        reorderInfo: upsertRows
          .filter(row => row.operation === 'move')
          .map(row => ({
            id: row.id,
            fromPosition: row.originalOrder,
            toPosition: row.currentOrder
          }))
      }
    };

    console.log(JSON.stringify(payload, null, 2));
  };

  return (
    <>
      {/* component สอง */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg mb-6"
        id="project-info-sum"
      >
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
            {
              label: "ภายใน",
              code: "S",
              value: 8,
              color: "bg-red-600 hover:bg-red-700",
            },
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

      {/* component สอง */}
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
                "ทั้งหมด",
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
              <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center justify-between">
                <span>{filter.label}</span>
                {filters[filter.key as keyof typeof filters] !== "ทั้งหมด" && (
                  <button
                    onClick={() => handleClearFilter(filter.key)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 
                             flex items-center gap-1 text-[11px] hover:underline px-1 py-0.5 rounded"
                  >
                    <FaTimes className="w-2.5 h-2.5" />
                    <span>Clear</span>
                  </button>
                )}
              </label>
              <select
                className={`border rounded-md p-2 w-full text-sm transition-all duration-200
                           ${filters[filter.key as keyof typeof filters] !== "ทั้งหมด"
                             ? 'border-blue-400 bg-blue-50/50'
                             : 'border-gray-300 bg-white'
                           }
                           hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
                value={filters[filter.key as keyof typeof filters]}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              >
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          
          {/* Clear All Filters button */}
          <div className="flex items-center justify-end min-w-[140px] space-x-2">
            {Object.values(filters).some(value => value !== "ทั้งหมด") && (
              <button
                onClick={() => setFilters(prev => {
                  const defaultValues: typeof prev = {
                    region: "ทั้งหมด",
                    province: "ทั้งหมด", 
                    account: "ทั้งหมด",
                    store: "ทั้งหมด",
                    supervisor: "ทั้งหมด",
                    outsource: "ทั้งหมด"
                  };
                  return defaultValues;
                })}
                className="bg-blue-100 text-blue-600 hover:bg-blue-200 text-xs px-3 py-2 
                           rounded flex items-center gap-1.5 transition-all duration-200 mr-2"
              >
                <FaTimes className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            )}
            <button className="bg-slate-500 hover:bg-slate-600 text-white text-xs px-3 py-2 
                             rounded flex items-center gap-1 shadow-md transition-all duration-200">
              <FaTrash className="w-4 h-4" /> Original PlanY
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div
          id="work-schedule-container"
          className="w-full h-[40vh] overflow-auto rounded-lg border border-gray-200 grid grid-cols-1"
        >
          <div>
            <table
              id="work-schedule"
              className="border-collapse text-sm w-full"
            >
              <thead className="sticky top-[-1] bg-gray-100 text-gray-800 z-10">
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
                  {dates.reduce(
                    (acc: ReactElement[], date: Date, index: number) => {
                      const month = date.toLocaleString("th-TH", {
                        month: "short",
                      });
                      const day = date.getDate();
                      const isAltMonth = isAlternateMonth(date);

                      // ถ้าเป็นวันแรกของเดือนหรือวันแรกในช่วง
                      if (day === 1 || index === 0) {
                        acc.push(
                          <th
                            key={`month-${date}`}
                            className={`border p-2 text-center border-gray-300 ${
                              isAltMonth ? "bg-blue-100" : "bg-green-100"
                            }`}
                            colSpan={
                              dates.filter(
                                (d) =>
                                  d.getMonth() === date.getMonth() &&
                                  d.getFullYear() === date.getFullYear()
                              ).length
                            }
                          >
                            {month}
                          </th>
                        );
                      }
                      return acc;
                    },
                    []
                  )}
                </tr>
                <tr>
                  {dates.map((date, i) => (
                    <th
                      key={i}
                      className={`border p-2 text-center border-gray-300 ${
                        isAlternateMonth(date) ? "bg-blue-50" : "bg-green-50"
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
                        isAlternateMonth(date) ? "bg-blue-50" : "bg-green-50"
                      }`}
                    >
                      {date.toLocaleString("th-TH", { weekday: "short" })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getFilteredRows().map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-200 transition-colors duration-150 
                      ${row.isDeleted 
                        ? 'bg-gray-50 opacity-60' 
                        : 'hover:bg-gray-50'
                      }`}
                  >
                    <td className="border p-2 text-center">
                      {row.id || '-'}
                    </td>
                    <td className="border p-2 text-center">
                      {renderManageButtons(row, index)}
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
                                String(
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
                                )
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
                              disabled={row.isDeleted}
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
                              disabled={row.isDeleted}
                            />
                          )}
                        </td>
                      ))}
                    {dates.map((date, i) => (
                      <td
                        key={i}
                        className={`border p-2 text-center ${
                          isAlternateMonth(date)
                            ? "bg-blue-50/30"
                            : "bg-green-50/30"
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
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start gap-3 mt-6">
          <button
            onClick={handleAddRow}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:transform active:scale-95"
          >
            <FaPlus className="w-3.5 h-3.5" /> เพิ่มแถว
          </button>
          <button
            className={`text-white text-sm px-4 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition-all duration-200 ${
              isAllRowsComplete()
                ? "bg-green-600 hover:bg-green-700 hover:shadow-md active:transform active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isAllRowsComplete()}
            onClick={handleSave}
          >
            <FaSave className="w-3.5 h-3.5" /> บันทึก
          </button>
        </div>
      </div>

      {/* component สอง */}
      <SetPositionModal
        isOpen={showPositionModal}
        onClose={() => setShowPositionModal(false)}
      />

      {/* component สอง */}
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </>
  );
}
