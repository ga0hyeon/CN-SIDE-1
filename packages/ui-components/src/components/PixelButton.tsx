import React from "react";
import "./pixelButton.css";

interface PixelButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export const PixelButton = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  onClick,
  ...props
}: PixelButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <div className="container">
      <button
        type="button"
        className={["btn"].join(" ")}
        style={{ backgroundColor }}
        {...props}
        onClick={() => onClick && onClick()}
      >
        {label}
      </button>
    </div>
  );
};
