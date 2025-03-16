import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Logout from "./Logout";
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute";

const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const ProfilePage = lazy(() => import("../pages/Profile"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<AuthLayout />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<UnprotectedRoute><LoginPage /></UnprotectedRoute>} />
            <Route path="/register" element={<UnprotectedRoute><RegisterPage /></UnprotectedRoute>} />
          </Route>

          {/* Protected Routes */}
          <Route element={<AuthLayout />}>
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
      </Suspense>
    </Router >
  );
};

export default AppRoutes;
