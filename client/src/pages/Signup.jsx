import { useState } from 'react'
import { signupUser } from "../services/auth";
import { useNavigate } from 'react-router-dom'
import { Circle, Square, Triangle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email:"",
    password:"",
    workspaceName: "",
  });

  const handleSignup = async () => {
    const res = await signupUser(form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  };

  return (
    <div className='h-screen flex items-center justify-center bg-[#F0F0F0] font-["Outfit"] relative overflow-hidden'>
      
      {/* BACKGROUND GEOMETRIC DECORATIONS */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#D02020] opacity-10 rotate-45" />
      <div className="absolute bottom-32 right-32 w-40 h-40 rounded-full bg-[#1040C0] opacity-10" />
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-[#F0C020] opacity-20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      
      {/* SIGNUP CARD */}
      <div className="bg-white p-8 border-4 border-[#121212] shadow-[8px_8px_0px_0px_rgba(18,18,18,1)] w-96 space-y-6 relative z-10">
        
        {/* HEADER WITH GEOMETRIC LOGO */}
        <div className="space-y-3">
          <div className="flex gap-1.5 mb-2">
            <Circle className="w-5 h-5 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
            <Square className="w-5 h-5 fill-[#1040C0] text-[#1040C0]" strokeWidth={0} />
            <Triangle className="w-5 h-5 fill-[#F0C020] text-[#F0C020]" strokeWidth={0} />
          </div>
          <h2 className="font-black text-3xl uppercase tracking-tighter text-[#121212]">
            Create Workspace
          </h2>
          {/* Decorative accent line */}
          <div className="w-16 h-1 bg-[#F0C020]" />
        </div>

        {/* FORM INPUTS */}
        <div className="space-y-4">
          {/* Workspace Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#121212] mb-2">
              Workspace Name
            </label>
            <input
              placeholder="Enter workspace name" 
              className="border-2 border-[#121212] p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#1040C0] focus:ring-offset-2 font-medium text-sm transition-all"
              onChange={(e) => setForm({ ...form, workspaceName: e.target.value })} 
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#121212] mb-2">
              Email
            </label>
            <input 
              placeholder="your@email.com" 
              className="border-2 border-[#121212] p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#1040C0] focus:ring-offset-2 font-medium text-sm transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#121212] mb-2">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="border-2 border-[#121212] p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#1040C0] focus:ring-offset-2 font-medium text-sm transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* SIGN UP BUTTON */}
        <button 
          onClick={handleSignup}
          className="bg-[#D02020] text-white p-3 w-full font-black uppercase text-sm tracking-widest border-4 border-[#121212] shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:bg-[#D02020]/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200"
        >
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <div className="text-center pt-2 border-t-2 border-[#E0E0E0]">
          <p className="text-xs font-medium text-[#121212] mb-1">
            Already have an account?
          </p>
          <button 
            onClick={() => navigate("/login")} 
            className="text-[#1040C0] font-bold uppercase text-xs tracking-widest hover:text-[#D02020] transition-colors duration-200 underline decoration-2 underline-offset-4"
          >
            Login →
          </button>
        </div>

        {/* CORNER DECORATIVE SHAPES */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-[#F0C020] rounded-full" />
        <div className="absolute bottom-3 left-3 w-3 h-3 bg-[#1040C0]" />
      </div>
    </div>
  )
}

export default Signup