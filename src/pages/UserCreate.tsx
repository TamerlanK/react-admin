import { useState } from "react"
import { Wrapper } from "../components/table"
import { createUser } from "../actions/user" 
import { UserType } from "../lib/types"
import Swal from "sweetalert2"

const UserCreate = () => {
  const [newUser, setNewUser] = useState<Omit<UserType, "id">>({
    firstName: "",
    lastName: "",
    age: null,
    email: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await createUser(newUser)
      showSuccessAlert()
    } catch (error) {
      showErrorAlert()
    }
  }

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "User created successfully",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/users"
      }
    })
  }

  const showErrorAlert = () => {
    Swal.fire("Error!", "Error creating user", "error")
  }

  return (
    <Wrapper>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block text-neutral-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            className="w-full py-2 px-3 border rounded-md mt-1 text-md"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-neutral-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            className="w-full py-2 px-3 border rounded-md mt-1 text-md"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-neutral-700">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={newUser.age || ""}
            onChange={handleChange}
            className="w-full py-2 px-3 border rounded-md mt-1 text-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-neutral-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="w-full py-2 px-3 border rounded-md mt-1 text-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Create User
        </button>
      </form>
    </Wrapper>
  )
}

export default UserCreate
