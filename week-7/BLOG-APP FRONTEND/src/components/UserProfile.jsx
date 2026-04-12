import { useNavigate, NavLink } from "react-router";
import { useAuth } from "../Store/authStore.js";
import { pageWrapper, submitBtn, divider } from "../Styles/common";


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
      <div className="bg-white border border-[#e8e8ed] rounded-3xl p-8 shadow-sm max-w-2xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          {currentUser?.profileImageURL ? (
            <img
              src={currentUser.profileImageURL}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#0066cc]/10"
              alt="profile"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-3xl font-bold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-1">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-[#86868b]">{currentUser?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full uppercase tracking-wider text-gray-600">
              {currentUser?.role}
            </span>
          </div>
        </div>

        <div className={divider}></div>

        <div className="flex flex-col gap-4 mt-8">
          <NavLink to="/articles" className="text-center bg-[#f5f5f7] text-[#1d1d1f] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
            Explore Articles
          </NavLink>
          
          <button
            className="w-full bg-[#ff3b30] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#d62c23] transition shadow-md"
            onClick={onLogout}
          >
            Sign Out
          </button>
        </div>
      </div>


    </div>
  );
}

export default UserProfile;
