import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

const selectClassName = `
  border p-2 w-full appearance-none bg-white 
  bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%227%22%20viewBox%3D%220%200%2012%207%22%3E%3Cpath%20fill%3D%22%23374151%22%20d%3D%22M11.85.65c-.2-.2-.5-.2-.7%200L6%205.79%200.85.65c-.2-.2-.5-.2-.7%200-.2.2-.2.5%200%20.7l5.5%205.5c.1.1.23.15.35.15.12%200%20.25-.05.35-.15l5.5-5.5c.2-.2.2-.5%200-.7z%22%2F%3E%3C%2Fsvg%3E')] 
  bg-[length:12px] bg-no-repeat bg-[center_right_1rem] 
  pr-10 
  hover:border-gray-400 
  focus:outline-none focus:border-blue-500
`;

export default function PlanYExclusiveFormProjectModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [quotationNumber, setQuotationNumber] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [prNO, setprNO] = useState('');
    const [errors, setErrors] = useState({
        projectName: '',
        quotationNumber: '',
        prNO: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
    });

    const validate = () => {
        const newErrors: any = {};
        if (!projectName.trim()) newErrors.projectName = 'กรุณากรอกชื่อโปรเจค';
        if (!quotationNumber.trim()) newErrors.quotationNumber = 'กรุณากรอกเลข Quotation';
        if (!prNO.trim()) newErrors.prNO = 'กรุณากรอกเลข PR NO';
        if (!startDate) newErrors.startDate = 'กรุณาเลือกวันเริ่มต้น';
        if (!endDate) newErrors.endDate = 'กรุณาเลือกวันสิ้นสุด';
        if (!startTime) newErrors.startTime = 'กรุณาเลือกเวลาเริ่มต้น';
        if (!endTime) newErrors.endTime = 'กรุณาเลือกเวลาสิ้นสุด';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            // Perform save logic
            console.log('Form is valid');
        }
    };

    const clearForm = () => {
        setProjectName('');
        setQuotationNumber('');
        setStartDate(null);
        setEndDate(null);
        setStartTime('');
        setEndTime('');
        setprNO('');
        setErrors({
            projectName: '',
            quotationNumber: '',
            prNO: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
        });
    };
    
    const handleClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        clearForm();
        setTimeout(() => {
            onClose();
        }, 200);
    };

    // เมื่อ modal เปิดใหม่ ให้ reset การปิด
    useEffect(() => {
        if (isOpen) setIsClosing(false);
    }, [isOpen]);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            Modal.setAppElement(document.body);
        }
    }, []);

    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProjectName(value);
        if (value.trim()) {
            setErrors(prev => ({ ...prev, projectName: '' }));
        }
    };

    const handleQuotationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setQuotationNumber(value);
        if (value) {
            setErrors(prev => ({ ...prev, quotationNumber: '' }));
        }
    };

    const handlePRNOChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setprNO(value);
        if (value) {
            setErrors(prev => ({ ...prev, prNO: '' }));
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            setErrors(prev => ({ ...prev, startDate: '' }));
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        if (date) {
            setErrors(prev => ({ ...prev, endDate: '' }));
        }
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setStartTime(value);
        if (value) {
            setErrors(prev => ({ ...prev, startTime: '' }));
        }
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEndTime(value);
        if (value) {
            setErrors(prev => ({ ...prev, endTime: '' }));
        }
    };

    if (!mounted) return null;
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            className={`rounded-lg shadow-lg p-6 w-[900px] bg-white ${isClosing ? 'pop-out-reverse' : 'pop-out'}`}
        >
            <h1 className="text-4xl font-bold mb-6 text-center">📝 สร้างโปรเจค</h1>
            <div className='text-lg text-blue-800 font-bold'> รายละเอียด </div>
            <div className="grid grid-cols-4 gap-4 mb-4 mt-2">
                <div className="col-span-1 h-[70px]">
                    <label className="block text-sm  font-medium mb-1">ชื่อโปรเจค *</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        placeholder='กรอกชื่อโปรเจค'
                        onChange={handleProjectNameChange}
                        value={projectName}
                    />
                    {errors.projectName && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.projectName}</span>}
                </div>
                <div className="col-span-1 h-[70px]">
                    <label className="block text-sm font-medium mb-1">เลข Quotation *</label>
                    <select
                        className={selectClassName}
                        onChange={handleQuotationChange}
                        value={quotationNumber}
                    >
                        <option value="" disabled hidden>เลือกเลข Quotation</option>
                        <option value="Q001">Q001</option>
                        <option value="Q002">Q002</option>
                        <option value="Q003">Q003</option>
                    </select>
                    {errors.quotationNumber && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.quotationNumber}</span>}
                </div>
                <div className="col-span-1  h-[70px]">
                    <label className="block text-sm font-medium mb-1">วันเริ่มต้น *</label>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="border p-2 w-full"
                            placeholderText="เลือกวันเริ่มต้น"
                            maxDate={endDate ?? undefined}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    {errors.startDate && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.startDate}</span>}
                </div>

                <div className="col-span-1  h-[70px]">
                    <label className="block text-sm font-medium mb-1">วันสิ้นสุด *</label>
                    <div className="relative">
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="border p-2 w-full"
                            placeholderText="เลือกวันสิ้นสุด"
                            minDate={startDate ?? undefined}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    {errors.endDate && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.endDate}</span>}
                </div>

                <div className="col-span-1 h-[70px]">
                    <label className="block text-sm font-medium mb-1">PR NO</label>
                    <select 
                        className={selectClassName}
                        onChange={handlePRNOChange}    
                        value={prNO}
                    >
                        <option value="" disabled hidden>เลือกเลข PR NO</option>
                        <option value="PR001">PR001</option>
                        <option value="PR002">PR002</option>
                        <option value="PR003">PR003</option>
                    </select>
                    {errors.endDate && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.endDate}</span>}
                </div>
                <div className="col-span-1 h-[70px]">
                    <label className="block text-sm font-medium mb-1">เวลาเริ่มต้น *</label>
                    <select
                        className={selectClassName}
                        onChange={handleStartTimeChange}
                        value={startTime}
                    >
                        <option value="" disabled hidden>เลือกเวลาเริ่มต้น</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                    </select>
                    {errors.startTime && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.startTime}</span>}
                </div>
                <div className="col-span-1 h-[70px]">
                    <label className="block text-sm font-medium mb-1">เวลาสิ้นสุด *</label>
                    <select
                        className={selectClassName}
                        onChange={handleEndTimeChange}
                        value={endTime}
                    >
                        <option value="" disabled hidden>เลือกเวลาสิ้นสุด</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                    </select>
                    {errors.endTime && <span className="text-red-500 text-sm min-h-[1.25rem]">{errors.endTime}</span>}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-4">
                    <label className="block text-sm font-medium mb-1">หมายเหตุ</label>
                    <textarea className="border p-2 w-full" placeholder="เพิ่มหมายเหตุ (ถ้ามี)"></textarea>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handleSave} className="bg-indigo-500 text-white px-4 py-2 rounded">บันทึก</button>
                <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">ยกเลิก</button>
            </div>

        </Modal>
    );
}
