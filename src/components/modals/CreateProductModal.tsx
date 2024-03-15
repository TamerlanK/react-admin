import React, { useReducer } from "react"
import Modal from "../Modal"
import Input from "../Input"
import { addProduct } from "../../actions/product"
import Swal from "sweetalert2"

interface CreateProductModalProps {
  isOpen: boolean
  onClose: () => void
}

interface State {
  product: {
    title: string
    brand: string
    price: number
  }
  isLoading: boolean
}

type Action =
  | { type: "SET_FIELD"; field: string; value: string | number }
  | { type: "RESET_FIELDS" }
  | { type: "SET_LOADING"; isLoading: boolean }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        product: {
          ...state.product,
          [action.field]: action.value,
        },
      }
    case "RESET_FIELDS":
      return {
        product: {
          title: "",
          brand: "",
          price: 0,
        },
        isLoading: false,
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

const INITIAL_STATE: State = {
  product: {
    title: "",
    brand: "",
    price: 0,
  },
  isLoading: false,
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value })
  }

  const handleCreateProduct = async () => {
    const { title, brand, price } = state.product
    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      await addProduct({ title, brand, price })
      Swal.fire({
        icon: "success",
        title: "Product Created",
        text: "New product has been created successfully.",
      })
      onClose()
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create product. Please try again later.",
      })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
      dispatch({ type: "RESET_FIELDS" })
    }
  }

  const handleCancel = () => {
    dispatch({ type: "RESET_FIELDS" })
    onClose()
  }

  return (
    <Modal isOpen={isOpen}>
      <h1 className="text-xl font-bold mb-4">Create Product</h1>
      <div className="space-y-4">
        <Input
          id="title"
          label="Title"
          type="text"
          value={state.product.title}
          onChange={(e) => handleChange(e, "title")}
        />
        <Input
          id="brand"
          label="Brand"
          type="text"
          value={state.product.brand}
          onChange={(e) => handleChange(e, "brand")}
        />
        <Input
          id="price"
          label="Price"
          type="number"
          value={state.product.price.toString()}
          onChange={(e) => handleChange(e, "price")}
        />
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={handleCreateProduct}
          disabled={state.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.isLoading ? "Creating..." : "Create"}
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

export default CreateProductModal
