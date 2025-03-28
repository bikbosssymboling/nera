"use client";
import React, { useEffect, useState, ReactElement, useRef } from "react";
import {
  FaCheckSquare,
  FaUserCog,
  FaPlay,
  FaFileImport,
  FaFileExcel,
  FaDollarSign,
  FaHistory,
  FaSave,
  FaPlus,
  FaTrash,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaCopy,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./css/PlanYExclusive.css";
import WorkSchedule from "./components/WorkSchedule";

// First, update the Row interface to include all necessary fields

export default function PlanYExclusiveDetail() {
  return (
    <>
      <div>
        {/* component แรก */}
        {/* Project Information */}
        <div
          className="w-full bg-white p-6 rounded-lg shadow-lg mb-6"
          id="project-info"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">
                📌 Project Information
              </h2>
              <div className="flex items-center gap-4">
                <p>
                  <strong className="text-black">Request:</strong>{" "}
                  <span className="text-blue-500">ทดสอบขอ อนุมัติ</span>
                </p>
                <p className="flex items-center gap-2">
                  <strong className="text-black">Approve:</strong>
                  <span className="text-green-500">ทดสอบ อนุมัติแผน</span>
                  <button className="text-green-500">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-check"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                      ></path>
                    </svg>
                  </button>
                </p>
              </div>
            </div>

            {/* Row 1: PR NO, AL NO, Quotation, Date, Work Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
              <p>
                <strong className="text-black">PR NO:</strong>{" "}
                <span className="text-blue-500 cursor-pointer">
                  PR123456789
                </span>
              </p>
              <p>
                <strong className="text-black">AL NO:</strong>{" "}
                <span className="text-green-500">AL123456789</span>
              </p>
              <p>
                <strong className="text-black">Quotation:</strong>{" "}
                <span className="text-amber-500">QT2025022501</span>
              </p>
              <p>
                <strong className="text-black">Date:</strong>{" "}
                <span className="text-blue-500">2025-01-18</span>{" "}
                <span className="text-black">to</span>{" "}
                <span className="text-blue-500">2025-02-28</span>
              </p>
              <p>
                <strong className="text-black">Work Time:</strong>{" "}
                <span className="text-indigo-600">11:00 - 20:00</span>
              </p>
            </div>
            {/* Row 2: Project, Job Type, Remark */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <p>
                <strong className="text-black">Project:</strong>{" "}
                <span className="text-indigo-600">New Project</span>
              </p>
              <p>
                <strong className="text-black">Job Type:</strong>{" "}
                <span className="text-indigo-600">2.1 PG/BA</span>
              </p>
              <p>
                <strong className="text-black">Remark:</strong>{" "}
                <span className="text-indigo-600">
                  ค่าจ้าง(รายวัน) งาน Sino ทำงาน 1 - 3 DEC 24 (ออกรอบ 31 Dec 24)
                </span>
              </p>
            </div>
          </div>
        </div>
        <WorkSchedule/>
     
      </div>
    </>
  );
}
