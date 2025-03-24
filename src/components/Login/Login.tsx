"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { authLogin } from "@/services/callAPI/Login/apiAuthService"; // ✅ เรียกใช้ Service กลาง
import Image from 'next/image';



export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            Swal.fire({
                icon: "warning",
                title: "ข้อมูลไม่ครบถ้วน",
                text: "กรุณากรอก Username และ Password ให้ครบถ้วน",
                confirmButtonColor: "#3085d6",
            });
            return;
        } else {
            try {
                const data = await authLogin(username, password); // ✅ เรียก API ผ่าน Service
                if (data.statusLogin === "Success") {
                    if (data.statusLogin !== "Not Found") {
                        localStorage.setItem("employeeID", data.employeeID);
                        localStorage.setItem("employeeCode", data.employeeCode);
                        localStorage.setItem("employeeFullName", data.fullName);
                        localStorage.setItem("employeeDepartmentName", data.departmentName);
                        localStorage.setItem("employeeRoleName", data.roleName);
                        localStorage.setItem("employeeTypeCode", data.employeeTypeCode);
                        localStorage.setItem("employeeTypeName", data.employeeTypeName);
                        router.push("/navbar");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "เข้าสู่ระบบไม่สำเร็จ",
                            html: `<span class="text-rblueed-500">ไม่พบข้อมูลผู้ใช้งาน</span>`
                        });
                        localStorage.removeItem("employeeID");
                        localStorage.removeItem("employeeCode");
                        localStorage.removeItem("employeeFullName");
                        localStorage.removeItem("employeeDepartmentName");
                        localStorage.removeItem("employeeRoleName");
                        localStorage.removeItem("employeeTypeCode");
                        localStorage.removeItem("employeeTypeName");
                        router.push("/navbar");
                    }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "เข้าสู่ระบบไม่สำเร็จ",
                        html: `<span class="text-blue-500">ไม่พบข้อมูลผู้ใช้งาน</span>`
                    });
                    localStorage.removeItem("employeeID");
                    localStorage.removeItem("employeeCode");
                    localStorage.removeItem("employeeFullName");
                    localStorage.removeItem("employeeDepartmentName");
                    localStorage.removeItem("employeeRoleName");
                    localStorage.removeItem("employeeTypeCode");
                    localStorage.removeItem("employeeTypeName");
                    router.push("/navbar");
                }
            } catch (error: unknown) {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    html: `<span class="text-red-500">${error}</span>`
                });
                localStorage.removeItem("employeeID");
                localStorage.removeItem("employeeCode");
                localStorage.removeItem("employeeFullName");
                localStorage.removeItem("employeeDepartmentName");
                localStorage.removeItem("employeeRoleName");
                localStorage.removeItem("employeeTypeCode");
                localStorage.removeItem("employeeTypeName");
                router.push("/navbar");
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center">
            <div className="flex justify-center">
                <Image
                    src="/images/Logo/LogoBG.png"
                    alt="Nera Logo"
                    width={150}
                    height={80}
                />
            </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4 mt-5 text-left">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-black placeholder-gray-500"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-black placeholder-gray-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4">
                    <a href="#" className="text-blue-800 hover:underline">
                        สมัครสมาชิก
                    </a>
                </div>
                <div>
                    <a href="#" className="text-blue-800 hover:underline">
                        ลืมรหัสผ่าน
                    </a>
                </div>
            </div>
        </div>
    );
}
