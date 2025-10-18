// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const {
    title,
    author_name,
    cover_i,
    publisher,
    key,
  } = book;

  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x220?text=No+Cover';

  return (
    <Link to={`/book${key}`} className="transition-transform hover:scale-105">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-60 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {author_name?.[0] || 'Unknown Author'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {publisher?.[0] || 'Unknown Publisher'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

