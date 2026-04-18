import { useNavigate, NavLink, Outlet } from "react-router";
import { useAuth } from "../store/authStore";

import { pageWrapper, navLinkClass, divider } from "../styles/common";

function UserProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={pageWrapper}>
      {/* PROFILE HEADER */}
      <div className="bg-white border border-[#e8e8ed] rounded-3xl p-6 mb-8 shadow-sm flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              className="w-16 h-16 rounded-full object-cover border"
              alt="profile"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xl font-semibold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name */}
          <div>
            <p className="text-sm text-[#6e6e73]">Welcome back</p>
            <h2 className="text-xl font-semibold text-[#1d1d1f]">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-sm text-[#a1a1a6] mt-1">{currentUser?.email}</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          className="bg-[#ff3b30] text-white text-sm px-5 py-2 rounded-full hover:bg-[#d62c23] transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      <div className={divider}></div>

      {/* ADDITIONAL DETAILS FOR USER */}
      <div className="bg-[#f5f5f7] rounded-3xl p-8 max-w-2xl mx-auto mt-6 text-center">
         <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">You are logged in as a Reader!</h3>
         <p className="text-sm text-[#6e6e73] leading-relaxed">
           Explore the articles on our platform, read engaging content, and post your comments 
           to interact with authors and other readers. Find an article on the Home page to get started.
         </p>
         
         <div className="mt-8 relative inline-block">
             <NavLink 
               to="/" 
               className="bg-[#0066cc] text-white font-semibold py-2.5 px-6 rounded-full hover:bg-[#004499] transition-colors shadow-sm"
             >
               Explore Articles
             </NavLink>
         </div>
      </div>
    </div>
  );
}

export default UserProfile;