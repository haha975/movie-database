import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Sun,
  Moon,
  Filter,
} from "lucide-react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";
import { useDebounce } from "./hooks/useDebounce";

// --- Mock Data and API Simulation ---
const mockBooks = [
  { key: 'work/1', title: 'The Lord of the Rings', author_name: ['J.R.R. Tolkien'], first_publish_year: 1954, cover_i: 298816, subject: ['Fantasy', 'Adventure', 'Epic'], edition_count: 104, details: "A classic high fantasy epic about hobbits, elves, and the fight against darkness." },
  { key: 'work/2', title: 'Pride and Prejudice', author_name: ['Jane Austen'], first_publish_year: 1813, cover_i: 10398688, subject: ['Romance', 'Classic', 'Satire'], edition_count: 50, details: "A novel of manners concerning the emotional development of Elizabeth Bennet." },
  { key: 'work/3', title: '1984', author_name: ['George Orwell'], first_publish_year: 1949, cover_i: 125301, subject: ['Dystopian', 'Science Fiction', 'Political'], edition_count: 89, details: "A tale of a totalitarian future where Big Brother watches your every move." },
  { key: 'work/4', title: 'To Kill a Mockingbird', author_name: ['Harper Lee'], first_publish_year: 1960, cover_i: 671806, subject: ['Southern Gothic', 'Legal Drama', 'Coming-of-age'], edition_count: 65, details: "A timeless story of innocence, experience, and the struggle for justice." },
  { key: 'work/5', title: 'Dune', author_name: ['Frank Herbert'], first_publish_year: 1965, cover_i: 10634685, subject: ['Science Fiction', 'Space Opera', 'Ecology'], edition_count: 42, details: "The story of Paul Atreides and his quest to protect the desert planet Arrakis." },
  { key: 'work/6', title: 'Atomic Habits', author_name: ['James Clear'], first_publish_year: 2018, cover_i: 12102030, subject: ['Self-Help', 'Productivity', 'Psychology'], edition_count: 20, details: "An easy and proven way to build good habits and break the bad ones." },
  { key: 'work/7', title: 'Circe', author_name: ['Madeline Miller'], first_publish_year: 2018, cover_i: 10567890, subject: ['Mythology', 'Fantasy', 'Historical Fiction'], edition_count: 14, details: "A captivating retelling of the story of Circe, the goddess of magic and witchcraft." },
  { key: 'work/8', title: 'Project Hail Mary', author_name: ['Andy Weir'], first_publish_year: 2021, cover_i: 12345678, subject: ['Science Fiction', 'Adventure', 'Space'], edition_count: 9, details: "Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity." },
  { key: 'work/9', title: 'Educated', author_name: ['Tara Westover'], first_publish_year: 2018, cover_i: 12055745, subject: ['Memoir', 'Biography', 'Education'], edition_count: 12, details: "A memoir about a girl who, kept out of school by her survivalist family, goes on to earn a PhD from Cambridge University." },
  { key: 'work/10', title: 'Where the Crawdads Sing', author_name: ['Delia Owens'], first_publish_year: 2018, cover_i: 12479633, subject: ['Mystery', 'Southern Fiction', 'Nature'], edition_count: 18, details: "A story that follows two timelines that slowly intertwine: a nature tale and a murder investigation." },
];

/**
 * Simulates fetching books from an API based on a search term.
 */
const fetchBooks = async (query) => {
  if (!query) return mockBooks;
  await new Promise((resolve) => setTimeout(resolve, 800));
  const lowerQuery = query.toLowerCase();
  return mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerQuery) ||
      (book.author_name &&
        book.author_name.some((author) =>
          author.toLowerCase().includes(lowerQuery)
        ))
  );
};

