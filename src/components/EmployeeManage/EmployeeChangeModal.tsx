import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaFileExport, FaFileExcel, FaFileSignature, FaSearch, FaPenAlt, FaSave, FaTimes
    ,FaPlus, FaEdit, FaUser, FaLock, FaList, FaUndo
} from "react-icons/fa"; // ✅ ใช้ react-icons
import {
    employeeINSERT
} from "@/services/callAPI/ManageEmployee/apiEmployeeManageService";


if (typeof window !== "undefined") {
    Modal.setAppElement(document.body);
}

interface EmployeeChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeeType: string;
}



const EmployeeChangeModal: React.FC<EmployeeChangeModalProps> = ({ isOpen, onClose, employeeType }) => {
    const [formData, setFormData] = useState({
        department: '',
        position: '',
        firstName: '',
        lastName: '',
        nickName: '',
        titleNameEnglish: '',
        nameEnglish: '',
        surnameEnglish: '',
        lineID: '',
        sex: '',
        personalID: '',
        birthDate: '',
        age: '',
        weight: '',
        height: '',
        phoneNo: '',
        email: '',
        bankID: '',
        bankBranch: '',
        bankNo: '',
        taxType: '',
        employeeTier: '',
        salary: '',
        cardHouseNumber: '',
        cardVillage: '',
        cardSubdistrict: '',
        cardDistrict: '',
        cardProvince: '',
        cardPost: '',
        currentHouseNumber: '',
        currentVillage: '',
        currentSubdistrict: '',
        currentDistrict: '',
        currentProvince: '',
        currentPost: '',
        fatherFirstName: '',
        fatherLastName: '',
        fatherAge: '',
        fatherJob: '',
        fatherPhoneNo: '',
        fatherLifeStatus: '',
        motherFirstName: '',
        motherLastName: '',
        motherAge: '',
        motherJob: '',
        motherPhoneNo: '',
        motherLifeStatus: '',
        siblingsCount: '',
        siblingsNumber: '',
        brotherCount: '',
        sisterCount: '',
        youngerBrotherCount: '',
        youngerSisterCount: '',
        emergencyFirstName: '',
        emergencyLastName: '',
        emergencyPhoneNo: '',
        emergencyRelationship: '',
        emergencyHouseNumber: '',
        emergencyVillage: '',
        emergencySubdistrict: '',
        emergencyDistrict: '',
        emergencyProvince: '',
        emergencyPost: '',
        marryStatus: '',
        marryFirstName: '',
        marryLastName: '',
        marryAge: '',
        marryChildrenSex: '',
        marryChildrenNumber: '',
        marryChildrenAge: '',
        marryWorkLocation: '',
        marryPhoneNo: '',
        militaryRemark: '',
        educationLevel1: '',
        educationNameInstitution1: '',
        educationFaculty1: '',
        educationPeriod1: '',
        educationGrade1: '',
        educationLevel2: '',
        educationNameInstitution2: '',
        educationFaculty2: '',
        educationPeriod2: '',
        educationGrade2: '',
        educationLevel3: '',
        educationNameInstitution3: '',
        educationFaculty3: '',
        educationPeriod3: '',
        educationGrade3: '',
        workHistoryCompanyName1: '',
        workHistoryBranch1: '',
        workHistoryRole1: '',
        workHistoryPeriod1: '',
        workHistoryOther1: '',
        workHistoryCompanyName2: '',
        workHistoryBranch2: '',
        workHistoryRole2: '',
        workHistoryPeriod2: '',
        workHistoryOther2: '',
        workHistoryCompanyName3: '',
        workHistoryBranch3: '',
        workHistoryRole3: '',
        workHistoryPeriod3: '',
        workHistoryOther3: '',
        seriousContagious: '',
        seriousContagiousRemark: '',
        congenitalDisease: '',
        congenitalDiseaseRemark: '',
        prescribedMedication: '',
        prescribedMedicationRemark: '',
        defective: '',
        defectiveRemark: '',
        trainingTopic1: '',
        trainingLocation1: '',
        trainingStartDate1: '',
        trainingStartEnd1: '',
        trainingTopic2: '',
        trainingLocation2: '',
        trainingStartDate2: '',
        trainingStartEnd2: '',
        trainingTopic3: '',
        trainingLocation3: '',
        trainingStartDate3: '',
        trainingStartEnd3: '',
        englishLevel: '',
        toeicPoint: '',
        ieltsPoint: '',
        toeflPoint: '',
        otherLanguages: '',
        workOtherProvincesRemark: '',
        otherAbilities: '',
        talent: '',
        username: '',
        password: '',
        blackListRemark: ''
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveUser = async () => {
        
        // 👉 ตรงนี้ต่อ API หรือ Validation ได้
        // ✅ Map employeeType ให้ตรง MasterEmployeeTypeID ก่อนยิง API
        const mapEmployeeType = (type: string) => {
            if (type === 'O1') return 1;
            if (type === 'O2') return 2;
            if (type === 'O3') return 3;
            if (type === 'Key Account') return 4;
            return 0; // Default เผื่อไม่มี
        };

        const finalFormData = {
            ...formData,
            MasterEmployeeTypeID: mapEmployeeType(employeeType),
        };
        console.log("✅ ข้อมูลพนักงาน:", finalFormData);
        
        try {
            const data = await employeeINSERT(finalFormData); // ✅ ใช้ await ได้เพราะ async แล้ว
            if (data.Status == "Success") {
                Swal.fire({
                    icon: "success",
                    title: "บันทีกข้อมูลสำเร็จ",
                    text: "เพิ่มพนักงานเรียบร้อย"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ไม่สามารถค้นหาข้อมูลได้",
                    text: data.error_message || ""
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
                html: errorMessage
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[1500px] mx-auto relative z-50"
            overlayClassName="fixed inset-0 [background:var(--swal2-backdrop)] flex items-center justify-center z-40"
        >

        {/* Header */}
        <div className="border-b pb-3 flex justify-center">
            <h3 className="text-2xl font-bold text-gray-600 flex items-center text-center">
                <FaPenAlt className="mr-2 text-gray-600" /> ข้อมูลพนักงาน {employeeType}
            </h3>
        </div>

            {/* Content ที่มี Scroll */}
            <div className="overflow-auto max-h-[70vh] p-4">
                {/* ✅ Section สถานะการใช้งาน App */}
                <div className=" mt-2">
                        <div className="grid grid-cols-2 gap-4 items-center mb-2">
                            
                            {/* 🔹 ฝั่งซ้าย: วันที่ยกเลิกสิทธิ์ */}
                            <div className="flex flex-col items-start gap-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold">วันที่ยกเลิกสิทธิ์:</label>
                                    <input type="date" className="border p-1 text-xs w-40 rounded-md" />
                                </div>
                            </div>

                            {/* 🔹 ฝั่งขวา: ปุ่ม Action & สถานะ */}
                            <div className="flex flex-col items-end gap-2">
                                {/* ✅ ปุ่ม Action */}
                                <div className="flex items-center gap-3">
                                    {employeeType === "Key Account" && (
                                        <>
                                            <button className="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-300 font-medium rounded-md text-xs px-3 py-1.5 shadow-md cursor-pointer">
                                                <FaFileExport className="mr-1" /> ส่งสัญญาจ้าง
                                            </button>
                                            <button className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 font-medium rounded-md text-xs px-3 py-1.5 shadow-md cursor-pointer">
                                                <FaFileExcel className="mr-1" /> ยกเลิกสัญญาจ้าง
                                            </button>
                                        </>
                                    )}
                                    <button className="flex items-center justify-center text-white bg-amber-600 hover:bg-amber-700 focus:ring-2 focus:ring-amber-300 font-medium rounded-md text-xs px-3 py-1.5 shadow-md cursor-pointer">
                                        <FaFileSignature className="mr-1" /> ประวัติสัญญาจ้าง
                                    </button>
                                    <button className="flex items-center justify-center text-white bg-pink-600 hover:bg-pink-700 focus:ring-2 focus:ring-pink-300 font-medium rounded-md text-xs px-3 py-1.5 shadow-md cursor-pointer">
                                        <FaSearch className="mr-1" /> ประวัติการทำงานในระบบ
                                    </button>
                                </div>

                                {/* ✅ สถานะการใช้งาน */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold">สถานะ:</label>
                                    <div className="flex items-center gap-2">
                                        <input type="radio" id="pending" name="appStatus" value="pending" className="mr-1" />
                                        <label htmlFor="pending" className="text-xs">รอตรวจสอบ</label>

                                        <input type="radio" id="approved" name="appStatus" value="approved" className="mr-1" />
                                        <label htmlFor="approved" className="text-xs">ผ่านการตรวจสอบ</label>

                                        <input type="radio" id="verified" name="appStatus" value="verified" className="ml-4 mr-1" />
                                        <label htmlFor="verified" className="text-xs">ผ่านการตรวจสอบ</label>

                                        <input type="radio" id="resigned" name="appStatus" value="resigned" className="ml-4 mr-1" />
                                        <label htmlFor="resigned" className="text-xs">ลาออก</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ✅ แถวประเภทพนักงาน */}
                        {(employeeType === "O1" || employeeType === "O3") && (
                            <div className="flex justify-end items-center">
                                <label className="text-xs font-bold mr-2">ประเภท:</label>
                                <div className="flex items-center gap-2">
                                    <input type="radio" id="supervisor" name="employeeType" value="supervisor" className="mr-1" />
                                    <label htmlFor="supervisor" className="text-xs">Supervisor</label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ✅ ส่วนรูปภาพ + ฟอร์มข้อมูล */}
                    <div className="flex items-start gap-6">
                        {/* 🔹 รูปภาพพนักงาน */}
                        <div className="w-40 flex flex-col items-center text-center space-y-2">
                            <div className="w-24 h-24 rounded-full border overflow-hidden">
                                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" 
                                    alt="Profile Image" className="w-full h-full object-cover" />
                            </div>
                            <button className="px-4 py-1 bg-orange-500 text-white rounded text-xs shadow-md">
                                Upload Image
                            </button>
                            <div className="text-xs leading-relaxed">
                                <p>รหัสพนักงาน: 00000</p>
                                <p>Doc No: AAA-0000000000</p>
                                <p>เลขที่สัญญา: AA-00000000</p>
                            </div>
                        </div>

                        {/* 🔹 ฟอร์มข้อมูลพนักงาน */}
                        <div className="flex-1 grid grid-cols-4 gap-3">
                            {/* ✅ เฉพาะ O1, O3 แสดง "แผนก", "ตำแหน่ง", "ฝ่าย" */}
                            {(employeeType === "O1" || employeeType === "O3") && (
                                <>
                                    <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">แผนก</label>
                                    <select
                                        className="border p-1 w-full text-xs"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                    >
                                        <option value="">เลือก</option>
                                        <option value="AE">Account Executive (BU1)</option>
                                        <option value="AC">Accounting & Finance</option>
                                    </select>
                                    </div>

                                    <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">ตำแหน่ง</label>
                                    <select
                                        className="border p-1 w-full text-xs"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                    >
                                        <option value="">เลือก</option>
                                        <option value="AD">Account Director</option>
                                        <option value="AE">Account Executive</option>
                                    </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">ฝ่าย</label>
                                        <select className="border p-1 w-full text-xs">
                                            <option value="" selected>เลือก</option>
                                            <option value="">Account Executive (BU1)</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* ✅ แถวที่ 1 */}
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">1. คำนำหน้า</label>
                                <select className="border p-1 w-full text-xs">
                                    <option value="" selected>เลือก</option>
                                    <option value="นาย">นาย</option>
                                    <option value="นาง">นาง</option>
                                    <option value="นางสาว">นางสาว</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">ชื่อ</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">นามสกุล</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">ชื่อเล่น</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="nickName"
                                        value={formData.nickName}
                                        onChange={handleChange}
                                    />
                                </div>


                            {/* ✅ แถวที่ 2 */}
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">2. Title Name</label>
                                <select
                                    className="border p-1 w-full text-xs"
                                    name="titleNameEnglish"
                                    value={formData.titleNameEnglish}
                                    onChange={handleChange}
                                >
                                    <option value="" selected>เลือก</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">Name English</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="nameEnglish"
                                    value={formData.nameEnglish}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">Surname English</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="surnameEnglish"
                                    value={formData.surnameEnglish}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">Line ID</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="lineID"
                                    value={formData.lineID}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* ✅ แถวที่ - */}
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">3. เพศ</label>
                                <select
                                    className="border p-1 w-full text-xs"
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleChange}
                                >
                                <option value="" selected>เลือก</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">เลขบัตรประชาชน</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="personalID"
                                    value={formData.personalID}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">4. วันเดือนปีเกิด</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">อายุ</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* ✅ แถวที่ 4 */}
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">น้ำหนัก/กก.</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">ส่วนสูง/ซม.</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">เบอร์โทรศัพท์</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">E-mail</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">ธนาคาร</label>
                                <select
                                    className="border p-1 w-full text-xs"
                                    name="bankID"
                                    value={formData.bankID}
                                    onChange={handleChange}
                                >
                                <option value="" selected>เลือก</option>
                                <option value="กรุงเทพ">กรุงเทพ</option>
                                <option value="กสิกรไทย">กสิกรไทย</option>
                                <option value="ไทยพาณิชย์">ไทยพาณิชย์</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">สาขา(ธนาคาร)</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="bankBranch"
                                    value={formData.bankBranch}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">เลขบัญชีธนาคาร</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="bankNo"
                                    value={formData.bankNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">5. ประเภทภาษี</label>
                                <select
                                    className="border p-1 w-full text-xs"
                                    name="taxType"
                                    value={formData.taxType}
                                    onChange={handleChange}
                                >
                                <option value="" selected>เลือก</option>
                                <option value="">ภ.ง.ด 1</option>
                                <option value="">ภ.ง.ด 1 ก.พิเศษ</option>
                                <option value="">ภ.ง.ด 2</option>
                                <option value="">ภ.ง.ด 2ก</option>
                                <option value="">ภ.ง.ด 3 (บุคคลธรรมดา)</option>
                                <option value="">ภ.ง.ด 3ก</option>
                                <option value="">ภ.ง.ด 53 (นิติบุคคล)</option>
                                <option value="">ภ.ง.ด 54</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">เกรด/ระดับ พนักงาน</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="employeeTier"
                                    value={formData.employeeTier}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">เงินเดือน</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 🔹 ฟอร์มที่อยู่ */}
                    <div className="flex flex-col gap-6 text-sm mt-5">
                        <div className="border-t border-gray-200 pt-3">
                            {/* หัวข้อที่อยู่ */}
                            <div className="grid grid-cols-12 items-center gap-4">
                                {/* ที่อยู่ตามทะเบียนบ้าน */}
                                <h2 className="text-lg font-bold text-blue-600 col-span-5 flex items-center">
                                📍 ที่อยู่ตามทะเบียนบ้าน / ตามบัตรประชาชน
                                </h2>

                                {/* ช่องว่างตรงกลาง (ลบเส้นขีดออก) */}
                                <div className="col-span-2"></div>

                                {/* ที่อยู่ปัจจุบัน */}
                                <h2 className="text-lg font-bold col-span-5 flex items-center justify-left">
                                <span className="text-green-600">📍 ที่อยู่ปัจจุบัน</span>
                                <span className="text-red-600 ml-1">*ต้องกรอกเป็นปัจจุบัน เท่านั้น</span>
                                </h2>
                            </div>

                            {/* ฟอร์มกรอกที่อยู่ */}
                            <div className="grid grid-cols-12 gap-6 mt-3">
                                {/* ฝั่งซ้าย: ที่อยู่ตามทะเบียนบ้าน */}
                                <div className="grid grid-cols-2 gap-3 col-span-5">
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">บ้านเลขที่/หมู่บ้าน *</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="cardHouseNumber"
                                            value={formData.cardHouseNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">หมู่ที่/คอนโด</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="cardVillage"
                                            value={formData.cardVillage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">แขวง/ตำบล *</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="cardSubdistrict"
                                            value={formData.cardSubdistrict}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">เขต/อำเภอ *</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="cardDistrict"
                                            value={formData.cardDistrict}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">จังหวัด *</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="cardProvince"
                                            value={formData.cardProvince}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">รหัสไปรษณีย์ *</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="cardPost"
                                            value={formData.cardPost}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* เส้นแบ่งกลาง (แนวตั้ง) */}
                                <div className="flex justify-center col-span-2">
                                <div className="border-l border-gray-300 h-full w-0"></div>
                                </div>

                                {/* ฝั่งขวา: ที่อยู่ปัจจุบัน */}
                                <div className="grid grid-cols-2 gap-3 col-span-5">
                                    <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">บ้านเลขที่/หมู่บ้าน *</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="currentHouseNumber"
                                                value={formData.currentHouseNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">หมู่ที่/คอนโด</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="currentVillage"
                                                value={formData.currentVillage}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">แขวง/ตำบล *</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="currentSubdistrict"
                                                value={formData.currentSubdistrict}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">เขต/อำเภอ *</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="currentDistrict"
                                                value={formData.currentDistrict}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">จังหวัด *</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="currentProvince"
                                                value={formData.currentProvince}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">รหัสไปรษณีย์ *</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="currentPost"
                                                value={formData.currentPost}
                                                onChange={handleChange}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>


                        {(employeeType === "O1" || employeeType === "O3") && (
                            <>
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 text-left">📜 ประวัติครอบครัว</h2>

                                <div className="grid grid-cols-2 gap-4 mt-3 relative">
                                {/* เส้นแบ่งตรงกลาง */}
                                <div className="absolute inset-y-0 left-1/2 w-px bg-gray-300"></div>

                                {/* ข้อมูลบิดา */}
                                <div className="pr-4">
                                    <div className="font-bold text-sm text-left text-green-600 mb-2">🟢 บิดา</div>
                                    <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">ชื่อ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="fatherFirstName"
                                            value={formData.fatherFirstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">นามสกุล</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="fatherLastName"
                                            value={formData.fatherLastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">อายุ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="fatherAge"
                                            value={formData.fatherAge}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">อาชีพ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="fatherJob"
                                            value={formData.fatherJob}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">เบอร์โทรศัพท์</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="fatherPhoneNo"
                                            value={formData.fatherPhoneNo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">สถานะภาพ</label>
                                        <select
                                            className="border p-1 w-full text-xs"
                                            name="fatherLifeStatus"
                                            value={formData.fatherLifeStatus}
                                            onChange={handleChange}
                                        >
                                        <option value="" selected>เลือก</option>
                                        <option value="มีชีวิตอยู่">มีชีวิตอยู่</option>
                                        <option value="เสียชีวิต">เสียชีวิต</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>

                                {/* ข้อมูลมารดา */}
                                <div className="pl-4">
                                    <div className="font-bold text-sm text-left text-green-600 mb-2">🟢 มารดา</div>
                                    <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">ชื่อ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="motherFirstName"
                                            value={formData.motherFirstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">นามสกุล</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="motherLastName"
                                            value={formData.motherLastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">อายุ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="motherAge"
                                            value={formData.motherAge}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">อาชีพ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="motherJob"
                                            value={formData.motherJob}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">เบอร์โทรศัพท์</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="motherPhoneNo"
                                            value={formData.motherPhoneNo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">สถานะภาพ</label>
                                        <select
                                            className="border p-1 w-full text-xs"
                                            name="motherLifeStatus"
                                            value={formData.motherLifeStatus}
                                            onChange={handleChange}
                                        >
                                        <option value="" selected>เลือก</option>
                                        <option value="มีชีวิตอยู่">มีชีวิตอยู่</option>
                                        <option value="เสียชีวิต">เสียชีวิต</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                {/* ข้อมูลพี่น้อง */}
                                <div className="grid grid-cols-4 gap-3 mt-2">
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">พี่น้อง รวมตัวเอง/คน</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="siblingsCount"
                                        value={formData.siblingsCount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">เป็นคนที่</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="siblingsNumber"
                                        value={formData.siblingsNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">พี่ชาย</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="brotherCount"
                                        value={formData.brotherCount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">พี่สาว</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="sisterCount"
                                        value={formData.sisterCount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">น้องชาย</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="youngerBrotherCount"
                                        value={formData.youngerBrotherCount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">น้องสาว</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="youngerSisterCount"
                                        value={formData.youngerSisterCount}
                                        onChange={handleChange}
                                    />
                                </div>
                                </div>
                            </div>
                            </>
                        )}

                        <div className="border-t border-gray-200 pt-4">
                            {/* หัวข้อบุคคลติดต่อฉุกเฉิน */}
                            <h2 className="text-lg font-bold text-red-600 flex items-center">
                                📞 บุคคลติดต่อฉุกเฉิน
                            </h2>

                            {/* ข้อมูลบุคคลติดต่อฉุกเฉิน */}
                            <div className="grid grid-cols-4 gap-3 mt-3">
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">ชื่อ</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyFirstName"
                                        value={formData.emergencyFirstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">นามสกุล</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyLastName"
                                        value={formData.emergencyLastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">เบอร์โทรศัพท์</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyPhoneNo"
                                        value={formData.emergencyPhoneNo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">ความสัมพันธ์</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyRelationship"
                                        value={formData.emergencyRelationship}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* ข้อมูลที่อยู่ของบุคคลติดต่อฉุกเฉิน */}
                            <div className="grid grid-cols-4 gap-3 mt-3">
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">บ้านเลขที่/หมู่บ้าน *</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyHouseNumber"
                                        value={formData.emergencyHouseNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">หมู่ที่/คอนโด</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyVillage"
                                        value={formData.emergencyVillage}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">แขวง/ตำบล *</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencySubdistrict"
                                        value={formData.emergencySubdistrict}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">เขต/อำเภอ *</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyDistrict"
                                        value={formData.emergencyDistrict}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">จังหวัด *</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyProvince"
                                        value={formData.emergencyProvince}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">รหัสไปรษณีย์ *</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="emergencyPost"
                                        value={formData.emergencyPost}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {(employeeType === "O1" || employeeType === "O3") && (
                            <>
                             {/* Section สถานะสมรส */}
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">💍 5. สถานะสมรส</h2>

                                {/* สถานะสมรส */}
                                <div className="grid grid-cols-1 gap-4 mt-3">
                                <div className="flex items-center">
                                    <label className="text-sm font-bold mr-2">สถานะสมรส:</label>
                                    <select
                                        className="border p-1 w-full text-xs"
                                        name="marryStatus"
                                        value={formData.marryStatus}
                                        onChange={handleChange}
                                    >
                                    <option value="">เลือก</option>
                                    <option value="โสด">โสด</option>
                                    <option value="สมรส">สมรส</option>
                                    <option value="หย่า">หย่า</option>
                                    <option value="หม้าย">หม้าย</option>
                                    </select>
                                </div>

                                {/* ข้อมูลคู่สมรส */}
                                <div>
                                    <h3 className="text-sm text-left font-bold text-red-500">(หากมี)</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">ชื่อคู่สมรส</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryFirstName"
                                            value={formData.marryFirstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">นามสกุลคู่สมรส</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryLastName"
                                            value={formData.marryLastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">อายุ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryAge"
                                            value={formData.marryAge}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">เพศบุตร</label>
                                        <select
                                            className="border p-1 w-full text-xs"
                                            name="marryChildrenSex"
                                            value={formData.marryChildrenSex}
                                            onChange={handleChange}
                                        >
                                        <option value="">เลือก</option>
                                        <option value="ชาย">ชาย</option>
                                        <option value="หญิง">หญิง</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">จำนวนบุตร</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryChildrenNumber"
                                            value={formData.marryChildrenNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">อายุบุตร</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryChildrenAge"
                                            value={formData.marryChildrenAge}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">สถานที่ทำงานคู่สมรส</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryWorkLocation"
                                            value={formData.marryWorkLocation}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-left font-bold text-xs mb-1">เบอร์โทรศัพท์คู่สมรส</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="marryPhoneNo"
                                            value={formData.marryPhoneNo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* Section สถานภาพทางทหาร */}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">🎖️ สถานภาพทางทหาร</h2>
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">สถานะทหาร</label>
                                    <select
                                        className="border p-1 w-full text-xs"
                                        name="militaryStatus"
                                        value={formData.position}
                                        onChange={handleChange}
                                    >
                                    <option value="">เลือก</option>
                                    <option value="ผ่านการเกณฑ์ทหาร">ผ่านการเกณฑ์ทหาร</option>
                                    <option value="ได้รับการยกเว้น">ได้รับการยกเว้น</option>
                                    <option value="อยู่ระหว่างผ่อนผัน">อยู่ระหว่างผ่อนผัน</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">หมายเหตุ (ถ้ามี)</label>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกข้อมูล" 
                                        name="militaryRemark"
                                        value={formData.militaryRemark}
                                        onChange={handleChange}
                                    />
                                </div>
                                </div>
                            </div>

                            {/* Section ประวัติการศึกษา */}
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">🎓 ประวัติการศึกษา</h2>
                                {/* ตารางข้อมูลการศึกษา 1*/}
                                <div className="grid grid-cols-1 gap-4 mt-3">
                                    <div className="grid grid-cols-6 gap-3 mt-3">
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ระดับการศึกษา</label>
                                            <select
                                                className="border p-1 w-full text-xs"
                                                name="educationLevel1"
                                                value={formData.educationLevel1}
                                                onChange={handleChange}
                                            >
                                            <option value="">เลือก</option>
                                            <option value="มัธยมศึกษา">มัธยมศึกษา</option>
                                            <option value="ประกาศนียบัตร">ประกาศนียบัตร</option>
                                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                                            <option value="ปริญญาโท">ปริญญาโท</option>
                                            <option value="ปริญญาเอก">ปริญญาเอก</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ชื่อสถาบัน</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationNameInstitution1"
                                                value={formData.educationNameInstitution1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">คณะ/สาขา</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="education_faculty1"
                                                value={formData.educationFaculty1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ช่วงเวลาที่ศึกษา</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationPeriod1"
                                                value={formData.educationPeriod1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">เกรดเฉลี่ย</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationGrade1"
                                                value={formData.educationGrade1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* ตารางข้อมูลการศึกษา 2*/}
                                <div className="grid grid-cols-1 gap-4 mt-3">
                                    <div className="grid grid-cols-6 gap-3 mt-3">
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ระดับการศึกษา</label>
                                            <select
                                                className="border p-1 w-full text-xs"
                                                name="educationLevel2"
                                                value={formData.educationLevel2}
                                                onChange={handleChange}
                                            >
                                            <option value="">เลือก</option>
                                            <option value="มัธยมศึกษา">มัธยมศึกษา</option>
                                            <option value="ประกาศนียบัตร">ประกาศนียบัตร</option>
                                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                                            <option value="ปริญญาโท">ปริญญาโท</option>
                                            <option value="ปริญญาเอก">ปริญญาเอก</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ชื่อสถาบัน</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationNameInstitution2"
                                                value={formData.educationNameInstitution2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">คณะ/สาขา</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationFaculty2"
                                                value={formData.educationFaculty2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ช่วงเวลาที่ศึกษา</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationPeriod2"
                                                value={formData.educationPeriod2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">เกรดเฉลี่ย</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationGrade2"
                                                value={formData.educationGrade2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* ตารางข้อมูลการศึกษา 3*/}
                                <div className="grid grid-cols-1 gap-4 mt-3">
                                    <div className="grid grid-cols-6 gap-3 mt-3">
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ระดับการศึกษา</label>
                                            <select
                                                className="border p-1 w-full text-xs"
                                                name="educationLevel3"
                                                value={formData.educationLevel3}
                                                onChange={handleChange}
                                            >
                                            <option value="">เลือก</option>
                                            <option value="มัธยมศึกษา">มัธยมศึกษา</option>
                                            <option value="ประกาศนียบัตร">ประกาศนียบัตร</option>
                                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                                            <option value="ปริญญาโท">ปริญญาโท</option>
                                            <option value="ปริญญาเอก">ปริญญาเอก</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ชื่อสถาบัน</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationNameInstitution3"
                                                value={formData.educationNameInstitution3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">คณะ/สาขา</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationFaculty3"
                                                value={formData.educationFaculty3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">ช่วงเวลาที่ศึกษา</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationPeriod3"
                                                value={formData.educationPeriod3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-left font-bold text-xs mb-1">เกรดเฉลี่ย</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="educationGrade3"
                                                value={formData.educationGrade3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </>
                        )}
                        <div className="border-t border-gray-200 pt-4">
                            {/* หัวข้อประวัติการทำงาน */}
                            <div className="flex items-center justify-start mb-2">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">📄 ประวัติการทำงาน</h2>
                            </div>

                            {/* ตารางกรอกประวัติการทำงาน 1*/}
                            <div className="grid grid-cols-5 gap-3">
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ชื่อบริษัท</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryCompanyName1"
                                    value={formData.workHistoryCompanyName1}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">สาขา</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryBranch1"
                                    value={formData.workHistoryBranch1}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ตำแหน่ง</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryRole1"
                                    value={formData.workHistoryRole1}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ระยะเวลา</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryPeriod1"
                                    value={formData.workHistoryPeriod1}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">อื่นๆ</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryOther1"
                                    value={formData.workHistoryOther1}
                                    onChange={handleChange}
                                />
                                </div>
                            </div>

                            {/* ตารางกรอกประวัติการทำงาน 2*/}
                            <div className="grid grid-cols-5 gap-3">
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ชื่อบริษัท</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryCompanyName2"
                                    value={formData.workHistoryCompanyName2}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">สาขา</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryBranch2"
                                    value={formData.workHistoryBranch2}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ตำแหน่ง</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryRole2"
                                    value={formData.workHistoryRole2}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ระยะเวลา</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryPeriod2"
                                    value={formData.workHistoryPeriod2}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">อื่นๆ</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryOther2"
                                    value={formData.workHistoryOther2}
                                    onChange={handleChange}
                                />
                                </div>
                            </div>

                            {/* ตารางกรอกประวัติการทำงาน 3*/}
                            <div className="grid grid-cols-5 gap-3">
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ชื่อบริษัท</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryCompanyName3"
                                    value={formData.workHistoryCompanyName3}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">สาขา</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryBranch3"
                                    value={formData.workHistoryBranch3}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ตำแหน่ง</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryRole3"
                                    value={formData.workHistoryRole3}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">ระยะเวลา</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryPeriod3"
                                    value={formData.workHistoryPeriod3}
                                    onChange={handleChange}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label className="text-xs font-bold mb-1">อื่นๆ</label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="workHistoryOther3"
                                    value={formData.workHistoryOther3}
                                    onChange={handleChange}
                                />
                                </div>
                            </div>

                        </div>

                        {(employeeType === "O1" || employeeType === "O3") && (
                            <>
                             {/* Section ประวัติรักษาพยาบาล */}
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">🏥 ประวัติรักษาพยาบาล</h2>

                                <div className="grid grid-cols-1 gap-4 mt-3">
                                {/* ข้อ 1 */}
                                <div className="grid grid-cols-3 gap-3 items-center">
                                    <label className="text-left font-bold text-xs">
                                    1. ท่านเคยป่วยหนักหรือเป็นโรคติดต่อร้ายแรงมาก่อนหรือไม่?
                                    </label>
                                    <div className="flex gap-2 items-center">
                                    <input type="radio" name="seriousContagious" className="mr-1" value="ไม่เคย" onChange={handleChange}/>
                                    <label className="text-xs">ไม่เคย</label>
                                    <input type="radio" name="seriousContagious" className="ml-4 mr-1" value="เคย" onChange={handleChange}/>
                                    <label className="text-xs">เคย</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)" 
                                        name="seriousContagiousRemark"
                                        value={formData.seriousContagiousRemark}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ข้อ 2 */}
                                <div className="grid grid-cols-3 gap-3 items-center">
                                    <label className="text-left font-bold text-xs">
                                    2. ท่านมีโรคประจำตัวหรือไม่?
                                    </label>
                                    <div className="flex gap-2 items-center">
                                    <input type="radio" name="congenitalDisease" className="mr-1" value="ไม่มี" onChange={handleChange}/>
                                    <label className="text-xs">ไม่มี</label>
                                    <input type="radio" name="congenitalDisease" className="ml-4 mr-1" value="มี" onChange={handleChange}/>
                                    <label className="text-xs">มี</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)" 
                                        name="congenitalDiseaseRemark"
                                        value={formData.congenitalDiseaseRemark}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ข้อ 3 */}
                                <div className="grid grid-cols-3 gap-3 items-center">
                                    <label className="text-left font-bold text-xs">
                                    3. ท่านเคยได้รับคำสั่งการใช้ยาจากแพทย์หรือไม่?
                                    </label>
                                    <div className="flex gap-2 items-center">
                                    <input type="radio" name="prescribedMedication" className="mr-1" value="ไม่เคย" onChange={handleChange}/>
                                    <label className="text-xs">ไม่เคย</label>
                                    <input type="radio" name="prescribedMedication" className="ml-4 mr-1" value="เคย" onChange={handleChange}/>
                                    <label className="text-xs">เคย</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)" 
                                        name="prescribedMedicationRemark"
                                        value={formData.prescribedMedicationRemark}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ข้อ 4 */}
                                <div className="grid grid-cols-3 gap-3 items-center">
                                    <label className="text-left font-bold text-xs">
                                    4. ท่านมีความพิการไม่ว่าส่วนใดของร่างกายหรือไม่?
                                    </label>
                                    <div className="flex gap-2 items-center">
                                    <input type="radio" name="defective" className="mr-1" value="ไม่มี" onChange={handleChange}/>
                                    <label className="text-xs">ไม่มี</label>
                                    <input type="radio" name="defective" className="ml-4 mr-1" value="มี" onChange={handleChange}/>
                                    <label className="text-xs">มี</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="border p-1 w-full text-xs" 
                                        placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)" 
                                        name="defectiveRemark"
                                        value={formData.defectiveRemark}
                                        onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                            {/* Section ประวัติฝึกอบรม */}
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">📚 ประวัติฝึกอบรม</h2>

                                <div className="grid grid-cols-1 gap-3 mt-3">
                                    <div className="grid grid-cols-4 gap-3 items-center">
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">เรื่อง/หัวข้อ</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingTopic1"
                                                value={formData.trainingTopic1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">สถานที่ฝึกอบรม</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingLocation1"
                                                value={formData.trainingLocation1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">วันที่เริ่ม</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingStartDate1"
                                                value={formData.trainingStartDate1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">วันที่จบ</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingStartEnd1"
                                                value={formData.trainingStartEnd1}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-3">
                                    <div className="grid grid-cols-4 gap-3 items-center">
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">เรื่อง/หัวข้อ</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingTopic2"
                                                value={formData.trainingTopic2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">สถานที่ฝึกอบรม</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingLocation2"
                                                value={formData.trainingLocation2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">วันที่เริ่ม</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingStartDate2"
                                                value={formData.trainingStartDate2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">วันที่จบ</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingStartEnd2"
                                                value={formData.trainingStartEnd2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-3">
                                    <div className="grid grid-cols-4 gap-3 items-center">
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">เรื่อง/หัวข้อ</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingTopic3"
                                                value={formData.trainingTopic3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">สถานที่ฝึกอบรม</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingLocation3"
                                                value={formData.trainingLocation3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">วันที่เริ่ม</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingStartDate3"
                                                value={formData.trainingStartDate3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-left font-bold text-xs mb-1">วันที่จบ</label>
                                            <input 
                                                type="text" 
                                                className="border p-1 w-full text-xs" 
                                                placeholder="กรอกข้อมูล" 
                                                name="trainingStartEnd3"
                                                value={formData.trainingStartEnd3}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section ความสามารถทางภาษา */}
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">🌍 ความสามารถทางภาษา (ถ้ามี)</h2>

                                <div className="grid grid-cols-2 gap-4 mt-3">
                                {/* ด้านซ้าย */}
                                <div className="space-y-2">
                                    {[
                                    { label: "ระดับภาษาอังกฤษตามมาตรฐานสากล (CEFR)", options: ["A1", "A2", "B1", "B2", "C1", "C2"] },
                                    { label: "ระดับภาษาจีนตามมาตรฐาน HSK", options: ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"] }
                                    ].map((item, index) => (
                                    <div key={index}>
                                        <label className="text-left font-bold text-xs mb-1">{item.label}</label>
                                        <select
                                            className="border p-1 w-full text-xs"
                                            name="englishLevel"
                                            value={formData.englishLevel}
                                            onChange={handleChange}
                                        >
                                        <option value="">เลือก</option>
                                        {item.options.map((option, i) => (
                                            <option key={i} value={option}>{option}</option>
                                        ))}
                                        </select>
                                    </div>
                                    ))}
                                </div>

                                {/* ด้านขวา */}
                                <div className="grid grid-cols-2 gap-3">                               
                                    <div>
                                        <label className="text-left font-bold text-xs mb-1">TOEIC (คะแนน)</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="toeicPoint"
                                            value={formData.toeicPoint}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-left font-bold text-xs mb-1">IELTS (คะแนน)</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="ieltsPoint"
                                            value={formData.ieltsPoint}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-left font-bold text-xs mb-1">TOEFL (คะแนน)</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="toeflPoint"
                                            value={formData.toeflPoint}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-left font-bold text-xs mb-1">ภาษาอื่นๆ</label>
                                        <input 
                                            type="text" 
                                            className="border p-1 w-full text-xs" 
                                            placeholder="กรอกข้อมูล" 
                                            name="otherLanguages"
                                            value={formData.otherLanguages}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
                            </>
                        )}
                        
                        <div className="border-t border-gray-200 pt-4">
                            <h2 className="text-lg font-bold text-gray-700 flex items-center">📝 อื่นๆ</h2>

                            <div className="grid grid-cols-12 gap-6 mt-3">
                                {/* ฝั่งซ้าย: หัวข้อ */}
                                <div className="flex flex-col space-y-4 col-span-3 text-left">
                                <span className="text-sm font-bold">มีพาหนะเป็นของตัวเอง</span>
                                <span className="text-sm font-bold">ความสามารถในการใช้เครื่องสำนักงาน</span>
                                <span className="text-sm font-bold">สามารถไปปฏิบัติงานต่างจังหวัดได้</span>
                                <span className="text-sm font-bold">ความสามารถอื่น</span>
                                <span className="text-sm font-bold">ความสามารถพิเศษ</span>
                                </div>

                                {/* เส้นแบ่งตรงกลาง */}
                                <div className="border-l border-gray-300 col-span-1"></div>

                                {/* ฝั่งขวา: ตัวเลือกและช่องกรอก */}
                                <div className="flex flex-col space-y-4 col-span-8">
                                {/* ✅ มีพาหนะเป็นของตัวเอง */}
                                <div className="flex gap-4">
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> รถยนต์
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> รถจักรยานยนต์
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> ไม่มี
                                    </label>
                                </div>

                                {/* ✅ ความสามารถในการใช้เครื่องสำนักงาน */}
                                <div className="flex gap-4">
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> ใช้ได้
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> ใช้ไม่ได้
                                    </label>
                                </div>

                                {/* ✅ สามารถไปปฏิบัติงานต่างจังหวัดได้ */}
                                <div className="flex gap-4 items-center">
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> ได้
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-1" /> ไม่ได้ ระบุ
                                    </label>
                                    <input 
                                        type="text" 
                                        className="border p-1 text-xs w-100" 
                                        placeholder="กรอกข้อมูล" 
                                        name="workOtherProvincesRemark"
                                        value={formData.workOtherProvincesRemark}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ✅ ความสามารถอื่น */}
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="otherAbilities"
                                    value={formData.otherAbilities}
                                    onChange={handleChange}
                                />
                                {/* ✅ ความสามารถพิเศษ */}
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="talent"
                                    value={formData.talent}
                                    onChange={handleChange}
                                />
                                </div>
                            </div>
                        </div>


                        {(employeeType !== "O1" && employeeType !== "O3") && (
                            <>
                            <div className="border-t pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">📂 อัปโหลดไฟล์เอกสาร</h2>

                                {/* ช่องกรอกข้อมูล */}
                                <div className="grid grid-cols-4 gap-6 mt-4">
                                    <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">วันที่ หมดอายุ ของบัตร</label>
                                    <input type="text" className="border p-1 w-full text-xs" placeholder="กรอกข้อมูล" />
                                    </div>
                                    <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">สถานะบัตร</label>
                                    <input type="text" className="border p-1 w-full text-xs" placeholder="กรอกข้อมูล" />
                                    </div>
                                </div>

                                {/* รายการอัปโหลดไฟล์ */}
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {/* 1. สำเนาบัตรประชาชน */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">สำเนาบัตรประชาชน</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="สำเนาบัตรประชาชน" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 2. บัญชีธนาคาร */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">บัญชีธนาคาร</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="บัญชีธนาคาร" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 3. ใบยินยอมผู้ปกครอง */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-sm font-bold">ใบยินยอมผู้ปกครอง</span>
                                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="ใบยินยอมผู้ปกครอง" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                            อัพโหลด
                                            <input type="file" className="hidden" />
                                            </label>
                                            <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                        </div>
                                    </div>

                                    {/* 4. ใบเปลี่ยนชื่อ (ถ้ามี) */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-sm font-bold">ใบเปลี่ยนชื่อ (ถ้ามี)</span>
                                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="ใบเปลี่ยนชื่อ" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                            อัพโหลด
                                            <input type="file" className="hidden" />
                                            </label>
                                            <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                        </div>
                                    </div>

                                    {/* 5. ใบเปลี่ยนนามสกุล (ถ้ามี) */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-sm font-bold">ใบเปลี่ยนนามสกุล (ถ้ามี)</span>
                                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="ใบเปลี่ยนนามสกุล" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                            อัพโหลด
                                            <input type="file" className="hidden" />
                                            </label>
                                            <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                        </div>
                                    </div>

                                    {/* 6. ใบตรวจประวัติอาชญากรรม */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-sm font-bold">ใบตรวจประวัติอาชญากรรม</span>
                                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="ใบตรวจประวัติอาชญากรรม" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                            อัพโหลด
                                            <input type="file" className="hidden" />
                                            </label>
                                            <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                        </div>
                                    </div>

                                    {/* 7. เอกสารประกอบอื่น (ถ้ามี) */}
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-sm font-bold">เอกสารประกอบอื่น (ถ้ามี)</span>
                                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="เอกสารประกอบอื่น" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                            อัพโหลด
                                            <input type="file" className="hidden" />
                                            </label>
                                            <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                        {(employeeType === "O1" || employeeType === "O3") && (
                            <>
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">📂 อัปโหลดไฟล์เอกสาร</h2>

                                {/* ช่องกรอกข้อมูล */}
                                <div className="grid grid-cols-4 gap-6 mt-4">
                                    <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">วันที่ หมดอายุ ของบัตร</label>
                                    <input type="text" className="border p-1 w-full text-xs" placeholder="กรอกข้อมูล" />
                                    </div>
                                    <div className="flex flex-col">
                                    <label className="text-left font-bold text-xs mb-1">สถานะบัตร</label>
                                    <input type="text" className="border p-1 w-full text-xs" placeholder="กรอกข้อมูล" />
                                    </div>
                                </div>

                                {/* รายการอัปโหลดไฟล์ */}
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {/* 1. สำเนาบัตรประชาชน */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">สำเนาบัตรประชาชน</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="สำเนาบัตรประชาชน" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 2. สำเนาทะเบียนบ้าน */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">สำเนาทะเบียนบ้าน</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="สำเนาทะเบียนบ้าน" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 3. สำเนาวุฒิการศึกษา */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">สำเนาวุฒิการศึกษา</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="สำเนาวุฒิการศึกษา" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 4. สำเนาเอกสารราชการอื่นๆ */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">สำเนาเอกสารราชการอื่นๆ (ถ้ามี)</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="เอกสารราชการ" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 5. เอกสารใบผ่านงานอื่น (ถ้ามี) */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">เอกสารใบผ่านงานอื่น (ถ้ามี)</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="ใบผ่านงาน" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 6. เอกสารประกอบอื่น (ถ้ามี) */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">เอกสารประกอบอื่น (ถ้ามี)</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="เอกสารประกอบ" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>

                                    {/* 7. สำเนาใบขับขี่ */}
                                    <div className="flex flex-col items-center space-y-2">
                                    <span className="text-sm font-bold">สำเนาใบขับขี่</span>
                                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                                        <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="ใบขับขี่" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex gap-2">
                                        <label className="bg-blue-500 text-white text-xs py-1 px-3 rounded cursor-pointer">
                                        อัพโหลด
                                        <input type="file" className="hidden" />
                                        </label>
                                        <button className="bg-red-500 text-white text-xs py-1 px-3 rounded">ลบ</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </>
                        )}
                        {(employeeType !== "O2") && (
                            <>
                             {/* Section รายการใบเตือน */}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-bold flex items-center">📄 รายการใบเตือน</h2>

                                    {/* ปุ่มสร้างเอกสารใหม่ */}
                                    <button className="flex items-center text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5 rounded shadow-md">
                                        <FaPlus className="mr-1" /> สร้างเอกสารใหม่
                                    </button>
                                    </div>

                                    {/* ตาราง */}
                                    <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse border border-gray-300">
                                        <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="px-2 py-1 border">ลำดับ</th>
                                            <th className="px-2 py-1 border">เลขที่</th>
                                            <th className="px-2 py-1 border">รายละเอียด</th>
                                            <th className="px-2 py-1 border">สถานะ</th>
                                            <th className="px-2 py-1 border">จัดการ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="px-2 py-1 border text-center" colSpan={5}>No Data Available</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>

                                {/* Section รายการหนังสือเปลี่ยนแปลงสถานภาพ */}
                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-bold flex items-center">📄 รายการหนังสือเปลี่ยนแปลงสถานภาพ</h2>

                                    <button className="flex items-center text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5 rounded shadow-md">
                                        <FaPlus className="mr-1" /> สร้างเอกสารเปลี่ยนแปลงสถานภาพ
                                    </button>
                                    </div>

                                    {/* ตาราง */}
                                    <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse border border-gray-300">
                                        <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="px-2 py-1 border">ลำดับ</th>
                                            <th className="px-2 py-1 border">เลขที่</th>
                                            <th className="px-2 py-1 border">ตำแหน่งเดิม</th>
                                            <th className="px-2 py-1 border">ตำแหน่งใหม่</th>
                                            <th className="px-2 py-1 border">สถานะ</th>
                                            <th className="px-2 py-1 border">จัดการ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="px-2 py-1 border text-center" colSpan={6}>No Data Available</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Section แก้ไขล่าสุด */}
                        <div className="border-t border-gray-200 pt-4">
                            <h2 className="text-lg font-bold text-gray-700 text-left">🖋️ ผู้ที่แก้ไขล่าสุด</h2>

                            <div className="grid grid-cols-2 gap-4 mt-3 w-1/2">
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">Emp Code</label>
                                <input type="text" className="border p-1 w-full text-xs" maxLength={10} />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">Emp Name</label>
                                <input type="text" className="border p-1 w-full text-xs" maxLength={10} />
                            </div>
                            </div>
                        </div>

                        {/* Section User Login */}
                        <div className="border-t border-gray-200 pt-4">
                            <h2 className="text-lg font-bold text-gray-700 text-left">👥 User Login</h2>

                            <div className="grid grid-cols-2 gap-4 mt-3 w-1/2">
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">
                                <FaUser className="mr-1 inline-block" /> Username
                                </label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left font-bold text-xs mb-1">
                                <FaLock className="mr-1 inline-block" /> Password
                                </label>
                                <input 
                                    type="text" 
                                    className="border p-1 w-full text-xs" 
                                    placeholder="กรอกข้อมูล" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            </div>
                        </div>

                        {/* Section Back List */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <h2 className="text-lg font-bold text-gray-700 text-left">📃 Backlist</h2>

                            <div className="flex flex-col mt-3">
                            <label className="text-left font-bold text-xs mb-1">Backlist Detail</label>
                            <textarea 
                                value={formData.blackListRemark}
                                onChange={handleChange}
                                className="border p-2 w-full text-xs" 
                                rows={3}></textarea>
                            </div>
                        </div>

                        {/* Section Device Manager */}
                        <div className="border-t border-gray-200 pt-4 mt-4 mb-5">
                            <h2 className="text-lg font-bold text-gray-700 text-left">🖥️ Device Manager</h2>

                            <div className="flex items-center mt-3">
                            <label className="text-sm font-bold text-left mr-2">UDID Number :</label>

                            <input type="text" className="border p-2 w-1/3 text-xs" placeholder="กรอก UDID หมายเลขอุปกรณ์" />

                            <button className="bg-gray-500 text-white text-xs py-1 px-2 rounded ml-2 flex items-center">
                                <FaUndo className="mr-1" /> Reset UDID
                            </button>
                            </div>
                        </div>

                </div> 
            </div>

            {/* Footer */}
            <div className="border-t gap-2 pt-3 flex justify-end">
                <button onClick={handleSaveUser} className="bg-green-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2">
                    <FaSave className="text-lg" /> บันทึก
                </button>
                <button onClick={onClose} className="bg-gray-500 text-white cursor-pointer text-xs px-3 py-2 rounded flex items-center gap-2">
                    <FaTimes className="text-lg" /> ยกเลิก
                </button>
            </div>

        </Modal>

    );
};

export default EmployeeChangeModal;
