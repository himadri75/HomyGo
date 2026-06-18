import React, { useContext, useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  Star, 
  MapPin, 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  History, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  CheckCircle,
  XCircle,
  User,
  Coffee,
  ListFilter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

// Seed initial pending homestays if not present in localStorage
const INITIAL_PENDING = [
  {
    id: 1,
    title: 'The Himalayan Orchard Home',
    location: 'Mukteshwar, Uttarakhand, India',
    host: 'Anshu Rawat',
    host_email: 'anshu@himalayan.com',
    host_phone: '+91 98765 43210',
    base_price: 8100,
    discount_price: 5600,
    rating: 4.9,
    review_count: 42,
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
    created_at: '2026-06-18T10:30:00.000Z',
    capacity: { beds: 4, guests: 6, bedrooms: 3, bathrooms: 2 },
    features: ['Mountain View', 'Apple Orchard Walk', 'Heated Bedding', 'Fireplace'],
    offers: ['Free WiFi', 'Private Parking', 'Guided Trekking'],
    foods: ['Traditional Kumaoni Thali', 'Fresh Apple Jam', 'Organic Herbal Tea'],
    terms_and_conditions: 'No smoking inside bedrooms. Pets allowed on leash. Check-out by 11:00 AM.'
  },
  {
    id: 2,
    title: 'Beachside Paradise Villa',
    location: 'Calangute, Goa, India',
    host: 'Priya Singh',
    host_email: 'priya.singh@goabeach.com',
    host_phone: '+91 88765 12345',
    base_price: 6500,
    discount_price: 4800,
    rating: 4.7,
    review_count: 28,
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    created_at: '2026-06-17T14:15:00.000Z',
    capacity: { beds: 2, guests: 4, bedrooms: 2, bathrooms: 2 },
    features: ['Ocean Front', 'Private Balcony', 'Infinity Pool Access'],
    offers: ['Free Airport Shuttle', 'Welcome Drink', 'High-speed WiFi'],
    foods: ['Goan Fish Curry', 'Continental Breakfast', 'Tender Coconut Water'],
    terms_and_conditions: 'Quiet hours after 10:00 PM. Identification required at check-in. Swimwear mandatory for pool.'
  },
  {
    id: 3,
    title: 'Snow-capped Swiss Chalet',
    location: 'Manali, Himachal Pradesh, India',
    host: 'Vikram Thakur',
    host_email: 'vikram.manali@gmail.com',
    host_phone: '+91 70182 34567',
    base_price: 9500,
    discount_price: 7200,
    rating: 4.8,
    review_count: 15,
    category: 'snows',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800',
    created_at: '2026-06-19T02:00:00.000Z',
    capacity: { beds: 6, guests: 8, bedrooms: 4, bathrooms: 3 },
    features: ['Snow View', 'Ski-in Ski-out', 'Wooden Attic', 'Hot Tubs'],
    offers: ['Ski Equipment Rental', 'Free Breakfast', 'Bonfire Setup'],
    foods: ['Traditional Himachali Siddu', 'Hot Chocolate', 'Butter Tea'],
    terms_and_conditions: 'Check-in from 2 PM. Avoid loud music in balcony. Eco-friendly resort.'
  }
];

const ManageHomestays = () => {
  const { darkmode } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'history'
  
  // Data state synced with localStorage
  const [pendingList, setPendingList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Detail Modal State
  const [selectedHomestay, setSelectedHomestay] = useState(null);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedPending = localStorage.getItem('admin_pending_homestays');
    const savedHistory = localStorage.getItem('admin_history_homestays');

    if (savedPending) {
      setPendingList(JSON.parse(savedPending));
    } else {
      localStorage.setItem('admin_pending_homestays', JSON.stringify(INITIAL_PENDING));
      setPendingList(INITIAL_PENDING);
    }

    if (savedHistory) {
      setHistoryList(JSON.parse(savedHistory));
    } else {
      localStorage.setItem('admin_history_homestays', JSON.stringify([]));
      setHistoryList([]);
    }
  }, []);

  const saveToLocalStorage = (newPending, newHistory) => {
    localStorage.setItem('admin_pending_homestays', JSON.stringify(newPending));
    localStorage.setItem('admin_history_homestays', JSON.stringify(newHistory));
    setPendingList(newPending);
    setHistoryList(newHistory);
  };

  // Approval actions
  const handleApprove = (id) => {
    const target = pendingList.find(item => item.id === id);
    if (!target) return;

    const newPending = pendingList.filter(item => item.id !== id);
    const newHistory = [
      { ...target, status: 'APPROVED', actionDate: new Date().toISOString() },
      ...historyList
    ];

    saveToLocalStorage(newPending, newHistory);
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    toast.success(`"${target.title}" approved successfully!`);
    if (selectedHomestay?.id === id) setSelectedHomestay(null);
  };

  const handleReject = (id) => {
    const target = pendingList.find(item => item.id === id);
    if (!target) return;

    const newPending = pendingList.filter(item => item.id !== id);
    const newHistory = [
      { ...target, status: 'REJECTED', actionDate: new Date().toISOString() },
      ...historyList
    ];

    saveToLocalStorage(newPending, newHistory);
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    toast.error(`"${target.title}" rejected.`);
    if (selectedHomestay?.id === id) setSelectedHomestay(null);
  };

  // Bulk actions
  const handleBulkApprove = () => {
    if (selectedIds.length === 0) return;
    
    let approvedCount = 0;
    let newPending = [...pendingList];
    let newHistory = [...historyList];

    selectedIds.forEach(id => {
      const target = newPending.find(item => item.id === id);
      if (target) {
        newPending = newPending.filter(item => item.id !== id);
        newHistory = [
          { ...target, status: 'APPROVED', actionDate: new Date().toISOString() },
          ...newHistory
        ];
        approvedCount++;
      }
    });

    saveToLocalStorage(newPending, newHistory);
    setSelectedIds([]);
    toast.success(`Approved ${approvedCount} listings!`);
  };

  const handleBulkReject = () => {
    if (selectedIds.length === 0) return;
    
    let rejectedCount = 0;
    let newPending = [...pendingList];
    let newHistory = [...historyList];

    selectedIds.forEach(id => {
      const target = newPending.find(item => item.id === id);
      if (target) {
        newPending = newPending.filter(item => item.id !== id);
        newHistory = [
          { ...target, status: 'REJECTED', actionDate: new Date().toISOString() },
          ...newHistory
        ];
        rejectedCount++;
      }
    });

    saveToLocalStorage(newPending, newHistory);
    setSelectedIds([]);
    toast.error(`Rejected ${rejectedCount} listings.`);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const currentFilteredIds = filteredList(pendingList).map(item => item.id);
    const allSelected = currentFilteredIds.every(id => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !currentFilteredIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...currentFilteredIds])]);
    }
  };

  // Filter & Search helper
  const filteredList = (list) => {
    return list
      .filter(item => {
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.host.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (selectedSort === 'newest') return new Date(b.created_at) - new Date(a.created_at);
        if (selectedSort === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
        if (selectedSort === 'price-low') return (a.discount_price || a.base_price) - (b.discount_price || b.base_price);
        if (selectedSort === 'price-high') return (b.discount_price || b.base_price) - (a.discount_price || a.base_price);
        return 0;
      });
  };

  const currentDisplayList = activeTab === 'pending' ? filteredList(pendingList) : filteredList(historyList);

  return (
    <div className={`min-h-screen pt-1 pb-16 px-4 ${darkmode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-slate-800'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${darkmode ? 'text-white' : 'text-slate-900'}`}>
              Manage Homestays
            </h1>
            <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-slate-600'}`}>
              Review, approve or reject newly submitted listings and view moderation history.
            </p>
          </div>

          {/* Tab Selection buttons */}
          <div className={`flex p-1.5 rounded-xl border ${
            darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => { setActiveTab('pending'); setSelectedIds([]); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                activeTab === 'pending'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Clock size={16} />
              Pending
              {pendingList.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {pendingList.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('history'); setSelectedIds([]); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <History size={16} />
              History
            </button>
          </div>
        </div>

        {/* Toolbar & Filters Card */}
        <div className={`p-4 rounded-xl border mb-6 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4 ${
          darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {/* Search bar */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location or host..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                darkmode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-50 border-gray-300 text-slate-800'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Filter size={12} /> Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer ${
                  darkmode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-700'
                }`}
              >
                <option value="all">All Categories</option>
                <option value="mountains">Mountains</option>
                <option value="beach">Beach</option>
                <option value="snows">Snows</option>
                <option value="rivers">Rivers</option>
                <option value="deserts">Deserts</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <SlidersHorizontal size={12} /> Sort:
              </span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer ${
                  darkmode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-700'
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Panel (Only for Pending tab and when items are selected) */}
        {activeTab === 'pending' && selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 mb-6 animate-fadeIn">
            <span className="text-sm font-semibold text-blue-500">
              {selectedIds.length} listing{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleBulkApprove}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition"
              >
                <Check size={14} />
                Approve Selected
              </button>
              <button
                onClick={handleBulkReject}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition"
              >
                <X size={14} />
                Reject Selected
              </button>
            </div>
          </div>
        )}

        {/* Listings Grid / Table */}
        <div className={`rounded-xl border overflow-hidden shadow-md ${
          darkmode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {currentDisplayList.length === 0 ? (
            <div className="p-16 text-center">
              <Info size={40} className="mx-auto text-gray-400 mb-4 opacity-50" />
              <p className="font-semibold text-lg text-gray-500">
                {activeTab === 'pending' ? 'No pending homestays to review 🎉' : 'No moderation history found.'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try clearing search query or category filters.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              
              {/* Header Row (Only in list display for table alignments) */}
              <div className={`hidden md:flex items-center p-4 bg-gray-50 dark:bg-gray-900/30 text-xs font-bold tracking-wider text-gray-400 uppercase`}>
                {activeTab === 'pending' && (
                  <div className="w-10 flex justify-center">
                    <input
                      type="checkbox"
                      checked={currentDisplayList.length > 0 && currentDisplayList.every(item => selectedIds.includes(item.id))}
                      onChange={handleToggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                  </div>
                )}
                <div className="w-24">Image</div>
                <div className="flex-1 px-4">Homestay Details</div>
                <div className="w-40">Host</div>
                <div className="w-32">Price</div>
                <div className="w-24 text-center">Rating</div>
                <div className="w-28 text-center">{activeTab === 'pending' ? 'Category' : 'Status'}</div>
                <div className="w-36 text-right">Actions</div>
              </div>

              {/* Items Rows */}
              {currentDisplayList.map((homestay) => (
                <div
                  key={homestay.id}
                  className={`flex flex-col md:flex-row md:items-center p-4 md:p-5 transition ${
                    darkmode ? 'hover:bg-gray-750/30' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Checkbox (Pending Tab) */}
                  {activeTab === 'pending' && (
                    <div className="w-10 flex items-center justify-start md:justify-center mb-3 md:mb-0">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(homestay.id)}
                        onChange={() => handleToggleSelect(homestay.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Image */}
                  <div className="w-full md:w-24 h-32 md:h-16 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 mb-4 md:mb-0">
                    <img
                      src={homestay.image}
                      alt={homestay.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 px-0 md:px-4 mb-4 md:mb-0">
                    <h3 className={`font-bold text-base md:text-sm tracking-tight ${darkmode ? 'text-white' : 'text-slate-900'}`}>
                      {homestay.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />
                        {homestay.location}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-gray-400" />
                        {activeTab === 'pending' ? 'Added: ' : 'Reviewed: '}
                        {new Date(activeTab === 'pending' ? homestay.created_at : homestay.actionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="w-full md:w-40 text-xs mb-3 md:mb-0">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-blue-500/10 text-blue-500">
                        <User size={12} />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{homestay.host}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="w-full md:w-32 text-xs mb-3 md:mb-0 font-medium">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white font-bold">
                        ₹{homestay.discount_price || homestay.base_price}/night
                      </span>
                      {homestay.discount_price && (
                        <span className="text-[10px] text-gray-400 line-through">₹{homestay.base_price}</span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="w-full md:w-24 text-xs mb-3 md:mb-0 flex items-center md:justify-center gap-1">
                    <Star size={13} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{homestay.rating}</span>
                    <span className="text-gray-400 text-[10px]">({homestay.review_count})</span>
                  </div>

                  {/* Category / Status Column */}
                  <div className="w-full md:w-28 text-xs mb-4 md:mb-0 flex items-center md:justify-center">
                    {activeTab === 'pending' ? (
                      <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 capitalize">
                        {homestay.category}
                      </span>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center gap-1 ${
                        homestay.status === 'APPROVED' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400'
                      }`}>
                        {homestay.status === 'APPROVED' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                        {homestay.status}
                      </span>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="w-full md:w-36 flex items-center justify-end gap-2 text-xs">
                    <button
                      onClick={() => setSelectedHomestay(homestay)}
                      className={`flex-1 md:flex-none p-2 rounded-lg border text-center flex items-center justify-center gap-1 transition-all ${
                        darkmode 
                          ? 'border-gray-700 hover:bg-gray-750 text-gray-300' 
                          : 'border-gray-300 hover:bg-gray-100 text-slate-700'
                      }`}
                      title="View Details"
                    >
                      <Eye size={14} />
                      <span className="md:hidden">View</span>
                    </button>

                    {activeTab === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(homestay.id)}
                          className="flex-1 md:flex-none p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-1"
                          title="Approve Listing"
                        >
                          <Check size={14} />
                          <span className="md:hidden">Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(homestay.id)}
                          className="flex-1 md:flex-none p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-1"
                          title="Reject Listing"
                        >
                          <X size={14} />
                          <span className="md:hidden">Reject</span>
                        </button>
                      </>
                    ) : (
                      // Undo Action button for history
                      <button
                        onClick={() => {
                          const newHistory = historyList.filter(item => item.id !== homestay.id);
                          const newPending = [...pendingList, homestay].sort((a,b)=>a.id - b.id);
                          saveToLocalStorage(newPending, newHistory);
                          toast.success(`Listing "${homestay.title}" restored back to Pending list.`);
                        }}
                        className={`flex-1 md:flex-none px-2.5 py-2 rounded-lg border text-center text-[10px] font-bold transition-all ${
                          darkmode 
                            ? 'border-gray-700 hover:bg-gray-750 text-amber-400' 
                            : 'border-gray-300 hover:bg-gray-100 text-amber-700'
                        }`}
                      >
                        Re-evaluate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ----------------- Slide-Over Drawer Detail View Modal ----------------- */}
      {selectedHomestay && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Modal backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" 
              onClick={() => setSelectedHomestay(null)}
            ></div>

            {/* Centered content container */}
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center p-4">
              <div className={`pointer-events-auto w-full max-w-2xl rounded-2xl transform transition-all duration-300 ease-in-out shadow-2xl border ${
                darkmode ? 'bg-gray-950 border-gray-850 text-white border-gray-800' : 'bg-white border-gray-200 text-slate-800'
              } overflow-hidden max-h-[90vh] flex flex-col`}>
                
                {/* Scrollable modal body */}
                <div className="flex-1 overflow-y-auto pb-6">
                  
                  {/* Header Image section */}
                  <div className="relative h-64 shrink-0">
                    <img 
                      src={selectedHomestay.image} 
                      alt={selectedHomestay.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <button 
                      onClick={() => setSelectedHomestay(null)}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition"
                    >
                      <X size={18} />
                    </button>
                    
                    {/* Floating Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-600">
                        {selectedHomestay.category}
                      </span>
                      <h2 className="text-xl font-bold mt-2 leading-tight tracking-tight shadow-sm">
                        {selectedHomestay.title}
                      </h2>
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="flex-1 px-6 py-6 space-y-6">
                    
                    {/* Basic Info */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Location</p>
                        <p className="text-sm font-medium flex items-center gap-1.5 mt-1">
                          <MapPin size={14} className="text-red-500" />
                          {selectedHomestay.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Pricing</p>
                        <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                          ₹{selectedHomestay.discount_price || selectedHomestay.base_price}/night
                        </p>
                        {selectedHomestay.discount_price && (
                          <p className="text-xs text-gray-400 line-through">₹{selectedHomestay.base_price}</p>
                        )}
                      </div>
                    </div>

                    {/* Host Card */}
                    <div className={`p-4 rounded-xl border ${
                      darkmode ? 'bg-gray-900 border-gray-800' : 'bg-slate-50 border-gray-200'
                    }`}>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Host Contact Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-400 font-medium block">Name</span>
                          <span className="font-bold text-sm text-gray-800 dark:text-white">{selectedHomestay.host}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium block">Email Address</span>
                          <span className="font-medium text-gray-800 dark:text-white">{selectedHomestay.host_email}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-400 font-medium block">Phone Number</span>
                          <span className="font-medium text-gray-800 dark:text-white">{selectedHomestay.host_phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Capacity Specs */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Property Capacity</h4>
                      <div className="grid grid-cols-4 gap-3 text-center">
                        <div className={`p-3 rounded-lg border ${darkmode ? 'border-gray-800 bg-gray-900/50':'border-gray-200 bg-gray-50/50'}`}>
                          <span className="text-lg font-bold block">{selectedHomestay.capacity.guests}</span>
                          <span className="text-[10px] text-gray-400">Guests</span>
                        </div>
                        <div className={`p-3 rounded-lg border ${darkmode ? 'border-gray-800 bg-gray-900/50':'border-gray-200 bg-gray-50/50'}`}>
                          <span className="text-lg font-bold block">{selectedHomestay.capacity.bedrooms}</span>
                          <span className="text-[10px] text-gray-400">Bedrooms</span>
                        </div>
                        <div className={`p-3 rounded-lg border ${darkmode ? 'border-gray-800 bg-gray-900/50':'border-gray-200 bg-gray-50/50'}`}>
                          <span className="text-lg font-bold block">{selectedHomestay.capacity.beds}</span>
                          <span className="text-[10px] text-gray-400">Beds</span>
                        </div>
                        <div className={`p-3 rounded-lg border ${darkmode ? 'border-gray-800 bg-gray-900/50':'border-gray-200 bg-gray-50/50'}`}>
                          <span className="text-lg font-bold block">{selectedHomestay.capacity.bathrooms}</span>
                          <span className="text-[10px] text-gray-400">Baths</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities / Features */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">Features & Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedHomestay.features.map((feat, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                              darkmode 
                                ? 'bg-gray-900 border-gray-800 text-gray-300' 
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Food Details */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                        <Coffee size={14} className="text-amber-500" />
                        Food & Cuisine Offerings
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedHomestay.foods.map((food, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                              darkmode 
                                ? 'bg-gray-900 border-gray-800 text-gray-300' 
                                : 'bg-amber-50 border-amber-100 text-amber-800'
                            }`}
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Terms */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Terms & Conditions</h4>
                      <p className={`text-xs leading-relaxed p-4 rounded-xl border ${
                        darkmode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-slate-600'
                      }`}>
                        {selectedHomestay.terms_and_conditions}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Actions Drawer Footer */}
                <div className={`px-6 py-4 shrink-0 border-t ${
                  darkmode ? 'border-gray-850 bg-gray-950' : 'border-gray-100 bg-white'
                }`}>
                  {activeTab === 'pending' ? (
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApprove(selectedHomestay.id)}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        <Check size={18} />
                        Approve Listing
                      </button>
                      <button
                        onClick={() => handleReject(selectedHomestay.id)}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        <X size={18} />
                        Reject Listing
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className={`flex items-center gap-2 p-3 text-xs rounded-lg ${
                        selectedHomestay.status === 'APPROVED' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {selectedHomestay.status === 'APPROVED' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        <span>This listing was previously <strong>{selectedHomestay.status}</strong>.</span>
                      </div>
                      <button
                        onClick={() => setSelectedHomestay(null)}
                        className={`w-full py-2.5 rounded-lg border text-center text-xs font-bold transition ${
                          darkmode ? 'border-gray-850 hover:bg-gray-900' : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Close Details
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageHomestays;