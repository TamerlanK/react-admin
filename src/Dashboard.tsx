import React from "react"
import { useAuth } from "./context/AuthProvider"

const Dashboard: React.FC = () => {
  const auth = useAuth()

  const handleLogout = () => {
    auth.logOut()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={auth.user?.image}
              alt="User Avatar"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {auth.user?.username}
            </div>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">Name:</span> {auth.user?.firstName}{" "}
              {auth.user?.lastName}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">Email:</span> {auth.user?.email}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">Gender:</span> {auth.user?.gender}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
