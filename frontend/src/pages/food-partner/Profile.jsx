import React, { useEffect, useState } from 'react';
import '../../styles/auth-shared.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      });
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card profile-card">
        <header className="profile-header">
          <img
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60"
            alt={profile.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1 className="auth-title">{profile.name}</h1>
            <p className="auth-subtitle">{profile.address}</p>
            <p className="small-note">Contact: {profile.contactName} | {profile.phone}</p>
          </div>
        </header>

        <section className="video-gallery">
          <h2 className="auth-subtitle">Uploaded Dishes</h2>
          {videos.length === 0 ? (
            <p>No videos uploaded yet.</p>
          ) : (
            <div className="profile-video-grid">
              {videos.map((v) => (
                <video key={v._id} src={v.video} controls playsInline className="profile-video" />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
