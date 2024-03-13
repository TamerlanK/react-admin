import React, { useReducer, useEffect } from "react"
import Modal from "../Modal"
import Input from "../Input"
import { addProduct } from "../../actions/product"

interface CreateProductModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormState {
  title: string
  brand: string
  price: number
}

type ActionType = "SET_TITLE" | "SET_BRAND" | "SET_PRICE" | "RESET"

interface Action {
  type: ActionType
  payload?: string | number
}

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: (action.payload as string) || "" }
    case "SET_BRAND":
      return { ...state, brand: (action.payload as string) || "" }
    case "SET_PRICE":
      return { ...state, price: +action.payload! }
    case "RESET":
      return INITIAL_STATE
    default:
      return state
  }
}

const INITIAL_STATE: FormState = {
  title: "",
  brand: "",
  price: 0,
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "RESET" })
    }
  }, [isOpen])

  const handleCreateProduct = async () => {
    const { title, brand, price } = state
    try {
      await addProduct({ title, brand, price })
      console.log("New product added")
      onClose()
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ActionType
  ) => {
    dispatch({ type, payload: e.target.value })
  }

  return (
    <Modal isOpen={isOpen}>
      <h1 className="text-xl font-bold mb-4">Create Product</h1>
      <div className="space-y-4">
        <Input
          id="title"
          label="Title"
          type="text"
          value={state.title}
          onChange={(e) => handleChange(e, "SET_TITLE")}
        />
        <Input
          id="brand"
          label="Brand"
          type="text"
          value={state.brand}
          onChange={(e) => handleChange(e, "SET_BRAND")}
        />
        <Input
          id="price"
          label="Price"
          type="number"
          value={state.price.toString()}
          onChange={(e) => handleChange(e, "SET_PRICE")}
        />
      </div>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={handleCreateProduct}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default CreateProductModal
