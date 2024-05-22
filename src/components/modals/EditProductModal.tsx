import React, { useReducer } from "react"
import { updateProduct } from "../../actions/product"
import { ProductType } from "../../lib/types"
import { notify } from "../../lib/utils"
import Input from "../Input"
import Modal from "../Modal"

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  initialData: ProductType
}

interface State {
  product: ProductType
  isLoading: boolean
}

type Action =
  | { type: "UPDATE_FIELD"; id: string; value: string }
  | { type: "RESET_FIELDS"; initialData: ProductType }
  | { type: "SET_LOADING"; isLoading: boolean }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        product: {
          ...state.product,
          [action.id]: action.value,
        },
      }
    case "RESET_FIELDS":
      return {
        ...state,
        product: action.initialData,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      }
    default:
      return state
  }
}

const EditProductModal = ({
  isOpen,
  onClose,
  initialData,
}: EditProductModalProps) => {
  const [state, dispatch] = useReducer(reducer, {
    product: initialData,
    isLoading: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch({ type: "UPDATE_FIELD", id, value })
  }

  const handleSaveChanges = async () => {
    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      const { id, ...productWithoutId } = state.product
      await updateProduct(state.product.id, productWithoutId)
      notify(`Product ${id} Updated`, "success")
    } catch (error) {
      notify("Failed to save changes. Try again later.", "error")
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
      dispatch({ type: "RESET_FIELDS", initialData })
      onClose()
    }
  }

  const handleCancel = () => {
    dispatch({ type: "RESET_FIELDS", initialData })
    onClose()
  }

  return (
    <Modal isOpen={isOpen}>
      <h1 className="text-xl font-bold">Edit Product</h1>
      <div className="space-y-4 my-4">
        <Input
          id="title"
          label="Title"
          type="text"
          value={state.product.title || ""}
          onChange={handleChange}
        />
        <Input
          id="brand"
          label="Brand"
          type="text"
          value={state.product.brand || ""}
          onChange={handleChange}
        />
        <Input
          id="price"
          label="Price"
          type="number"
          value={state.product.price}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSaveChanges}
          disabled={state.isLoading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {state.isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default EditProductModal
