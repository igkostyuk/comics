import React from 'react';

const Pagination = ({ limit, offset, total }) => {
  console.log(limit, offset, total);
  if (total && limit) {
    const getPageNumber = itemsPerPage => Math.ceil(itemsPerPage / limit);
    const currentPage = getPageNumber(offset);
    const lastPage = getPageNumber(total);
    let numberOfNearPage = 5;
    numberOfNearPage =
      numberOfNearPage % 2 ? numberOfNearPage++ : numberOfNearPage;
    let nearPagesArr = Array.from(new Array(numberOfNearPage));
    let pageArr;
    if (1 < lastPage && lastPage < 6) {
      pageArr = [1, 2, 3, 4, 5];
    }
    if (lastPage < 4 && lastPage > 6) {
      pageArr = [1, 2, 3, 4, 5, '...', lastPage];
    }
    if (lastPage - currentPage < 2 && lastPage > 6) {
      pageArr = [1, '...', ...nearPagesArr];
    }

    pageArr = [1, '...', ...nearPagesArr, '...', lastPage];

    return (
      <ul>
        {pageArr.map((page, index) => {
          return <li key={index}>{index + 1}</li>;
        })}
      </ul>
    );
  } else {
    return null;
  }
};
export default Pagination;
