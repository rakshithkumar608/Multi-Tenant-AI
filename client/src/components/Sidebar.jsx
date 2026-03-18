import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-64 bg-black text-white p-5'>
      <h1 className="mb-6 font-bold">Tenant-Multi AI</h1>

      <div className="flex flex-col gap-3">
        <Link to="/dashboard">Chat</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/history">History</Link>
      </div>
    </div>
  )
}

export default Sidebar
