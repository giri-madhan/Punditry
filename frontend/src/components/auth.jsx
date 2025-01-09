import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../utils/validation";
import { FormField } from "./FormField";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear related error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700">Punditry</h1>
          <h2 className="mt-4 text-center text-2xl font-extrabold text-gray-900">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="font-medium text-indigo-700 hover:text-indigo-500"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormField
              label="Username"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <FormField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            {!isLogin && (
              <FormField
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
              />
            )}
          </div>
          {errors.form && (
            <div className="text-sm text-red-600 text-center">
              {errors.form}
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
