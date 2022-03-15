import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'

export default function PaginationTable() {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0},
  }, usePagination)

  const { pageIndex, pageSize } = state

  return (
    <>
    <table { ...getTableProps() }>
      <thead>
        {
          headerGroups.map((headerGroup, i) => (
            <tr key={i} { ...headerGroup.getHeaderGroupProps() }>
              {headerGroup.headers.map((column, j) => (
                <th key={j} { ...column.getHeaderProps() }>{column.render('Header')}</th>
              ))}
            </tr>
          ))
        }
      </thead>
      <tbody { ...getTableBodyProps() }>
        {
          page.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={i} { ...row.getRowProps() }>
                {
                  row.cells.map((cell, j) => {
                    return <td key={j} { ...cell.getCellProps() }>{cell.render('Cell')}</td>
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
    <div>
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page: {' '}
        <input type='number' defaultValue={pageIndex + 1} 
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
          }}
          style={{width: '50px'}}
        />
      </span>
      <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
        {
          [10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))
        }
      </select>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
    </div>
    </>
  )
}