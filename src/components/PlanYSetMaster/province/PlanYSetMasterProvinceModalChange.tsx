import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { FaBriefcase, FaSave, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { provinceAdd, provinceEdit } from '@/services/callAPI/PlanYMasterSetup/Province/apiProvinceService';

interface Province {
    provinceID: string;
    provinceCode: string;
    provinceName: string;
    provinceNameEng: string;
    regionID: string;
    regionCode: string;
    regionName: string;
}

interface ProvinceModalProps {
    isOpen: boolean;
    onClose: () => void;
    province: Province | null;
    getListData: (showLoading: boolean) => void;
    listRegion: any;
}

const ProvinceModal: React.FC<ProvinceModalProps> = ({
    isOpen,
    onClose,
    province,
    getListData,
    listRegion
}) => {
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<{ regionID?: string; provinceCode?: string; provinceName?: string }>({});
    const [formData, setFormData] = useState<Province>({
        provinceID: '',
        provinceCode: '',
        provinceName: '',
        provinceNameEng: '',
        regionID: '',
        regionCode: '',
        regionName: '',
    });

    const handleSave = async () => {
        let newErrors: { regionID?: string; provinceCode?: string; provinceName?: string; } = {};

        if (!formData.regionID.trim()) newErrors.regionID = "กรุณาเลือก Region";
        if (!formData.provinceCode.trim()) newErrors.provinceCode = "กรุณากรอก Province Code";
        if (!formData.provinceName.trim()) newErrors.provinceName = "กรุณากรอก Province Name";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            let response;
            const result = await Swal.fire({
                title: province ? 'ยืนยันการแก้ไขข้อมูล' : 'ยืนยันการบันทึกข้อมูล',
                icon: 'warning',
                html: province ? 'คุณต้องการแก้ไขข้อมูล Province นี้หรือไม่?' : 'คุณต้องการบันทึกข้อมูล Province นี้หรือไม่?',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded me-2',
                    cancelButton: 'bg-red-500 text-white px-4 py-2 rounded',
                },
                buttonsStyling: false,
            });
            if (!result.isConfirmed) return;

            Swal.fire({
                title: province ? "กำลังแก้ไขข้อมูล..." : "กำลังเพิ่มข้อมูล...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            await new Promise(resolve => setTimeout(resolve, 500));

            if (province) {
                response = await provinceEdit(
                    formData.provinceID,
                    formData.provinceCode,
                    formData.provinceName,
                    formData.provinceNameEng,
                    formData.regionID
                );
            } else {
                response = await provinceAdd(
                    formData.provinceCode,
                    formData.provinceName,
                    formData.provinceNameEng,
                    formData.regionID
                );
            }

            Swal.fire({
                icon: "success",
                title: province ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย",
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
        setErrors({ regionID: "", provinceCode: "", provinceName: "" });
    };

    const handleClearForm = () => {
        setFormData({
            provinceID: '',
            provinceCode: '',
            provinceName: '',
            provinceNameEng: '',
            regionID: '',
            regionCode: '',
            regionName: '',
        });
    };

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    }, []);

    useEffect(() => {
        if (province) {
            setFormData({ ...province });
        } else {
            handleClearForm();
        }
    }, [province]);

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
                    {province ? "Edit Province" : "Add Province"}
                </h3>
            </div>

            <div className="overflow-auto max-h-[70vh] p-4 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">Region</label>
                    <select
                        className="appearance-none border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.regionID}
                        onChange={(e) => {
                            setFormData({ ...formData, regionID: e.target.value });
                            setErrors({ ...errors, regionID: "" });
                        }}
                    >
                        <option value="">Select Region</option>
                        {listRegion.map((region: any) => (
                            <option key={region.id} value={region.id}>
                                {region.regionCode} - {region.name}
                            </option>
                        ))}
                    </select>
                    {errors.regionID && <p className="text-red-500 text-xs mt-1">{errors.regionID}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">Province Code</label>
                    <input
                        type="text"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.provinceCode}
                        onChange={(e) => {
                            setFormData({ ...formData, provinceCode: e.target.value });
                            setErrors({ ...errors, provinceCode: "" });
                        }}
                    />
                    {errors.provinceCode && <p className="text-red-500 text-xs mt-1">{errors.provinceCode}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">Province Name(Thai)</label>
                    <input
                        type="text"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.provinceName}
                        onChange={(e) => {
                            setFormData({ ...formData, provinceName: e.target.value });
                            setErrors({ ...errors, provinceName: "" });
                        }}
                    />
                    {errors.provinceName && <p className="text-red-500 text-xs mt-1">{errors.provinceName}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">Province (English)</label>
                    <input
                        type="text"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.provinceNameEng}
                        onChange={(e) => setFormData({ ...formData, provinceNameEng: e.target.value })}
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

export default ProvinceModal;
