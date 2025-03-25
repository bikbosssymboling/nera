import { regionAdd, regionEdit } from "@/services/callAPI/PlanYMasterSetup/Region/apiRegionService";
import { useEffect, useState } from "react";
import { FaBriefcase, FaSave, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";

interface Region {
    id: number;
    regionCode: string;
    name: string;
    nameEng: string;
    createdBy?: string;
    updatedBy?: string;
}

interface RegionModalProps {
    isOpen: boolean;
    onClose: () => void;
    region: Region | null;
    getListData: (showLoading: boolean) => void;
}

const RegionModal: React.FC<RegionModalProps> = ({
    isOpen,
    onClose,
    region,
    getListData,

}) => {
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<{ regionCode?: string; name?: string; }>(
        {}
    );

    const [formData, setFormData] = useState<Region>({
        id: 0,
        regionCode: "",
        name: "",
        nameEng: "",
    });

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);

        }
    }, []);
    useEffect(() => {
        if (region) {
            setFormData({
                id: region.id,
                regionCode: region.regionCode,
                name: region.name,
                nameEng: region.nameEng,
                createdBy: region.createdBy
            });
        } else {
            setFormData({ id: 0, regionCode: "", name: "", nameEng: "" });
        }
    }, [region]);

    const handleSave = async () => {
        let newErrors: { regionCode?: string; name?: string; } = {};

        if (!formData.regionCode.trim()) newErrors.regionCode = "กรุณากรอก Region Code";
        if (!formData.name.trim()) newErrors.name = "กรุณากรอก Region Name";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            let response;
            const result = await Swal.fire({
                title: region ? 'ยืนยันการแก้ไขข้อมูล' : 'ยืนยันการบันทึกข้อมูล',
                icon: 'warning',
                html: region ? 'คุณต้องการแก้ไขข้อมูล Region นี้หรือไม่?' : 'คุณต้องการบันทึกข้อมูล Region นี้หรือไม่?',
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
            const loadingSwal = Swal.fire({
                title: region ? "กำลังแก้ไขข้อมูล..." : "กำลังเพิ่มข้อมูล...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            await new Promise(resolve => setTimeout(resolve, 500));
            // Proceed with either adding or editing the region based on the `region` flag
            if (region) {
                response = await regionEdit(
                    formData.id,
                    formData.regionCode,
                    formData.name,
                    formData.nameEng
                );
            } else {
                response = await regionAdd(
                    formData.regionCode,
                    formData.name,
                    formData.nameEng
                );
            }
            // After successful operation, show success message
            Swal.fire({
                icon: "success",
                title: region ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย",
            });
            getListData(false);
            handleClearForm();
            handleClearError();
            onClose();
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
        setErrors({ regionCode: "", name: "" });
    }
    const handleClearForm = () => {
        setFormData({ id: 0, regionCode: "", name: "", nameEng: "" });
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
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            {/* Header */}
            <div className="border-b pb-3 flex justify-center">
                <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                    <FaBriefcase className="mr-2 text-gray-600" />
                    {region ? "Edit Region" : "Add Region"}
                </h3>
            </div>
            {/* Content */}
            <div className="overflow-auto max-h-[70vh] p-4 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Region Code
                    </label>
                    <input
                        type="text"
                        name="accountCode"
                        className={`border p-2 rounded w-full ${errors.regionCode ? "border-red-500" : ""
                            }`}
                        value={formData.regionCode}
                        onChange={(e) => {
                            setFormData({ ...formData, regionCode: e.target.value });
                            setErrors({ ...errors, regionCode: "" });
                        }}
                    />
                    {errors.regionCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.regionCode}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Region Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className={`border p-2 rounded w-full ${errors.name ? "border-red-500" : ""
                            }`}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setErrors({ ...errors, name: "" });
                        }}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Region Name (English)
                    </label>
                    <input
                        type="text"
                        name="nameEng"
                        className="border p-2 rounded w-full"
                        value={formData.nameEng}
                        onChange={(e) => {
                            setFormData({ ...formData, nameEng: e.target.value });
                        }}
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

export default RegionModal;
