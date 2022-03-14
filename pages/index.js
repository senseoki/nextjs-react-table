import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Table from "./TableContainer"


export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios("http://api.tvmaze.com/search/shows?q=girls")
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "TV Show",
        columns: [
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          },
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Official Site",
            accessor: "show.officialSite",
            Cell: ({ cell: { value } }) => value ? value : "-"
          },
          {
            Header: "Rating",
            accessor: "show.rating.average",
            Cell: ({ cell: { value } }) => value || "-"
          },
          {
            Header: "Status",
            accessor: "show.status",
          },
          {
            Header: "Premiered",
            accessor: "show.premiered",
            Cell: ({ cell: { value } }) => value || "-"
          },
          {
            Header: "Time",
            accessor: "show.schedule.time",
            Cell: ({ cell: { value } }) => value || "-"
          },
        ]
      }
    ], []
  )


  return (
    <div>
      <h1>
        <center>React Table Demo</center>
      </h1>
      <Table columns={columns} data={data} />
    </div>
  )
}
