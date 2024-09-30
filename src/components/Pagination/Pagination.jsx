import React from "react";
import "./Pagination.scss";
import { iconsImgs } from "../../utils/images";
const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handlePageChange,
  handleNextPage,
}) => {
  const createPageRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    for (let i = start; i <= start + 2 && i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <img src={iconsImgs.prev} alt="" />
      </button>
      {totalPages > 1 && (
        <>
          {createPageRange().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`pagination-button ${
                currentPage === pageNumber ? "active" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </>
      )}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        <img src={iconsImgs.next} alt="" />
      </button>
      
    </div>
  );
};

export default Pagination;
