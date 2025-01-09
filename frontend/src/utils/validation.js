export const validatePassword = (password) => {
  const requirements = [
    {
      test: (pwd) => pwd.length >= 8,
      message: "Password must be at least 8 characters long",
    },
    {
      test: (pwd) => /[A-Z]/.test(pwd),
      message: "Password must contain at least one uppercase letter",
    },
    {
      test: (pwd) => /[a-z]/.test(pwd),
      message: "Password must contain at least one lowercase letter",
    },
    {
      test: (pwd) => /[0-9]/.test(pwd),
      message: "Password must contain at least one number",
    },
    {
      test: (pwd) => /[!@#$%^&*]/.test(pwd),
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    },
  ];

  for (const requirement of requirements) {
    if (!requirement.test(password)) {
      return requirement.message;
    }
  }

  return null;
};
