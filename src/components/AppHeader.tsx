"use client"

import { useState } from "react";
import {
    ShoppingBag,
    Menu,
    X,
    User,
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <nav
            className={cn(
                "sticky top-0 z-50 w-full border-b border-white/30",
                /* Mobile : moins de blur (backdrop-filter + sticky = saccades iOS/Android) */
                "bg-white/92 backdrop-blur-sm backdrop-saturate-150 supports-[backdrop-filter]:bg-white/88",
                "md:bg-white/45 md:backdrop-blur-xl md:supports-[backdrop-filter]:bg-white/30",
                /* Compositing GPU — évite le « tremblement » au scroll */
                "isolate [transform:translateZ(0)] [-webkit-backface-visibility:hidden]"
            )}
        >
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
                            <Link href="/" className={cn(navClass("/"), "hidden md:inline-flex")}>
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

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div
                            className={cn(
                                "flex items-center",
                                catalogDesktopHidesHeaderSearch && "md:hidden"
                            )}
                        >
                            <AppSearch />
                        </div>
                        <Link
                            href="/cart"
                            className="relative inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center text-gray-500 transition-colors hover:text-gray-900"
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
                            className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center text-gray-500 transition-colors hover:text-gray-900"
                        >
                            <User size={20} />
                        </Link>
                        <div className="flex items-center md:hidden">
                            <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className="relative inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center p-0 leading-none text-gray-500 transition-colors hover:text-gray-900"
                                        aria-expanded={mobileMenuOpen}
                                        aria-label={
                                            mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                                        }
                                    >
                                        <Menu
                                            className={cn(
                                                "absolute h-5 w-5 transition-all duration-300 ease-out",
                                                mobileMenuOpen
                                                    ? "scale-0 rotate-90 opacity-0"
                                                    : "scale-100 rotate-0 opacity-100"
                                            )}
                                            strokeWidth={2}
                                            aria-hidden
                                        />
                                        <X
                                            className={cn(
                                                "absolute h-5 w-5 transition-all duration-300 ease-out",
                                                mobileMenuOpen
                                                    ? "scale-100 rotate-0 opacity-100"
                                                    : "scale-0 -rotate-90 opacity-0"
                                            )}
                                            strokeWidth={2}
                                            aria-hidden
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    sideOffset={0}
                                    collisionPadding={{ right: 0, left: 8 }}
                                    className={cn(
                                        "z-50 w-56 border-0 p-0 shadow-lg -mr-4 rounded-t-none rounded-b-2xl sm:-mr-6",
                                        "duration-300 ease-out",
                                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                                        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                                        "data-[side=bottom]:slide-in-from-top-4 data-[side=bottom]:slide-out-to-top-2"
                                    )}
                                >
                                    <div className="nav-mobile-popover-inner flex flex-col gap-1 p-2">
                                        <Link
                                            href="/"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "block w-full rounded-xl px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",
                                                pathname === "/" && "bg-violet-50 text-violet-700 font-semibold"
                                            )}
                                        >
                                            Accueil
                                        </Link>
                                        <Link
                                            href="/catalog"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "block w-full rounded-xl px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",
                                                pathname.startsWith("/catalog") && "bg-violet-50 text-violet-700 font-semibold"
                                            )}
                                        >
                                            Solutions
                                        </Link>
                                        <Link
                                            href="/support"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "block w-full rounded-xl px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",
                                                pathname.startsWith("/support") && "bg-violet-50 text-violet-700 font-semibold"
                                            )}
                                        >
                                            Support
                                        </Link>

                                        <div className="my-1 h-px bg-gray-100" />

                                        <Link
                                            href="/cart"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full rounded-xl px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
