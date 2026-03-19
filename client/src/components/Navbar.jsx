import { useNavigate } from 'react-router-dom'

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
    <div className='h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm'>
      <h1 className="font-semibold text-lg">Tenant-Multi AI</h1>

      <div className="flex items-center gap-4">
        <span className='text-sm text-gray-600'>
          {user?.email}
        </span>

        <button 
          onClick={() => {
            localStorage.clear();
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