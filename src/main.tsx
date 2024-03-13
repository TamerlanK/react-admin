import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import AuthProvider from "./context/AuthProvider.tsx"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
)
