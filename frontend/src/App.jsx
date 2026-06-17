import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatButton from "./components/FloatingChatButton";
import toast, { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Homestays from "./pages/Homestays";
import ItineraryPage from "./pages/ItineraryPage";
import TourPlanPage from "./pages/TourPlanPage";
import TranslatorPage from "./pages/TranslatorPage";
import Chatbot from "./pages/Chatbot";
import { useContext, useEffect, useCallback } from "react";
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
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageHomestays from "./pages/admin/ManageHomestays";
import Host from "./pages/host/Host";
import HostDashboard from "./pages/host/HostDashboard";
import AddHomestay from "./pages/host/AddHomestay";

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

  const checkServerStatus = useCallback(async () => {
    const baseURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${baseURL}/health`);

    if (!response.ok) {
      throw new Error("Server not responding");
    }

    return response.json();
  }, []);

  const handleServerStatus = useCallback(() => {
    toast.promise(checkServerStatus(), {
      loading: "Checking server status...",
      success: "Server is up and running",
      error: "Server is currently down",
    });
  }, [checkServerStatus]);

  useEffect(() => {
    handleServerStatus();
  }, [handleServerStatus]);

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

          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-homestay" element={<ManageHomestays />} />
          </Route>

          <Route path="/host" element={<Host />}>
            <Route index element={<HostDashboard />} />
            <Route path="dashboard" element={<HostDashboard />} />
            <Route path="add-homestay" element={<AddHomestay />} />
          </Route>

        </Routes>
      </div>

      <Footer />
      <FloatingChatButton />

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
