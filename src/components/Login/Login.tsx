"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { authLogin } from "@/services/callAPI/Login/apiAuthService"; // ✅ เรียกใช้ Service กลาง

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
                console.log(data.Status)
                if (data.Status === "Success") {
                    console.log(data.Data)
                    if (data.Data.statusLogin !== "Not Found") {
                        localStorage.setItem("employeeID", data.Data.employeeID);
                        localStorage.setItem("employeeCode", data.Data.employeeCode);
                        localStorage.setItem("employeeFullName", data.Data.fullName);
                        localStorage.setItem("employeeDepartmentName", data.Data.departmentName);
                        localStorage.setItem("employeeRoleName", data.Data.roleName);
                        localStorage.setItem("employeeTypeCode", data.Data.employeeTypeCode);
                        localStorage.setItem("employeeTypeName", data.Data.employeeTypeName);
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
                    }
                } else {
                    console.log(data)
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
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
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
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Nera</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4 text-left">
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
