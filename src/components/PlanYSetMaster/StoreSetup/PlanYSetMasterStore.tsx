"use client";
import { accountList } from "@/services/callAPI/PlanYMasterSetup/Account/apiAccountService";
import { provinceList } from "@/services/callAPI/PlanYMasterSetup/Province/apiProvinceService";
import { regionList } from "@/services/callAPI/PlanYMasterSetup/Region/apiRegionService";
import { storeDelete, storeList } from "@/services/callAPI/PlanYMasterSetup/StoreSetup/apiStoreService";
import { useEffect, useState } from "react";
import { FaBriefcase, FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import StoreModal from "./PlanYSetMasterStoreModalChange";

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



export default function PlanYMasterStore() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editStore, setEditStore] = useState<Store | null>(null);
    const [store, setStore] = useState<Store[]>([]);
    const [listRegion, setListRegion] = useState<any[]>([]);
    const [listProvince, setListProvince] = useState<any[]>([]);
    const [listAccount, setListAccount] = useState<any[]>([]);

    const formattedStore = store.filter(store =>
        (store.regionCode?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.regionNameThai?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.provinceNameThai?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.accountCode?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.accountNameThai?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.storeCode?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.storeNameThai?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.storeNameEnglish?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.latitude?.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.longtitude?.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (store.distance?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleEdit = (store?: Store) => {
        setEditStore(store || null);
        setIsModalOpen(true);
    };
    const handleDelete = async (storeID: number) => {
        Swal.fire({
            icon: "warning",
            title: "ยืนยันการลบข้อมูล?",
            text: "คุณต้องการลบข้อมูล store นี้ใช่หรือไม่",
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
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await storeDelete(storeID); // Ensure storeDelete accepts a string
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
            const res = await storeList();
            const formattedStore = res.map((store: Store) => ({
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
                distance: store.distance
            }));
            setStore(formattedStore);
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
    const getList = async () => {
        const [resRegion, resProvince, resAccount] = await Promise.all([
            regionList(),
            provinceList(),
            accountList()
        ]);
        const formattedRegions = resRegion.map((region: any) => ({
            id: region.regionID,
            regionCode: region.regionCode,
            name: region.regionNameThai,
            nameEng: region.regionNameEnglish,
        }));
        setListRegion(formattedRegions);

        const formattedProvince = resProvince.map((province: any) => ({
            id: province.provinceID,
            regionID : province.regionID,
            code: province.provinceCode,
            name: province.provinceNameThai,
            nameEng: province.provinceNameEnglish,
        }));
        setListProvince(formattedProvince);

        const formattedAccount = resAccount.map((account: any) => ({
            id: account.accountID,
            code: account.accountCode,
            name: account.accountNameThai,
            nameEng: account.accountNameEnglish,
        }));
        setListAccount(formattedAccount);


    };

    useEffect(() => {
        Promise.all([getListData(), getList()]);
    }, []);

    return (
        <div className="p-2">
            {/* Header */}
            <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
                <FaBriefcase className="mr-2" /> Setup Master Store
            </h2>
            {/* Search and Add Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="ค้นหา Store..."
                        className="border p-2 rounded-md w-72"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleButtonSearch}
                        className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaSearch /> ค้นหา
                    </button>
                </div>
                <button
                    className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
                    onClick={() => handleEdit()}
                >
                    <FaPlus className="mr-1 inline-block" /> เพิ่ม Province
                </button>
            </div>
            {/* Province Table */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
                        <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
                            <tr className="bg-gray-200 text-xs">
                                <th className="border border-gray-300 p-2">#</th>
                                <th className="border border-gray-300 p-2">Region Code</th>
                                <th className="border border-gray-300 p-2">Region Name (Thai)</th>
                                <th className="border border-gray-300 p-2">Province Code</th>
                                <th className="border border-gray-300 p-2">Province Name (Thai)</th>
                                <th className="border border-gray-300 p-2">Account Code</th>
                                <th className="border border-gray-300 p-2">Account Name (English)</th>
                                <th className="border border-gray-300 p-2">Store Code</th>
                                <th className="border border-gray-300 p-2">Store Name (Thai)</th>
                                <th className="border border-gray-300 p-2">Store Name (English)</th>
                                <th className="border border-gray-300 p-2">Latitude</th>
                                <th className="border border-gray-300 p-2">Longitude</th>
                                <th className="border border-gray-300 p-2">Distance</th>
                                <th className="border border-gray-300 p-2">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formattedStore.map((store, index) => (
                                <tr key={store.storeID} className="text-xs text-gray-900">
                                    <td className="border p-2 border-gray-300 text-center">{index + 1}</td>
                                    <td className="border p-2 border-gray-300">{store.regionCode}</td>
                                    <td className="border p-2 border-gray-300">{store.regionNameThai}</td>
                                    <td className="border p-2 border-gray-300">{store.provinceID}</td>
                                    <td className="border p-2 border-gray-300">{store.provinceNameThai}</td>
                                    <td className="border p-2 border-gray-300">{store.accountCode}</td>
                                    <td className="border p-2 border-gray-300">{store.accountNameEnglish}</td>
                                    <td className="border p-2 border-gray-300">{store.storeCode}</td>
                                    <td className="border p-2 border-gray-300">{store.storeNameThai}</td>
                                    <td className="border p-2 border-gray-300">{store.storeNameEnglish}</td>
                                    <td className="border p-2 border-gray-300">{store.latitude}</td>
                                    <td className="border p-2 border-gray-300">{store.longtitude}</td>
                                    <td className="border p-2 border-gray-300">{store.distance}</td>
                                    <td className="border p-2 border-gray-300">
                                        <div className="flex justify-center items-center space-x-1">
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleEdit(store)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                                                onClick={() => handleDelete(parseInt(store.storeID))}
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
            <StoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} store={editStore} getListData={getListData} listSelect={{
                listRegion,
                listProvince,
                listAccount
            }} />
        </div>
    );
}