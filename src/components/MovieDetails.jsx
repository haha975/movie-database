// src/components/BookDetails.jsx
import React from 'react';

const BookDetails = ({ details }) => {
  const {
    title,
    description,
    subjects,
    covers,
  } = details;

  const coverUrl = covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
    : 'https://via.placeholder.com/300x400?text=No+Cover';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={coverUrl}
          alt={title}
          className="w-72 h-auto rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {description?.value || description || 'No description available.'}
          </p>
          {subjects && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Subjects:</h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subj, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {subj}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
