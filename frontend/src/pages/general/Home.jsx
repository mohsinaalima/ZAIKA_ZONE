import React, { useEffect, useState } from "react";
import axios from "axios";
import ReelFeed from "../../components/ReelFeed";
import CreateFood from "../food-partner/CreateFood";
import LogoutButton from "../../components/LogoutBotton";

const Home = ({ user, onLogoutSuccess }) => {
  const [videos, setVideos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => setVideos(response.data.foodItems))
      .catch(() => {});
  }, [isUploading]);

  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center">
      <div className="w-full max-w-lg bg-black/60 backdrop-blur-xl p-4 flex justify-between items-center border-b border-white/10 z-50 sticky top-0">
        <h2 className="text-xl font-black text-white tracking-tight">
          ZAIKA <span className="text-brand-blue">ZONE</span> 🍕
        </h2>

        <div className="flex items-center gap-4">
          {/* ✅ Integrated Logout Button */}
          <LogoutButton role={user?.role} onLogoutSuccess={onLogoutSuccess} />

          {user?.role === "partner" && (
            <button
              onClick={() => setIsUploading(!isUploading)}
              className="bg-brand-blue hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
            >
              {isUploading ? "Feed" : "Post +"}
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-lg h-[calc(100vh-68px)] relative shadow-2xl overflow-hidden bg-black">
        {isUploading ? (
          <div className="p-4 h-full overflow-y-auto">
            <CreateFood onSuccess={() => setIsUploading(false)} />
          </div>
        ) : (
          <ReelFeed items={videos} emptyMessage="No videos available yet." />
        )}
      </div>
    </main>
  );
};

export default Home;