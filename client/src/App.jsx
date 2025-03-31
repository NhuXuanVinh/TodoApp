import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/PrivateRoute";
import TodoApp from "./pages/TodoApp/TodoApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<PrivateRoute element={<TodoApp />} />} />
        <Route path="/" element={<Navigate to="/todo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
