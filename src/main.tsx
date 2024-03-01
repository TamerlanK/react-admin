import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import AuthProvider from "./context/AuthProvider.tsx"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
)
