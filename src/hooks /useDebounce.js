// src/pages/Home.jsx
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 20)); // limit results
    } catch (error) {
      console.error('Search error:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">📚 Book Library</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : books.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-8">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No books found. Try a new search.</p>
      )}
    </div>
  );
};

export default Home;
