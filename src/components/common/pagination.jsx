import React from "react";
const Pagination = props => {
  const { pageSize, itemsCount, currentPage } = props;

  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;
  const pages = [];
  for (let i = 1; i <= pageCount; i++) pages.push(i);

  return (
    <nav aria-label="Movies Table Navigation">
      <ul className="pagination pagination-sm justify-content-end">
        {pages.map(page => {
          let anchorPlaceHolder = (
            <button
              className="btn page-link"
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </button>
          );

          if (page === currentPage)
            return (
              <li key={page} className="page-item active" aria-current="page">
                {anchorPlaceHolder}
              </li>
            );

          return (
            <li key={page} className="page-item ">
              {anchorPlaceHolder}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
