import { HeaderGroup, flexRender } from "@tanstack/react-table"
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi"
import { ProductType } from "../../lib/types"

interface TableHeaderProps {
  headerGroups: HeaderGroup<ProductType>[]
}

const TableHeader = ({ headerGroups }: TableHeaderProps) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-gray-100">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="px-4 py-2 font-semibold text-left cursor-pointer"
              onClick={
                header.column.getCanSort()
                  ? header.column.getToggleSortingHandler()
                  : undefined
              }
            >
              <div className="flex items-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getCanSort() && (
                  <span className="ml-1">
                    {header.column.getIsSorted() === "asc" ? (
                      <BiSortUp className="h-4 w-4 text-gray-500" />
                    ) : header.column.getIsSorted() === "desc" ? (
                      <BiSortDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <BiSort className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default TableHeader
