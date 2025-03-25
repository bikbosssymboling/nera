"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

interface KPI {
  KPIID: number;
  KPISetName: string;
  TotalKPIs: string;
}

interface KPIItem {
  id: number;
  name: string;
  type: string;
  target: string;
}

interface KPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPI | null;
  mode: "add" | "edit";
}

const KPIModal: React.FC<KPIModalProps> = ({ isOpen, onClose, kpi, mode }) => {
  const [kpiSetName, setKpiSetName] = useState<string>("");
  const [kpiItems, setKpiItems] = useState<KPIItem[]>([
    { id: 1, name: "", type: "Quality", target: "" },
  ]);

  useEffect(() => {
    if (mode === "edit" && kpi) {
      setKpiSetName(kpi.KPISetName);
      // ✅ ดึง KPI Items มาจาก kpi object ถ้ามี
      setKpiItems([
        { id: 1, name: "การตรวจต่อเวลาของการทำงาน เข้า-ออก-พัก", type: "Quality", target: "95%-100%" },
        { id: 2, name: "การส่งมอบรายงานถูกต้องและตรงต่อเวลา", type: "Quality", target: "95%-100%" },
        { id: 3, name: "การแต่งกายถูกต้องตามแบบฟอร์มบริษัท", type: "Quality", target: "100%" },
        { id: 4, name: "การอยู่ประจำจุดพื้นที่ขาย", type: "Quality", target: "95%-100%" },
        { id: 5, name: "มีความรู้เกี่ยวกับผลิตภัณฑ์อย่างถูกต้อง", type: "Quality", target: "95%-100%" },
        { id: 6, name: "มีความกระตือรือร้นในการเข้าหาลูกค้า", type: "Quality", target: "95%-100%" },
        { id: 7, name: "อื่น ๆ", type: "Quality", target: "" },
        { id: 8, name: "จำนวนยอดขายสินค้า", type: "Quantity", target: "" },
        { id: 9, name: "จำนวนยอดแลกสินค้า", type: "Quantity", target: "" },
        { id: 10, name: "จำนวนยอดแลกชิม", type: "Quantity", target: "" },
        { id: 11, name: "การเก็บรายชื่อฐานข้อมูลลูกค้า", type: "Quantity", target: "" },
      ]);
    } else if (mode === "add") {
      setKpiSetName("");
      setKpiItems([{ id: 1, name: "", type: "Quality", target: "" }]);
    }
  }, [kpi, mode]);

  const addKpiRow = () => {
    setKpiItems([...kpiItems, { id: kpiItems.length + 1, name: "", type: "Quality", target: "" }]);
  };

  const removeKpiRow = (id: number) => {
    Swal.fire({
      icon: "warning",
      text: "คุณต้องการลบ KPI นี้ใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        setKpiItems(kpiItems.filter((item) => item.id !== id));
      }
    });
  };

  const handleSave = () => {
    // ✅ ทำ API Save Logic ตรงนี้ได้
    Swal.fire("บันทึกสำเร็จ", "KPI ถูกบันทึกแล้ว", "success");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg shadow-lg p-8 w-[1100px] mx-auto"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <h2 className="text-3xl font-bold text-center mb-6">{mode === "edit" ? "Edit KPI" : "Add New KPI"}</h2>

      <div className="mb-6">
        <label className="font-semibold">KPI Set Name</label>
        <input
          type="text"
          className="border rounded p-2 w-full mt-2"
          placeholder="Enter KPI Set Name"
          value={kpiSetName}
          onChange={(e) => setKpiSetName(e.target.value)}
        />
      </div>

      <table className="w-full mt-4 border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-10">#</th>
            <th className="border p-2">KPI Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Target</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kpiItems.map((item, index) => (
            <tr key={item.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  className="border rounded p-1 w-full"
                  value={item.name}
                  onChange={(e) =>
                    setKpiItems(
                      kpiItems.map((k) => (k.id === item.id ? { ...k, name: e.target.value } : k))
                    )
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="border rounded p-1 w-full"
                  value={item.type}
                  onChange={(e) =>
                    setKpiItems(
                      kpiItems.map((k) => (k.id === item.id ? { ...k, type: e.target.value } : k))
                    )
                  }
                >
                  <option value="Quality">ตัวชี้วัดคุณภาพ</option>
                  <option value="Quantity">ตัวชี้วัดปริมาณ</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="border rounded p-1 w-full"
                  placeholder="95%-100%"
                  value={item.target}
                  onChange={(e) =>
                    setKpiItems(
                      kpiItems.map((k) => (k.id === item.id ? { ...k, target: e.target.value } : k))
                    )
                  }
                />
              </td>
              <td className="border p-2 text-center">
                <button className="text-red-500" onClick={() => removeKpiRow(item.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addKpiRow}>
          + Add KPI Row
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-6">
      <button 
        onClick={handleSave} 
        className="text-white px-6 py-2 rounded" 
        style={{ backgroundColor: "#7066e0" }}
        >
         Save
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded">
         Cancel
        </button>
      </div>
    </Modal>
  );
};

export default KPIModal;
