import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [darkmode, setDarkmode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [user, setUser] = useState(null);
  const [homestays, setHomestays] = useState(null);
  const [categoryHomestays, setCategoryHomestays] = useState(null);
  const [singleHomestay, setSingleHomestay] = useState(null);
  const [culturalFeeds, setCulturalFeeds] = useState([]);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState({
    createAccount: false,
    login: false,
    bookingLoading: false,
    emergencyDetailsLoading: false
  })

  const toggleDarkmode = () => {
    setDarkmode(prev => !prev);
  }

  const createUser = async (name, email, password, gender, dob) => {
    setLoading(prev => ({ ...prev, createAccount: true }));
    try {
      const response = await axiosInstance.post("/api/v1/users/register", {
        name, email, password, gender, dob
      })
      const data = response?.data;

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      navigate("/auth/login")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(prev => ({ ...prev, createAccount: false }));
    }
  }

  const login = async (email, password) => {
    setLoading(prev => ({ ...prev, login: true }));
    try {
      const response = await axiosInstance.post("/api/v1/users/login", {
        email, password
      })
      const data = response?.data;

      if (!data.success) {
        toast.error(response.message);
        return;
      }

      toast.success(data.message);

      setUser(data.user);
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to login.");
    } finally {
      setLoading(prev => ({ ...prev, login: false }));
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/users`);
      const data = response?.data;
      setUser(data.user);
    } catch (error) {
      console.error("Unauthorized. ", error);
    }
  }

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/users/logout");
      if (res.data?.success) {
        toast.success(res.data.message);
        navigate("/");
      }

      toast.success("Logout failed.");
    } catch (error) {
      console.error("Logout ERROR: ", error);
    }
  }

  const fetchHomestays = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/homestays?limit=4");
      const data = response?.data;

      if (data.success) {
        const resdata = {
          mountains: data.homestays.mountains,
          snows: data.homestays.snows,
          rivers: data.homestays.rivers,
          deserts: data.homestays.deserts,
          beaches: data.homestays.beaches
        }
        setHomestays(resdata);
      }

    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to fetch homestays.")
    }
  }

  const updateEmergencyDetails = async (payload) => {
    setLoading(prev => ({ ...prev, emergencyDetailsLoading: true }));

    const { email, phone } = payload;
    try {
      const response = await axiosInstance.patch("/api/v1/users/emergency", {
        email,
        phone
      })

      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        await fetchUserDetails();
        return;
      }

      toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to Update details.");
    } finally {
      setLoading(prev => ({ ...prev, emergencyDetailsLoading: false }));
    }
  }

  const fetchHomestaysByCategory = async (category) => {
    try {
      const response = await axiosInstance.get(`/api/v1/homestays/category/${category}?limit=10`);
      const data = response?.data;

      if (data.success) {
        setCategoryHomestays(data.homestays);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to fetch homestays.");
    }
  }

  const fetchHomestaysByCategoryAndId = async (category, id) => {
    try {
      const response = await axiosInstance.get(`/api/v1/homestays/category/${category}/${id}`);
      const data = response?.data;

      if (data.success) {
        setSingleHomestay(data.homestay);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to fetch homestays.");
    }
  }

  const fetchCulturalFeeds = async (page = 1, size = 9) => {
    try {
      const response = await axiosInstance.get(`/api/v1/feeds?page=${page}&size=${size}`);
      const data = response?.data;

      if (data.success) {
        if (data.feeds.length === 0) return false;
        setCulturalFeeds(prev => [...prev, ...data.feeds]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Failed to fetch feeds."
      );
    }

    return true;
  };

  const addToWishlist = async (homestayId) => {
    try {
      const response = await axiosInstance.post(`/api/v1/users/${homestayId}/wishlist`);
      const data = response?.data;
      if (data.success) {
        return { success: true, message: data.message };
      }
      return { success: false, message: null };
    } catch (error) {
      console.error(error);
      return { success: false, message: error?.response?.data?.message || "Failed to fetch feeds." };
    }
  }

  const checkWishlist = async (homestayId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/${homestayId}/wishlist`);
      const data = response?.data;
      if (data.present) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  const removeFromWishlist = async (homestayId) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/users/${homestayId}/wishlist`);
      const data = response?.data;

      if (!data.success) {
        toast.error(data.message);
        return { success: false };
      }
      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create account.");
      return { success: false }
    }
  }

  const getWishlist = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/wishlist`);
      const data = response?.data;
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const createBooking = async (homestayId, start, end) => {
    try {
      const response = await axiosInstance.post("/api/v1/bookings", {
        homestayId,
        start_date: start,
        end_date: end
      })

      const data = response?.data;

      if (response.status === 201) {
        return { success: true, message: data.message }
      }

    } catch (error) {
      console.error(error);
      return { success: false, message: error?.response?.data?.message || "Failed to book homestay." }
    }

  }

  const getAllBookings = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/bookings`);
      const data = response?.data;

      if (response.status === 200) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.patch(`/api/v1/bookings/${bookingId}/cancel`);
      const data = response?.data;

      if (response.status === 200) {
        toast.success(data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  }

  const sendSOSmail = async (payload) => {
    const { lat, lon, address, source } = payload;

    try {
      const response = await axiosInstance.post("/api/v1/users/sos", {
        lat, lon, address, source
      });

      const data = response?.data;

      if (data.success) {
        toast.success(data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to send SOS.")
    }
  }

  const values = {
    user,
    homestays,
    categoryHomestays,
    singleHomestay,
    culturalFeeds,
    page,
    wishlist,
    loading,
    bookings,
    darkmode,
    toggleDarkmode,
    createUser,
    login,
    fetchUserDetails,
    updateEmergencyDetails,
    logout,
    fetchHomestays,
    fetchHomestaysByCategory,
    fetchHomestaysByCategoryAndId,
    fetchCulturalFeeds,
    addToWishlist,
    removeFromWishlist,
    checkWishlist,
    getWishlist,
    createBooking,
    getAllBookings,
    cancelBooking,
    sendSOSmail
  }

  return <AppContext.Provider value={values}>
    {children}
  </AppContext.Provider>
}

export default AppContextProvider;
