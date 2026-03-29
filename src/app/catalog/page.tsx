"use client";

import { Button } from "@/components/ui/Button";
import AppSearch from "@/components/AppSearch";
import { PRODUCTS } from "@/constant";
import AppLayout from "@/layout/AppLayout";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import { cn } from "@/lib/utils";

function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryFilter = searchParams.get("category") || "Tous";

    const [activeFilter, setActiveFilter] = useState(categoryFilter);

    const filteredProducts = useMemo(() => {
        if (activeFilter === "Tous") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeFilter);
    }, [activeFilter]);

    const categories = ["Tous", "EDR", "XDR", "SOC"];

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                        Trouvez la bonne protection.
                    </h1>
                    <p className="text-xl text-gray-500 mb-6 md:mb-8">
                        Explorez notre suite d&apos;outils de cybersécurité nouvelle génération.
                    </p>
                    {/* Desktop : recherche centrée sous le sous-titre (la loupe header est masquée) */}
                    <div className="mx-auto hidden max-w-2xl w-full fade-in md:block">
                        <AppSearch variant="catalogInline" />
                    </div>
                </div>

                {/* Filter Bar — padding vertical pour ne pas tronquer les box-shadow des pastilles */}
                <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 sm:pb-6">
                        {/* Mobile: dropdown */}
                        <div className="sm:hidden">
                            <select
                                value={activeFilter}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyna-500"
                                aria-label="Filtrer par catégorie"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tablet/Desktop : pas d'overflow-x-auto (tronque les ombres) ; flex-wrap suffit */}
                        <div className="hidden sm:flex flex-wrap gap-2 gap-y-3 pt-1 pb-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleFilterChange(cat)}
                                    className={cn(
                                        "nav-sku-raised text-sm font-medium whitespace-nowrap",
                                        activeFilter === cat && "nav-sku-header-active"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
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
                                    <div className="text-xs font-bold text-cyna-600 mb-2 uppercase tracking-wide">
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
                                            <Button size="sm" variant="secondary" className="px-5">
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

export default function Catalog() {
    return (
        <Suspense>
            <CatalogContent />
        </Suspense>
    );
}
