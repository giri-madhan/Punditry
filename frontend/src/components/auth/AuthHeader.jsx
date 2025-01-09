import PropTypes from "prop-types";

export function AuthHeader({ isLogin, onToggleMode }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-[#5850EC]">Punditry</h1>
      <h2 className="mt-6 text-center text-4xl font-bold text-[#1F2937]">
        {isLogin ? "Welcome Back" : "Join Us"}
      </h2>
      <p className="mt-2 text-center text-base text-[#6B7280]">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="font-medium text-[#5850EC] hover:text-[#4338CA] transition-colors duration-200"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

AuthHeader.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onToggleMode: PropTypes.func.isRequired,
};
