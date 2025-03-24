"use client";
import { useEffect, useState } from "react";
import { FaBriefcase, FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { accountDelete, accountList } from "../../../services/callAPI/PlanYMasterSetup/Account/apiAccountService";
import AccountModal from "./PlanYSetMasterAccountModalChange";

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
    const [editAccount, setEditAccount] = useState<Account | null>(null); 
    const [accounts, setAccounts] = useState<Account[]>([]);
    const filteredAccounts = accounts.filter(account =>
        (account.accountCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (account.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (account.nameEng?.toLowerCase().includes(searchQuery.toLowerCase()))
    );


    const handleEdit = (account?: Account) => {
        setEditAccount(account || null);
        setIsModalOpen(true);
    };
    const handleDelete = async (accountID: number) => {
        Swal.fire({
            icon: "warning",
            title: "ยืนยันการลบข้อมูล?",
            text: "คุณต้องการลบข้อมูล region นี้ใช่หรือไม่",
            showCancelButton: true,
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
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await accountDelete(accountID);
                    getListData(false);
                    Swal.fire({
                        icon: "success",
                        title: "ลบข้อมูลสำเร็จ",
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
            if (showLoading) {
                Swal.fire({
                    title: "กำลังโหลดข้อมูล...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
            }
            const res = await accountList();
            const formattedAccount = res.map((account: any) => ({
                id: account.accountID,
                accountCode: account.accountCode,
                name: account.accountNameThai,
                nameEng: account.accountNameEnglish,
            }));
            setAccounts(formattedAccount);
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
                    <button onClick={handleButtonSearch} className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaSearch /> Search
                    </button>
                </div>
                <button
                    className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    onClick={() => handleEdit()} // ✅ เปิด Modal โดยไม่มีข้อมูล (เพิ่มใหม่)
                >
                    <FaPlus className="mr-1 inline-block" /> เพิ่ม Account
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
                                                onClick={() => handleDelete(account.id)}
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
            <AccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} account={editAccount} getListData={getListData} />
        </div>
    );
}
