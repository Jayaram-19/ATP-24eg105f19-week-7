import { NavLink } from "react-router";
import { primaryBtn, secondaryBtn, pageWrapper } from "../styles/common";
import { useAuth } from "../store/authStore";

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return (
    <div className={pageWrapper}>
      <div className="flex flex-col items-center text-center mt-12 mb-24">
        <span className="text-xs font-semibold text-[#0066cc] bg-[#0066cc]/10 px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
          Welcome to BlogApp
        </span>
        
        <h1 className="text-6xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight max-w-4xl">
          Share your ideas with the world.
        </h1>
        
        <p className="text-xl text-[#6e6e73] max-w-2xl mb-10 leading-relaxed">
          A premium platform for authors and readers to connect, share knowledge, and build inspired communities through beautiful storytelling.
        </p>
        
        <div className="flex gap-4">
          <NavLink to="/register" className={primaryBtn + " py-3 px-6 text-base"}>
            Start Writing Today
          </NavLink>
          {!isAuthenticated && (
            <NavLink to="/login" className={secondaryBtn + " py-3 px-6 text-base"}>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#e8e8ed] pt-16">
        <div className="flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-[#f5f5f7] flex items-center justify-center rounded-2xl text-2xl mb-4">✍️</div>
             <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Write Effortlessly</h3>
             <p className="text-sm text-[#6e6e73]">Our editor helps you format and publish your thoughts beautifully.</p>
        </div>
        <div className="flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-[#f5f5f7] flex items-center justify-center rounded-2xl text-2xl mb-4">📝</div>
             <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Engage Readers</h3>
             <p className="text-sm text-[#6e6e73]">Connect with a community that cares about the topics you love.</p>
        </div>
        <div className="flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-[#f5f5f7] flex items-center justify-center rounded-2xl text-2xl mb-4">🤝</div>
             <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Share Knowledge</h3>
             <p className="text-sm text-[#6e6e73]">Learn from others and build inspired communities through storytelling.</p>
        </div>
      </div>
    </div>
  )
}

export default Home;