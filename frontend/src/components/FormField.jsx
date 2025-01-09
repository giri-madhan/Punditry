import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";

export function FormField({
  label,
  id,
  type = "text",
  error,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  ...props
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-base font-medium text-[#4B5563] mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          className="block w-full px-3 py-2.5 bg-[#F3F4F6] border-0 rounded-md focus:ring-2 focus:ring-[#5850EC] transition-all duration-200"
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  showPasswordToggle: PropTypes.bool,
  showPassword: PropTypes.bool,
  onTogglePassword: PropTypes.func,
};

FormField.defaultProps = {
  type: "text",
  showPasswordToggle: false,
  showPassword: false,
};
