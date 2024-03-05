import React from "react"
import { useAuth } from "./context/AuthProvider"
import useProductFetch from "./hooks/useProductFetch"

const Dashboard: React.FC = () => {
  const auth = useAuth()
  const { products, loading } = useProductFetch(auth.token)

  return (
    <div className="container mx-auto flex justify-center items-center h-full p-4">
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div>
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full border border-gray-300">
                  <thead className="sticky top-0">
                    <tr className="bg-gray-100">
                      <th className="p-3 border border-gray-300">ID</th>
                      <th className="p-3 border border-gray-300">Title</th>
                      <th className="p-3 border border-gray-300">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={product.id}
                        className={`border-y border-gray-300 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="p-3 border-r border-gray-300">
                          {product.id}
                        </td>
                        <td className="p-3 border-r border-gray-300">
                          {product.title}
                        </td>
                        <td className="p-3 border-r border-gray-300">
                          {product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
