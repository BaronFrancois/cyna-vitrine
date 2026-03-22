import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    isActive?: boolean;
}

const SKU_CLASS: Record<string, string> = {
    primary: "btn-sku-primary",
    secondary: "btn-sku",
    outline: "btn-sku",
    ghost: "btn-sku-ghost",
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    isActive = false,
    className = "",
    ...props
}) => {
    const baseStyle =
        "cursor-pointer inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
        ghost: "bg-transparent text-blue-600 hover:text-blue-700",
        outline:
            "border border-gray-300 text-gray-700 hover:border-gray-400 bg-white",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    return (
        <button
            className={cn(baseStyle, variants[variant], sizes[size], SKU_CLASS[variant], className)}
            data-active={isActive ? "true" : undefined}
            {...props}
        >
            {children}
        </button>
    );
};
