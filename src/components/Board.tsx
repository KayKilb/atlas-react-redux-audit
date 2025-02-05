// src/components/Board.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "./List";
import { RootState } from "../store";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { moveCard } from "../slices/listsSlice";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists.lists);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeCardId = active.id as string;

    // Find the source list containing the dragged card
    const sourceListId = lists.find((list) =>
      list.cardIds.includes(activeCardId),
    )?.id;
    if (!sourceListId) return;

    // Determine the destination list
    const destinationListId = lists.find(
      (list) => list.id === over.id || list.cardIds.includes(over.id as string),
    )?.id;

    // Only proceed if moving to a new list
    if (destinationListId && sourceListId !== destinationListId) {
      dispatch(
        moveCard({
          sourceListId,
          destinationListId,
          cardId: activeCardId,
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full flex-grow overflow-x-auto bg-blue text-center">
        {lists.map((list) => (
          <SortableContext
            key={list.id}
            items={list.cardIds}
            strategy={verticalListSortingStrategy}
          >
            <List listId={list.id} title={list.title} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
