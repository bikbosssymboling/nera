import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaPlus, FaPlusCircle, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SetPositionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState("KPI 1");
  const [originalData, setOriginalData] = useState<
    typeof positionAndKPI | null
  >(null);
  const [originalKPI, setOriginalKPI] = useState<string | null>(null);
  const [positionAndKPI, setPositionAndKPI] = useState([
    {
      id: "pos1",
      position: "Position 1",
      dailyCompensation: "1,000",
      isDeleted: false,
      isModified: false,
    },
    {
      id: "pos2",
      position: "Position 2",
      dailyCompensation: "2,000",
      isDeleted: false,
      isModified: false,
    },
    {
      id: "pos3",
      position: "Position 3",
      dailyCompensation: "3,000",
      isDeleted: false,
      isModified: false,
    },
    {
      id: "pos4",
      position: "Position 4",
      dailyCompensation: "4,000",
      isDeleted: false,
      isModified: false,
    },
  ]);

  const positions = [
    "--Select Position--",
    "Position 1",
    "Position 2",
    "Position 3",
    "Position 4",
  ];
  const kpiOptions = ["KPI 1", "KPI 2", "KPI 3", "KPI 4"];

  const handleAddRow = () => {
    const newIndex = positionAndKPI.length;
    setPositionAndKPI([
      ...positionAndKPI,
      {
        id: `pos${Date.now()}`,
        position: "--Select Position--",
        dailyCompensation: "",
        isDeleted: false,
        isModified: false,
      },
    ]);

    setTimeout(() => {
      const tableContainer = document.querySelector(".overflow-auto");
      if (tableContainer) {
        tableContainer.scrollTo({
          top: tableContainer.scrollHeight,
          behavior: "smooth",
        });

        const newSelect = document.querySelector(
          `[data-row-index="${newIndex}"] select`
        );
        if (newSelect instanceof HTMLSelectElement) {
          newSelect.focus();
        }
      }
    }, 100);
  };

  const handleCompensationChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, "");
    const formattedValue = newValue ? Number(newValue).toLocaleString() : "";
    const updatedData = [...positionAndKPI];
    updatedData[index] = {
      ...updatedData[index],
      dailyCompensation: formattedValue,
      isModified: true,
    };
    setPositionAndKPI(updatedData);
  };

  const handlePositionChange = (index: number, value: string) => {
    const updatedData = [...positionAndKPI];
    updatedData[index] = {
      ...updatedData[index],
      position: value,
      isModified: true,
    };
    setPositionAndKPI(updatedData);
  };

  const handleDeleteRow = (index: number) => {
    if (
      positionAndKPI[index].position === "--Select Position--" ||
      !positionAndKPI[index].dailyCompensation
    ) {
      const updatedData = positionAndKPI.filter((_, i) => i !== index);
      if (updatedData.length === 0) {
        setPositionAndKPI([
          {
            id: `pos${Date.now()}`,
            position: "--Select Position--",
            dailyCompensation: "",
            isDeleted: false,
            isModified: false,
          },
        ]);
      } else {
        setPositionAndKPI(updatedData);
      }
      return;
    }

    const updatedData = [...positionAndKPI];
    updatedData[index] = { ...updatedData[index], isDeleted: true };
    setPositionAndKPI(updatedData);
  };

  const handleUndoDelete = (index: number) => {
    const updatedData = [...positionAndKPI];
    updatedData[index] = { ...updatedData[index], isDeleted: false };
    setPositionAndKPI(updatedData);
  };

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);

    // Reset data to original state
    if (originalData) {
      setPositionAndKPI(originalData);
    }
    if (originalKPI) {
      setSelectedKPI(originalKPI);
    }

    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Save original state when modal opens
      setOriginalData([...positionAndKPI]);
      setOriginalKPI(selectedKPI);
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  const isFormValid = () => {
    return positionAndKPI.every(
      (item) =>
        item.position !== "--Select Position--" && item.dailyCompensation !== ""
    );
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      return;
    }

    const result = await Swal.fire({
      title: "ยืนยันการบันทึก",
      text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      // Prepare form data
      const formData = {
        kpiId: selectedKPI.replace("KPI ", ""),
        name: selectedKPI,
        positions: {
          upsert: positionAndKPI
            .filter((item) => !item.isDeleted && (item.isModified || !item.id))
            .map((item) => ({
              ...(item.id && { id: item.id }),
              position: item.position,
              dailyCompensation: parseInt(
                item.dailyCompensation.replace(/,/g, "")
              ),
            })),
          delete: positionAndKPI
            .filter((item) => item.isDeleted && item.id)
            .map((item) => item.id),
        },
      };

      console.log("Form Data:", formData);

      Swal.fire("บันทึกสำเร็จ!", "ข้อมูลถูกบันทึกเรียบร้อยแล้ว", "success");
    }
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx>{`
        .tr-highlight {
          transition: all 0.3s ease;
        }
        .tr-highlight:last-child {
          background: #f0f9ff;
        }
      `}</style>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className={`rounded-lg shadow-xl bg-white flex flex-col h-[70vh] w-[800px] border border-gray-200 ${
          isClosing ? "pop-out-reverse" : "pop-out"
        }`}
      >
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Set Position and KPI
          </h1>
        </div>
        <div className="my-2 mx-6 flex justify-end">
          <select
            value={selectedKPI}
            onChange={(e) => setSelectedKPI(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {kpiOptions.map((kpi) => (
              <option key={kpi} value={kpi}>
                {kpi}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 overflow-auto mx-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="sticky top-[-1] bg-gray-200 z-10">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Position</th>
                <th className="border border-gray-300 px-4 py-2">
                  Daily Compensation (THB)
                </th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="relative z-0">
              {positionAndKPI.map((item, index) => (
                <tr
                  key={index}
                  data-row-index={index}
                  className={`tr-highlight ${
                    item.isDeleted ? "opacity-50 bg-gray-100" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {item.isDeleted ? (
                      <div className="text-gray-500">{item.position}</div>
                    ) : (
                      <select
                        value={item.position}
                        onChange={(e) =>
                          handlePositionChange(index, e.target.value)
                        }
                        className="w-full p-1 rounded appearance-none bg-white pr-6 relative focus:ring-2 focus:ring-indigo-500"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.25rem center",
                          backgroundSize: "14px",
                        }}
                      >
                        {positions.map((pos) => (
                          <option
                            key={pos}
                            value={pos}
                            disabled={pos === "--Select Position--"}
                            className={pos === item.position ? "hidden" : ""}
                          >
                            {pos}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.isDeleted ? (
                      <div className="text-gray-500">
                        {item.dailyCompensation} บาท
                      </div>
                    ) : (
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={`${item.dailyCompensation}`}
                          onChange={(e) =>
                            handleCompensationChange(index, e.target.value)
                          }
                          className="w-full p-1 rounded pr-12"
                          placeholder="ค่าตอบแทนรายวัน"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                          บาท
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.isDeleted ? (
                      <button
                        className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs shadow-sm hover:bg-blue-600 transition-colors duration-150"
                        onClick={() => handleUndoDelete(index)}
                      >
                        undo
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-3 py-1.5 rounded text-xs shadow-sm hover:bg-red-600 transition-colors duration-150"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" p-2 flex justify-center">
          <button
            onClick={handleAddRow}
            className="bg-green-500 text-white px-3 py-1.5 text-sm rounded shadow-sm hover:bg-green-600 transition-colors duration-150 flex items-center gap-1"
          >
            <FaPlus size={12} /> เพิ่มแถว
          </button>
        </div>
        <div className="py-4 flex justify-center border-t border-gray-200 gap-3 bg-gray-50">
          <button
            onClick={handleSave}
            className={`text-white px-4 py-2 rounded shadow-sm transition-colors duration-150 ${
              isFormValid()
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            บันทึก
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded shadow-sm hover:bg-gray-600 transition-colors duration-150"
          >
            ยกเลิก
          </button>
        </div>
      </Modal>
    </>
  );
}
