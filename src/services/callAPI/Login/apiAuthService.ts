import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.200.104:5001/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;"
    }
});

// ฟังก์ชันล็อกอิน
export const authLogin = async (username: string, password: string) => {
    try {
        const response = await api.post("/AuthLogin/logins", { username, password });
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login API Error:", error);
        throw error;
    }
};
