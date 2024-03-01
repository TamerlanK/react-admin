import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "./Dashboard"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
