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

    if (!over) return; // Exit if no drop target is detected

    const activeCardId = active.id as string;

    // Find the source list containing the dragged card
    const sourceList = lists.find((list) =>
      list.cardIds.includes(activeCardId),
    );
    if (!sourceList) return; // Exit if the source list isn't found

    // Determine the destination list
    const destinationList = lists.find(
      (list) => list.id === over.id || list.cardIds.includes(over.id as string),
    );

    if (destinationList && sourceList.id !== destinationList.id) {
      // Dispatch the moveCard action to update Redux state
      dispatch(
        moveCard({
          sourceListId: sourceList.id,
          destinationListId: destinationList.id,
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
        <SortableContext
          items={lists.map((list) => list.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex space-x-6">
            {lists.map((list) => (
              <List key={list.id} listId={list.id} title={list.title} />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Board;
