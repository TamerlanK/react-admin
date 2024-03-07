import { Row, flexRender } from "@tanstack/react-table"
import { ProductTableType } from "../../Dashboard"

interface TableBodyProps {
  rows: Row<ProductTableType>[]
}

const TableBody = ({ rows }: TableBodyProps) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="border px-4 py-2 whitespace-nowrap">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
