import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

function Home() {
  const [title,setTitle]= useState("")
  const [value,setValue]=useState('')
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId")
  // Slice needed so we use Dispatcher
  const dispatch = useDispatch();
  const allSelect = useSelector((state)=> state.paste.pastes);
  useEffect(() => {
    if(pasteId){
      const paste = allSelect.find((p)=> p._id === pasteId);
      setTitle(paste.title)
      setValue(paste.content);
    }
  
  }, [pasteId])
  

 function createPaste (){
  const paste ={
    title: title,
    content:value,
    _id:pasteId || 
    Date.now().toString(36),
    createdAt:new Date().toISOString(),
  }

  if(pasteId){
    // Update
    dispatch( updateToPastes(paste));
  }
  else{
    // Create
    dispatch(addToPastes(paste));
  }
  // After clearation  or updation of the form
  setTitle("");
  setValue("");
  setSearchParams({});
 }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Paste Your Thoughts
          </h1>
          <p className="text-gray-300 text-lg">
            Create and share your code snippets instantly
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Content
              </label>
              <textarea
                placeholder="Paste your code or text here..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
              />
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={createPaste}
                disabled={!title || !value}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {pasteId ? "Update Paste" : "Create Paste"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">
              {allSelect.length}
            </div>
            <div className="text-sm text-gray-300">Total Pastes</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-pink-400">
              {value.length || 0}
            </div>
            <div className="text-sm text-gray-300">Current Characters</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-indigo-400">
              {new Date().toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-300">Today's Date</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
