import React, { useState, useContext } from 'react'
import { Upload, X, Plus, Loader, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'
import axiosInstance from '../../config/axiosInstance'
import { Link } from 'react-router-dom'

const AddHomestay = () => {
  const { user, darkmode, hostVerification } = useContext(AppContext)

  if (!hostVerification) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <div className={`p-5 rounded-full ${darkmode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'} mb-6 animate-bounce`}>
          <Lock size={48} />
        </div>
        <h2 className={`text-3xl font-extrabold mb-3 tracking-tight ${darkmode ? 'text-white' : 'text-slate-900'}`}>
          Verification Required
        </h2>
        <p className={`max-w-md mb-8 text-base leading-relaxed ${darkmode ? 'text-gray-400' : 'text-slate-600'}`}>
          To start listing your homestays on HomyGo, you need to verify your account by providing your personal and payment details.
        </p>
        <Link
          to="/host/dashboard"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white font-semibold rounded-xl shadow-lg transition duration-200"
        >
          Verify Profile in Dashboard
        </Link>
      </div>
    )
  }
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    host: user?.name || '',
    host_email: user?.email || '',
    host_phone: '',
    category: 'mountains',
    base_price: '',
    discount_price: '',
    terms_and_conditions: '',
    features: [''],
    offers: [''],
    foods: [''],
    capacity: {
      beds: '',
      guests: '',
      bedrooms: '',
      bathrooms: ''
    }
  })

  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle capacity input changes
  const handleCapacityChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        [name]: value
      }
    }))
  }

  // Handle array field changes (features, offers, foods)
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  // Add new array field
  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  // Remove array field
  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const remainingSlots = 5 - images.length

    if (files.length > remainingSlots) {
      toast.error(`You can only upload ${remainingSlots} more images (max 5)`)
      return
    }

    const newImages = files.slice(0, remainingSlots)
    setImages(prev => [...prev, ...newImages])

    // Create previews
    newImages.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!formData.location.trim()) {
      toast.error('Location is required')
      return
    }
    if (!formData.host_phone.trim()) {
      toast.error('Host phone is required')
      return
    }
    if (images.length === 0) {
      toast.error('At least one image is required')
      return
    }
    if (!formData.base_price) {
      toast.error('Base price is required')
      return
    }

    setLoading(true)

    try {
      const submitFormData = new FormData()

      // Add regular fields
      submitFormData.append('title', formData.title)
      submitFormData.append('location', formData.location)
      submitFormData.append('host', formData.host)
      submitFormData.append('host_email', formData.host_email)
      submitFormData.append('host_phone', formData.host_phone)
      submitFormData.append('category', formData.category)
      submitFormData.append('base_price', formData.base_price)
      submitFormData.append('discount_price', formData.discount_price || 0)
      submitFormData.append('terms_and_conditions', formData.terms_and_conditions)

      // Add JSON fields
      submitFormData.append('features', JSON.stringify(formData.features.filter(f => f.trim())))
      submitFormData.append('offers', JSON.stringify(formData.offers.filter(o => o.trim())))
      submitFormData.append('foods', JSON.stringify(formData.foods.filter(f => f.trim())))
      submitFormData.append(
        'capacity',
        JSON.stringify({
          beds: Number(formData.capacity.beds),
          guests: Number(formData.capacity.guests),
          bedrooms: Number(formData.capacity.bedrooms),
          bathrooms: Number(formData.capacity.bathrooms),
        })
      )

      // Add images
      images.forEach(image => {
        submitFormData.append('images', image)
      })

      const response = await axiosInstance.post('/api/v1/host/add', submitFormData);

      if (response.status === 201 || response.status === 200) {
        toast.success('Homestay added successfully!')
        // Reset form
        setFormData({
          title: '',
          location: '',
          host: user?.name || '',
          host_email: user?.email || '',
          host_phone: '',
          category: 'mountains',
          base_price: '',
          discount_price: '',
          terms_and_conditions: '',
          features: [''],
          offers: [''],
          foods: [''],
          capacity: { beds: '', guests: '', bedrooms: '', bathrooms: '' }
        })
        setImages([])
        setImagePreviews([])
      }
    } catch (error) {
      console.error('Error adding homestay:', error)
      toast.error(error.response?.data?.message || 'Failed to add homestay')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen pt-2 pb-12 px-4 ${darkmode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
            Add a New Homestay
          </h1>
          <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            Fill in the details below to list your homestay on HomyGo
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`rounded-xl shadow-lg border ${darkmode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
          } p-8 space-y-8`}>

          {/* Section 1: Basic Information */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 pb-3 border-b ${darkmode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
              }`}>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Homestay Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., The Himalayan Orchard Home"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Mukteshwar, Uttarakhand, India"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              {/* Host Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Host Name *
                </label>
                <input
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              {/* Host Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Host Email *
                </label>
                <input
                  type="email"
                  name="host_email"
                  value={formData.host_email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              {/* Host Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Host Phone *
                </label>
                <input
                  type="tel"
                  name="host_phone"
                  value={formData.host_phone}
                  onChange={handleInputChange}
                  placeholder="+91-XXXXXXXXXX"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                    }`}
                >
                  <option value="mountains">Mountains</option>
                  <option value="beach">Beach</option>
                  <option value="city">City</option>
                  <option value="countryside">Countryside</option>
                  <option value="tropical">Tropical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Capacity */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 pb-3 border-b ${darkmode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
              }`}>
              Capacity Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Beds
                </label>
                <input
                  type="number"
                  name="beds"
                  value={formData.capacity.beds}
                  onChange={handleCapacityChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.capacity.guests}
                  onChange={handleCapacityChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.capacity.bedrooms}
                  onChange={handleCapacityChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.capacity.bathrooms}
                  onChange={handleCapacityChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Features */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b" style={{
              borderBottomColor: darkmode ? '#374151' : '#e5e7eb'
            }}>
              <h2 className={`text-xl font-semibold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                Features & Amenities
              </h2>
              <button
                type="button"
                onClick={() => addArrayField('features')}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    placeholder="e.g., Mountain View, Eco-Friendly"
                    className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('features', index)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Offers */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b" style={{
              borderBottomColor: darkmode ? '#374151' : '#e5e7eb'
            }}>
              <h2 className={`text-xl font-semibold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                Offers & Services
              </h2>
              <button
                type="button"
                onClick={() => addArrayField('offers')}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <Plus size={16} />
                Add Offer
              </button>
            </div>

            <div className="space-y-3">
              {formData.offers.map((offer, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={offer}
                    onChange={(e) => handleArrayChange('offers', index, e.target.value)}
                    placeholder="e.g., Free WiFi, Private Parking, Bonfire Pit"
                    className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                  />
                  {formData.offers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('offers', index)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Foods */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b" style={{
              borderBottomColor: darkmode ? '#374151' : '#e5e7eb'
            }}>
              <h2 className={`text-xl font-semibold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                Food & Cuisines
              </h2>
              <button
                type="button"
                onClick={() => addArrayField('foods')}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <Plus size={16} />
                Add Food
              </button>
            </div>

            <div className="space-y-3">
              {formData.foods.map((food, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => handleArrayChange('foods', index, e.target.value)}
                    placeholder="e.g., Organic Kumaoni Thali, Homemade Jams"
                    className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                  />
                  {formData.foods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('foods', index)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Pricing */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 pb-3 border-b ${darkmode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
              }`}>
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Base Price (₹) *
                </label>
                <input
                  type="number"
                  name="base_price"
                  value={formData.base_price}
                  onChange={handleInputChange}
                  placeholder="e.g., 8100"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Discount Price (₹)
                </label>
                <input
                  type="number"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleInputChange}
                  placeholder="e.g., 5600"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${darkmode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Section 7: Images */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 pb-3 border-b ${darkmode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
              }`}>
              Images <span className="text-sm text-blue-600">({images.length}/5)</span>
            </h2>

            {/* Upload Area */}
            <label className={`block mb-6 p-8 border-2 border-dashed rounded-xl cursor-pointer transition ${darkmode
              ? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/50'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={images.length >= 5}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload size={32} className="text-blue-600" />
                <div>
                  <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                    PNG, JPG, GIF up to 10MB (Max 5 images)
                  </p>
                </div>
              </div>
            </label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className={`relative rounded-lg overflow-hidden border ${darkmode ? 'border-gray-600' : 'border-gray-300'
                    }`}>
                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {index + 1}/5
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 8: Terms & Conditions */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 pb-3 border-b ${darkmode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
              }`}>
              Terms & Conditions
            </h2>

            <textarea
              name="terms_and_conditions"
              value={formData.terms_and_conditions}
              onChange={handleInputChange}
              placeholder="e.g., Free cancellation up to 14 days before check-in. No smoking indoors."
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${darkmode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Homestay'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddHomestay;
