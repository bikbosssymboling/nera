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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
      action: "ปรับสถานะวันทำงาน Y เป็น 1",
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
        <div className="p-4 border-b-1 border-gray-300">
          <h2 className="text-center text-3xl font-bold">📜 History</h2>
        </div>
        {/* table */}
        <div className="flex justify-end p-1  px-7">
          <button className="bg-sky-500 text-white px-2 py-2 rounded flex items-center gap-2">
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
            <thead className="sticky top-0 bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID.</th>
              <th className="border border-gray-300 px-4 py-2">Outsource</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Account</th>
              <th className="border border-gray-300 px-4 py-2">Province</th>
              <th className="border border-gray-300 px-4 py-2">Store</th>
              <th className="border border-gray-300 px-4 py-2">User Update</th>
              <th className="border border-gray-300 px-4 py-2">Update Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.outsource}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.position}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.account}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.province}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.store}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.userUpdate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.updateDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="py-2 px-6 border-t border-gray-300">
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </Modal>
    </>
  );
}
