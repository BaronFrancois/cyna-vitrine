"use client"

import {
    ShoppingBag,
    Search,
    Menu,
    User,
    Globe,
    ChevronDown,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppSearch from "./AppSearch";

export default function AppHeader() {
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path
            ? "text-gray-900"
            : "text-gray-500 hover:text-gray-900";
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex-shrink-0 flex items-center space-x-2"
                        >
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="font-semibold text-xl tracking-tight text-gray-900">
                                Cyna
                            </span>
                        </Link>
                        <div className="hidden md:flex space-x-6 text-sm font-medium">
                            <Link
                                href="/catalog"
                                className={isActive("/catalog")}
                            >
                                Solutions
                            </Link>
                            <Link
                                href="/support"
                                className={isActive("/support")}
                            >
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
                        <AppSearch />
                        <Link
                            href="/cart"
                            className="relative text-gray-500 hover:text-gray-900 transition-colors"
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
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <User size={20} />
                        </Link>
                        <button className="md:hidden text-gray-500">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
