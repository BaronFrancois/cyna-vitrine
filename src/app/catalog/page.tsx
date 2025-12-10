"use client";

import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/constant";
import AppLayout from "@/layout/AppLayout";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Catalog() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryFilter = searchParams.get("category") || "Tous";

    const [activeFilter, setActiveFilter] = useState(categoryFilter);

    const filteredProducts = useMemo(() => {
        if (activeFilter === "Tous") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeFilter);
    }, [activeFilter]);

    const categories = ["Tous", "EDR", "XDR", "SOC", "Cloud", "Network"];

    const handleFilterChange = (cat: string) => {
        setActiveFilter(cat);

        const params = new URLSearchParams(searchParams.toString());

        if (cat === "Tous") {
            params.delete("category");
        } else {
            params.set("category", cat);
        }

        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <AppLayout>
            <div className="pt-10 pb-20">

                {/* Catalog Hero */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                        Trouvez la bonne protection.
                    </h1>
                    <p className="text-xl text-gray-500">
                        Explorez notre suite d'outils de cybersécurité nouvelle génération.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleFilterChange(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeFilter === cat
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {product.status === "available" && (
                                        <span className="absolute top-4 right-4 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm uppercase tracking-wide">
                                            Disponible
                                        </span>
                                    )}
                                    {product.status === "maintenance" && (
                                        <span className="absolute top-4 right-4 bg-yellow-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm uppercase tracking-wide">
                                            Maintenance
                                        </span>
                                    )}
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                                        {product.category}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {product.shortDescription}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-lg font-semibold text-gray-900">
                                                {product.price}€
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                {" "}
                                                / {product.period === "monthly" ? "mois" : "an"}
                                            </span>
                                        </div>

                                        <Link href={`/product/${product.id}`}>
                                            <Button size="sm" variant="secondary" className="rounded-full px-5">
                                                Acheter
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
