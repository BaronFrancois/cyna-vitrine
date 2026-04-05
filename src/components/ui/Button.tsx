import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | "primary"
        | "secondary"
        | "ghost"
        | "outline"
        | "accent"
        | "surface"
        | "ghostInverse"
        | "dark";
    size?: "sm" | "md" | "lg";
    isActive?: boolean;
}

const SKU_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "btn-sku-primary",
    secondary: "btn-sku",
    outline: "btn-sku",
    ghost: "btn-sku-ghost",
    accent: "btn-sku-primary",
    surface: "btn-sku",
    ghostInverse: "btn-sku-inv",
    dark: "btn-sku",
};

const VARIANT_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
        "bg-cyna-600 text-white hover:bg-cyna-700 focus:ring-cyna-600",
    secondary:
        "bg-zinc-800 text-gray-200 hover:bg-zinc-700 focus:ring-zinc-600",
    ghost:
        "bg-transparent text-cyna-500 hover:text-cyna-400 focus:ring-cyna-600",
    outline:
        "border border-zinc-600 text-gray-300 hover:border-zinc-500 bg-transparent focus:ring-zinc-500",
    accent:
        "bg-cyna-600 text-white hover:bg-cyna-700 focus:ring-cyna-600",
    surface:
        "bg-zinc-700 text-gray-100 hover:bg-zinc-600 focus:ring-zinc-500",
    ghostInverse:
        "bg-transparent text-white hover:text-white focus:ring-white/60",
    dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-600",
};

const SIZE_CLASS: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-8 py-3.5 text-lg",
    lg: "px-10 py-4 text-xl",
};

/** Base commune : forme, focus clavier, disabled, alignement (charte vitrine). */
const BASE =
    "cursor-pointer flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

/** Mêmes classes qu’un `<Button>` pour un `<Link>` (évite bouton dans lien). */
export function buttonClassName(
    variant: NonNullable<ButtonProps["variant"]> = "primary",
    size: NonNullable<ButtonProps["size"]> = "md",
    className?: string
) {
    return cn(
        BASE,
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        SKU_CLASS[variant],
        className
    );
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    isActive = false,
    className = "",
    ...props
}) => {
    return (
        <button
            className={buttonClassName(variant, size, className)}
            data-active={isActive ? "true" : undefined}
            {...props}
        >
            {children}
        </button>
    );
};
