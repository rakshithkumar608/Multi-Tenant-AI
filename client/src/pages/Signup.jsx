import { useState } from 'react'
import { signupUser } from "../services/auth";
import { useNavigate } from 'react-router-dom'

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
    navigate("/dashboard");
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h2>Create Workspace</h2>

        <input
          placeholder="Workspace Name" 
          className="border p-2 w-full"
           onChange={(e) => setForm({ ...form, workspaceName: e.target.value })} 
          />

          <input placeholder="Email" className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" placeholder="Password" className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button 
        onClick={handleSignup}
        className="bg-black text-white p-2 w-full">
          Sign Up
        </button>

        <p onClick={() => navigate("/login")} className="cursor-pointer text-blue-500">
          Login
        </p>
      </div>
    </div>
  )
}

export default Signup
