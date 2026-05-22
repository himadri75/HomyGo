import React, { useState } from 'react'
import { Phone, AlertTriangle, MapPin, Clock, Users, Shield, Heart, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';

const SOS = () => {
  const [sosTriggered, setSosTriggered] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

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
        { name: 'TourMate Emergency Support', number: '+91-XXXXX-XXXXX', state: 'All India', available: '24/7' },
        { name: 'Indian Ministry of Tourism', number: '1363', state: 'All India', available: '24/7' },
        { name: 'Foreigners Regional Registration', number: '1800-118-111', state: 'All India', available: '24/7' },
        { name: 'Embassy Assistance', number: '011-2419-8162', state: 'Delhi', available: '24/7' }
      ]
    }
  ];

  const safetyTips = [
    { title: 'Keep Your Documents Safe', description: 'Always carry copies of important documents separately from originals' },
    { title: 'Share Your Location', description: 'Tell someone you trust where you are and your travel itinerary' },
    { title: 'Emergency Money', description: 'Keep some cash and credit cards in different locations' },
    { title: 'Know Local Numbers', description: 'Save important emergency numbers before you travel' },
    { title: 'Stay Connected', description: 'Keep your phone charged and have local SIM card information' },
    { title: 'Trust Your Instincts', description: 'If something feels wrong, leave the situation immediately' }
  ];

  const emergencyChecklist = [
    { item: 'Emergency contacts saved', icon: <Phone className="w-4 h-4" /> },
    { item: 'Location shared with family', icon: <MapPin className="w-4 h-4" /> },
    { item: 'Travel documents backed up', icon: <AlertCircle className="w-4 h-4" /> },
    { item: 'Insurance details available', icon: <Shield className="w-4 h-4" /> },
    { item: 'Phone battery at 50%+', icon: <Clock className="w-4 h-4" /> },
    { item: 'Local helplines saved', icon: <Users className="w-4 h-4" /> }
  ];

  const handleSOS = () => {
    setSosTriggered(true);
    // In a real scenario, this would trigger the sendSOS() function from sos.js
    setTimeout(() => setSosTriggered(false), 3000);
  };

  return (
    <div className="bg-blue-50 min-h-screen">

      {/* Alert Banner */}
      <div className="bg-red-600 text-white py-3 md:py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-xs md:text-sm font-semibold">
              In case of emergency, call your local emergency number immediately. This is a support resource only.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* SOS Panic Button */}
        <div className="mb-12 flex flex-col items-center">
          <button
            onClick={handleSOS}
            className={`w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center text-white font-bold text-5xl md:text-7xl text-center transition-all duration-300 ${sosTriggered
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700 animate-pulse'
              }`}
          >
            {sosTriggered ? '✓ SOS Alert Sent' : 'SOS'}
          </button>

          <p className="text-center text-xs md:text-sm text-blue-700 mt-3 max-w-xs">
            This will send your GPS location and emergency contact information
          </p>
        </div>

        {/* Emergency Checklist */}
        <div className="mb-12 bg-white border border-blue-200 shadow-md p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Before You Travel - Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100">
                <div className="w-5 h-5 flex items-center justify-center text-blue-600">
                  {item.icon}
                </div>
                <span className="text-xs md:text-sm text-blue-900 font-medium">{item.item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-6">Emergency Contacts by Category</h2>
          <div className="space-y-4">
            {emergencyContacts.map((category, idx) => (
              <div key={idx} className="bg-white border border-blue-200 shadow-md overflow-hidden">

                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                  className="w-full px-4 md:px-6 py-4 bg-blue-100 border-b border-blue-200 flex items-center justify-between hover:bg-blue-200 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-blue-600">
                      {category.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-blue-900">{category.category}</h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-blue-600 transition-transform ${expandedCategory === idx ? 'rotate-90' : ''
                      }`}
                  />
                </button>

                {/* Contacts List */}
                {expandedCategory === idx && (
                  <div className="divide-y divide-blue-200">
                    {category.contacts.map((contact, cidx) => (
                      <div key={cidx} className="p-4 md:p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs md:text-sm font-bold text-blue-900">{contact.name}</p>
                            <p className="text-xs text-blue-700 mt-1">{contact.state} • {contact.available}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <a
                            href={`tel:${contact.number}`}
                            className="text-sm md:text-base font-bold text-blue-600 hover:text-blue-700 transition"
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

        {/* Safety Tips */}
        <div className="mb-12">
          <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Travel Safety Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((tip, idx) => (
              <div key={idx} className="bg-white border border-blue-200 shadow-md p-6">
                <h3 className="text-sm md:text-base font-bold text-blue-900 mb-3">{tip.title}</h3>
                <p className="text-xs md:text-sm text-blue-800 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-100 border border-blue-300 shadow-md p-6 md:p-8 mb-12">
          <h2 className="text-base md:text-lg font-bold text-blue-900 mb-4">Important Information</h2>
          <ul className="space-y-3 text-xs md:text-sm text-blue-900">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">•</span>
              <span>Always keep your passport and important documents in a secure location</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">•</span>
              <span>Register your travel with your embassy before departure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">•</span>
              <span>Keep digital copies of all important documents stored securely in the cloud</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">•</span>
              <span>Inform someone at home about your travel dates and itinerary</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">•</span>
              <span>Purchase comprehensive travel insurance before your trip</span>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="bg-white border border-blue-200 shadow-md p-6 md:p-8">
          <h2 className="text-base md:text-lg font-bold text-blue-900 mb-4">Need Assistance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Call Support</p>
                <p className="text-sm md:text-base font-bold text-blue-900">+91-XXXXX-XXXXX</p>
                <p className="text-xs text-blue-800 mt-1">Available 24/7</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Emergency Chat</p>
                <p className="text-sm md:text-base font-bold text-blue-900">Connect with TourMate</p>
                <p className="text-xs text-blue-800 mt-1">Immediate assistance</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SOS;