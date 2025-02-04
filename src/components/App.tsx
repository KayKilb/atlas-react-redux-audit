// src/components/App.tsx
import React from "react";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "../store";
import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";
import { addList, clearBoard as clearLists } from "../slices/listsSlice";
import { clearBoard as clearCards } from "../slices/cardsSlice";
import { PersistGate } from "redux-persist/integration/react";

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  /**
   * Handles adding a new list to the board.
   * @param title - Title of the new list.
   */
  const handleAddList = (title: string) => {
    dispatch(addList({ title }));
  };

  /**
   * Handles clearing the entire board by removing all lists and cards.
   */
  const handleClearBoard = () => {
    if (window.confirm("Are you sure you want to clear the board?")) {
      dispatch(clearLists()); // Clears all lists
      dispatch(clearCards()); // Clears all cards
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-blue text-blue">
      {/* Fixed Header */}
      <header className="fixed top-0 z-10 w-full border-b-2 border-blue bg-off-white-light py-4">
        <Header />
      </header>

      {/* Scrollable Main Content */}
      <main className="mb-20 mt-32 flex-grow overflow-y-auto bg-blue p-6">
        <Board />
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 z-10 w-full border-t-2 border-blue bg-off-white-light p-8">
        <Footer onAddList={handleAddList} onClearBoard={handleClearBoard} />
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