// --- Genre Filter Component ---
function GenreFilter({ subjects, currentFilter, onSelectFilter }) {
  return (
    <div className="w-full max-w-7xl mx-auto mb-10 overflow-x-auto whitespace-nowrap py-2">
      <div className="flex space-x-3 justify-center">
        <button
          onClick={() => onSelectFilter(null)}
          className={`flex items-center px-4 py-2 text-sm font-semibold rounded-full transition duration-150 shadow-md 
              ${
                !currentFilter
                  ? "bg-purple-600 text-white shadow-purple-400/50 dark:bg-fuchsia-500"
                  : "bg-white text-gray-600 hover:bg-purple-100 dark:bg-gray-700 dark:text-gray-200"
              }`}
        >
          <Filter size={16} className="mr-1" /> All
        </button>
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSelectFilter(subject)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition duration-150 shadow-md 
                ${
                  currentFilter === subject
                    ? "bg-purple-600 text-white shadow-purple-400/50 dark:bg-fuchsia-500"
                    : "bg-white text-gray-600 hover:bg-purple-100 dark:bg-gray-700 dark:text-gray-200"
                }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [theme, setTheme] = useState("light");
  const [filterSubject, setFilterSubject] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const allSubjects = useMemo(() => {
    const subjects = new Set();
    mockBooks.forEach((book) => {
      if (book.subject) {
        book.subject.forEach((sub) => subjects.add(sub));
      }
    });
    return Array.from(subjects).sort();
  }, []);

  const searchForBooks = useCallback(async (query) => {
    setLoading(true);
    try {
      const results = await fetchBooks(query);
      setBooks(results);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchForBooks(debouncedSearchTerm);
    setFilterSubject(null);
  }, [debouncedSearchTerm, searchForBooks]);

  const filteredBooks = useMemo(() => {
    if (!filterSubject) return books;
    return books.filter(
      (book) => book.subject && book.subject.includes(filterSubject)
    );
  }, [books, filterSubject]);

  const helperText = useMemo(() => {
    const count = filteredBooks.length;
    if (loading) return "Searching for amazing literature...";
    if (debouncedSearchTerm && count > 0)
      return `Showing ${count} results for "${debouncedSearchTerm}"${
        filterSubject ? ` in ${filterSubject}` : ""
      }`;
    if (count > 0)
      return `Showing ${count} books${filterSubject ? ` in ${filterSubject}` : ""}.`;
    if (debouncedSearchTerm && count === 0)
      return `No books found matching "${debouncedSearchTerm}"${
        filterSubject ? ` in ${filterSubject}` : ""
      }`;
    return "Start typing above to search or use filters below.";
  }, [loading, debouncedSearchTerm, filteredBooks.length, filterSubject]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={theme}>
      <div className="min-h-screen bg-fuchsia-50 dark:bg-purple-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 p-4 sm:p-8">
        {/* Header */}
        <header className="text-center mb-10 pt-6 relative max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold text-purple-700 dark:text-fuchsia-300">
            The OmniBook Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
            Discover your next favorite read.
          </p>
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-fuchsia-600 dark:text-purple-400 hover:scale-105 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </header>

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isLoading={loading}
        />

        {/* Genre Filter */}
        <GenreFilter
          subjects={allSubjects}
          currentFilter={filterSubject}
          onSelectFilter={setFilterSubject}
        />

        {/* Book Results */}
        <div className="max-w-7xl mx-auto pt-6">
          <p className="text-center mb-8 text-gray-600 dark:text-gray-400 font-semibold">
            {helperText}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.key} book={book} onSelect={setSelectedBook} />
            ))}
          </div>

          {!loading && filteredBooks.length === 0 && (
            <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8 border-2 border-fuchsia-300 dark:border-purple-700">
              <Search size={48} className="mx-auto text-fuchsia-400 mb-4" />
              <p className="text-2xl font-semibold">No results found</p>
              <p className="text-gray-500 dark:text-gray-400">
                Try clearing the search term or resetting the filter.
              </p>
            </div>
          )}
        </div>

        {/* Book Details Modal */}
        <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
      </div>
    </div>
  );
}
