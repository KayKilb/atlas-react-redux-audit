// src/components/List.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import DeleteListButton from "./DeleteListButton";
import { RootState } from "../store";
import { useDroppable } from "@dnd-kit/core";

interface ListProps {
  listId: string;
  title: string;
}

const List: React.FC<ListProps> = ({ listId, title }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);

  const listCards = Object.values(cards).filter(
    (card) => card.listId === listId,
  );

  // Set up droppable area
  const { setNodeRef, isOver } = useDroppable({ id: listId });

  const style = {
    backgroundColor: isOver ? "#e0f7fa" : undefined, // Light teal when a card is dragged over
  };

  return (
    <div className="group/list relative m-3 flex h-auto w-96 flex-col">
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex-grow rounded-lg bg-blue px-4 pb-4 pt-8 text-white shadow-md"
      >
        <DeleteListButton
          onDelete={() => dispatch({ type: "DELETE_LIST", payload: listId })}
        />
        <h3 className="mb-4 text-2xl font-bold">{title}</h3>
        <div className="space-y-4">
          {listCards.map((card) => (
            <Card
              key={card.id}
              cardId={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => {}}
            />
          ))}
        </div>
        <NewCardForm
          onSave={(title, desc) =>
            dispatch({ type: "ADD_CARD", payload: { listId, title, desc } })
          }
        />
      </div>
    </div>
  );
};

export default List;
