import { useMemo } from 'react'
import { useTable, useGlobalFilter } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import GlobalFilter from './GlobalFilter'

export default function FilteringTable() {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
  }, useGlobalFilter)

  const { globalFilter } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
            rows.map((row, i) => {
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
        <tfoot>
          {
            footerGroups.map((footerGroup, i) => (
              <tr key={i} { ...footerGroup.getFooterGroupProps() }>
                {
                  footerGroup.headers.map((column, j) => (
                    <td key={j} { ...column.getFooterProps() }>
                    {
                      column.render('Footer')
                    }</td>
                  ))
                }
              </tr>
            ))
          }
        </tfoot>
      </table>
    </>
  )
}