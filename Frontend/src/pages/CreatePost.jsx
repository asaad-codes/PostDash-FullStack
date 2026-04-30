import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Send, LayoutDashboard, X, Sparkles, CloudUpload } from "lucide-react";

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileInputRef.current.files[0]) return alert("Please select an image first!");

    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", fileInputRef.current.files[0]);

    try {
      // Backend expects 'image' and 'caption'
      const res = await axios.post("http://localhost:3000/create-post", formData);
      if (res.status === 201) navigate("/feed");
    } catch (err) {
      console.error(err);
      alert("Database error. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F3F4F6] font-sans selection:bg-indigo-100">
      {/* Navbar matching Feed page */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/feed")}>
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="text-white size-5" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-slate-800">PostDash.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <img src="/1.jpg" className="h-9 w-9 rounded-full object-cover border-2 border-indigo-100 shadow-sm" alt="asadbackend" />
              <span className="font-bold text-sm text-slate-700">asadbackend</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-8 md:p-16">
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            {/* Left Side: Image Upload */}
            <div 
              onClick={() => fileInputRef.current.click()}
              className="bg-slate-50 border-r border-slate-100 relative h-[400px] md:h-auto cursor-pointer group flex flex-col items-center justify-center transition-all hover:bg-slate-100/50"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl">Change Photo</button>
                  </div>
                </>
              ) : (
                <div className="text-center px-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                    <CloudUpload size={32} />
                  </div>
                  <h3 className="font-bold text-slate-900">Upload Media</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Click to browse your device</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>

            {/* Right Side: Form Details */}
            <div className="p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <img src="/1.jpg" className="h-8 w-8 rounded-full object-cover" alt="asadbackend" />
                    <span className="font-black text-xs text-slate-900 uppercase tracking-widest">asadbackend</span>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Caption</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a catchy caption for your post..."
                    className="w-full h-40 bg-slate-50 border-none rounded-2xl p-5 text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300 resize-none"
                    required
                  />
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl py-4 text-white font-bold text-sm shadow-xl transition-all duration-300 ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-100'}`}
              >
                {loading ? "Publishing..." : "Publish Post"} <Send size={18} />
              </button>
            </div>

          </div>
        </div>
        
        {/* Helper Footer */}
        <p className="text-center mt-8 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            Logged in as <span className="text-indigo-500">asadbackend</span> • Ready to share
        </p>
      </main>
    </section>
  );
};

export default CreatePost;