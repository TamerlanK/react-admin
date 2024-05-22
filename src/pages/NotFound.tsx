import { FaRegSadCry } from "react-icons/fa"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <FaRegSadCry className="text-6xl text-red-500 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-4">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="text-lg text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
