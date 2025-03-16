import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../components/Button";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Register";
  }, []);

  const initialValues = { full_name: "", username: "", email: "", password: "", confirmPassword: "" };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Required"),
    username: Yup.string()
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values: { full_name: string; username: string; email: string; password: string }) => {
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, values);
      if (response.status !== 200 && response.status !== 201) throw new Error("Registration failed");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data?.error || "Registration failed. Try again.");
        } else {
          setError("Registration failed. Try again.");
        }
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Create Your Account</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          {[
            { label: "Full Name", name: "full_name", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
              <Field name={name} type={type} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
              <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
          ))}
          <Button type="submit" variant="primary" className="w-full">
            Register
          </Button>
        </Form>
      </Formik>

      <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default Register;
