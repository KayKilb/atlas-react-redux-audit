// src/__tests__/listsSlice.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import listsReducer, {
  addList,
  deleteList,
  addCardToList,
  clearBoard,
} from "../slices/listsSlice";

describe("listsSlice", () => {
  let initialState: ReturnType<typeof listsReducer>;

  beforeEach(() => {
    initialState = {
      lists: [
        { id: "list-1", title: "To Do", cardIds: [] },
        { id: "list-2", title: "In Progress", cardIds: [] },
        { id: "list-3", title: "Done", cardIds: [] },
      ],
    };
  });

  it("should return the initial state", () => {
    const state = listsReducer(undefined, { type: "unknown" });
    expect(state.lists).toHaveLength(3);

    const titles = state.lists.map((list) => list.title);
    expect(titles).toContain("To Do");
    expect(titles).toContain("In Progress");
    expect(titles).toContain("Done");

    state.lists.forEach((list) => {
      expect(list.cardIds).toEqual([]);
      expect(list.id).toBeTruthy(); // Ensures that an ID was generated
    });
  });

  it("should handle addList", () => {
    const action = addList({ title: "New List" });
    const state = listsReducer(initialState, action);
    expect(state.lists).toHaveLength(4);

    const newList = state.lists[3];
    expect(newList.title).toBe("New List");
    expect(newList.cardIds).toEqual([]);
    expect(newList.id).toBeTruthy(); // Ensures that an ID was generated
  });

  it("should handle deleteList", () => {
    const action = deleteList({ listId: "list-2" });
    const state = listsReducer(initialState, action);
    expect(state.lists).toHaveLength(2);
    expect(state.lists.find((list) => list.id === "list-2")).toBeUndefined();
  });

  it("should handle addCardToList", () => {
    const action = addCardToList({ listId: "list-1", cardId: "card-1" });
    const state = listsReducer(initialState, action);
    const list = state.lists.find((list) => list.id === "list-1");
    expect(list?.cardIds).toContain("card-1");
  });

  it("should handle clearBoard", () => {
    const action = clearBoard();
    const state = listsReducer(initialState, action);
    expect(state.lists).toHaveLength(0);
  });
});
