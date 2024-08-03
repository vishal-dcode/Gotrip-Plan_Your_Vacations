// components/common/Pagination.jsx
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  //  const pageNumbers = [];
  //  for (let i = 1; i <= totalPages; i++) {
  //    pageNumbers.push(i);
  //  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, 2, 3);

      if (currentPage > 4 && currentPage < totalPages - 3) {
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      } else if (currentPage <= 4) {
        pageNumbers.push(4, '...');
      } else {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
    }
    return pageNumbers;
  };

  return (
    <section className="px-5 py-3 flex font-items-center justify-between gap-2 border border-top">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50">
        Prev
      </button>
      <div className="tracking-widest">
        {getPageNumbers().map((number, index) => (
          <React.Fragment key={index}>
            {number === '...' ? (
              <span className="mx-1">...</span>
            ) : (
              <button
                onClick={() => onPageChange(number)}
                className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}>
                {number}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50">
        Next
      </button>
    </section>

    // <section className="px-5 py-3 flex font-items-center justify-between gap-2 border border-top">
    //   <button
    //     onClick={() => onPageChange(currentPage - 1)}
    //     disabled={currentPage === 1}
    //     className="disabled:opacity-50"
    //   >
    //     Prev
    //   </button>
    //   <div className="tracking-widest">
    //     {pageNumbers.map(number => (
    //       <button
    //         key={number}
    //         onClick={() => onPageChange(number)}
    //         className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}
    //       >
    //         {number}
    //       </button>
    //     ))}
    //   </div>
    //   <button
    //     onClick={() => onPageChange(currentPage + 1)}
    //     disabled={currentPage === totalPages}
    //     className="disabled:opacity-50"
    //   >
    //     Next
    //   </button>
    // </section>
  );
}
