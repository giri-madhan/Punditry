import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-[#5850EC]">Punditry</h1>
            <div className="flex items-center space-x-6">
              <span className="text-[#6B7280]">
                Welcome,{" "}
                <span className="font-medium text-[#1F2937]">
                  {user?.username}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border-0 rounded-md text-sm font-medium text-white bg-[#5850EC] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5850EC] transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
          <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
            Welcome to the Punditry
          </h2>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
