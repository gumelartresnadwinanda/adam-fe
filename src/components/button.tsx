import { ButtonHTMLAttributes } from "react";
import { cn } from "../utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return <button className={cn(baseStyles, variants[variant], className)} {...props} />;
};
