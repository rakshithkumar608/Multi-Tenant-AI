import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Circle, Square, Triangle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  let user = null;

  try {
    const userData = localStorage.getItem("user");
    user = userData && userData !== "undefined"
      ? JSON.parse(userData)
      : null;
  } catch (err) {
    console.error("Invalid user JSON:", err);
    localStorage.removeItem("user");
  }

  return (
    <nav className="h-20 bg-white border-b-4 border-[#121212] flex items-center justify-between px-8 font-['Outfit'] relative z-30">
      
      {/* BRANDING: Geometric Modernism */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5 group">
          <Circle 
            className="w-4 h-4 fill-[#D02020] text-[#D02020] group-hover:scale-110 transition-transform duration-200" 
            strokeWidth={0} 
          />
          <Square 
            className="w-4 h-4 fill-[#1040C0] text-[#1040C0] group-hover:rotate-45 transition-transform duration-200" 
            strokeWidth={0} 
          />
          <Triangle 
            className="w-4 h-4 fill-[#F0C020] text-[#F0C020] group-hover:-rotate-12 transition-transform duration-200" 
            strokeWidth={0} 
          />
        </div>
        <h1 className="font-black text-2xl uppercase tracking-tighter text-[#121212]">
          Tenant-Multi AI
        </h1>
      </div>

      {/* RIGHT SIDE: User Info + Logout */}
      <div className="flex items-center gap-6 h-full">
    
        {/* User Email Badge */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-[#121212] bg-[#F0F0F0] shadow-[3px_3px_0px_0px_rgba(18,18,18,1)]">
          <div className="w-2 h-2 bg-[#1040C0] rounded-full" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#121212]">
            {user?.email}
          </span>
        </div>

        {/* Logout Button */}
        <button 
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="flex items-center gap-2 bg-[#D02020] text-white px-5 py-2.5 border-4 border-[#121212] font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:bg-[#D02020]/90 transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <LogOut size={16} strokeWidth={3} />
          <span>Logout</span>
        </button>
      </div>

      {/* Decorative Line (Bauhaus Asymmetry) */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#F0C020]" />
    </nav>
  );
};

export default Navbar;