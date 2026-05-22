import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatButton from "./components/FloatingChatButton";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Homestays from "./pages/Homestays";
import ItineraryPage from "./pages/ItineraryPage";
import TourPlanPage from "./pages/TourPlanPage";
import TranslatorPage from "./pages/TranslatorPage";
import Chatbot from "./pages/Chatbot";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import SimilarHomestays from "./pages/SimilarHomestays";
import ScrollToTop from "./components/ScrollToTop";
import SingleHomestay from "./pages/SingleHomestay";
import CulturalFeed from "./pages/CulturalFeed";
import UserProfilePage from "./pages/UserProfilePage";
import Features from "./pages/Features";
import AllWishlist from "./pages/AllWishlist";
import AllBookings from "./pages/AllBookings";
import SOS from "./pages/SOS";

const App = () => {
  const { fetchUserDetails, darkmode } = useContext(AppContext);

  useEffect(() => {
    fetchUserDetails();
  }, [])

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkmode]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <div className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/:state" element={<AuthPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/wishlist" element={<AllWishlist />} />
          <Route path="/user/bookings" element={<AllBookings />} />
          <Route path="/sos" element={<SOS />} />

          <Route path="/homestays" element={<Homestays />} />
          <Route path="/homestays/:category" element={<SimilarHomestays />} />
          <Route path="/homestays/:category/:id" element={<SingleHomestay />} />

          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/tour-plan" element={<TourPlanPage />} />
          <Route path="/translate" element={<TranslatorPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/cultural-feed" element={<CulturalFeed />} />

        </Routes>
      </div>

      <Footer />
      <FloatingChatButton />

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;


// {
//     "place_id": 250669378,
//     "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
//     "osm_type": "way",
//     "osm_id": 1040426266,
//     "lat": "22.6262690",
//     "lon": "88.3931690",
//     "class": "highway",
//     "type": "residential",
//     "place_rank": 26,
//     "importance": 0.05340673762111845,
//     "addresstype": "road",
//     "name": "",
//     "display_name": "Paikpara, Baranagar, Kolkata Metropolitan Area, Barrackpore, North 24 Parganas, West Bengal, 700077, India",
//     "address": {
//         "suburb": "Paikpara",
//         "city": "Baranagar",
//         "municipality": "Kolkata Metropolitan Area",
//         "county": "Barrackpore",
//         "state_district": "North 24 Parganas",
//         "state": "West Bengal",
//         "ISO3166-2-lvl4": "IN-WB",
//         "postcode": "700077",
//         "country": "India",
//         "country_code": "in"
//     },
//     "boundingbox": [
//         "22.6262690",
//         "22.6279756",
//         "88.3931690",
//         "88.3944216"
//     ]
// }