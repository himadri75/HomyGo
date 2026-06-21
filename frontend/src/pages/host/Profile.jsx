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

const Profile = () => {
  const { darkmode, hostDetails, sendHostVerificationOTP, verifyHostKycDetails, loading } = useContext(AppContext);

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

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
    if (hostDetails) {
      setFormData(prev => ({
        ...prev, name: hostDetails.name,
        email: hostDetails.email,
        phone: hostDetails.phone,
        aadhaar: hostDetails.aadhaar_number,
        pan: hostDetails.pan_card,
        bankName: hostDetails.bank_name,
        bankAccount: hostDetails.account_no,
        ifsc: hostDetails.ifsc_code
      }))
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    const payload = {
      id: hostDetails?.id,
      type: formData.hostType,
      aadhaar: formData.aadhaar,
      pan: formData.pan,
      bank_name: formData.bankName,
      account_no: formData.bankAccount,
      ifsc: formData.ifsc,
      otp: enteredOtp
    }

    console.log(payload);

    await verifyHostKycDetails(payload);
  };

  // OTP handlers (dummy — wire to backend later)
  const handleSendOtp = async () => {
    if (otpCooldown > 0) return;
    await sendHostVerificationOTP();
    setOtpSent(true);
    setOtpVerified(false);
    setOtp(['', '', '', '', '', '']);
    setOtpCooldown(30);
    const interval = setInterval(() => {
      setOtpCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next box
    if (value && index < 5) {
      document.getElementById(`otp-box-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-box-${index - 1}`)?.focus();
    }
  };

  // ---------------- Render Form Screen ----------------
  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${darkmode ? 'text-white' : 'text-slate-900'}`}>
          {hostDetails?.is_verified ? 'Update Verification Details' : 'Verify Your Identity'}
        </h1>
        <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-slate-600'}`}>
          Please complete your verification details below to unlock homestay listings and secure payment processing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Step 1: Host Type Selection */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
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
              className={`text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${formData.hostType === 'head'
                ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/20'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 bg-transparent'
                }`}
            >
              <div className={`p-3 rounded-lg ${formData.hostType === 'head' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-slate-500 dark:bg-gray-800 dark:text-gray-400'
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
              className={`text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${formData.hostType === 'agency'
                ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/20'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 bg-transparent'
                }`}
            >
              <div className={`p-3 rounded-lg ${formData.hostType === 'agency' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-slate-500 dark:bg-gray-800 dark:text-gray-400'
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
        <div className={`rounded-2xl border p-6 shadow-md transition ${darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
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
                  readOnly={formData.name ? true : false}
                  onChange={handleInputChange}
                  placeholder="e.g. Rajesh Kumar"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
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
                  readOnly={formData.email ? true : false}
                  onChange={handleInputChange}
                  placeholder="rajesh@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
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
                  readOnly={formData.phone ? true : false}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                    }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Identity Documents */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
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
                  value={formData.aadhaar ? formData.aadhaar : ''}
                  onChange={handleInputChange}
                  placeholder="12-digit Aadhaar Number"
                  maxLength="12"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
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
                  value={formData.pan ? formData.pan : ''}
                  onChange={handleInputChange}
                  placeholder="e.g. ABCDE1234F"
                  maxLength="10"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition uppercase ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                    }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Banking & Payout Info */}
        <div className={`rounded-2xl border p-6 shadow-md transition ${darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'
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
                value={formData.bankName ? formData.bankName : ''}
                onChange={handleInputChange}
                placeholder="e.g. State Bank of India"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
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
                value={formData.bankAccount ? formData.bankAccount : ''}
                onChange={handleInputChange}
                placeholder="9 to 18 digits Account Number"
                maxLength="18"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
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
                value={formData.ifsc ? formData.ifsc : ''}
                onChange={handleInputChange}
                placeholder="e.g. SBIN0001234"
                maxLength="11"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition uppercase ${darkmode ? 'bg-gray-800 border-gray-750 text-white' : 'bg-slate-50 border-gray-300 text-slate-900'
                  }`}
              />
            </div>
          </div>
        </div>

        {/* OTP Verification */}
        <div
          className={`rounded-2xl border p-6 shadow-md transition ${darkmode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-slate-800'}`}
        >
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <ShieldCheck size={18} className="text-violet-500" />
            Mobile OTP Verification
          </h2>
          <p className={`text-xs mb-5 ${darkmode ? 'text-gray-400' : 'text-slate-500'}`}>
            Verify your mobile number with a one-time password before submitting.
          </p>

          {/* Send OTP Row */}
          <div className="flex items-center gap-3 mb-5">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={otpCooldown > 0 || otpVerified || loading.sendHostVerificationOTP}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 shadow-sm ${otpVerified
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 cursor-not-allowed'
                : otpCooldown > 0
                  ? darkmode
                    ? 'bg-gray-700 text-gray-500 border border-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : 'bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white border border-transparent hover:scale-[1.01]'
                }`}
            >
              {
                loading.sendHostVerificationOTP ? "Sending..." : (
                  otpVerified ? (
                    <>
                      <CheckCircle2 size={15} /> Verified
                    </>
                  ) : otpSent && otpCooldown > 0 ? (
                    `Resend in ${otpCooldown}s`
                  ) : otpSent ? (
                    "Resend OTP"
                  ) : (
                    "Send OTP"
                  )
                )
              }
            </button>

            {otpVerified && (
              <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                <CheckCircle2 size={13} /> Mobile number verified
              </span>
            )}
          </div>

          {/* 6-digit OTP Input Boxes */}
          {otpSent && !otpVerified && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-3 text-gray-500">
                Enter 6-Digit OTP
              </label>
              <div className="flex items-center gap-2.5 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-box-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all duration-150 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 ${darkmode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-slate-50 border-gray-300 text-slate-900'
                      } ${digit ? (darkmode ? 'border-violet-500/60' : 'border-violet-400') : ''
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading.verifyHostKycDetails}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] text-white font-bold rounded-xl transition duration-150 shadow-lg"
          >
            {loading.verifyHostKycDetails ? "Processing" : (hostDetails.is_verified ? 'Save Changes' : 'Submit & Verify Profile')}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Profile;