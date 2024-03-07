import React from "react"

interface ItemsPerPageSelectProps {
  value: number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const ItemsPerPageSelect: React.FC<ItemsPerPageSelectProps> = ({
  value,
  onChange,
}) => (
  <select
    className="border p-1 rounded w-16 border-gray-300 bg-white shadow-sm hover:shadow-md focus:outline-none focus:border-blue-500"
    value={value}
    onChange={onChange}
  >
    {[2, 4, 6, 8].map((pageSize) => (
      <option key={pageSize} value={pageSize}>
        {pageSize}
      </option>
    ))}
  </select>
)

export default ItemsPerPageSelect
