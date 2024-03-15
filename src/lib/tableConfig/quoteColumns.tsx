import { createColumnHelper } from "@tanstack/react-table"
import { QuoteType } from "../types"

const columnHelper = createColumnHelper<QuoteType>()

export const quoteColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quote", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("author", {
    cell: (info) => info.getValue(),
  }),
]
