// src/components/Footer.tsx
import React, { useState } from "react";

interface FooterProps {
  onAddList: (title: string) => void;
  onClearBoard: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAddList, onClearBoard }) => {
  const [listTitle, setListTitle] = useState("");

  /**
   * Handles form submission to add a new list.
   * @param e - Form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (listTitle.trim()) {
      onAddList(listTitle);
      setListTitle("");
    }
  };

  return (
    <footer className="sticky bottom-0 left-0 flex w-screen items-center justify-center space-x-8 bg-off-white-light p-0">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-4xl items-center space-x-8"
      >
        <input
          type="text"
          placeholder="Add List"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          className="flex-grow border-0 bg-transparent text-3xl font-semibold text-blue placeholder:text-blue placeholder:opacity-50 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="hover:bg-teal-dark rounded bg-teal px-6 py-4 text-xl font-semibold text-off-white-light transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClearBoard}
          className="hover:bg-teal-dark rounded bg-teal px-2 py-4 text-xl font-semibold text-off-white-light transition"
        >
          Clear Board
        </button>
      </form>
    </footer>
  );
};

export default Footer;
