// src/components/DeleteListButton.tsx
import React from "react";

interface DeleteListButtonProps {
  onDelete: () => void;
}

const DeleteListButton: React.FC<DeleteListButtonProps> = ({ onDelete }) => {
  return (
    <button
      onClick={onDelete}
      className="hover:text-red-500 absolute right-2 top-2 hidden focus:outline-none group-hover/list:block"
      aria-label="Delete List"
    >
      {/* SVG Icon for Delete */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="text-red-500 h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default DeleteListButton;
