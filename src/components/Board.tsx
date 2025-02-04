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

    // Check if drop target is valid
    if (!over) return;

    const activeCardId = active.id as string;

    // Find the source list that contains the dragged card
    let sourceListId: string | undefined;
    for (const list of lists) {
      if (list.cardIds.includes(activeCardId)) {
        sourceListId = list.id;
        break;
      }
    }

    if (!sourceListId) return;

    let destinationListId: string | undefined;

    // Determine if we are dropping on another card or directly on the list
    if (lists.some((list) => list.id === over.id)) {
      // Dropping directly on a list (empty area)
      destinationListId = over.id as string;
    } else {
      // Dropping on another card, find the list containing that card
      for (const list of lists) {
        if (list.cardIds.includes(over.id as string)) {
          destinationListId = list.id;
          break;
        }
      }
    }

    if (destinationListId && sourceListId !== destinationListId) {
      // Move the card to the destination list
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
