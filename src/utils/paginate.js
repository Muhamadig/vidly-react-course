/**
 *
 * @param {Array} items - full items array
 * @param {number} pageNumber - the page number you want to paginate to
 * @param {number} pageSize - the page size
 */

export function paginate(items, pageNumber, pageSize) {
  const pagesNumber = Math.ceil(items.length / pageSize);
  const pageStart = (pageNumber - 1) * pageSize;
  const pageEnd = pageNumber * pageSize;

  if (pagesNumber === pageNumber) return items.slice(pageStart);
  return items.slice(pageStart, pageEnd);
}
