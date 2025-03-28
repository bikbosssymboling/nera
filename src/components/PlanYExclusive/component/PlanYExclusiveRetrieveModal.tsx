import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import PlanYExclusiveDetail from "../PlanYExclusiveDetail";

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
  const [project, setProjectName] = useState([
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
    {
      alNo: "1",
      prNo: "กำลังดำเนินการ",
      quotationNo: "กำลังดำเนินการ",
      projectName: "กำลังดำเนินการ",
      startDate: "กำลังดำเนินการ",
      endDate: "กำลังดำเนินการ",
      status: "กำลังดำเนินการ",
    },
  ]);

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
        <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800">เลือกโปรเจค</h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="ค้นหาโปรเจค..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto mx-6 my-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 bg-gradient-to-b from-gray-100 to-gray-200 shadow-sm z-10">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">AL NO</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">PR NO</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">QUOTATION NO</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Project Name</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Start Date</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">End Date</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="border border-gray-300 px-4 py-2">{item.alNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.prNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quotationNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.projectName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.endDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        onClose();
                        setShowModalDetail(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-[12px] text-white px-4 py-1.5 rounded-md transition duration-150 ease-in-out shadow-sm"
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
        <div className="py-4 px-6 border-t bg-gradient-to-r from-gray-50 to-gray-100">
          <button
            onClick={handleClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-150 ease-in-out shadow-sm"
          >
            ปิด
          </button>
        </div>
      </Modal>
      {showModalDetail && <PlanYExclusiveDetail />}
    </>
  );
}
