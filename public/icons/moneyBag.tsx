import React from "react";

interface IconProps {
  className?: string;
}

const MoneyBagIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2 14C2 10.229 2 8.343 3.172 7.172C4.343 6 6.229 6 10 6H14C17.771 6 19.657 6 20.828 7.172C22 8.343 22 10.229 22 14C22 17.771 22 19.657 20.828 20.828C19.657 22 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2 19.657 2 17.771 2 14Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      opacity="0.5"
      d="M16 6C16 4.114 16 3.172 15.414 2.586C14.828 2 13.886 2 12 2C10.114 2 9.172 2 8.586 2.586C8 3.172 8 4.114 8 6"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      opacity="0.5"
      d="M12 17.333C13.105 17.333 14 16.587 14 15.667C14 14.747 13.105 14 12 14C10.895 14 10 13.254 10 12.333C10 11.413 10.895 10.667 12 10.667M12 17.333C10.895 17.333 10 16.587 10 15.667M12 17.333V18M12 10.667V10M12 10.667C13.105 10.667 14 11.413 14 12.333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default MoneyBagIcon;
