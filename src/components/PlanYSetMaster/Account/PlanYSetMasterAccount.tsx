"use client";
import { useState } from "react";
import { FaBriefcase, FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import AccountModal from "./PlanYSetMasterAccountModalChange";
import { accountDelete } from "../../../services/callAPI/PlanYMasterSetup/Account/apiAccountService";

// 🔧 ปรับ Interface ให้รองรับ `id: number` และ `accountCode`
interface Account {
    id: number;
    accountCode: string;
    name: string;
    nameEng: string;
}

export default function PlanYSetMasterAccount() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editAccount, setEditAccount] = useState<Account | null>(null); // ✅ กำหนด Type

    const accounts: Account[] = [
        { id: 1, accountCode: "TW01", name: "Thai Watsadu", nameEng: "Thai Watsadu" },
        { id: 2, accountCode: "KIS002", name: "KIS - UPC", nameEng: "KIS - UPC" },
        { id: 3, accountCode: "KIS001", name: "KIS - BKK", nameEng: "KIS - BKK" },
        { id: 4, accountCode: "UFM002", name: "UFM - UPC", nameEng: "UFM - UPC" },
        { id: 5, accountCode: "UFM001", name: "UFM - BKK", nameEng: "UFM - BKK" },
        { id: 6, accountCode: "MH01", name: "Mega Home", nameEng: "Mega Home" },
        { id: 7, accountCode: "HP01", name: "Homepro", nameEng: "Homepro" },
        { id: 8, accountCode: "GH01", name: "Global House", nameEng: "Global House" },
        { id: 9, accountCode: "Petshop01", name: "Pet Shop", nameEng: "Pet Shop" },
        { id: 10, accountCode: "Center001", name: "Car Center", nameEng: "Car Center" },
        { id: 11, accountCode: "Other29", name: "จังหวัดระนอง", nameEng: "Ranong Province" },
        { id: 12, accountCode: "TFM002", name: "TFM - UPC", nameEng: "TFM - UPC" },
        { id: 13, accountCode: "TFM001", name: "TFM - BKK", nameEng: "TFM - BKK" },
        { id: 14, accountCode: "BANK001", name: "BANK - BKK", nameEng: "Bank - BKK" },
        { id: 15, accountCode: "GOV", name: "Government center", nameEng: "Government Center" },
        { id: 16, accountCode: "7UPC", name: "7-ELEVEN - UPC", nameEng: "7-Eleven - UPC" },
        { id: 17, accountCode: "BIGC01", name: "Big C - BKK", nameEng: "Big C - Bangkok" },
        { id: 18, accountCode: "BIGC02", name: "Big C - UPC", nameEng: "Big C - UPC" },
        { id: 19, accountCode: "TESCO01", name: "Tesco Lotus - BKK", nameEng: "Tesco Lotus - Bangkok" },
        { id: 20, accountCode: "TESCO02", name: "Tesco Lotus - UPC", nameEng: "Tesco Lotus - UPC" },
        { id: 21, accountCode: "MAKRO01", name: "Makro - BKK", nameEng: "Makro - Bangkok" },
        { id: 22, accountCode: "MAKRO02", name: "Makro - UPC", nameEng: "Makro - UPC" },
        { id: 23, accountCode: "VILLA01", name: "Villa Market - BKK", nameEng: "Villa Market - Bangkok" },
        { id: 24, accountCode: "VILLA02", name: "Villa Market - UPC", nameEng: "Villa Market - UPC" },
        { id: 25, accountCode: "TOPS01", name: "Tops Market - BKK", nameEng: "Tops Market - Bangkok" },
        { id: 26, accountCode: "TOPS02", name: "Tops Market - UPC", nameEng: "Tops Market - UPC" },
        { id: 27, accountCode: "CENTRAL01", name: "Central - BKK", nameEng: "Central - Bangkok" },
        { id: 28, accountCode: "CENTRAL02", name: "Central - UPC", nameEng: "Central - UPC" },
        { id: 29, accountCode: "ROB01", name: "Robinson - BKK", nameEng: "Robinson - Bangkok" },
        { id: 30, accountCode: "ROB02", name: "Robinson - UPC", nameEng: "Robinson - UPC" },
    ];
    
    const filteredAccounts = accounts.filter(account =>
        account.accountCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.nameEng.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    // ✅ ฟังก์ชันเปิด Modal สำหรับ "เพิ่ม" หรือ "แก้ไข"
    const handleEdit = (account?: Account) => {
        setEditAccount(account || null);
        setIsModalOpen(true);
    };

    // ✅ ฟังก์ชันลบข้อมูลออกจาก state
    const handleDelete = async (accountCode: string) => {
        Swal.fire({
            icon: "warning",
            text: "คุณต้องการลบ Account นี้ใช่หรือไม่?",
            showCancelButton: true,
            confirmButtonColor: "#007BFF",
            cancelButtonColor: "#6C757D",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // ✅ เรียก API ลบข้อมูล โดยส่ง `accountCode`
                    const data = await accountDelete(accountCode);

                    // ✅ เช็คสถานะการลบ
                    if (data.status === "Success") {
                        Swal.fire({
                            icon: "success",
                            title: "ลบข้อมูลเรียบร้อย",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "ไม่สามารถลบข้อมูลได้",
                            text: data.error_message || "เกิดข้อผิดพลาด",
                        });
                    }
                } catch (error: unknown) {
                    let errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้<br>";
                    if (error instanceof Error) {
                        errorMessage += `<span class="text-red-500">${error.message}</span>`;
                    }
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        html: errorMessage,
                    });
                }
            }
        });
    };

    return (
        <div className="p-2">
            {/* Header */}
            <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
                <FaBriefcase className="mr-2" /> Setup Master Account
            </h2>

            {/* Search and Add Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="ค้นหา Account..."
                        className="border p-2 rounded-md w-72"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaSearch /> Search
                    </button>
                </div>
                <button
                    className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    onClick={() => handleEdit()} // ✅ เปิด Modal โดยไม่มีข้อมูล (เพิ่มใหม่)
                >
                    <FaPlus className="mr-1 inline-block" /> Add Account
                </button>
            </div>

            {/* Account Table */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
                        <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
                            <tr className="bg-gray-200 text-xs">
                                <th className="border border-gray-300 p-2">#</th>
                                <th className="border border-gray-300 p-2">Account Code</th>
                                <th className="border border-gray-300 p-2">Account Name</th>
                                <th className="border border-gray-300 p-2">Account Name (English)</th>
                                <th className="border border-gray-300 p-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccounts.map((account, index) => (
                                <tr key={account.id} className="text-xs text-gray-900">
                                    <td className="border p-2 border-gray-300 text-center">{index + 1}</td>
                                    <td className="border p-2 border-gray-300">{account.accountCode}</td>
                                    <td className="border p-2 border-gray-300">{account.name}</td>
                                    <td className="border p-2 border-gray-300">{account.nameEng}</td>
                                    <td className="border p-2 border-gray-300">
                                        <div className="flex justify-center items-center space-x-1">
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleEdit(account)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleDelete(account.accountCode)}
                                            >
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


            {/* ✅ Modal */}
            <AccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} account={editAccount} />
        </div>
    );
}
