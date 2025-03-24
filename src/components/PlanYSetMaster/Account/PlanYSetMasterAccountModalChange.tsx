import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaBriefcase, FaSave, FaTimes } from "react-icons/fa";
import {
    accountAdd,
    accountEdit,
} from "../../../services/callAPI/PlanYMasterSetup/Account/apiAccountService";
import Swal from "sweetalert2";

interface Account {
    id: number; // เปลี่ยนจาก string เป็น number
    accountCode: string; // เปลี่ยน id เดิมเป็น accountCode
    name: string;
    nameEng: string;
}

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    account: Account | null;
    getListData: (showLoading: boolean) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({
    isOpen,
    onClose,
    account,
    getListData,
}) => {
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<{ accountCode?: string; name?: string; nameEng?: string }>(
        {}
    );
    const [formData, setFormData] = useState<Account>({
        id: 0,
        accountCode: "",
        name: "",
        nameEng: "",
    });

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    }, []);

    // ✅ อัปเดตค่าเมื่อมีการแก้ไขข้อมูล
    useEffect(() => {
        if (account) {
            setFormData({
                id: account.id,
                accountCode: account.accountCode,
                name: account.name,
                nameEng: account.nameEng,
            });
        } else {
            setFormData({ id: 0, accountCode: "", name: "", nameEng: "" });
        }
    }, [account]);


    // ✅ ฟังก์ชันเปลี่ยนค่า Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ ฟังก์ชันบันทึกข้อมูล
    const handleSave = async () => {
        let newErrors: { accountCode?: string; name?: string } = {};
        // ✅ ตรวจสอบค่าในฟอร์ม
        if (!formData.accountCode.trim())
            newErrors.accountCode = "กรุณากรอก Account Code";
        if (!formData.name.trim()) newErrors.name = "กรุณากรอก Account Name";

        // ✅ ถ้ามี Error ให้หยุดการทำงาน
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            let response;

            // Confirm action before continuing
            const result = await Swal.fire({
                title: account ? 'ยืนยันการแก้ไขข้อมูล' : 'ยืนยันการบันทึกข้อมูล',
                icon: 'warning',
                html: account ? 'คุณต้องการแก้ไขข้อมูล Account นี้หรือไม่?' : 'คุณต้องการบันทึกข้อมูล Account นี้หรือไม่?',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded me-2',
                    cancelButton: 'bg-red-500 text-white px-4 py-2 rounded',
                },
                buttonsStyling: false,
            });

            if (!result.isConfirmed) return; // Exit if the user clicks "ยกเลิก"

            // Show loading state while the operation is in progress
            const loadingSwal = Swal.fire({
                title: account ? "กำลังแก้ไขข้อมูล..." : "กำลังเพิ่มข้อมูล...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            await new Promise(resolve => setTimeout(resolve, 500));

            // Proceed with either adding or editing the region based on the `region` flag
            if (account) {
                response = await accountEdit(
                    formData.id,
                    formData.accountCode,
                    formData.name,
                    formData.nameEng
                );
            } else {
                response = await accountAdd(
                    formData.accountCode,
                    formData.name,
                    formData.nameEng
                );
            }

            // After successful operation, show success message
            Swal.fire({
                icon: "success",
                title: account ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย",
            });

            getListData(false); // ✅ โหลดข้อมูลใหม่โดยไม่แสดง loading
            handleClearForm(); // ✅ ล้างค่าในฟอร์ม
            handleClearError(); // ✅ ล้าง Error
            onClose(); // Close modal after 1 second
        } catch (error: unknown) {
            let errorMessage = `<span class="text-red-500">${(error as Error).message}</span>`;
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: errorMessage,
            });
        }
    };

    const handleClearError = () => {
        setErrors({ accountCode: "", name: "" });
    }
    const handleClearForm = () => {
        setFormData({ id: 0, accountCode: "", name: "", nameEng: "" });
    }

    if (!mounted) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                handleClearError();
                onClose();
            }}
            className="bg-white rounded-lg shadow-lg p-6 w-[400px] mx-auto transition-all duration-300 transform scale-100 opacity-100"
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
        >
            {/* Header */}
            <div className="border-b pb-3 flex justify-center">
                <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                    <FaBriefcase className="mr-2 text-gray-600" />
                    {account ? "Edit Account" : "Add Account"}
                </h3>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[70vh] p-4 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Account Code
                    </label>
                    <input
                        type="text"
                        name="accountCode"
                        className={`border p-2 rounded w-full ${errors.accountCode ? "border-red-500" : ""
                            }`}
                        value={formData.accountCode}
                        onChange={(e) => {
                            setFormData({ ...formData, accountCode: e.target.value });

                            // ✅ ล้าง Error เมื่อผู้ใช้เริ่มพิมพ์
                            setErrors({ ...errors, accountCode: "" });
                        }}
                    />
                    {errors.accountCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.accountCode}</p>
                    )}
                </div>

                {/* Account Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Account Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className={`border p-2 rounded w-full ${errors.name ? "border-red-500" : ""
                            }`}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setErrors({ ...errors, name: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Account Name (English)
                    </label>
                    <input
                        type="text"
                        name="nameEng"
                        className="border p-2 rounded w-full"
                        value={formData.nameEng}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="border-t gap-2 pt-3 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2"
                >
                    <FaSave className="text-lg" /> บันทึก
                </button>
                <button
                    onClick={() => {
                        handleClearError();
                        handleClearForm();
                        onClose();
                    }}
                    className="bg-gray-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2"
                >
                    <FaTimes className="text-lg" /> ยกเลิก
                </button>
            </div>
        </Modal>
    );
};

export default AccountModal;
