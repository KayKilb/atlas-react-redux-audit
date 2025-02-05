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
  const cards = useSelector((state: RootState) => state.cards.cards);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // active.id is the cardId being dragged
      // over.id is the cardId being hovered over

      // Find the source and destination lists
      let sourceListId: string | undefined;
      let destinationListId: string | undefined;

      // Iterate through lists to find which list contains the active card
      for (const list of lists) {
        if (list.cardIds.includes(active.id as string)) {
          sourceListId = list.id;
          break;
        }
      }

      // Iterate through lists to find which list contains the over card
      for (const list of lists) {
        if (list.cardIds.includes(over.id as string)) {
          destinationListId = list.id;
          break;
        }
      }

      if (
        sourceListId &&
        destinationListId &&
        sourceListId !== destinationListId
      ) {
        dispatch(
          moveCard({
            sourceListId,
            destinationListId,
            cardId: active.id as string,
          }),
        );
      }
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
