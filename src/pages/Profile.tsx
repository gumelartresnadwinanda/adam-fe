import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import EditIcon from "../assets/EditIcon";
import CloseIcon from "../assets/CloseIcon";
import { Button } from "../components/Button";

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "Profile";

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const initialValues = {
    username: user?.username || '',
    email: user?.email || '',
    full_name: user?.full_name || '',
    phone_number: user?.phone_number || '',
    address: user?.address || '',
    timezone: user?.timezone || '',
    language_preference: user?.language_preference || ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    full_name: Yup.string().required("Required"),
    phone_number: Yup.string(),
    address: Yup.string(),
    timezone: Yup.string(),
    language_preference: Yup.string()
  });

  interface UserProfile {
    username: string;
    email: string;
    full_name: string;
    phone_number: string;
    address: string;
    timezone: string;
    language_preference: string;
  }

  const userDetails = [
    { label: "Full Name", value: user?.full_name },
    { label: "Username", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Phone Number", value: user?.phone_number },
    { label: "Address", value: user?.address },
    { label: "Timezone", value: user?.timezone },
    { label: "Language Preference", value: user?.language_preference }
  ];

  const formFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Full Name", name: "full_name", type: "text" },
    { label: "Phone Number", name: "phone_number", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "Timezone", name: "timezone", type: "text" },
    { label: "Language Preference", name: "language_preference", type: "text" }
  ];

  const handleSubmit = async (values: UserProfile) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/auth/edit`, values, { withCredentials: true });
      setIsEditing(false);
      setUser(values);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Profile</h2>
        {isEditing ? (
          <CloseIcon onClick={() => setIsEditing(false)} />
        ) : (
          <EditIcon onClick={handleEditClick} />
        )}
      </div>
      {!isEditing ? (
        user ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg">
              {userDetails.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <p className="text-gray-500 dark:text-gray-400">{item.label}:</p>
                  <p className="text-gray-900 dark:text-gray-100">{item.value || '-'}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">Failed to load user details.</p>
        )
      ) : (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-4 w-full max-w-lg mx-auto">
            {formFields.map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                <Field name={field.name} type={field.type} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
              </div>
            ))}
            <Button type="submit" className="w-full" variant="primary">Save</Button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default Profile;
