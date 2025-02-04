// src/components/Card.tsx
import React from "react";
import DeleteCardButton from "./DeleteCardButton";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  cardId: string;
  title: string;
  description: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  onDelete,
  cardId,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: cardId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
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
      <DeleteCardButton onDelete={onDelete} />

      {/* Card Title */}
      <h5 className="my-2 flex w-full items-center justify-between text-xl font-black">
        <span>{title}</span>
      </h5>

      {/* Card Description */}
      <p className="text-blue-900 mt-0 text-left text-lg">{description}</p>
    </div>
  );
};

export default Card;
