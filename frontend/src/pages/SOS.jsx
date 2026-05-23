import React, { useState, useContext } from 'react';
import {
  Phone,
  AlertTriangle,
  MapPin,
  Clock,
  Users,
  Shield,
  Heart,
  CheckCircle,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { NavLink } from 'react-router-dom';

const SOS = () => {
  const [sosTriggered, setSosTriggered] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, sendSOSmail } = useContext(AppContext);

  const getGPSLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0
        }
      );
    });
  };

  const getAddressFromCoords = async (lat, lon) => {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lon}&key=e4bf33e81fef41f6befaf8d661cbf246`
    );
    const data = await res.json();
    const geoAddress = data.results[0].components;
    const formattedAddress = `${geoAddress.suburb || ""}, ${geoAddress.city}, ${geoAddress.county}, ${geoAddress.state_district}, ${geoAddress.state}, ${geoAddress.postcode}, ${geoAddress.country}`;

    return formattedAddress;
  };

  const getIPFallbackLocation = async () => {
    const res = await fetch('https://ipapi.co/json/');
    return res.json();
  };

  const handleSOS = async () => {
    if (loading) return;

    setLoading(true);
    setSosTriggered(true);

    try {
      const pos = await getGPSLocation();

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // 2. Reverse geocode
      const geoAddress = await getAddressFromCoords(lat, lon);

      const payload = {
        userId: user.id,
        lat,
        lon,
        address: geoAddress || 'Unknown location',
        source: 'gps',
      };

      await sendSOSmail(payload);

    } catch (err) {
      console.warn('GPS failed, using IP fallback...', err);

      try {
        const ipData = await getIPFallbackLocation();

        const payload = {
          userId: user.id,
          lat: ipData.latitude,
          lon: ipData.longitude,
          address: `${ipData.city}, ${ipData.region}, ${ipData.country_name}`,
          source: 'ip',
        };

        await sendSOSmail(payload);

      } catch (fallbackErr) {
        console.error('Even IP fallback failed:', fallbackErr);
      }
    } finally {
      setLoading(false);

      // optional UI reset (you can remove if SOS should stay active)
      setTimeout(() => {
        setSosTriggered(false);
      }, 3000);
    }
  };

  const emergencyContacts = [
    {
      category: 'Police & Law Enforcement',
      icon: <Shield className="w-5 h-5" />,
      contacts: [
        { name: 'National Police Emergency', number: '100', state: 'All India', available: '24/7' },
        { name: 'Tourist Police Helpline', number: '1800-111-333', state: 'All India', available: '24/7' },
        { name: 'Women Helpline', number: '1091', state: 'All India', available: '24/7' },
        { name: 'Cyber Crime Cell', number: '1930', state: 'All India', available: '24/7' }
      ]
    },
    {
      category: 'Medical Emergency',
      icon: <Heart className="w-5 h-5" />,
      contacts: [
        { name: 'National Ambulance Service', number: '102', state: 'All India', available: '24/7' },
        { name: 'Emergency Medical Support', number: '108', state: 'All India', available: '24/7' },
        { name: 'Poison Control Center', number: '1800-180-1717', state: 'All India', available: '24/7' },
        { name: 'Mental Health Helpline', number: '1800-599-0019', state: 'All India', available: '24/7' }
      ]
    },
    {
      category: 'Disaster & Rescue',
      icon: <AlertTriangle className="w-5 h-5" />,
      contacts: [
        { name: 'National Disaster Helpline', number: '1079', state: 'All India', available: '24/7' },
        { name: 'Fire & Rescue Services', number: '101', state: 'All India', available: '24/7' },
        { name: 'Railway Accident Helpline', number: '1072', state: 'All India', available: '24/7' },
        { name: 'Road Accident Emergency', number: '9840700700', state: 'TN', available: '24/7' }
      ]
    },
    {
      category: 'Travel & Tourism Support',
      icon: <MapPin className="w-5 h-5" />,
      contacts: [
        { name: 'HomyGo Emergency Support', number: '+91-75850-46672', state: 'All India', available: '24/7' },
        { name: 'Indian Ministry of Tourism', number: '1363', state: 'All India', available: '24/7' },
        { name: 'Foreigners Regional Registration', number: '1800-118-111', state: 'All India', available: '24/7' },
        { name: 'Embassy Assistance', number: '011-2419-8162', state: 'Delhi', available: '24/7' }
      ]
    }
  ];

  const emergencyChecklist = [
    { item: 'Emergency contacts saved', icon: <Phone className="w-4 h-4" /> },
    { item: 'Location shared with family', icon: <MapPin className="w-4 h-4" /> },
    { item: 'Travel documents backed up', icon: <AlertCircle className="w-4 h-4" /> },
    { item: 'Insurance details available', icon: <Shield className="w-4 h-4" /> },
    { item: 'Phone battery at 50%+', icon: <Clock className="w-4 h-4" /> },
    { item: 'Local helplines saved', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-blue-50 dark:bg-gray-950 min-h-screen">

      {/* Alert Banner */}
      <div className="bg-red-600 dark:bg-red-700 text-white py-3 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-xs md:text-sm font-semibold">
              In case of emergency, call your local emergency number immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {(!user) ?
          <div className="flex flex-col items-center mb-12">

            {/* Disabled SOS */}
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-red-200 dark:bg-red-950/40 border-4 border-red-300 dark:border-red-900 text-red-500 dark:text-red-700 font-bold text-5xl opacity-60 cursor-not-allowed select-none">
              SOS
            </div>

            <p className="text-sm text-blue-700 dark:text-blue-400 mt-4 text-center max-w-xs">
              Login required to activate emergency SOS alerts
            </p>

            <div className="flex gap-3 mt-5">

              <NavLink
                to="/auth/signup"
                className="px-5 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition text-sm rounded-lg"
              >
                Create Account
              </NavLink>

              <NavLink
                to="/auth/login"
                className="px-5 py-2 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-gray-200 border border-blue-200 dark:border-gray-700 font-medium hover:bg-blue-200 dark:hover:bg-gray-700 transition text-sm rounded-lg"
              >
                Login
              </NavLink>

            </div>
          </div>
          :
          <div className="flex flex-col items-center mb-12">

            <button
              onClick={handleSOS}
              disabled={loading}
              className={`w-44 h-44 md:w-56 md:h-56 rounded-full flex items-center justify-center text-white font-bold text-5xl transition-all duration-300 shadow-xl ${loading
                  ? 'bg-yellow-500 dark:bg-yellow-600'
                  : sosTriggered
                    ? 'bg-green-600 dark:bg-green-700'
                    : 'bg-red-600 dark:bg-red-700 animate-pulse'
                }`
              }
            >
              {loading ? '...' : sosTriggered ? 'SENT' : 'SOS'}
            </button>

            <p className="text-sm text-blue-700 dark:text-blue-400 mt-3 text-center max-w-xs">
              Sends your live location to email
            </p>
          </div>
        }

        {/* Checklist */}
        <div className="mb-12 bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md rounded-2xl p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-blue-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Before You Travel - Checklist
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl"
              >
                <div className="w-5 h-5 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>

                <span className="text-xs md:text-sm text-blue-900 dark:text-gray-100 font-medium">
                  {item.item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-lg md:text-xl font-bold text-blue-900 dark:text-gray-100 mb-6">
            Emergency Contacts by Category
          </h2>

          <div className="space-y-4">
            {emergencyContacts.map((category, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md rounded-2xl overflow-hidden"
              >

                {/* Category Header */}
                <button
                  onClick={() =>
                    setExpandedCategory(expandedCategory === idx ? null : idx)
                  }
                  className="w-full px-4 md:px-6 py-4 bg-blue-100 dark:bg-gray-800 border-b border-blue-200 dark:border-gray-700 flex items-center justify-between hover:bg-blue-200 dark:hover:bg-gray-700 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {category.icon}
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-blue-900 dark:text-gray-100">
                      {category.category}
                    </h3>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform ${expandedCategory === idx ? 'rotate-90' : ''
                      }`
                    }
                  />
                </button>

                {/* Contacts List */}
                {expandedCategory === idx && (
                  <div className="divide-y divide-blue-200 dark:divide-gray-700">
                    {category.contacts.map((contact, cidx) => (
                      <div key={cidx} className="p-4 md:p-6">

                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs md:text-sm font-bold text-blue-900 dark:text-gray-100">
                              {contact.name}
                            </p>

                            <p className="text-xs text-blue-700 dark:text-gray-400 mt-1">
                              {contact.state} • {contact.available}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />

                          <a
                            href={`tel:${contact.number}`}
                            className="text-sm md:text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                          >
                            {contact.number}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-100 dark:bg-gray-900 border border-blue-300 dark:border-gray-800 shadow-md rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-base md:text-lg font-bold text-blue-900 dark:text-gray-100 mb-4">
            Important Information
          </h2>

          <ul className="space-y-3 text-xs md:text-sm text-blue-900 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
              <span>Always keep your passport and important documents in a secure location</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
              <span>Register your travel with your embassy before departure</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
              <span>Keep digital copies of all important documents stored securely in the cloud</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
              <span>Inform someone at home about your travel dates and itinerary</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
              <span>Purchase comprehensive travel insurance before your trip</span>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 shadow-md rounded-2xl p-6 md:p-8">
          <h2 className="text-base md:text-lg font-bold text-blue-900 dark:text-gray-100 mb-4">
            Need Assistance?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                <Phone className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-1">Call Support</p>
                <p className="text-sm md:text-base font-bold text-blue-900 dark:text-gray-100">+91-75850 46672</p>
                <p className="text-xs text-blue-800 dark:text-gray-400 mt-1">Available 24/7</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-1">Emergency Chat</p>
                <p className="text-sm md:text-base font-bold text-blue-900 dark:text-gray-100">Connect with HomyGo</p>
                <p className="text-xs text-blue-800 dark:text-gray-400 mt-1">Immediate assistance</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SOS;
