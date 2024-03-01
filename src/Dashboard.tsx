import React from "react"
import { useAuth } from "./context/AuthProvider"

const Dashboard: React.FC = () => {
  const auth = useAuth()

  return (
    <div className="container mx-auto flex justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={auth.user?.image}
              alt="User Avatar"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-900">
                {auth.user?.username}
              </h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
