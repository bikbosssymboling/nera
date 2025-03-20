import api from "@/lib/api";

// ฟังก์ชันล็อกอิน
export const authLogin = async (username: string, password: string) => {
    try {
        const response = await api.post("/Auth/logins", { username, password });
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login API Error:", error);
        throw error;
    }
};
