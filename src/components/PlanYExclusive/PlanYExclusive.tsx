import { useState } from "react";
import { FaBriefcase, FaPlus, FaSearch } from "react-icons/fa";
import PlanYExclusiveRetrieveModal from "./components/PlanYExclusiveRetrieveModal";
import PlanYExclusiveFormProjectModal from "./components/PlanYExclusiveFormProjectModal";

export default function PlanYExclusive() {
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalRetrieve, setShowModalRetrieve] = useState(false);

    return (
        <div className="p-6  bg-white rounded-xl shadow-lg">
            {/* Header */}
            <h2 className="text-2xl font-bold flex items-center mb-6 text-gray-800 border-b pb-4">
                <FaBriefcase className="mr-3 text-blue-700" /> 
                <span className="tracking-wide">Setup Master Region</span>
            </h2>
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setShowModalRetrieve(true)}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200 ease-in-out font-medium">
                        <FaSearch className="text-white" /> 
                        <span>สืบค้น</span>
                    </button>
                    <button
                        onClick={() => setShowModalForm(true)}
                        className="cursor-pointer bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200 ease-in-out font-medium">
                        <FaPlus className="text-white" /> 
                        <span>สร้างโปรเจค</span>
                    </button>
                </div>
            </div>
            {/* Modal */}
            <PlanYExclusiveFormProjectModal isOpen={showModalForm} onClose={() => setShowModalForm(false)} />
            <PlanYExclusiveRetrieveModal isOpen={showModalRetrieve} onClose={() => setShowModalRetrieve(false)} />
        </div>
    );
}