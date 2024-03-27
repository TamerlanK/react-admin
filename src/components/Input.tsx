import React from "react"

interface InputProps {
  id: string
  label: string
  type: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ id, label, type, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
    </div>
  )
}

export default Input
