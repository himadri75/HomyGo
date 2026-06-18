import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  FileText, 
  Building2, 
  AlertCircle, 
  Edit3, 
  Lock,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const HostDashboard = () => {
  const { darkmode, hostVerification, verifyHost } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    hostType: 'head', // 'head' = Homestay Head, 'agency' = Agency
    name: '',
    email: '',
    phone: '',
    aadhaar: '',
    pan: '',
    bankAccount: '',
    bankName: '',
    ifsc: '',
  });

  // Load verified data if exists
  useEffect(() => {
    if (hostVerification) {
      setFormData(hostVerification);
    }
  }, [hostVerification, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Auto-uppercase PAN and IFSC for standard compliance
    let processedValue = value;
    if (name === 'pan' || name === 'ifsc') {
      processedValue = value.toUpperCase();
    }
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSelectHostType = (type) => {
    setFormData(prev => ({
      ...prev,
      hostType: type
    }));
  };

  const validateForm = () => {
    const { name, email, phone, aadhaar, pan, bankAccount, bankName, ifsc } = formData;

    if (!name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/[\s-]/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!aadhaar.trim() || !/^\d{12}$/.test(aadhaar.replace(/[\s-]/g, ''))) {
      toast.error('Aadhaar number must be exactly 12 digits');
      return false;
    }
    if (!pan.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.trim())) {
      toast.error('Please enter a valid PAN Card number (e.g., ABCDE1234F)');
      return false;
    }
    if (!bankAccount.trim() || !/^\d{9,18}$/.test(bankAccount.trim())) {
      toast.error('Bank account number must be between 9 and 18 digits');
      return false;
    }
    if (!bankName.trim()) {
      toast.error('Please enter your bank name');
      return false;
    }
    if (!ifsc.trim() || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim())) {
      toast.error('Please enter a valid IFSC Code (e.g., SBIN0001234)');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    verifyHost(formData);
    setIsEditing(false);
  };

  // Helper to mask values for privacy display
  const maskValue = (val, visibleCount = 4, fillChar = '•') => {
    if (!val) return '';
    const clean = val.replace(/[\s-]/g, '');
    if (clean.length <= visibleCount) return clean;
    const maskedLength = clean.length - visibleCount;
    return fillChar.repeat(maskedLength) + clean.slice(-visibleCount);
  };

  const formatAadhaar = (val) => {
    const clean = val.replace(/\D/g, '');
    const matches = clean.match(/\d{4,12}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return clean;
    }
  };

  // ---------------- Render Verified Screen ----------------
  if (hostVerification && !isEditing) {
    return (
      <div className={`max-w-4xl mx-auto py-4 px-2`}>
        {/* Success / Status Header */}
        <div className={`mb-8 overflow-hidden rounded-2xl shadow-xl relative bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white p-8 md:p-10`}>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
            <ShieldCheck size={300} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-max text-sm font-medium">
                <CheckCircle2 size={16} className="text-emerald-300 fill-emerald-300/10" />
                Verified Host Account
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome, {hostVerification.name}!
              </h1>
              <p className="text-emerald-50 mt-2 text-base max-w-xl">
                Your identity verification is complete. The <span className="underline font-semibold">Add Homestay</span> listing module is now fully unlocked.
              </p>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-800 font-semibold rounded-xl hover:bg-teal-50 active:scale-95 transition-all shadow-lg text-sm md:text-base"
            >
              <Edit3 size={16} />
              Update Profile Details
            </button>
          </div>
        </div>

        {/* Details Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity Details */}
          <div className={`rounded-2xl border p-6 shadow-md transition ${
            darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
          }`}>
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
              <User size={18} className="text-blue-500" />
              Personal & Host Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>Host Type</span>
                <span className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${
                  hostVerification.hostType === 'agency'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                }`}>
                  {hostVerification.hostType === 'agency' ? 'Travel Agency / Firm' : 'Homestay Head (Individual)'}
                </span>
              </div>

              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>Full Name</span>
                <span className="text-sm font-medium block mt-0.5">{hostVerification.name}</span>
              </div>

              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>Email Address</span>
                <span className="text-sm font-medium block mt-0.5">{hostVerification.email}</span>
              </div>

              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>Phone Number</span>
                <span className="text-sm font-medium block mt-0.5">{hostVerification.phone}</span>
              </div>
            </div>
          </div>

          {/* Government ID & Banking */}
          <div className={`rounded-2xl border p-6 shadow-md transition ${
            darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
          }`}>
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
              <CreditCard size={18} className="text-indigo-500" />
              Verified Accounts & IDs
            </h2>
            
            <div className="space-y-4">
              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>Aadhaar Number</span>
                <span className="text-sm font-mono font-medium block mt-0.5 tracking-wider">
                  {maskValue(hostVerification.aadhaar, 4, '•••• ')}
                </span>
              </div>

              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>PAN Card Number</span>
                <span className="text-sm font-mono font-medium block mt-0.5 tracking-wider">
                  {maskValue(hostVerification.pan, 3, '•')}
                </span>
              </div>

              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>Bank Details</span>
                <div className="mt-1">
                  <span className="text-sm font-medium block">{hostVerification.bankName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">IFSC: {hostVerification.ifsc}</span>
                  <span className="text-sm font-mono font-medium mt-0.5 tracking-wider block">
                    A/C: {maskValue(hostVerification.bankAccount, 4, '••••')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Homestay quick link banner */}
        <div className={`mt-8 rounded-2xl border p-6 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-blue-50/50 border-blue-100 text-slate-800'
        }`}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl mt-1 sm:mt-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Add Your Homestays</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Ready to publish your homestay to the world? Start filling up your homestay details now!
              </p>
            </div>
          </div>
          <Link
            to="/host/add-homestay"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl hover:scale-105 transition duration-150 shadow-md whitespace-nowrap text-sm"
          >
            List a Homestay
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- Render Form Screen ----------------
  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${darkmode ? 'text-white' : 'text-slate-900'}`}>
          {isEditing ? 'Update Verification Details' : 'Verify Your Identity'}
        </h1>
        <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-slate-600'}`}>
          Please complete your verification details below to unlock homestay listings and secure payment processing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Host Type Selection */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${
          darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
        }`}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-blue-500" />
            Host Account Type
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Choose whether you are listing homestays as an individual homeowner or operating on behalf of a registered agency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Homestay Head Card */}
            <button
              type="button"
              onClick={() => handleSelectHostType('head')}
              className={`text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${
                formData.hostType === 'head'
                  ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 bg-transparent'
              }`}
            >
              <div className={`p-3 rounded-lg ${
                formData.hostType === 'head' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-slate-500 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base">Homestay Head</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Individual homeowner or landlord listing their personal properties directly.
                </p>
              </div>
            </button>

            {/* Travel Agency Card */}
            <button
              type="button"
              onClick={() => handleSelectHostType('agency')}
              className={`text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${
                formData.hostType === 'agency'
                  ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 bg-transparent'
              }`}
            >
              <div className={`p-3 rounded-lg ${
                formData.hostType === 'agency' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-slate-500 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base">Travel Agency / Firm</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Businesses, tourism operators, or agencies managing multiple homestays.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Personal Details */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${
          darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
        }`}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
            <User size={18} className="text-blue-500" />
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Full Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rajesh Kumar"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                    darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Email Address *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="rajesh@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                    darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Phone Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                    darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Identity Documents */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${
          darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
        }`}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
            <FileText size={18} className="text-indigo-500" />
            Identity Verification (KYC)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Aadhaar Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Aadhaar Card Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none font-semibold text-xs">
                  ID
                </span>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  placeholder="12-digit Aadhaar Number"
                  maxLength="12"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                    darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* PAN Card Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                PAN Card Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none font-semibold text-xs">
                  PAN
                </span>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  placeholder="e.g. ABCDE1234F"
                  maxLength="10"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition uppercase ${
                    darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Banking & Payout Info */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${
          darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
        }`}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
            <CreditCard size={18} className="text-emerald-500" />
            Payout & Bank Account Setup
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1.5 bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
            <AlertCircle size={14} className="text-blue-500 shrink-0" />
            Payouts for bookings will be directly credited to this bank account. Please make sure details are accurate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Bank Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Bank Name *
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="e.g. State Bank of India"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                  darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                }`}
              />
            </div>

            {/* Bank Account Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Bank Account Number *
              </label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                placeholder="9 to 18 digits Account Number"
                maxLength="18"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${
                  darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                }`}
              />
            </div>

            {/* IFSC Code */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                IFSC Code *
              </label>
              <input
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleInputChange}
                placeholder="e.g. SBIN0001234"
                maxLength="11"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition uppercase ${
                  darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex gap-4">
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`px-6 py-3 rounded-xl border font-bold text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
                darkmode ? 'border-gray-800 text-white' : 'border-gray-300 text-slate-700'
              }`}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] text-white font-bold rounded-xl transition duration-150 shadow-lg"
          >
            {isEditing ? 'Save Changes' : 'Submit & Verify Profile'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default HostDashboard;