import React from "react";

interface IconProps {
  className?: string;
}

const TransactionIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 9.33333C0 6.81867 -7.94729e-08 5.56267 0.781333 4.78133C1.56267 4 2.81867 4 5.33333 4H18.6667C21.1813 4 22.4373 4 23.2187 4.78133C24 5.56267 24 6.81867 24 9.33333V14.6667C24 17.1813 24 18.4373 23.2187 19.2187C22.4373 20 21.1813 20 18.6667 20H5.33333C2.81867 20 1.56267 20 0.781333 19.2187C-7.94729e-08 18.4373 0 17.1813 0 14.6667V9.33333Z"
      fill="currentColor"
      fillOpacity="0.5"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      fill="currentColor"
    />
    <path
      d="M6.33333 7H3.66667C3.29848 7 3 7.22386 3 7.5C3 7.77614 3.29848 8 3.66667 8H6.33333C6.70152 8 7 7.77614 7 7.5C7 7.22386 6.70152 7 6.33333 7Z"
      fill="currentColor"
    />
    <path
      d="M20.3333 16H17.6667C17.2985 16 17 16.2239 17 16.5C17 16.7761 17.2985 17 17.6667 17H20.3333C20.7015 17 21 16.7761 21 16.5C21 16.2239 20.7015 16 20.3333 16Z"
      fill="currentColor"
    />
  </svg>
);

export default TransactionIcon;
