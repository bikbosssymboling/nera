"use client";
import { useEffect, useState } from "react";
import { FaBriefcase, FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import PositionModal from "./PlanYSetMasterPositionModalChange";
import Swal from "sweetalert2";
import { PositionList, PositionDelete } from "@/services/callAPI/PlanYMasterSetup/Position/apiPositionService";
interface Positions {
    positionID: number;
    positionCode: string;
    positionName: string;
    positionDescription: string;
  }
export default function PlanYSetMasterPosition() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPosition, setEditPosition] = useState<Positions | null>(null);
  const [positions, setPositions] = useState<Positions[]>([]);
  const filteredPosition = positions.filter(
    (pos) =>
      pos.positionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.positionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.positionDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleEdit = (pos?: Positions) => {
    setEditPosition(pos || null);
    setIsModalOpen(true);
  };
  const handleDelete = async (positionID: number) => {
    Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล?",
      text: "คุณต้องการลบ Position นี้ใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonColor: "#007BFF",
      cancelButtonColor: "#6C757D",
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      customClass: {
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded me-2',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
      Swal.fire({
        title: "กำลังลบข้อมูล...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await PositionDelete(positionID);
      getListData(false);
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลเรียบร้อย",
        });
          } catch (error: unknown) {
            let errorMessage = `<span class="text-red-500">${(error as Error).message}</span>`;
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              html: errorMessage,
            });
    }
  }
});
};
  const handleButtonSearch = () => {
    setSearchQuery("");
    getListData();
  }
  const getListData = async (showLoading: boolean = true) => {
    try {
      if (showLoading)  {
        Swal.fire({
          title: "กำลังโหลดข้อมูล...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
      const res = await PositionList();
      const formattedPosition = res.map((pos: any) => ({
            positionID: pos.positionID,
            positionCode: pos.positionCode,
            positionName: pos.positionName,       
            positionDescription: pos.positionDescription,
        }));
        setPositions(formattedPosition);
              if (showLoading) {
                setTimeout(() => {
                  Swal.close();
                }, 500);
              }
            } catch (error: unknown) {
              let errorMessage = `<span class="text-red-500">${(error as Error).message}</span>`;
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: errorMessage,
              });
            }
          };
  useEffect(() => {
    getListData();
  }, []);
  return (
    <div className="p-2">
      {/* Header */}
      <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
        <FaBriefcase className="mr-2" /> Setup Master Position
      </h2>

      {/* Search and Add Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="ค้นหา Position..."
            className="border p-2 rounded-md w-72"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => handleButtonSearch()}
            className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
            <FaSearch /> Search
          </button>
          </div>
        <button
          className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
          onClick={() => handleEdit()} 
        >
          <FaPlus className="mr-1 inline-block" /> Add Region
        </button>
      </div>
      {/* Position Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
            <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Position Code</th>
                <th className="border border-gray-300 p-2">Position Name</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosition.map((pos, index) => (
                <tr key={pos.positionID} className="text-xs text-gray-900">
                  <td className="border p-2 border-gray-300 text-center">{index + 1}</td>
                  <td className="border p-2 border-gray-300">{pos.positionCode}</td>
                  <td className="border p-2 border-gray-300">{pos.positionName}</td>
                  <td className="border p-2 border-gray-300">{pos.positionDescription}</td>
                  <td className="border p-2 border-gray-300">
                    <div className="flex justify-center items-center space-x-1">
                      <button 
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer" 
                        onClick={() => handleEdit(pos)}>
                        <FaEdit />
                      </button>
                      <button 
                        className="bg-red-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer" 
                        onClick={() => handleDelete(pos.positionID)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> 
      <PositionModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      position={editPosition} 
      getListData={getListData} 
      />
    </div>
  );
}