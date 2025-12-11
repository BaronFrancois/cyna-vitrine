"use client";

import Cookies from "js-cookie";

export default function Account() {
    const auth_token = Cookies.get("auth_token");


    if(!auth_token) {
        window.location.href = "/auth/login";
    }

}