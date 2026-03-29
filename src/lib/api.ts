import axios from "axios";

export default function api() {
    const token = typeof document !== "undefined"
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1]
        : undefined;

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}
