import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(location.search);
  const redirectUrl = urlParams.get('redirect');
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, values, { withCredentials: true });
      if (response.status !== 200 && response.status !== 201) throw new Error("Login failed");
      login(response.data.user);
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Sign In to Your Account</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          {["email", "password"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <Field
                name={field}
                type={field}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
            </div>
          ))}
          <Button type="submit" className="w-full" variant="primary">Sign In</Button>
        </Form>
      </Formik>

      {
        !redirectUrl && (
          <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
            Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
          </p>

        )
      }
    </div>
  );
};

export default Login;
