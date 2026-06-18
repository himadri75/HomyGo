import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  MapPin,
  User,
  Calendar,
  Heart,
  Volume2,
  VolumeX,
  Share2,
} from "lucide-react";

const SingleCulturalFeed = () => {
  const { id } = useParams();
  const { fetchFeedById, singleFeed } = useContext(AppContext);

  const [muted, setMuted] = useState(true);

  useEffect(() => {
    fetchFeedById(id);
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!singleFeed) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-50 dark:bg-gray-900">
        <p className="text-blue-900 dark:text-white">
          Loading article...
        </p>
      </div>
    );
  }

  const location = `${singleFeed.city}${
    singleFeed.district && singleFeed.district !== "_"
      ? `, ${singleFeed.district}`
      : ""
  }, ${singleFeed.state}`;

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Hero Image */}
        <div className="overflow-hidden rounded-xl shadow-lg mb-8">
          <img
            src={singleFeed.image_url}
            alt={singleFeed.title}
            className="w-full h-112.5 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-5">
          {singleFeed.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-5 mb-5 text-sm text-blue-700 dark:text-gray-300">

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {location}
          </div>

          <div className="flex items-center gap-2">
            <User size={16} />
            {singleFeed.author_name}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDate(singleFeed.created_at)}
          </div>

          <div className="flex items-center gap-2">
            <Heart size={16} className="text-red-500" />
            {singleFeed.likes}
          </div>

        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {singleFeed.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Video */}
        {singleFeed.video_id && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-10">

            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${singleFeed.video_id}?autoplay=1&mute=${
                  muted ? 1 : 0
                }&rel=0`}
                title={singleFeed.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <button
              onClick={() => setMuted(!muted)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-gray-800 rounded-lg text-blue-700 dark:text-gray-200"
            >
              {muted ? (
                <>
                  <VolumeX size={18} />
                  Unmute
                </>
              ) : (
                <>
                  <Volume2 size={18} />
                  Mute
                </>
              )}
            </button>

          </div>
        )}

        {/* Blog Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-6">
            About This Place
          </h2>

          <div className="space-y-6 text-lg leading-9 text-gray-700 dark:text-gray-300">
            {singleFeed.about
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex gap-4">

          <button className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
            <Heart size={18} />
            Like
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg">
            <Share2 size={18} />
            Share
          </button>

        </div>

      </div>
    </div>
  );
};

export default SingleCulturalFeed;