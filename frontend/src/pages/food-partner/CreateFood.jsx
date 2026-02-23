import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CreateFood = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFileError("Please upload a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return setFileError("Please select a video.");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("mama", videoFile); // ✅ Matches backend name

    try {
      await axios.post("http://localhost:3000/api/food", formData, {
        withCredentials: true,
        // ✅ CRUCIAL: Must tell backend this is a file upload
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Switch back to the feed view automatically
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error uploading food:", error);
      setFileError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Upload New Reel</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300 ml-1">Video File</label>
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileChange}
            className="text-slate-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-blue-600 transition-all cursor-pointer"
          />
          {videoURL && (
            <video
              src={videoURL}
              className="w-full aspect-[9/16] object-cover rounded-xl mt-2 border border-white/10 shadow-lg"
              muted
              autoPlay
              loop
            />
          )}
          {fileError && (
            <p className="text-red-400 text-xs ml-1">{fileError}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 ml-1 font-medium uppercase tracking-wider">
            Dish Name
          </label>
          <input
            type="text"
            placeholder="e.g. Spicy Ramen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-brand-blue transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 ml-1 font-medium uppercase tracking-wider">
            Description
          </label>
          <textarea
            placeholder="Tell foodies about the taste..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-brand-blue h-24 resize-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !name || !videoFile}
          className="w-full bg-brand-blue hover:bg-blue-600 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading Reel...
            </span>
          ) : (
            "Share with Foodies 🚀"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateFood;