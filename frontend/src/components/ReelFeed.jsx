import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReelSidebar from "./ReelSidebar";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 },
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {items.length === 0 ? (
        <div className="h-full flex items-center justify-center text-white">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        items.map((item) => (
          <section
            key={item._id}
            className="relative h-screen w-full snap-start overflow-hidden bg-black"
          >
            {/* Background Video 🎥 */}
            <video
              ref={(el) =>
                el
                  ? videoRefs.current.set(item._id, el)
                  : videoRefs.current.delete(item._id)
              }
              className="absolute inset-0 w-full h-full object-cover"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* Bottom Gradient Overlay 🌫️ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Sidebar Interactions ⚡ */}
            <ReelSidebar item={item} onLike={onLike} onSave={onSave} />

            {/* Bottom Content Info 📝 */}
            <div className="absolute bottom-20 left-0 right-16 p-6 flex flex-col gap-3 pointer-events-none">
              <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md pointer-events-auto">
                {item.description}
              </p>
              {item.foodPartner && (
                <Link
                  className="w-fit px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold shadow-lg pointer-events-auto transition-colors"
                  to={`/food-partner/${item.foodPartner}`}
                >
                  Visit store
                </Link>
              )}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default ReelFeed;