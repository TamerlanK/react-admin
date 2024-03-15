import { Row, flexRender } from "@tanstack/react-table"
import { ProductType, QuoteType, TodoType, UserType } from "../../lib/types"

type RowType = ProductType | QuoteType | UserType | TodoType

interface TableBodyProps {
  rows: Row<RowType>[]
}

const TableBody = ({ rows }: TableBodyProps) => {
  return (
    <tbody>
      {rows.map((row: Row<RowType>, index: number) => (
        <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="border px-3 py-1.5 whitespace-pre-wrap"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
