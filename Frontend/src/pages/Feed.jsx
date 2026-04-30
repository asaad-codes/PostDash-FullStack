import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus, Sparkles, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        console.log("Full Response:", res.data);

        // FIX: Aapka data 'res.data.post' ke andar hai (Screenshot check karo)
        if (res.data && res.data.post) {
          setPosts(res.data.post);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="min-h-screen bg-[#F3F4F6] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="text-white size-5" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-slate-800">PostDash.</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/create-post")}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md"
            >
              <Plus size={18} /> New Post
            </button>
            
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <img src="/1.jpg" className="h-9 w-9 rounded-full object-cover border-2 border-indigo-100 shadow-sm" alt="asadbackend" />
              <span className="font-bold text-sm text-slate-700">asadbackend</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto p-8">
        {loading ? (
          <div className="text-center py-40 font-bold text-slate-400 animate-pulse text-lg">Fetching your database...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <article key={post._id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/1.jpg" className="w-9 h-9 rounded-full object-cover" alt="asadbackend" />
                    <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-none">asadbackend</h4>
                        <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-1 italic">Full Stack Dev</p>
                    </div>
                  </div>
                  <MoreHorizontal size={18} className="text-slate-300" />
                </div>

                <div className="px-4">
                    <div className="aspect-square bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-50 shadow-inner">
                        <img 
                            src={post.image} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt="Post content"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000"; }}
                        />
                    </div>
                </div>

                <div className="p-8 space-y-5">
                  <div className="flex items-center justify-between text-slate-600">
                    <div className="flex items-center gap-6">
                        <Heart size={26} className="hover:text-red-500 cursor-pointer transition-colors" />
                        <MessageCircle size={26} className="hover:text-indigo-500 cursor-pointer transition-colors" />
                        <Share2 size={26} className="hover:text-green-500 cursor-pointer transition-colors" />
                    </div>
                    <Bookmark size={26} className="text-slate-300 hover:text-indigo-500" />
                  </div>
                  
                  <p className="text-slate-700 text-[15px] leading-relaxed">
                    <span className="font-black text-slate-900 text-xs mr-2 uppercase tracking-tighter">Caption:</span>
                    {post.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
             <h3 className="text-2xl font-bold text-slate-800 tracking-tight italic">Database is empty!</h3>
             <p className="text-slate-400 mt-2 font-medium">Post kuxh share karo bhai, feed khali hai.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;