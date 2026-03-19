import { useState } from 'react'
import { uploadFile } from "../services/upload";
import { toast } from 'react-hot-toast';
import { Circle, Square, Triangle, Upload as UploadIcon, FileText, Info } from 'lucide-react';

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
    <div className='h-full overflow-y-auto p-6 sm:p-10 font-["Outfit"]'>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="space-y-3 pb-6 border-b-4 border-[#121212]">
          <div className="flex gap-1.5 mb-2">
            <Circle className="w-4 h-4 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
            <Square className="w-4 h-4 fill-[#1040C0] text-[#1040C0]" strokeWidth={0} />
            <Triangle className="w-4 h-4 fill-[#F0C020] text-[#F0C020]" strokeWidth={0} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#121212]">
            Upload Document
          </h2>
          <div className="w-24 h-1 bg-[#1040C0]" />
        </div>

        {/* UPLOAD CARD */}
        <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_rgba(18,18,18,1)] p-6 sm:p-8 relative overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0C020] opacity-10 rotate-45" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1040C0] opacity-10 rounded-full" />

          <div className="relative z-10 space-y-6">
            
            {/* FILE UPLOAD ZONE */}
            <div className="border-4 border-dashed border-[#121212] bg-[#F0F0F0] p-6 sm:p-8 text-center space-y-4 relative">
              
              {/* Upload icon */}
              <div className="flex justify-center">
                <div className="bg-[#1040C0] p-3 sm:p-4 border-2 border-[#121212] shadow-[4px_4px_0px_0px_rgba(18,18,18,1)]">
                  <UploadIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#121212]">
                  Select PDF File
                </p>
                <p className="text-xs font-medium text-[#121212]/60">
                  Upload a document to train the AI
                </p>
              </div>

              {/* File input */}
              <div className="flex justify-center">
                <label className="cursor-pointer">
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    accept=".pdf"
                  />
                  <div className="bg-white text-[#121212] px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-[#121212] font-bold uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_rgba(18,18,18,1)] hover:bg-[#F0C020] hover:shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200">
                    Choose File
                  </div>
                </label>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#D02020]" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#F0C020] rounded-full" />
            </div>

            {/* SELECTED FILE DISPLAY */}
            {file && (
              <div className="bg-[#F0F0F0] border-2 border-[#121212] p-4 flex items-center gap-3 sm:gap-4">
                <div className="bg-[#1040C0] p-2 border-2 border-[#121212] shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#121212]/60 mb-1">
                    Selected File
                  </p>
                  <p className="font-bold text-xs sm:text-sm text-[#121212] truncate">
                    {file.name}
                  </p>
                </div>
                <div className="w-2 h-2 bg-[#D02020] rounded-full shrink-0" />
              </div>
            )}

            {/* UPLOAD BUTTON */}
            <button 
              onClick={upload} 
              disabled={loading}
              className={`w-full bg-[#D02020] text-white p-3 sm:p-4 font-black uppercase text-xs sm:text-sm tracking-widest border-4 border-[#121212] shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] transition-all duration-200 ${
                loading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-[#D02020]/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  Uploading...
                </span>
              ) : (
                "Upload & Train"
              )}
            </button>

          </div>

          {/* Corner decorative shapes */}
          <div className="absolute top-3 right-3 w-3 h-3 bg-[#F0C020]" />
          <div className="absolute bottom-3 left-3 w-3 h-3 bg-[#D02020] rounded-full" />
        </div>

        {/* INFO SECTION */}
        <div className="bg-[#F0C020] border-4 border-[#121212] shadow-[6px_6px_0px_0px_rgba(18,18,18,1)] p-4 sm:p-6 relative">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-[#121212] p-2 border-2 border-[#121212] shrink-0">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#F0C020]" strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#121212] mb-2">
                Important Information
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#121212]">
                📄 Supported format: PDF & txt files only
              </p>
              <p className="text-xs font-medium text-[#121212]/80 mt-1">
                Your document will be processed and used to train the AI assistant
              </p>
            </div>
            <div className="w-3 h-3 bg-[#D02020] rounded-full shrink-0" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Upload