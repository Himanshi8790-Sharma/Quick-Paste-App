import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'

function ViewComponent() {
  const { id } = useParams();
  const allSelect = useSelector((state) => state.paste.pastes);
  const paste = allSelect.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Paste Not Found</h1>
          <Link
            to="/pastes"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Back to Pastes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {paste.title}
            </h1>
            <p className="text-gray-400 mt-2">
              Created on {new Date(paste.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
            </p>
          </div>
        </div>

        {/* Content Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-6">
            <pre className="text-sm text-gray-300 bg-black/20 p-6 font-mono whitespace-pre-wrap break-words">
              <code>{paste.content}</code>
            </pre>
            <div className="mt-4 flex gap-3">
              <Link
                to={`/?pasteId=${paste._id}`}
                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all duration-200"
              >
                Edit
            </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                }}
                className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all duration-200"
              >
                Copy
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewComponent;
