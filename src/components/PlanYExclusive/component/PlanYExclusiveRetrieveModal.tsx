import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import PlanYExclusiveDetail from "../PlanYExclusiveDetail";
import { FaClock, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export default function PlanYExclusiveRetrieveModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [project, setProjectName] = useState(Array.from({ length: 30 }, (_, i) => ({
    alNo: `AL${String(i + 1).padStart(3, '0')}`,
    prNo: `PR2023${String(i + 1).padStart(3, '0')}`,
    quotationNo: `Q2023${String(i + 1).padStart(4, '0')}`,
    projectName: `โครงการที่ ${i + 1} - ${['ระบบจัดการคลังสินค้า', 'ระบบบัญชีออนไลน์', 'แอปพลิเคชันจองห้องประชุม', 'ระบบรายงานยอดขาย', 'ระบบจัดการบุคลากร'][i % 5]}`,
    startDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-01`,
    endDate: `2023-${String(((i + 3) % 12) + 1).padStart(2, '0')}-${i % 2 ? '30' : '31'}`,
    status: ['กำลังดำเนินการ', 'รอดำเนินการ', 'เสร็จสมบูรณ์'][i % 3]
  })));

  const handleClose = () => {
    if (isClosing) return; // ป้องกันการเรียกซ้ำระหว่าง animation
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // ปิด modal จริงๆ หลัง animation เล่นเสร็จ
    }, 200);
  };

  // เมื่อ modal เปิดใหม่ ให้ reset การปิด
  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  // Add filter function
  const filteredProjects = project.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: <FaHourglassHalf className="inline mr-1" />
        };
      case 'รอดำเนินการ':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: <FaClock className="inline mr-1" />
        };
      case 'เสร็จสมบูรณ์':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <FaCheckCircle className="inline mr-1" />
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: null
        };
    }
  };

  if (!mounted) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className={`rounded-lg shadow-xl bg-white flex flex-col h-[80vh] w-[1300px] ${
          isClosing ? "pop-out-reverse" : "pop-out"
        }`}
      >
        {/* Fixed Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800">เลือกโปรเจค</h1>
        </div>

        <div className="mt-4 ms-6 me-8">
          <input
            type="text"
            placeholder="ค้นหาโปรเจค..."
            className="border border-gray-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto mx-6 mt-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="sticky top-[-1] bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  AL NO
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  PR NO
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  QUOTATION NO
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  Project Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  Start Date
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  End Date
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {item.alNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.prNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quotationNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.projectName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.startDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.endDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {(() => {
                      const style = getStatusStyle(item.status);
                      return (
                        <span className={`px-2 py-1 rounded-full ${style.bgColor} ${style.textColor} text-sm font-medium inline-flex items-center`}>
                          {style.icon}
                          {item.status}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        onClose();
                        setShowModalDetail(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-[12px] text-white px-4 py-1.5 rounded-md transition duration-150 ease-in-out shadow-sm cursor-pointer"
                    >
                      เลือก
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fixed Footer */}
        <div className="py-4 px-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <button
            onClick={handleClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-150 ease-in-out shadow-sm cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </Modal>
      {showModalDetail && <PlanYExclusiveDetail />}
    </>
  );
}
