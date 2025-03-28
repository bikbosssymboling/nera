import { useState } from "react";
import { FaBriefcase, FaPlus, FaSearch } from "react-icons/fa";
import PlanYExclusiveRetrieveModal from "./component/PlanYExclusiveRetrieveModal";
import PlanYExclusiveFormProjectModal from "./component/PlanYExclusiveFormProjectModal";


export default function PlanYExclusive() {
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalRetrieve, setShowModalRetrieve] = useState(false);

    return (
        <div className="p-2">
            {/* Header */}
            <h2 className="text-2xl font-bold flex items-center mb-4 text-black">
                <FaBriefcase className="mr-2" /> Setup Master Region
            </h2>
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowModalRetrieve(true)}
                        className="cursor-pointer bg-blue-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaSearch /> สืบค้น
                    </button>
                    <button
                        onClick={() => setShowModalForm(true)}
                        className="cursor-pointer bg-green-500 text-white text-xs px-3 py-2 rounded flex items-center gap-1 shadow-md">
                        <FaPlus /> สร้างโปรเจค
                    </button>
                </div>
            </div>
            {/* Modal */}
            <PlanYExclusiveFormProjectModal isOpen={showModalForm} onClose={() => setShowModalForm(false)} />
            <PlanYExclusiveRetrieveModal isOpen={showModalRetrieve} onClose={() => setShowModalRetrieve(false)} />
        </div>
    );
}