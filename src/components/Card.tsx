// src/components/Card.tsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  cardId: string;
  title: string;
  description: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  cardId,
  title,
  description,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: cardId,
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1, // Dim the card when dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group/card relative flex min-h-24 w-full cursor-pointer flex-col items-start rounded bg-off-white-light px-4 py-2 text-blue shadow-md transition-shadow duration-300 hover:shadow-lg"
      {...listeners}
      {...attributes}
    >
      {/* Delete Card Button */}
      <button
        onClick={onDelete}
        className="text-red-500 absolute right-2 top-2"
      >
        ✖
      </button>

      {/* Card Title */}
      <h5 className="my-2 text-xl font-bold">{title}</h5>

      {/* Card Description */}
      <p className="text-blue-900 mt-1">{description}</p>
    </div>
  );
};

export default Card;
