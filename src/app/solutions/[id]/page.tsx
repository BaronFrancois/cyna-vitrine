"use client";

import { useParams } from "next/navigation";

export default function Produit() {
    const params = useParams();
    const { id } = params;
    console.log(id);
}
