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

export default function AppHeader() {
    const pathname = usePathname();
    /** Sur le catalogue en desktop, la recherche est dans le hero — masquer la loupe du header */
    const catalogDesktopHidesHeaderSearch =
        pathname.startsWith("/catalog");

    const navClass = (path: string) => {
        const active = pathname === path || pathname.startsWith(path + "/");
        return cn(
            "nav-sku-raised nav-sku-header-charte text-sm font-medium whitespace-nowrap px-3 py-1.5 transition-colors",
            active && "nav-sku-header-active"
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/30 bg-white/45 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/30 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex-shrink-0 flex items-center space-x-2 cursor-pointer"
                        >
                            <CynaLogo size={36} />
                            <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-[#4c1d95] via-[#7c3aed] to-[#d946ef] bg-clip-text text-transparent">
                                Cyna
                            </span>
                        </Link>
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
                        >
                            <ShoppingBag size={20} />
                            {/* {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )} */}
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
                                            className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Panier
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
