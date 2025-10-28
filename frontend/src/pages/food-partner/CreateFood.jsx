import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/auth-shared.css'; // ✅ reuse same card styling
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return setFileError('');
    if (!file.type.startsWith('video/')) return setFileError('Please upload a valid video file.');
    setFileError('');
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return setFileError('Please select a video.');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('mama', videoFile); // as per backend naming

    try {
      const response = await axios.post('http://localhost:3000/api/food', formData, { withCredentials: true });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error uploading food:', error);
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="create-food-title">
        <header>
          <h1 id="create-food-title" className="auth-title">Upload Food Video</h1>
          <p className="auth-subtitle">Share your dish with a short video, title, and description.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="foodVideo">Food Video</label>
            <input
              id="foodVideo"
              type="file"
              ref={fileInputRef}
              accept="video/*"
              onChange={handleFileChange}
              required
            />
            {fileError && <p className="error-text">{fileError}</p>}
            {videoURL && (
              <video
                src={videoURL}
                controls
                style={{ width: '100%', borderRadius: '0.5rem', marginTop: '10px' }}
              />
            )}
          </div>

          <div className="field-group">
            <label htmlFor="name">Dish Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="auth-submit" type="submit" disabled={isDisabled}>Save Food</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
