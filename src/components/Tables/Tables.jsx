import { useTable, useSortBy, usePagination } from "react-table";
import React from 'react';

const TableCom = ({ data, columns }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      state: { pageIndex },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 }, // Start at the first page
      },
      useSortBy,
      usePagination
    );

    return (
      <>
        <table {...getTableProps()} style={{ marginTop:"100px", width:"100%", textAlign:"center" }} >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: "solid 3px red",
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        {/* Check if the cell accessor corresponds to the "Profile Pic" column */}
                        {cell.column.id === 'Pic' ? (
                          <img src={cell.value} alt="Profile Pic" style={{width: '50px', height: '50px'}} />
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{display:"flex", justifyContent:"space-around"}}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous Page
          </button>{' '}
          <span>
            <strong>
              {pageIndex + 1} of {Math.ceil(data.length / 10)} 
            </strong>{' '}
            Page{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next Page
          </button>{' '}
        </div>
      </>
    );
};

export default TableCom;
