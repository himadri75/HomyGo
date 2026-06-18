import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Star, MapPin, Users, Wifi, Heart, Share2, ChevronLeft, ChevronRight, Mail, Phone, Cookie } from 'lucide-react';
import toast from 'react-hot-toast';
import CulturalFeedCard from '../components/CulturalFeedCard';

const SingleHomestay = () => {
  const { category, id } = useParams();
  const { singleHomestay, fetchHomestaysByCategoryAndId, addToWishlist, removeFromWishlist, checkWishlist, user, createBooking, similarFeeds, fetchSimilarFeedsByLocation } = useContext(AppContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // setLoading(prev => ({...prev, bookingLoading: false}))

  useEffect(() => {
    fetchHomestaysByCategoryAndId(category, id);

    if (user) {
      (async () => {
        const res = await checkWishlist(user.id, id);
        if (res.success) {
          setIsLiked(true);
        }
      })();
    }
  }, [category, id, user])

  useEffect(() => {
    if (singleHomestay) {
      fetchSimilarFeedsByLocation(singleHomestay.city, singleHomestay.district, singleHomestay.state, singleHomestay.country);
    }

  }, [singleHomestay]);

  if (!singleHomestay) {
    return (
      <div className="bg-blue-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-blue-900 dark:text-gray-200 text-base">
          Loading homestay details...
        </p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % singleHomestay.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + singleHomestay.images.length) % singleHomestay.images.length);
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login or create account.")
      return;
    }

    if (isLiked) {
      const res = await removeFromWishlist(id);
      if (res.success) {
        setIsLiked(false);
        toast.success('Removed from wishlist');
        return;
      }
    } else {
      const res = await addToWishlist(user.id, id);
      if (res.success) {
        setIsLiked(true);
        toast.success('Added to wishlist');
        return;
      }
    }
  };

  const handleShare = () => {
    toast.success('Homestay link copied to clipboard!');
  };

  const handleBooking = async (start, end) => {
    setLoading(true);
    if (!start || !end) {
      toast.error("Please select both dates");
      setLoading(false);
      return;
    }

    if (new Date(end) <= new Date(start)) {
      toast.error("Check-out must be after check-in");
      setLoading(false);
      return;
    }

    const res = await createBooking(id, start, end);
    if (res.success) {
      toast.success(res.message);
      setLoading(false);
      return;
    }

    toast.error(res.message);
    setLoading(false);
  };

  const cardClass = "bg-white dark:bg-gray-900 p-3 border border-blue-200 dark:border-gray-800 shadow-sm dark:shadow-black/20 mb-4 rounded-lg transition-colors duration-300";

  const titleClass = "text-sm font-semibold text-blue-900 dark:text-white mb-2";

  return (
    <div className="bg-blue-50 dark:bg-linear-to-b dark:from-gray-950 dark:to-gray-900 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">

        {/* Image Gallery */}
        <div className="mb-10">

          {/* Main Image */}
          <div className="relative h-96 bg-white dark:bg-gray-900 overflow-hidden border border-blue-200 dark:border-gray-800 shadow-lg dark:shadow-black/30 transition-colors duration-300">

            <img
              src={singleHomestay.images[currentImageIndex]}
              alt={singleHomestay.title}
              className="w-full h-full object-cover"
            />

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 text-blue-600 dark:text-blue-300 p-2 shadow-md transition rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 text-blue-600 dark:text-blue-300 p-2 shadow-md transition rounded-full backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-blue-900/80 dark:bg-gray-800/80 text-white dark:text-gray-200 px-3 py-1 text-xs rounded-md backdrop-blur-sm">
              {currentImageIndex + 1} / {singleHomestay.images.length}
            </div>

          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

            {singleHomestay.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumbnail-${idx}`}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-20 object-cover cursor-pointer border-2 transition rounded-md
          ${idx === currentImageIndex
                    ? "border-blue-600 dark:border-blue-400"
                    : "border-blue-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                  }`}
              />
            ))}

          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Details */}
          <div className="lg:col-span-2">

            {/* Title & Rating */}
            <div className="bg-white dark:bg-gray-900 p-6 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/30 mb-6 transition-colors duration-300">

              <div className="flex justify-between items-start mb-3">

                <div>

                  <h1 className="text-2xl font-bold text-blue-900 dark:text-white mb-2 transition">
                    {singleHomestay.title}
                  </h1>

                  <div className="flex items-center text-blue-600 dark:text-gray-300 gap-2">

                    <MapPin className="w-4 h-4 text-blue-600 dark:text-gray-400" />

                    <p className="text-sm text-blue-800 dark:text-gray-400">
                      {singleHomestay.location}
                    </p>

                  </div>

                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">

                  <button
                    onClick={handleLike}
                    className={`p-2 transition rounded-md ${isLiked
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isLiked ? "currentColor" : "none"}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-gray-700 transition rounded-md"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                </div>

              </div>

              {/* Rating & Reviews */}
              <div className="flex flex-col gap-3 pt-4 border-t border-blue-100 dark:border-gray-800">

                {/* Stars */}
                <div className="flex items-center gap-2 flex-wrap">

                  <div className="flex items-center text-yellow-500">

                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={
                          i < Math.floor(singleHomestay.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}

                  </div>

                  <span className="font-bold text-blue-900 dark:text-white text-base">
                    {singleHomestay.rating}
                  </span>

                  <span className="text-blue-600 dark:text-gray-400 text-sm">
                    ({singleHomestay.review_count} reviews)
                  </span>

                </div>

                {/* Likes & Shares */}
                <div className="flex gap-4 text-blue-700 dark:text-gray-400 text-sm flex-wrap">

                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-xs">{singleHomestay.likes} likes</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-xs">{singleHomestay.shares} shares</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Host Information */}
            <div className="bg-white dark:bg-gray-900 p-6 border border-blue-200 dark:border-gray-800 shadow-md dark:shadow-black/30 mb-6 transition-colors duration-300">

              <h2 className="text-lg font-bold text-blue-900 dark:text-white mb-4">
                Meet Your Host
              </h2>

              <div className="flex items-start justify-between">

                {/* Host Details */}
                <div>

                  <p className="text-base font-semibold text-blue-900 dark:text-gray-100 mb-3">
                    {singleHomestay.host}
                  </p>

                  {/* Email */}
                  <div className="flex items-center gap-2 text-blue-600 dark:text-gray-300 mb-2 text-sm">

                    <Mail className="w-4 h-4 text-blue-600 dark:text-gray-400" />

                    <a
                      href={`mailto:${singleHomestay.host_email}`}
                      className="hover:text-blue-800 dark:hover:text-blue-400 underline transition"
                    >
                      {singleHomestay.host_email}
                    </a>

                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 text-blue-600 dark:text-gray-300 text-sm">

                    <Phone className="w-4 h-4 text-blue-600 dark:text-gray-400" />

                    <a
                      href={`tel:${singleHomestay.host_phone}`}
                      className="hover:text-blue-800 dark:hover:text-blue-400 underline transition"
                    >
                      {singleHomestay.host_phone}
                    </a>

                  </div>

                </div>

                {/* Host Icon */}
                <div className="bg-blue-100 dark:bg-gray-800 w-16 h-16 flex items-center justify-center rounded-xl shadow-sm">

                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-300" />

                </div>

              </div>

            </div>

            <div className={cardClass}>
              <h2 className={titleClass}>Features</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {singleHomestay.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded"
                  >
                    <div className="w-4 h-4 bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-[10px] rounded-sm">
                      ✓
                    </div>

                    <p className="text-blue-900 dark:text-gray-200 text-xs leading-tight">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <h2 className={titleClass}>What's Included</h2>

              <div className="grid grid-cols-2 gap-2">
                {singleHomestay.offers.map((offer, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded"
                  >
                    <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                    <p className="text-blue-900 dark:text-gray-200 text-xs leading-tight">
                      {offer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <h2 className={titleClass}>Local Cuisine & Specialties</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {singleHomestay.foods.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded"
                  >
                    <p className="text-blue-900 dark:text-gray-200 text-xs font-medium flex gap-2">
                      <Cookie className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      {food}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <h2 className={titleClass}>Property Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

                {[
                  { label: "Bedrooms", value: singleHomestay.capacity.bedrooms },
                  { label: "Beds", value: singleHomestay.capacity.beds },
                  { label: "Bathrooms", value: singleHomestay.capacity.bathrooms },
                  { label: "Max Guests", value: singleHomestay.capacity.guests }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50 dark:bg-gray-800 p-2 border border-blue-200 dark:border-gray-700 text-center rounded"
                  >
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {item.value}
                    </p>
                    <p className="text-blue-900 dark:text-gray-300 text-[11px]">
                      {item.label}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            <div className={cardClass}>
              <h2 className={titleClass}>Guest Reviews</h2>

              <div className="space-y-2">
                {singleHomestay.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded"
                  >
                    <div className="flex gap-1 mb-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-blue-900 dark:text-gray-200 text-xs italic leading-snug">
                      "{review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <h2 className={titleClass}>Terms & Conditions</h2>

              <p className="text-blue-800 dark:text-gray-300 text-xs leading-relaxed">
                {singleHomestay.terms_and_conditions}
              </p>
            </div>

          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">

            <div className="bg-white dark:bg-gray-900 p-6 border border-blue-200 dark:border-gray-800 shadow-lg dark:shadow-black/30 sticky top-24 transition-colors duration-300">

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-blue-200 dark:border-gray-800">

                <p className="text-blue-600 dark:text-gray-400 text-xs mb-1 uppercase font-semibold">
                  Starting from
                </p>

                <div className="flex items-baseline gap-2 mb-2">

                  <span className="text-xs text-blue-500 dark:text-gray-500 line-through">
                    ₹{singleHomestay.base_price}
                  </span>

                  <span className="text-3xl font-bold text-blue-900 dark:text-white">
                    ₹{singleHomestay.discount_price}
                  </span>

                </div>

                <p className="text-blue-600 dark:text-gray-400 text-xs">
                  per night
                </p>

                <div className="mt-3 bg-green-50 dark:bg-green-900/20 p-2 border border-green-200 dark:border-green-900/40 rounded">

                  <p className="text-green-700 dark:text-green-300 font-semibold text-xs">
                    Save ₹{singleHomestay.base_price - singleHomestay.discount_price} on base price
                  </p>

                </div>

              </div>

              {/* Booking Inputs */}
              <div className="space-y-3 mb-6">

                {/* Check-in */}
                <div className="p-3 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded">

                  <label className="text-xs text-blue-600 dark:text-gray-400 font-semibold uppercase block mb-1">
                    Check-in
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-blue-900 dark:text-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                  />

                </div>

                {/* Check-out */}
                <div className="p-3 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded">

                  <label className="text-xs text-blue-600 dark:text-gray-400 font-semibold uppercase block mb-1">
                    Check-out
                  </label>

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    className="w-full p-2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-blue-900 dark:text-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                  />

                </div>

              </div>

              {/* Book Button */}
              <button
                onClick={() => handleBooking(startDate, endDate)}
                disabled={!startDate || !endDate || loading}
                className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white font-bold py-2 px-6 transition shadow-md mb-4 text-sm rounded disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Homestay Now"}
              </button>

              {/* Trust Badge */}
              <div className="p-3 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 text-center rounded">

                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">
                  ✓ Verified Homestay
                </p>

                <p className="text-xs text-blue-800 dark:text-gray-400">
                  Safe & secure booking
                </p>

              </div>

            </div>

          </div>
        </div>

        {similarFeeds && similarFeeds.length > 0 && (
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-2">
                Similar Cultural Feeds
              </h2>
              <p className="text-sm text-blue-700 dark:text-gray-300">
                Stories and traditions from the same area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarFeeds.map((feed) => (
                <CulturalFeedCard key={feed.id} feed={feed} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default SingleHomestay;
