
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();


  return (
    <div className='h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm'>
    <h1 className="font-semibold text-lg">Tenant-Multi AI</h1>

    <div className="flex items-center gap-4">
    <button
    onClick={() => navigate("/dashboard")}
    className='text-sm text-gray-600'
    >
      Dashboard
    </button>

    <button 
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/login");
    }}
    className='bg-red-500 text-white px-3 py-1 rounded'
    >
        Logout
    </button>
    </div>
    </div>
  )
}

export default Navbar
