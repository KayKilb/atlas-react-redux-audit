// src/dnd/Droppable.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style: React.CSSProperties = {
    backgroundColor: isOver ? "#e0f7fa" : undefined, // Light teal feedback
    transition: "background-color 0.3s ease",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
