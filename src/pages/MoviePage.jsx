// src/pages/BookDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';

const BookDetailPage = () => {
  const { id } = useParams(); // e.g. "/works/OL123W"
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org${id}.json`);
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!details) {
    return <p className="text-center mt-20 text-gray-500">Loading details...</p>;
  }

  return <BookDetails details={details} />;
};

export default BookDetailPage;
