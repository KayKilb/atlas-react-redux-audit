// src/components/List.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import DeleteListButton from "./DeleteListButton";
import { deleteList, moveCard } from "../slices/listsSlice";
import { deleteCard, createCard } from "../slices/cardsSlice";
import { RootState } from "../store";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface ListProps {
  listId: string;
  title: string;
}

const List: React.FC<ListProps> = ({ listId, title }) => {
  const dispatch = useDispatch();

  // Retrieve all cards from the Redux store
  const cards = useSelector((state: RootState) => state.cards.cards);

  // Filter cards that belong to this list
  const listCards = Object.values(cards).filter(
    (card) => card.listId === listId,
  );

  /**
   * Handles adding a new card to the list.
   * @param cardTitle - Title of the new card.
   * @param cardDescription - Description of the new card.
   */
  const handleAddCard = (cardTitle: string, cardDescription: string) => {
    dispatch(
      createCard({ listId, title: cardTitle, description: cardDescription }),
    );
  };

  /**
   * Handles deleting the entire list.
   */
  const handleDeleteList = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      // Optionally, delete associated cards
      listCards.forEach((card) => dispatch(deleteCard({ cardId: card.id })));
      dispatch(deleteList({ listId }));
    }
  };

  /**
   * Handles deleting a specific card.
   * @param cardId - ID of the card to be deleted.
   */
  const handleDeleteCard = (cardId: string) => {
    dispatch(deleteCard({ cardId }));
  };

  // Set up droppable area
  const { setNodeRef, isOver } = useDroppable({
    id: listId,
  });

  const style = {
    backgroundColor: isOver ? "#e0f7fa" : undefined, // Light teal when a card is over
  };

  return (
    <div className="group/list relative m-3 flex h-auto w-96 flex-col">
      {/* List Container */}
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex-grow rounded-lg bg-blue px-4 pb-4 pt-8 text-white shadow-md transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Delete List Button */}
        <DeleteListButton onDelete={handleDeleteList} />

        {/* List Title */}
        <h3 className="mb-4 text-2xl font-bold">{title}</h3>

        {/* Cards */}
        <div className="space-y-4">
          {listCards.map((card) => (
            <Card
              key={card.id}
              cardId={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => handleDeleteCard(card.id)}
            />
          ))}
        </div>

        {/* New Card Form */}
        <NewCardForm onSave={handleAddCard} />
      </div>
    </div>
  );
};

export default List;
