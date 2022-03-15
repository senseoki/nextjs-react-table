import { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import Checkbox from './Checkbox'

export default function ColumnHidingTable() {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({
    columns,
    data,
  })

  return (
    <>
    <div>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
      </div>
      {
        allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />
              {column.Header}
            </label>
          </div>
        ))
      }
    </div>
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