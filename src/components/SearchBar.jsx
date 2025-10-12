// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto px-4 py-6"
      aria-label="Search for books"
    >
      <label htmlFor="search-input" className="sr-only">
        Search books by title, author, or keyword
      </label>
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books by title, author, or keyword..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
