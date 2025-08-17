import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            My Pastes
          </h1>
          <p className="text-gray-300 text-lg">
            Manage and share your saved snippets
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search pastes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Pastes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste?._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 truncate">
                  {paste.title}
                </h3>

                {/* Content Preview */}
                <div className="mb-4">
                  <pre className="text-sm text-gray-300 bg-black/20 rounded-lg p-3 max-h-32 overflow-hidden font-mono">
                    {paste.content.length > 100
                      ? `${paste.content.substring(0, 100)}...`
                      : paste.content}
                  </pre>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-400 mb-4">
                  {new Date(paste.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/?pasteId=${paste?._id}`}
                    className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all duration-200 text-center"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/pastes/${paste?._id}`}
                    className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all duration-200 text-center"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="flex-1 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all duration-200"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/paste/${paste._id}`;
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
                        "_blank"
                      );
                    }}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-all duration-200"
                  >
                    Share
                  </button>

                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No pastes found
                </h3>
                <p className="text-gray-400">
                  {searchTerm
                    ? "No pastes match your search criteria"
                    : "Create your first paste to get started"}
                </p>
                {!searchTerm && (
                  <Link
                    to="/"
                    className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Create New Paste
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Paste;
