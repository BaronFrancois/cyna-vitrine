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

/** Base commune : forme, focus clavier, disabled, alignement (charte vitrine). */
const BASE =
    "cursor-pointer flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    isActive = false,
    className = "",
    ...props
}) => {
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
        primary:
            "bg-cyna-600 text-white hover:bg-cyna-700 focus:ring-cyna-600",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
        ghost:
            "bg-transparent text-cyna-600 hover:text-cyna-700 focus:ring-cyna-600",
        outline:
            "border border-gray-300 text-gray-700 hover:border-gray-400 bg-white focus:ring-gray-300",
        accent:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
        surface:
            "bg-white text-blue-700 hover:bg-blue-50 focus:ring-blue-500",
        ghostInverse:
            "bg-transparent text-white hover:text-white focus:ring-white/60",
        dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-600",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-8 py-3.5 text-lg",
        lg: "px-10 py-4 text-xl",
    };

    return (
        <button
            className={cn(
                BASE,
                variants[variant],
                sizes[size],
                SKU_CLASS[variant],
                className
            )}
            data-active={isActive ? "true" : undefined}
            {...props}
        >
            {children}
        </button>
    );
};
