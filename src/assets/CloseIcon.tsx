import React from "react";

interface CloseIconProps {
  onClick?: () => void;
}

const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-red-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default CloseIcon;
