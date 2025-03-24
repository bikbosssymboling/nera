import { useEffect, useState } from "react";
import { FaBriefcase, FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import RegionModal from "./PlanYSetMasterRegionModalChange";
import Swal from "sweetalert2";
import { regionAdd, regionDelete, regionList } from "@/services/callAPI/PlanYMasterSetup/Region/apiRegionService";

interface Region {
  id: number;
  regionCode: string;
  name: string;
  nameEng: string;
}

export default function PlanYMasterRegion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRegion, setEditRegion] = useState<Region | null>(null); // ✅ กำหนด Type
  const [regions, setRegions] = useState<Region[]>([]);
<<<<<<< HEAD

  // const regions: Region[] = [
  //   { id: 1, regionCode: "N", name: "ภาคเหนือ", nameEng: "Northern" },
  //   { id: 2, regionCode: "C", name: "ภาคกลาง", nameEng: "Central" },
  //   {
  //     id: 3,
  //     regionCode: "NT",
  //     name: "ภาคตะวันออกเฉียงเหนือ",
  //     nameEng: "Northeastern",
  //   },
  // ];

=======
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
  const filteredRegion = regions.filter(
    (region) =>
      region.regionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.nameEng.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (region?: Region) => {
    setEditRegion(region || null);
    setIsModalOpen(true);
  };
<<<<<<< HEAD

  // ✅ ฟังก์ชันลบข้อมูลออกจาก state
  const handleDelete = async (regionId: number) => {
    Swal.fire({
      icon: "warning",
      text: "คุณต้องการลบ Region นี้ใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonColor: "#007BFF",
      cancelButtonColor: "#6C757D",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Show loading alert
=======
  const handleDelete = async (regionId: number) => {
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
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
          Swal.fire({
            title: "กำลังลบข้อมูล...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
<<<<<<< HEAD

          // ✅ เรียก API ลบข้อมูล โดยส่ง `regionCode`
          const data = await regionDelete(regionId);

          // ✅ เช็คสถานะการลบ
          if (data.status === "Success") {
            getListData(); // ✅ โหลดข้อมูลใหม่
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
=======
          // await new Promise(resolve => setTimeout(resolve, 500));
          await regionDelete(regionId);
          getListData(false);
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลสำเร็จ",
          });
        } catch (error: unknown) {
          let errorMessage = `<span class="text-red-500">${(error as Error).message}</span>`;
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
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
    setSearchQuery(""); // ✅ ล้างค่า searchQuery
    getListData();
  }

<<<<<<< HEAD
  const getListData = async (isLoading: boolean = true) => {
    try {
      if (isLoading) {
=======
  const getListData = async (showLoading: boolean = true) => {
    try {
      if (showLoading) {
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
        Swal.fire({
          title: "กำลังโหลดข้อมูล...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
<<<<<<< HEAD

      const res = await regionList();
      if (res.status === "Success") {
        const formattedRegions = res.data.map((region: any) => ({
          id: region.regionID,
          regionCode: region.regionCode,
          name: region.regionNameThai,
          nameEng: region.regionNameEnglish,
        }));
        setRegions(formattedRegions);
      } else {
        // Swal.fire({
        //   icon: "error",
        //   title: "ไม่สามารถโหลดข้อมูลได้",
        //   text: res.error_message || "เกิดข้อผิดพลาด",
        // });
      }
    } catch (error: unknown) {
      let errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้<br>";
      if (error instanceof Error) {
        errorMessage += `<span class="text-red-500">${error.message}</span>`;
      }
=======
      const res = await regionList();
      const formattedRegions = res.map((region: any) => ({
        id: region.regionID,
        regionCode: region.regionCode,
        name: region.regionNameThai,
        nameEng: region.regionNameEnglish,
      }));
      setRegions(formattedRegions);
      if (showLoading) {
        setTimeout(() => {
          Swal.close();
        }, 500);
      }
    } catch (error: unknown) {
      let errorMessage = `<span class="text-red-500">${(error as Error).message}</span>`;
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        html: errorMessage,
      });
<<<<<<< HEAD
    } finally {
      if (isLoading) Swal.close();
    }
  };



=======
    }
  };

>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="p-2">
      {/* Header */}
      <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
        <FaBriefcase className="mr-2" /> Setup Master Region
      </h2>

      {/* Search and Add Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="ค้นหา Region..."
            className="border p-2 rounded-md w-72"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => handleButtonSearch()}
            className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
<<<<<<< HEAD
            <FaSearch /> Search
=======
            <FaSearch /> ค้นหา
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
          </button>
        </div>
        <button
          className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md"
          onClick={() => handleEdit()} // ✅ เปิด Modal โดยไม่มีข้อมูล (เพิ่มใหม่)
        >
<<<<<<< HEAD
          <FaPlus className="mr-1 inline-block" /> Add Region
=======
          <FaPlus className="mr-1 inline-block" /> เพิ่ม Region
>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
        </button>
      </div>

      {/* Region Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full bg-white border rounded-md text-xs divide-y divide-gray-300">
            <thead className="bg-gray-200 text-gray-900 text-center sticky top-0 z-10">
              <tr className="bg-gray-200 text-xs">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Region Code</th>
                <th className="border border-gray-300 p-2">
                  Region Name (Thai)
                </th>
                <th className="border border-gray-300 p-2">
                  Region Name (English)
                </th>
                <th className="border border-gray-300 p-2">Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegion.map((region, index) => (
                <tr key={region.id} className="text-xs text-gray-900">
                  <td className="border p-2 border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="border p-2 border-gray-300">
                    {region.regionCode}
                  </td>
                  <td className="border p-2 border-gray-300">{region.name}</td>
                  <td className="border p-2 border-gray-300">
                    {region.nameEng}
                  </td>
                  <td className="border p-2 border-gray-300">
                    <div className="flex justify-center items-center space-x-1">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                        onClick={() => handleEdit(region)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md text-xs shadow-md cursor-pointer"
                        onClick={() => handleDelete(region.id)} // ✅ ส่ง `regionId` ไปลบ
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
<<<<<<< HEAD
=======

>>>>>>> e9a9e56b88b63b81190fe01bf82c1a21c9b8cdbc
      <RegionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        region={editRegion}
        getListData={getListData} // ✅ ส่ง function getListData เข้าไป
      />
    </div>
  );
}
