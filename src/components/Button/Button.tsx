import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  type?: "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
}

const BUTTON_BASE = "px-4 py-2 rounded font-semibold focus:outline-none";
const BUTTON_DISABLED = "opacity-50 cursor-not-allowed";
const BUTTON_VARIANTS = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "hover:bg-gray-200 text-gray-500",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

export const Button = ({
  type,
  variant = "primary",
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const buttonStyles = `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${
    disabled ? BUTTON_DISABLED : ""
  }`;

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
