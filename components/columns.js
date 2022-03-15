import { format } from 'date-fns'
import ColumnFilter from './ColumnFilter'

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left',

  },
  {
    Header: 'Last Name',
    Footer: 'First Name',
    accessor: 'last_name',
    sticky: 'left',

  },
  {
    Header: 'Date of Birth',
    Footer: 'First Name',
    accessor: 'date_of_birth',
    Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')},
  },
  {
    Header: 'Country',
    Footer: 'First Name',
    accessor: 'country',
  },
  {
    Header: 'Phone',
    Footer: 'First Name',
    accessor: 'phone',
  },
]

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'First Name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'First Name',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Country',
        Footer: 'First Name',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'First Name',
        accessor: 'phone',
      },
    ],
  },
]