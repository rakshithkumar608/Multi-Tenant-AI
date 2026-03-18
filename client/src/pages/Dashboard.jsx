
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'

const Dashboard = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 bg-gray-50 flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
