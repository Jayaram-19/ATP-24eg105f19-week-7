import { useAuth } from "../Store/authStore.js";
import { useNavigate } from "react-router";
import { pageWrapper, divider } from "../Styles/common";

function AdminProfile() {

  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={pageWrapper}>
      <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm max-w-4xl mx-auto border-t-8 border-t-red-500">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1d1d1f]">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage users, articles, and platform settings.</p>
          </div>
          <button 
            onClick={onLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className={divider}></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
            <p className="text-4xl font-bold text-red-500">24</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Articles</h3>
            <p className="text-4xl font-bold text-red-500">156</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Reports</h3>
            <p className="text-4xl font-bold text-red-500">0</p>
          </div>
        </div>

        <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <h4 className="text-blue-800 font-semibold mb-2">System Status: All Systems Go</h4>
          <p className="text-blue-600 text-sm">Database connection is stable. Frontend is connected via proxy to port 5000.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
