import { createColumnHelper } from "@tanstack/react-table"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { deleteUser } from "../../actions/user"
import { UserType } from "../types"
import { fireDeleteConfirmationAlert, notify } from "../utils"

const columnHelper = createColumnHelper<UserType>()

export const userColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    id: "action",
    header: () => <span className="mx-auto">action</span>,
    cell: ({ row }) => {
      const { id: userId } = row.original
      const navigate = useNavigate()
      const handleEdit = () =>
        navigate(`/users/${userId}`, { state: { userData: row.original } })

      const handleDelete = async (id: number) => {
        const confirmed = await fireDeleteConfirmationAlert()

        if (confirmed) {
          try {
            await deleteUser(id)
            notify(`User with ID ${id} has been deleted.`, "success")
          } catch (error: any) {
            notify(`An error occurred while deleting the user`, "error")
          }
        }
      }

      return (
        <div className="flex justify-center gap-x-4 items-center">
          <button onClick={handleEdit}>
            <FaEdit
              className={`text-blue-600 size-4 ${
                false && "opacity-50 cursor-not-allowed"
              }`}
            />
          </button>
          <button onClick={() => handleDelete(userId)}>
            <FaTrash
              className={`text-red-600 size-4 ${
                false && "opacity-50 cursor-not-allowed"
              }`}
            />
          </button>
        </div>
      )
    },
    enableSorting: false,
  }),
]
