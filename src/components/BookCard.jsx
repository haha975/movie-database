import React from "react";
import { getCoverUrl } from "../hooks/useDebounce";

export default function BookCard({ book, onSelect }) {
  const authors = book.author_name?.join(", ") || "Unknown Author";
  const coverUrl = getCoverUrl(book.cover_i);
  const subjectTag = book.subject?.[0] || "General";

  return (
    <div
      onClick={() => onSelect(book)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-fuchsia-200/50 dark:border-purple-700 flex flex-col h-full group"
    >
      <div className="flex-shrink-0 h-52 bg-fuchsia-50 dark:bg-gray-700/50 flex items-center justify-center p-4 relative">
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-32 h-44 object-cover rounded shadow-lg transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getCoverUrl(null);
          }}
        />
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-purple-800 bg-purple-200 rounded-full dark:text-fuchsia-200 dark:bg-fuchsia-700/70 shadow">
          {subjectTag}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium line-clamp-1">
            {authors}
          </p>
        </div>
        <div className="mt-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {book.first_publish_year || "N/A"}
          </span>
          <div className="mt-2 w-full text-center text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 transition">
            View Details
          </div>
        </div>
      </div>
    </div>
  );
}
