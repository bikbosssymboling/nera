import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
export default function HistoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      outsource: "Company A",
      position: "Developer",
      account: "ACC001",
      province: "Bangkok",
      store: "Store 1",
      userUpdate: "John Doe",
      updateDate: "2024-01-15",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "S", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
    {
      id: 2,
      outsource: "Company B",
      position: "Designer",
      account: "ACC002",
      province: "Chiang Mai",
      store: "Store 2",
      userUpdate: "Jane Smith",
      updateDate: "2024-01-16",
      action: { type: "Y", value: "1" }
    },
  ]);

  const handleClose = () => {
    if (isClosing) return; // ป้องกันการเรียกซ้ำระหว่าง animation
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // ปิด modal จริงๆ หลัง animation เล่นเสร็จ
    }, 200);
  };
  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className={`rounded-lg shadow-lg bg-white flex flex-col h-[80vh] w-[1300px] ${
          isClosing ? "pop-out-reverse" : "pop-out"
        }`}
      >
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-center text-2xl font-semibold text-gray-800">📜 ประวัติการทำรายการ</h2>
        </div>
        <div className="flex justify-end p-4 px-7">
          <button className="bg-sky-500 hover:bg-sky-600 transition-colors duration-200 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                clipRule="evenodd"
              />
            </svg>
            Export Excel
          </button>
        </div>
        <div className="flex-1 overflow-auto mx-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">ID.</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Outsource</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Position</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Account</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Province</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Store</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">User Update</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Update Date</th>
                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.outsource}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.position}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.account}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.province}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.store}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.userUpdate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.updateDate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    ปรับสถานะวันทำงาน {' '}
                    <span className={`px-1 py-0.5 rounded ${
                      item.action.type === 'S' ? 'bg-pink-700 text-white' : 'bg-gray-200'
                    }`}>
                      {item.action.type}
                    </span>
                    {' '}เป็น{' '}
                    <span className="bg-green-200 px-1 py-0.5 rounded">
                      {item.action.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="py-4 px-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white px-6 py-2 rounded-md cursor-pointer shadow-sm"
          >
            ปิด
          </button>
        </div>
      </Modal>
    </>
  );
}
