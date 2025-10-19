import React from "react";
import { Search, Loader } from "lucide-react";

export default function SearchBar({ searchTerm, onSearchChange, isLoading }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="relative shadow-2xl rounded-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search books by title or author..."
          className="w-full py-4 pl-14 pr-6 text-lg rounded-full border-2 border-fuchsia-300 focus:border-purple-500 outline-none transition duration-200 dark:bg-gray-800 dark:text-white dark:border-purple-600 dark:focus:border-fuchsia-400 shadow-inner"
          disabled={isLoading}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader size={24} className="animate-spin text-purple-500" />
          ) : (
            <Search size={24} className="text-fuchsia-500" />
          )}
        </div>
      </div>
    </div>
  );
}
