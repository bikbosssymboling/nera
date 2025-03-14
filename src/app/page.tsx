"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // ✅ ให้ Redirect ไปที่หน้า Login
  }, []);

  return null; // ไม่ต้องแสดงอะไรเลย
}
