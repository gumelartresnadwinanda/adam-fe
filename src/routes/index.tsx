import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProfilePage from "../pages/Profile";
import AuthLayout from "../layouts/AuthLayout";
import Logout from "./Logout";
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<UnprotectedRoute><LoginPage /></UnprotectedRoute>} />
          <Route path="/register" element={<UnprotectedRoute><RegisterPage /></UnprotectedRoute>} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={<AuthLayout />}
        >
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
