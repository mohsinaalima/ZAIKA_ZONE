import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/auth-shared.css';
import ReelFeed from '../../components/ReelFeed';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => setVideos(response.data.foodItems))
      .catch(() => {});
  }, []);

  async function likeVideo(item) {
    const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true });
    if (response.data.like) {
      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v));
    } else {
      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v));
    }
  }

  async function saveVideo(item) {
    const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true });
    if (response.data.save) {
      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v));
    } else {
      setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v));
    }
  }

  return (
    <main className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Food Feed</h1>
          <p className="auth-subtitle">Discover mouthwatering dishes shared by our food partners.</p>
        </header>
        <ReelFeed
          items={videos}
          onLike={likeVideo}
          onSave={saveVideo}
          emptyMessage="No videos available yet."
        />
      </div>
    </main>
  );
};

export default Home;
