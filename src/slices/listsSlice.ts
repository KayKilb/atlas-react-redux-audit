// src/slices/listsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface List {
  id: string;
  title: string;
  cardIds: string[];
}

interface ListsState {
  lists: List[];
}

const initialState: ListsState = {
  lists: [
    { id: uuidv4(), title: "To Do", cardIds: [] },
    { id: uuidv4(), title: "In Progress", cardIds: [] },
    { id: uuidv4(), title: "Done", cardIds: [] },
  ],
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ title: string }>) => {
      const newList: List = {
        id: uuidv4(),
        title: action.payload.title,
        cardIds: [],
      };
      state.lists.push(newList);
    },
    deleteList: (state, action: PayloadAction<{ listId: string }>) => {
      state.lists = state.lists.filter(
        (list) => list.id !== action.payload.listId,
      );
    },
    addCardToList: (
      state,
      action: PayloadAction<{ listId: string; cardId: string }>,
    ) => {
      const list = state.lists.find((lst) => lst.id === action.payload.listId);
      if (list) {
        list.cardIds.push(action.payload.cardId);
      }
    },
    moveCard: (
      state,
      action: PayloadAction<{
        sourceListId: string;
        destinationListId: string;
        cardId: string;
      }>,
    ) => {
      const { sourceListId, destinationListId, cardId } = action.payload;

      const sourceList = state.lists.find((list) => list.id === sourceListId);
      const destinationList = state.lists.find(
        (list) => list.id === destinationListId,
      );

      if (sourceList && destinationList) {
        // Remove cardId from source list
        sourceList.cardIds = sourceList.cardIds.filter((id) => id !== cardId);
        // Add cardId to destination list
        destinationList.cardIds.push(cardId);
      }
    },
    clearBoard: (state) => {
      state.lists = [];
    },
  },
});

export const { addList, deleteList, addCardToList, moveCard, clearBoard } =
  listsSlice.actions;
export default listsSlice.reducer;
