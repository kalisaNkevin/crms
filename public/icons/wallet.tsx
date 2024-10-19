import React from "react";

interface WalletIconProps {
  className?: string;
}

const WalletIcon: React.FC<WalletIconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 8H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.833 9H18.231C16.446 9 15 10.343 15 12C15 13.657 16.447 15 18.23 15H20.833C20.917 15 20.958 15 20.993 14.998C21.533 14.965 21.963 14.566 21.998 14.065C22 14.033 22 13.994 22 13.917V10.083C22 10.006 22 9.967 21.998 9.935C21.962 9.434 21.533 9.035 20.993 9.002C20.959 9 20.917 9 20.833 9Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      opacity="0.4"
      d="M20.965 9C20.887 7.128 20.637 5.98 19.828 5.172C18.657 4 16.771 4 13 4H10C6.229 4 4.343 4 3.172 5.172C2 6.343 2 8.229 2 12C2 15.771 2 17.657 3.172 18.828C4.343 20 6.229 20 10 20H13C16.771 20 18.657 20 19.828 18.828C20.637 18.02 20.888 16.872 20.965 15"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      opacity="0.5"
      d="M17.991 12H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WalletIcon;
