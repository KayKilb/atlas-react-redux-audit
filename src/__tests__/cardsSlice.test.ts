// src/__tests__/cardsSlice.test.ts
import { describe, it, expect } from "vitest";
import cardsReducer, {
  createCard,
  deleteCard,
  clearBoard,
} from "../slices/cardsSlice";

describe("cardsSlice", () => {
  let initialState: ReturnType<typeof cardsReducer>;

  beforeEach(() => {
    initialState = {
      cards: {
        "card-1": {
          id: "card-1",
          listId: "list-1",
          title: "Card 1",
          description: "Description 1",
        },
        "card-2": {
          id: "card-2",
          listId: "list-1",
          title: "Card 2",
          description: "Description 2",
        },
      },
    };
  });

  it("should return the initial state", () => {
    expect(cardsReducer(undefined, { type: "unknown" })).toEqual({ cards: {} });
  });

  it("should handle createCard", () => {
    const action = createCard({
      listId: "list-2",
      title: "New Card",
      description: "New Description",
    });
    const state = cardsReducer(initialState, action);

    // Extract the new card (since ID is random, find the one that's not 'card-1' or 'card-2')
    const newCardKey = Object.keys(state.cards).find(
      (key) => key !== "card-1" && key !== "card-2",
    );
    expect(newCardKey).toBeTruthy(); // Ensures a new card was added
    if (newCardKey) {
      const newCard = state.cards[newCardKey];
      expect(newCard.title).toBe("New Card");
      expect(newCard.description).toBe("New Description");
      expect(newCard.listId).toBe("list-2");
      expect(newCard.id).toBeTruthy(); // Ensures that an ID was generated
    }
  });

  it("should handle deleteCard", () => {
    const action = deleteCard({ cardId: "card-1" });
    const state = cardsReducer(initialState, action);
    expect(state.cards["card-1"]).toBeUndefined();
    expect(Object.keys(state.cards)).toHaveLength(1);
  });

  it("should handle clearBoard", () => {
    const action = clearBoard();
    const state = cardsReducer(initialState, action);
    expect(state.cards).toEqual({});
  });
});
