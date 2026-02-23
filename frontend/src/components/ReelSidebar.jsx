import React from "react";

const ReelSidebar = ({ item, onLike, onSave }) => {
  return (
    <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-10">
      {/* Like Button ❤️ */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => onLike(item)}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 transition-transform active:scale-90 ${item.isLiked ? "text-red-500" : "text-white"}`}
          aria-label="Like"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={item.isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
        <span className="text-white text-xs font-bold drop-shadow-md">
          {item.likeCount ?? 0}
        </span>
      </div>

      {/* Bookmark Button 🔖 */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => onSave(item)}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 transition-transform active:scale-90 ${item.isSaved ? "text-yellow-400" : "text-white"}`}
          aria-label="Save"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={item.isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
          </svg>
        </button>
        <span className="text-white text-xs font-bold drop-shadow-md">
          {item.savesCount ?? 0}
        </span>
      </div>

      {/* Comment Button 💬 */}
      <div className="flex flex-col items-center gap-1">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white active:scale-90"
          aria-label="Comments"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </button>
        <span className="text-white text-xs font-bold drop-shadow-md">
          {item.commentsCount ?? 0}
        </span>
      </div>
    </div>
  );
};

export default ReelSidebar;