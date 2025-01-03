import clsx from "clsx";
import React from "react";

interface ThemedButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  state?: "useable" | "disabled";
  size?: "small" | "big";
  icon?: boolean;
  iconPath?: React.ReactNode;
  color?: "primary" | "gray" | "yellow" | "dark" | "red";
  type?:"button" | "submit"
  onClick ?: ()=>void
}

const ThemedButton = ({
  children,
  variant = "solid",
  state = "useable",
  size = "small",
  icon = false,
  iconPath,
  color = "primary",
  type = "button",
  onClick
}: ThemedButtonProps) => {
  const isDisabled = state === "disabled";

  const variantClasses =
    variant === "outline" ? "border border-solid" : "";

  const sizeClasses =
    size === "big" ? "px-[24px] py-[10px] text-big-button" : "px-[16px] py-[10px] text-small-button";

  const colorClasses = {
    primary:  variant === "outline" ? "border-primary text-primary hover:bg-primary hover:text-white" : "bg-primary text-white",
    gray: variant === "outline" ? "border-gray text-gray hover:bg-gray hover:text-white":"bg-gray text-white",
    yellow: variant === "outline" ? "border-yellow text-yellow hover:bg-yellow hover:text-white" : "bg-yellow text-white",
    dark: variant === "outline" ? "border-dark text-dark hover:bg-dark hover:text-white" : "bg-dark text-white",
    red: variant === "outline" ? "border-red text-red hover:bg-red hover:text-white" : "bg-red text-white",
  }[color];

  // Classes pour l'icône
  const iconClasses = icon ? "flex items-center gap-2 justify-center" : "";

  return (
    <button
      type={type}
      className={clsx(
        "rounded font-semibold transition duration-300",
        variantClasses,
        sizeClasses,
        colorClasses,
        iconClasses,
        { "opacity-50 cursor-not-allowed": isDisabled }
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && iconPath}
      {children}
    </button>
  );
};

export default ThemedButton;
