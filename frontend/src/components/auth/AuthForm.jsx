import PropTypes from "prop-types";
import { FormField } from "../FormField";
import { LoadingSpinner } from "../LoadingSpinner";

export function AuthForm({
  isLogin,
  formData,
  setFormData,
  errors,
  isLoading,
  showPassword,
  setShowPassword,
  onSubmit,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div className="space-y-5">
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
        <div className="text-sm text-red-600 text-center">{errors.form}</div>
      )}
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border-0 rounded-md text-base font-medium text-white bg-[#5850EC] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5850EC] transition-all duration-200 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
