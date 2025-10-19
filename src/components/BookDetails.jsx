import React from "react";
import { X, ChevronLeft, Calendar, BookOpen } from "lucide-react";
import { getCoverUrl } from "../hooks/useDebounce";

export default function BookDetails({ book, onClose }) {
  if (!book) return null;

  const authors = book.author_name?.join(", ") || "Unknown Author";
  const subjects = book.subject || [];
  const coverUrl = getCoverUrl(book.cover_i);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl dark:bg-gray-900 dark:text-gray-100 border-2 border-fuchsia-400/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-fuchsia-100/70 text-gray-800 hover:bg-fuchsia-200 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 p-6 md:p-10 flex justify-center bg-fuchsia-50 dark:bg-purple-900/30 rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-40 h-60 rounded-lg shadow-xl object-cover border-4 border-white dark:border-gray-800"
            />
          </div>

          <div className="p-6 md:p-8 flex-1">
            <h2 className="text-3xl font-extrabold text-fuchsia-600 dark:text-fuchsia-400 mb-1">
              {book.title}
            </h2>
            <h3 className="text-lg text-gray-600 dark:text-gray-400 font-semibold mb-4 border-b border-purple-200 dark:border-purple-800 pb-2">
              by {authors}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm">
              {book.details || "No detailed description available."}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={18} className="text-purple-500 mr-2" />
                <span className="font-medium">First Published:</span>{" "}
                {book.first_publish_year || "N/A"}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <BookOpen size={18} className="text-purple-500 mr-2" />
                <span className="font-medium">Editions Found:</span>{" "}
                {book.edition_count || "N/A"}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Subjects:
              </h4>
              <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 5).map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 text-xs font-semibold text-fuchsia-800 bg-fuchsia-100 rounded-full dark:text-purple-200 dark:bg-purple-700/50"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 shadow-lg"
            >
              <ChevronLeft size={18} className="inline mr-2" />
              Back to Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
