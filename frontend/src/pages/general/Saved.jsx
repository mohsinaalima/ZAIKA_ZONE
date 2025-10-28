import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/auth-shared.css';
import ReelFeed from '../../components/ReelFeed';

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
        setVideos(savedFoods);
      });
  }, []);

  const removeSaved = async (item) => {
    await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true });
    setVideos((prev) => prev.filter((v) => v._id !== item._id));
  };

  return (
    <main className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Saved Dishes</h1>
          <p className="auth-subtitle">All your favorite food videos in one place.</p>
        </header>
        <ReelFeed
          items={videos}
          onSave={removeSaved}
          emptyMessage="No saved videos yet."
        />
      </div>
    </main>
  );
};

export default Saved;
