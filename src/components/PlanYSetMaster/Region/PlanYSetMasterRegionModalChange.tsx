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
}

interface RegionModalProps {
    isOpen: boolean;
    onClose: () => void;
    region: Region | null;
}

const RegionModal: React.FC<RegionModalProps> = ({
    isOpen,
    onClose,
    region,
}) => {
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<{ regionCode?: string; name?: string; nameEng?: string }>(
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


    // ✅ อัปเดตค่าเมื่อมีการแก้ไขข้อมูล
    useEffect(() => {
        if (region) {
            setFormData({
                id: region.id,
                regionCode: region.regionCode,
                name: region.name,
                nameEng: region.nameEng,
            });
        } else {
            setFormData({ id: 0, regionCode: "", name: "", nameEng: "" });
        }
    }, [region]);

    // ✅ ฟังก์ชันเปลี่ยนค่า Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        let newErrors: { regionCode?: string; name?: string; nameEng?: string } = {};

        if (!formData.regionCode.trim())
            newErrors.regionCode = "กรุณากรอก Region Code";
        if (!formData.name.trim()) newErrors.name = "กรุณากรอก Region Name";
        if (!formData.nameEng.trim()) newErrors.nameEng = "กรุณากรอก Region NameEng";


        // ✅ ถ้ามี Error ให้หยุดการทำงาน
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {

            let response;
            if (region) {
                Swal.fire({
                    title: "กำลังแก้ไขข้อมูล...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                response = await regionEdit(
                    formData.regionCode,
                    formData.name,
                    formData.nameEng
                );
            } else {
                Swal.fire({
                    title: "กำลังเพิ่มข้อมูล...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                response = await regionAdd(
                    formData.regionCode,
                    formData.name,
                    formData.nameEng
                );
            }

            if (response.status === "Success") {
                Swal.fire({
                    icon: "success",
                    title: region ? "แก้ไขข้อมูลเรียบร้อย" : "เพิ่มข้อมูลเรียบร้อย",
                });
                handleClearError(); // ✅ ล้าง Error หลังจากบันทึกข้อมูลสำเร็จ
                onClose(); // ปิด Modal
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ไม่สามารถบันทึกข้อมูลได้",
                    text: response.error_message || "เกิดข้อผิดพลาด",
                });
            }

        } catch (error: unknown) {
            let errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้<br>";
            if (error instanceof Error) {
                errorMessage += `<span class="text-red-500">${error.message}</span>`; // ✅ ใช้ `class` แทน `className`
            }
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: errorMessage, // ✅ ใช้ `html` เพื่อให้ตีความเป็น HTML ได้
            });
        }
    };

    const handleClearError = () => {

        setErrors({ regionCode: "", name: "", nameEng: "" });
    }


    if (!mounted) return null;


    return (
        <Modal
        // add tailwind css show like swit alert
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white rounded-lg shadow-lg p-6 w-[400px] mx-auto transition-all duration-300 transform scale-100 opacity-100"
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
        >
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

                            // ✅ ล้าง Error เมื่อผู้ใช้เริ่มพิมพ์
                            setErrors({ ...errors, regionCode: "" });
                        }}
                    />
                    {errors.regionCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.regionCode}</p>
                    )}
                </div>

                {/* Region Name */}
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
                            setErrors({ ...errors, name: "" }); // ✅ ล้าง Error เมื่อพิมพ์
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
                        onChange={handleChange}
                    />
                    {errors.nameEng && (
                        <p className="text-red-500 text-xs mt-1">{errors.nameEng}</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t gap-2 pt-3 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2"
                >
                    <FaSave className="text-lg" /> Save
                </button>
                <button
                    onClick={() => {
                        handleClearError();
                        onClose();
                    }}
                    className="bg-gray-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2"
                >
                    <FaTimes className="text-lg" /> Cancel
                </button>
            </div>
        </Modal>
    );
};

export default RegionModal;
