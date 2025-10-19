import { useState, useEffect } from "react";

/**
 * Debounces a value, delaying its update until after a specific time delay.
 * @param {string} value
 * @param {number} delay
 * @returns {string}
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Creates a placeholder or OpenLibrary cover image URL.
 */
export const getCoverUrl = (coverId) => {
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }
  return `https://placehold.co/128x192/A855F7/ffffff?text=No+Cover`;
};
