"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Avoid hydration mismatch — render an invisible placeholder on the server
    if (!mounted) return <div className="h-5 w-5 shrink-0" />;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center",
                "text-slate-200 transition-colors hover:text-cyna-500"
            )}
            aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            title={isDark ? "Mode clair" : "Mode sombre"}
        >
            {isDark
                ? <Sun size={20} aria-hidden />
                : <Moon size={20} aria-hidden />
            }
        </button>
    );
}
