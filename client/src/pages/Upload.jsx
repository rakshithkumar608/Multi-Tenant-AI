import { useState } from 'react'
import { uploadFile } from "../services/upload";
import { toast } from 'react-hot-toast';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return toast.error("Select a file 📂");

    try {
      setLoading(true);
      await uploadFile(file);
      toast.success("PDF uploaded & trained 🚀")
    } catch  {
      toast.error("Upload Failed 😭")
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className='p-10'>
      <input
      type='file'
      onChange={(e) => setFile(e.target.files[0])}
      />

      <button 
      onClick={upload} 
      className='bg-black text-white p-2 ml-2 rounded'>
      {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}

export default Upload
