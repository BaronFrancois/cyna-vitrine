"use client"

import {
    ShoppingBag,
    Search,
    Menu,
    User,
    Globe,
    ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppSearch from "./AppSearch";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CynaLogo } from "./CynaLogo";
import useCart from "@/hooks/useCart";

export default function AppHeader() {
    const pathname = usePathname();
    const { itemCount } = useCart();
    /** Sur le catalogue en desktop, la recherche est dans le hero — masquer la loupe du header */
    const catalogDesktopHidesHeaderSearch =
        pathname.startsWith("/catalog");

    const isNavActive = (path: string) =>
        path === "/"
            ? pathname === "/"
            : pathname === path || pathname.startsWith(path + "/");

    const navClass = (path: string) =>
        cn(
            "nav-sku-raised nav-sku-header-charte text-sm font-medium whitespace-nowrap px-3 py-1.5 transition-colors",
            isNavActive(path) && "nav-sku-header-active"
        );

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/30 bg-white/45 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/30 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/"
                                className="flex flex-shrink-0 cursor-pointer items-center gap-2 py-1 font-semibold tracking-tight transition-opacity hover:opacity-85"
                                aria-label="Accueil Cyna"
                            >
                                <CynaLogo size={36} />
                                <span className="hidden min-[400px]:inline bg-gradient-to-r from-[#4c1d95] via-[#7c3aed] to-[#d946ef] bg-clip-text text-base min-[400px]:text-xl text-transparent">
                                    Cyna
                                </span>
                            </Link>
                            <Link href="/" className={navClass("/")}>
                                Accueil
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1 overflow-visible py-0.5">
                            <Link href="/catalog" className={navClass("/catalog")}>
                                Solutions
                            </Link>
                            <Link href="/support" className={navClass("/support")}>
                                Support
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden sm:flex items-center text-xs text-gray-500 space-x-1 cursor-pointer hover:text-gray-800 transition-colors">
                            <Globe size={14} />
                            <span>FR</span>
                            <ChevronDown size={10} />
                        </div>
                        <div
                            className={cn(
                                catalogDesktopHidesHeaderSearch && "md:hidden"
                            )}
                        >
                            <AppSearch />
                        </div>
                        <Link
                            href="/cart"
                            className="relative cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label={
                                itemCount > 0
                                    ? `Panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`
                                    : "Panier"
                            }
                        >
                            <ShoppingBag size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cyna-600 px-1 text-[10px] font-bold text-white">
                                    {itemCount > 99 ? "99+" : itemCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/account"
                            className="cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <User size={20} />
                        </Link>
                        <div className="md:hidden">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className="cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                                        aria-label="Ouvrir le menu"
                                    >
                                        <Menu size={24} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-64 p-2">
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/"
                                            className={cn(
                                                "nav-sku-raised nav-sku-header-charte block w-full text-left text-sm font-medium px-3 py-2",
                                                pathname === "/" && "nav-sku-header-active"
                                            )}
                                        >
                                            Accueil
                                        </Link>
                                        <Link
                                            href="/catalog"
                                            className={cn(
                                                "nav-sku-raised nav-sku-header-charte block w-full text-left text-sm font-medium px-3 py-2",
                                                pathname.startsWith("/catalog") && "nav-sku-header-active"
                                            )}
                                        >
                                            Solutions
                                        </Link>
                                        <Link
                                            href="/support"
                                            className={cn(
                                                "nav-sku-raised nav-sku-header-charte block w-full text-left text-sm font-medium px-3 py-2",
                                                pathname.startsWith("/support") && "nav-sku-header-active"
                                            )}
                                        >
                                            Support
                                        </Link>

                                        <div className="my-2 h-px bg-gray-100" />

                                        <Link
                                            href="/cart"
                                            className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <span>Panier</span>
                                            {itemCount > 0 && (
                                                <span className="rounded-full bg-cyna-600 px-2 py-0.5 text-[11px] font-bold text-white">
                                                    {itemCount > 99 ? "99+" : itemCount}
                                                </span>
                                            )}
                                        </Link>
                                        <Link
                                            href="/account"
                                            className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Compte
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
