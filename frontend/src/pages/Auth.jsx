import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../utils/validation";
import { AuthForm } from "../components/auth/AuthForm";
import { AuthHeader } from "../components/auth/AuthHeader";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const response = await fetch(`http://localhost:5020${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        navigate("/dashboard");
      } else {
        setErrors({
          form: data.error || `Failed to ${isLogin ? "login" : "signup"}`,
        });
      }
    } catch (error) {
      console.error(error);
      setErrors({
        form: `Network error during ${isLogin ? "login" : "signup"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, password, confirmPassword } = formData;

    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    if (!isLogin) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <AuthHeader
          isLogin={isLogin}
          onToggleMode={() => {
            setIsLogin(!isLogin);
            setErrors({});
            setFormData({
              username: "",
              password: "",
              confirmPassword: "",
            });
          }}
        />
        <AuthForm
          isLogin={isLogin}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isLoading={isLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
