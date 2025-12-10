import axios from "axios";

export default function api() {
    return axios.create({
        baseURL: "https://api.example.com",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    })
}