"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "../../constants";
import { cn } from "@/lib/utils";

const QUICK_LINKS: { label: string; href: string }[] = [
    { label: "Accueil", href: "/" },
    { label: "Catalogue", href: "/catalog" },
    { label: "Support", href: "/support" },
    { label: "Panier", href: "/cart" },
    { label: "Compte", href: "/account" },
];

type AppSearchVariant = "header" | "catalogInline";

export default function AppSearch({ variant = "header" }: { variant?: AppSearchVariant }) {
    const isCatalogHero = variant === "catalogInline";
    const [open, setOpen] = useState(isCatalogHero);
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const { navHits, productHits } = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return { navHits: [] as typeof QUICK_LINKS, productHits: [] as typeof PRODUCTS };
        const navHits = QUICK_LINKS.filter((l) => l.label.toLowerCase().includes(q));
        const productHits = PRODUCTS.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.shortDescription.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.id.toLowerCase().includes(q)
        );
        return { navHits, productHits };
    }, [query]);

    const hasResults = query.trim() && (navHits.length > 0 || productHits.length > 0);

    useEffect(() => {
        if (isCatalogHero) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCatalogHero]);

    const onPick = () => {
        setQuery("");
        if (!isCatalogHero) setOpen(false);
    };

    const inputClasses = cn(
        "border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyna-500",
        isCatalogHero
            ? "w-full rounded-full py-3.5 pl-12 pr-11 text-base shadow-sm bg-white"
            : "w-40 sm:w-64 rounded-lg p-2 pr-10"
    );

    return (
        <div className={cn("relative", isCatalogHero && "z-[45] w-full")}>
            <div ref={containerRef} className={cn("flex items-center", !isCatalogHero && "space-x-2")}>
                {!isCatalogHero && !open && (
                    <button
                        type="button"
                        className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center bg-transparent p-0 text-gray-500 shadow-none hover:text-cyna-600"
                        onClick={() => setOpen(true)}
                        aria-label="Ouvrir la recherche"
                    >
                        <Search className="h-5 w-5" aria-hidden />
                    </button>
                )}

                {(open || isCatalogHero) && (
                    <div className={cn("relative", isCatalogHero ? "w-full" : "z-[60]")}>
                        {isCatalogHero && (
                            <Search
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                aria-hidden
                            />
                        )}
                        <input
                            type="text"
                            inputMode="search"
                            autoComplete="off"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus={!isCatalogHero}
                            placeholder={
                                isCatalogHero
                                    ? "Rechercher un produit, une catégorie…"
                                    : "Produits, pages…"
                            }
                            className={inputClasses}
                            aria-label="Recherche"
                        />
                        {!isCatalogHero && (
                            <button
                                type="button"
                                className="absolute right-1 top-1.5 text-gray-500 hover:text-gray-900"
                                onClick={() => setQuery("")}
                                aria-label="Effacer"
                            >
                                <X />
                            </button>
                        )}
                        {isCatalogHero && query.trim() !== "" && (
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                onClick={() => setQuery("")}
                                aria-label="Effacer la recherche"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        {hasResults && (
                            <ul
                                className={cn(
                                    "absolute mt-2 max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white text-left shadow-lg z-50",
                                    isCatalogHero
                                        ? "left-0 right-0 w-full"
                                        : "mt-1 w-[min(100vw-2rem,20rem)] sm:w-64"
                                )}
                            >
                                {navHits.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            className="block cursor-pointer p-2.5 text-sm text-gray-800 hover:bg-violet-50"
                                            onClick={onPick}
                                        >
                                            {l.label}
                                            <span className="ml-1 text-xs text-gray-400">Page</span>
                                        </Link>
                                    </li>
                                ))}
                                {productHits.map((p) => (
                                    <li key={p.id}>
                                        <Link
                                            href={`/product/${p.id}`}
                                            className="block cursor-pointer p-2.5 text-sm hover:bg-violet-50"
                                            onClick={onPick}
                                        >
                                            <span className="font-medium text-gray-900">{p.name}</span>
                                            <span className="block truncate text-xs text-gray-500">
                                                {p.category}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {query.trim() && !hasResults && (
                            <div
                                className={cn(
                                    "absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-400 shadow-lg",
                                    isCatalogHero ? "left-0 right-0 w-full" : "mt-1 w-[min(100vw-2rem,20rem)] sm:w-64"
                                )}
                            >
                                Aucun résultat
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
