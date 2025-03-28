import React, { useState, useEffect, use } from 'react';
import Modal from "react-modal";
import { FaBriefcase, FaSave, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { storeAdd, storeEdit } from '@/services/callAPI/PlanYMasterSetup/StoreSetup/apiStoreService';

interface Store {
    regionID: string;
    regionCode: string;
    regionNameThai: string;
    regionNameEnglish: string;

    provinceID: string;
    provinceNameThai: string;
    provinceNameEnglish: string;

    accountID: string;
    accountCode: string;
    accountNameThai: string;
    accountNameEnglish: string;

    storeID: string;
    storeCode: string;
    storeNameThai: string;
    storeNameEnglish: string;

    latitude: string;
    longtitude: string;
    distance: number;
}

interface IError {
    regionID?: string;
    provinceID?: string;
    accountID?: string;
    storeCode?: string;
    storeNameThai?: string;
    storeNameEnglish?: string;
    latitude?: string;
    longtitude?: string;
    distance?: string;
}

interface StoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    store: Store | null;
    getListData: (showLoading: boolean) => void;
    listSelect: {
        listRegion: any[];
        listProvince: any[];
        listAccount: any[];
    };
}
const StoreModal: React.FC<StoreModalProps> = ({
    isOpen,
    onClose,
    store,
    getListData,
    listSelect: { listRegion, listProvince, listAccount }
}) => {
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<IError>({});
    const [formData, setFormData] = useState<Store>({
        regionID: "0",
        regionCode: "",
        regionNameThai: "",
        regionNameEnglish: "",

        provinceID: "0",
        provinceNameThai: "",
        provinceNameEnglish: "",

        accountID: "0",
        accountCode: "",
        accountNameThai: "",
        accountNameEnglish: "",

        storeID: "0",
        storeCode: "",
        storeNameThai: "",
        storeNameEnglish: "",

        latitude: "",
        longtitude: "",
        distance: 0,
    });
    const [filteredProvinces, setFilteredProvinces] = useState<any[]>([]);
    const handleSave = async () => {
        let newErrors: IError = {};
        if (!formData.regionID.toString().trim()) newErrors.regionID = "กรุณาเลือก Region";
        if (!formData.provinceID.toString().trim()) newErrors.provinceID = "กรุณาเลือก Province";
        if (!formData.accountID.toString().trim()) newErrors.accountID = "กรุณาเลือก Account";
        if (!formData.storeCode.trim()) newErrors.storeCode = "กรุณากรอก Store Code";
        if (!formData.storeNameThai.trim()) newErrors.storeNameThai = "กรุณากรอก Store Name (Thai)";
        if (!formData.storeNameEnglish.trim()) newErrors.storeNameEnglish = "กรุณากรอก Store Name (English)";
        if (!formData.latitude.toString().trim() || formData.latitude === "0") newErrors.latitude = "กรุณากรอก Latitude";
        if (!formData.longtitude.toString().trim() || formData.longtitude === "0") newErrors.longtitude = "กรุณากรอก Longitude";
        if (!formData.distance || formData.distance === 0) newErrors.distance = "กรุณากรอก Distance";

        // ✅ ถ้ามี Error ให้หยุดการทำงาน
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            let response;
            // Confirm action before continuing
            const result = await Swal.fire({
                title: store ? 'ยืนยันการแก้ไขข้อมูล' : 'ยืนยันการบันทึกข้อมูล',
                icon: 'warning',
                html: store ? 'คุณต้องการแก้ไขข้อมูล Province นี้หรือไม่?' : 'คุณต้องการบันทึกข้อมูล Province นี้หรือไม่?',
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
                title: store ? "กำลังแก้ไขข้อมูล..." : "กำลังเพิ่มข้อมูล...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            await new Promise(resolve => setTimeout(resolve, 500));
            // Proceed with either adding or editing the region based on the `region` flag
            if (store) {
                response = await storeEdit(
                    formData.storeID,
                    formData.storeCode,
                    formData.storeNameThai,
                    formData.storeNameEnglish,
                    formData.regionID,
                    formData.provinceID,
                    formData.accountID,
                    String(formData.latitude),  
                    String(formData.longtitude), 
                    formData.distance
                );
            } else {
                response = await storeAdd(
                    formData.storeCode,
                    formData.storeNameThai,
                    formData.storeNameEnglish,
                    formData.regionID,
                    formData.provinceID,
                    formData.accountID,
                    formData.latitude,
                    formData.longtitude,
                    formData.distance
                );
            }

            // After successful operation, show success message
            Swal.fire({
                icon: "success",
                title: store ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย",
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
        setErrors({
            regionID: undefined,
            provinceID: undefined,
            accountID: undefined,
            storeCode: undefined,
            storeNameThai: undefined,
            storeNameEnglish: undefined,
            latitude: undefined,
            longtitude: undefined,
            distance: undefined,
        });
    };
    const handleClearForm = () => {
        setFormData({
            regionID: "",
            regionCode: "",
            regionNameThai: "",
            regionNameEnglish: "",

            provinceID: "",
            provinceNameThai: "",
            provinceNameEnglish: "",

            accountID: "",
            accountCode: "",
            accountNameThai: "",
            accountNameEnglish: "",

            storeID: "",
            storeCode: "",
            storeNameThai: "",
            storeNameEnglish: "",

            latitude: "",
            longtitude: "",
            distance: 0,
        });
    };
    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    }, []);
    useEffect(() => {
        if (store) {
            setFormData({
                regionID: store.regionID,
                regionCode: store.regionCode,
                regionNameThai: store.regionNameThai,
                regionNameEnglish: store.regionNameEnglish,

                provinceID: store.provinceID,
                provinceNameThai: store.provinceNameThai,
                provinceNameEnglish: store.provinceNameEnglish,

                accountID: store.accountID,
                accountCode: store.accountCode,
                accountNameThai: store.accountNameThai,
                accountNameEnglish: store.accountNameEnglish,

                storeID: store.storeID,
                storeCode: store.storeCode,
                storeNameThai: store.storeNameThai,
                storeNameEnglish: store.storeNameEnglish,

                latitude: store.latitude,
                longtitude: store.longtitude,
                distance: store.distance,
            });
        } else {
            setFormData({
                regionID: "",
                regionCode: "",
                regionNameThai: "",
                regionNameEnglish: "",

                provinceID: "",
                provinceNameThai: "",
                provinceNameEnglish: "",

                accountID: "",
                accountCode: "",
                accountNameThai: "",
                accountNameEnglish: "",

                storeID: "",
                storeCode: "",
                storeNameThai: "",
                storeNameEnglish: "",

                latitude: "",
                longtitude: "",
                distance: 0,
            });
        }
    }, [store]);

    useEffect(() => {
        if (String(formData.regionID).trim() === "") {
            formData.provinceID = "";
            setFilteredProvinces(listProvince);
        } else {
            setFilteredProvinces(listProvince.filter(
                (province: any) => province.regionID.toString().trim() === String(formData.regionID).trim()
            ));
        }

    }, [formData.regionID, listProvince]);




    if (!mounted) return null;
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                handleClearError();
                onClose();
            }}
            className="bg-white rounded-lg shadow-lg p-6 w-[500px] mx-auto pop-out"
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            {/* Header */}
            <div className="border-b pb-3 flex justify-center">
                <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                    <FaBriefcase className="mr-2 text-gray-600" />
                    {store ? "Edit Store" : "Add Store"}
                </h3>
            </div>
            <div className="overflow-auto max-h-[70vh] p-4 space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Region
                    </label>
                    <select
                        className="appearance-none border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.regionID}
                        onChange={(e) => {
                            setFormData({ ...formData, regionID: e.target.value || "" });
                            setErrors({ ...errors, regionID: "", provinceID: "" });
                        }}
                    >
                        <option value="">Select Region</option>
                        {listRegion.map((region: any) => (
                            <option key={region.id} value={region.id}>
                                {region.regionCode} - {region.name}
                            </option>
                        ))}

                    </select>
                    {errors.regionID && (
                        <p className="text-red-500 text-xs mt-1">{errors.regionID}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Province
                    </label>
                    <select
                        className="appearance-none border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.provinceID}
                        onChange={(e) => {
                            const selectedProvinceID = e.target.value;
                            const selectedProvince = listProvince.find((province: any) => province.id.toString().trim() === selectedProvinceID.toString().trim());

                            setFormData({
                                ...formData,
                                provinceID: selectedProvinceID,
                                regionID: selectedProvince ? selectedProvince.regionID || "" : "",
                            });

                            setErrors({ ...errors, regionID: "", provinceID: "" });
                        }}
                    >
                        <option value="">Select Province</option>
                        {filteredProvinces.map((province: any) => (
                            <option key={province.id} value={province.id}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    {errors.provinceID && (
                        <p className="text-red-500 text-xs mt-1">{errors.provinceID}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Account
                    </label>
                    <select
                        className="appearance-none border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.accountID}
                        onChange={(e) => {
                            setFormData({ ...formData, accountID: e.target.value });
                            setErrors({ ...errors, accountID: "" });
                        }}
                    >
                        <option value="">Select Province</option>
                        {listAccount.map((account: any) => (
                            <option key={account.id} value={account.id}>
                                {account.nameEng}
                            </option>
                        ))}

                    </select>
                    {errors.accountID && (
                        <p className="text-red-500 text-xs mt-1">{errors.accountID}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Store Code
                    </label>
                    <input
                        type="text"
                        name="storeCode"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.storeCode}
                        onChange={(e) => {
                            setFormData({ ...formData, storeCode: e.target.value });
                            setErrors({ ...errors, storeCode: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.storeCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.storeCode}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Store Name (Thai)
                    </label>
                    <input
                        type="text"
                        name="storeNameThai"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.storeNameThai}
                        onChange={(e) => {
                            setFormData({ ...formData, storeNameThai: e.target.value });
                            setErrors({ ...errors, storeNameThai: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.storeNameThai && (
                        <p className="text-red-500 text-xs mt-1">{errors.storeNameThai}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Store Name (English)
                    </label>
                    <input
                        type="text"
                        name="storeNameEnglish"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.storeNameEnglish}
                        onChange={(e) => {
                            setFormData({ ...formData, storeNameEnglish: e.target.value });
                            setErrors({ ...errors, storeNameEnglish: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.storeNameEnglish && (
                        <p className="text-red-500 text-xs mt-1">{errors.storeNameEnglish}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Latitude
                    </label>
                    <input
                        type="number"
                        name="latitude"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.latitude}
                        onChange={(e) => {
                            setFormData({ ...formData, latitude: e.target.value });
                            setErrors({ ...errors, latitude: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.latitude && (
                        <p className="text-red-500 text-xs mt-1">{errors.latitude}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Longitude
                    </label>
                    <input
                        type="number"
                        name="longtitude"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.longtitude}
                        onChange={(e) => {
                            setFormData({ ...formData, longtitude: e.target.value });
                            setErrors({ ...errors, longtitude: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.longtitude && (
                        <p className="text-red-500 text-xs mt-1">{errors.longtitude}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                        Distance
                    </label>
                    <input
                        type="number"
                        name="distance"
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.distance}
                        onChange={(e) => {
                            setFormData({ ...formData, distance: parseFloat(e.target.value) || 0 });
                            setErrors({ ...errors, distance: "" }); // ✅ ล้าง Error เมื่อพิมพ์
                        }}
                    />
                    {errors.distance && (
                        <p className="text-red-500 text-xs mt-1">{errors.distance}</p>
                    )}
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

}
export default StoreModal;