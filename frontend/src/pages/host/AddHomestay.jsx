import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import {
  Upload, X, Plus, Loader, Lock,
  Home, MapPin, User, Phone, Mail, Tag,
  BedDouble, Users, DoorOpen, Bath,
  Star, Gift, UtensilsCrossed,
  IndianRupee, Images, ScrollText, Rocket,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'
import axiosInstance from '../../config/axiosInstance'
import { Link } from 'react-router-dom'

/* ─────────────────────── Reusable Field Components ─────────────────────── */

const inputBase = (darkmode) =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${darkmode
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
    : 'bg-white border-gray-200 text-slate-900 placeholder-gray-400 focus:border-blue-500'
  }`

function FieldLabel({ icon: Icon, label, required = false, darkmode }) {
  return (
    <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-2 ${darkmode ? 'text-slate-400' : 'text-slate-500'}`}>
      {Icon && <Icon size={12} />}
      {label}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  )
}

function SectionCard({ icon: Icon, title, badge, action, children, darkmode, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border shadow-sm ${darkmode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}
    >
      {/* Section Header */}
      <div className={`flex items-center justify-between px-6 py-4 border-b ${darkmode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkmode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            <Icon size={16} />
          </span>
          <div>
            <h2 className={`text-sm font-semibold ${darkmode ? 'text-white' : 'text-slate-800'}`}>{title}</h2>
            {badge && <p className={`text-xs mt-0.5 ${darkmode ? 'text-slate-500' : 'text-slate-400'}`}>{badge}</p>}
          </div>
        </div>
        {action}
      </div>

      {/* Section Body */}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  )
}

function ArrayFieldList({ field, items, placeholder, onAdd, onRemove, onChange, darkmode }) {
  return (
    <div className="space-y-2.5">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(field, index, e.target.value)}
            placeholder={placeholder}
            className={inputBase(darkmode)}
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(field, index)}
              className={`p-2.5 rounded-xl border transition-colors ${darkmode
                ? 'border-gray-700 text-gray-500 hover:border-rose-700 hover:bg-rose-900/20 hover:text-rose-400'
                : 'border-gray-200 text-gray-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500'
                }`}
            >
              <X size={16} />
            </button>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────────────────────── Main Component ─────────────────────────── */
const AddHomestay = () => {
  const { darkmode, hostDetails } = useContext(AppContext)

  /* ── Locked state ── */
  if (!hostDetails?.is_verified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center p-12 text-center min-h-[60vh]"
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${darkmode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-500'}`}>
          <Lock size={36} />
        </div>
        <h2 className={`text-2xl font-bold mb-3 ${darkmode ? 'text-white' : 'text-slate-900'}`}>
          Verification Required
        </h2>
        <p className={`max-w-md mb-8 text-sm leading-relaxed ${darkmode ? 'text-slate-400' : 'text-slate-500'}`}>
          To start listing your homestays on HomyGo, please verify your account by completing your profile and payment details.
        </p>
        <Link
          to="/host/profile"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/30 hover:-translate-y-0.5"
        >
          <User size={16} />
          Complete Profile
        </Link>
      </motion.div>
    )
  }

  /* ── State ── */
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    host: hostDetails?.name || '',
    host_email: hostDetails?.email || '',
    host_phone: hostDetails?.phone || '',
    category: 'mountains',
    base_price: '',
    discount_price: '',
    terms_and_conditions: '',
    features: [''],
    offers: [''],
    foods: [''],
    capacity: { beds: '', guests: '', bedrooms: '', bathrooms: '' }
  })
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  /* ── Handlers (unchanged logic) ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCapacityChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, capacity: { ...prev.capacity, [name]: value } }))
  }

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayField = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const removeArrayField = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const remainingSlots = 5 - images.length
    if (files.length > remainingSlots) {
      toast.error(`You can only upload ${remainingSlots} more images (max 5)`)
      return
    }
    const newImages = files.slice(0, remainingSlots)
    setImages(prev => [...prev, ...newImages])
    newImages.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => { setImagePreviews(prev => [...prev, e.target.result]) }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) { toast.error('Title is required'); return }
    if (!formData.location.trim()) { toast.error('Location is required'); return }
    if (!formData.host_phone.trim()) { toast.error('Host phone is required'); return }
    if (images.length === 0) { toast.error('At least one image is required'); return }
    if (!formData.base_price) { toast.error('Base price is required'); return }

    setLoading(true)
    try {
      const submitFormData = new FormData()
      submitFormData.append('title', formData.title)
      submitFormData.append('location', formData.location)
      submitFormData.append('host', formData.host)
      submitFormData.append('host_email', formData.host_email)
      submitFormData.append('host_phone', formData.host_phone)
      submitFormData.append('category', formData.category)
      submitFormData.append('base_price', formData.base_price)
      submitFormData.append('discount_price', formData.discount_price || 0)
      submitFormData.append('terms_and_conditions', formData.terms_and_conditions)
      submitFormData.append('features', JSON.stringify(formData.features.filter(f => f.trim())))
      submitFormData.append('offers', JSON.stringify(formData.offers.filter(o => o.trim())))
      submitFormData.append('foods', JSON.stringify(formData.foods.filter(f => f.trim())))
      submitFormData.append('capacity', JSON.stringify({
        beds: Number(formData.capacity.beds),
        guests: Number(formData.capacity.guests),
        bedrooms: Number(formData.capacity.bedrooms),
        bathrooms: Number(formData.capacity.bathrooms),
      }))
      images.forEach(image => submitFormData.append('images', image))

      const response = await axiosInstance.post('/api/v1/host/add', submitFormData)

      if (response.status === 201 || response.status === 200) {
        toast.success('Homestay published successfully!')
        setFormData({
          title: '', location: '', host: user?.name || '', host_email: user?.email || '',
          host_phone: '', category: 'mountains', base_price: '', discount_price: '',
          terms_and_conditions: '', features: [''], offers: [''], foods: [''],
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

  const AddBtn = ({ field, label }) => (
    <button
      type="button"
      onClick={() => addArrayField(field)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      <Plus size={13} /> {label}
    </button>
  )

  /* ── Capacity fields config ── */
  const capacityFields = [
    { name: 'beds', label: 'Beds', icon: BedDouble, placeholder: '0' },
    { name: 'guests', label: 'Guests', icon: Users, placeholder: '0' },
    { name: 'bedrooms', label: 'Bedrooms', icon: DoorOpen, placeholder: '0' },
    { name: 'bathrooms', label: 'Bathrooms', icon: Bath, placeholder: '0' },
  ]

  const categories = ['mountains', 'beach', 'city', 'countryside', 'tropical']

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className={`text-2xl font-bold ${darkmode ? 'text-white' : 'text-slate-900'}`}>
            Add a New Homestay
          </h1>
          <p className={`text-sm mt-0.5 ${darkmode ? 'text-slate-400' : 'text-slate-500'}`}>
            Fill in the details below to list your property on HomyGo.
          </p>
        </div>
        {/* Progress pill */}
        <div className={`self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border ${darkmode ? 'bg-gray-800 border-gray-700 text-slate-400' : 'bg-white border-gray-200 text-slate-500'
          } shadow-sm`}>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {images.length} / 5 images · {
            [formData.title, formData.location, formData.host_phone, formData.base_price].filter(Boolean).length
          } / 4 required fields
        </div>
      </motion.div>

      {/* ── Section 1: Basic Information ── */}
      <SectionCard icon={Home} title="Basic Information" badge="Property identity & contact" darkmode={darkmode} delay={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="md:col-span-2">
            <FieldLabel icon={Home} label="Homestay Title" required darkmode={darkmode} />
            <input
              type="text" name="title" value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., The Himalayan Orchard Home"
              className={inputBase(darkmode)}
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <FieldLabel icon={MapPin} label="Location" required darkmode={darkmode} />
            <input
              type="text" name="location" value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Mukteshwar, Uttarakhand, India"
              className={inputBase(darkmode)}
            />
          </div>

          {/* Host Name */}
          <div>
            <FieldLabel icon={User} label="Host Name" required darkmode={darkmode} />
            <input
              type="text" name="host" value={formData.host}
              onChange={handleInputChange}
              placeholder="Your full name"
              className={inputBase(darkmode)}
            />
          </div>

          {/* Host Email */}
          <div>
            <FieldLabel icon={Mail} label="Host Email" required darkmode={darkmode} />
            <input
              type="email" name="host_email" value={formData.host_email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className={inputBase(darkmode)}
            />
          </div>

          {/* Host Phone */}
          <div>
            <FieldLabel icon={Phone} label="Host Phone" required darkmode={darkmode} />
            <input
              type="tel" name="host_phone" value={formData.host_phone}
              onChange={handleInputChange}
              placeholder="+91-XXXXXXXXXX"
              className={inputBase(darkmode)}
            />
          </div>

          {/* Category */}
          <div>
            <FieldLabel icon={Tag} label="Category" required darkmode={darkmode} />
            <select
              name="category" value={formData.category}
              onChange={handleInputChange}
              className={inputBase(darkmode)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </SectionCard>

      {/* ── Section 2: Capacity ── */}
      <SectionCard icon={BedDouble} title="Capacity Details" badge="How many guests can stay" darkmode={darkmode} delay={0.14}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capacityFields.map(({ name, label, icon: Icon, placeholder }) => (
            <div key={name}>
              <FieldLabel icon={Icon} label={label} darkmode={darkmode} />
              <input
                type="number" name={name} min="0"
                value={formData.capacity[name]}
                onChange={handleCapacityChange}
                placeholder={placeholder}
                className={inputBase(darkmode)}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Section 3: Features ── */}
      <SectionCard
        icon={Star}
        title="Features & Amenities"
        badge="Highlight what makes your place special"
        darkmode={darkmode}
        delay={0.2}
        action={<AddBtn field="features" label="Add Feature" />}
      >
        <ArrayFieldList
          field="features"
          items={formData.features}
          placeholder="e.g., Mountain View, Eco-Friendly, Private Balcony"
          onAdd={addArrayField}
          onRemove={removeArrayField}
          onChange={handleArrayChange}
          darkmode={darkmode}
        />
      </SectionCard>

      {/* ── Section 4: Offers ── */}
      <SectionCard
        icon={Gift}
        title="Offers & Services"
        badge="Perks and included services"
        darkmode={darkmode}
        delay={0.26}
        action={<AddBtn field="offers" label="Add Offer" />}
      >
        <ArrayFieldList
          field="offers"
          items={formData.offers}
          placeholder="e.g., Free WiFi, Private Parking, Bonfire Pit"
          onAdd={addArrayField}
          onRemove={removeArrayField}
          onChange={handleArrayChange}
          darkmode={darkmode}
        />
      </SectionCard>

      {/* ── Section 5: Foods ── */}
      <SectionCard
        icon={UtensilsCrossed}
        title="Food & Cuisines"
        badge="Meals and dining experiences offered"
        darkmode={darkmode}
        delay={0.32}
        action={<AddBtn field="foods" label="Add Food" />}
      >
        <ArrayFieldList
          field="foods"
          items={formData.foods}
          placeholder="e.g., Organic Kumaoni Thali, Homemade Jams"
          onAdd={addArrayField}
          onRemove={removeArrayField}
          onChange={handleArrayChange}
          darkmode={darkmode}
        />
      </SectionCard>

      {/* ── Section 6: Pricing ── */}
      <SectionCard icon={IndianRupee} title="Pricing" badge="Set competitive rates per night" darkmode={darkmode} delay={0.38}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel icon={IndianRupee} label="Base Price (₹) / night" required darkmode={darkmode} />
            <div className="relative">
              <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold ${darkmode ? 'text-slate-500' : 'text-slate-400'}`}>₹</span>
              <input
                type="number" name="base_price" min="0"
                value={formData.base_price}
                onChange={handleInputChange}
                placeholder="8100"
                className={`${inputBase(darkmode)} pl-8`}
              />
            </div>
          </div>
          <div>
            <FieldLabel icon={IndianRupee} label="Discount Price (₹) — optional" darkmode={darkmode} />
            <div className="relative">
              <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold ${darkmode ? 'text-slate-500' : 'text-slate-400'}`}>₹</span>
              <input
                type="number" name="discount_price" min="0"
                value={formData.discount_price}
                onChange={handleInputChange}
                placeholder="5600"
                className={`${inputBase(darkmode)} pl-8`}
              />
            </div>
            {formData.base_price && formData.discount_price && Number(formData.discount_price) < Number(formData.base_price) && (
              <p className="text-xs text-emerald-500 mt-1.5 font-medium">
                ✓ {Math.round((1 - formData.discount_price / formData.base_price) * 100)}% off — attractive deal!
              </p>
            )}
          </div>
        </div>
      </SectionCard>

      {/* ── Section 7: Images ── */}
      <SectionCard
        icon={Images}
        title={`Photos`}
        badge={`${images.length} of 5 uploaded — at least 1 required`}
        darkmode={darkmode}
        delay={0.44}
      >
        {/* Upload Zone */}
        {images.length < 5 && (
          <label className={`group flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors duration-200 mb-5 ${darkmode
            ? 'border-gray-700 hover:border-blue-500 hover:bg-blue-950/20'
            : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/60'
            }`}>
            <input
              type="file" multiple accept="image/*"
              onChange={handleImageUpload}
              disabled={images.length >= 5}
              className="hidden"
            />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${darkmode ? 'bg-gray-800 group-hover:bg-blue-900/40 text-slate-500 group-hover:text-blue-400' : 'bg-gray-100 group-hover:bg-blue-100 text-gray-400 group-hover:text-blue-500'
              }`}>
              <Upload size={22} />
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${darkmode ? 'text-slate-300' : 'text-slate-700'}`}>
                Click to upload photos
              </p>
              <p className={`text-xs mt-0.5 ${darkmode ? 'text-slate-500' : 'text-slate-400'}`}>
                PNG, JPG up to 10 MB · max {5 - images.length} more
              </p>
            </div>
          </label>
        )}

        {/* Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {imagePreviews.map((preview, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 }}
                className={`relative rounded-xl overflow-hidden aspect-square border ${darkmode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}
              >
                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                >
                  <X size={12} />
                </button>
                <span className="absolute bottom-1.5 left-1.5 text-white text-xs font-bold bg-black/50 px-1.5 py-0.5 rounded-md">
                  {index + 1}
                </span>
                {index === 0 && (
                  <span className="absolute top-1.5 left-1.5 text-white text-[10px] font-bold bg-blue-500 px-1.5 py-0.5 rounded-md">
                    Cover
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* ── Section 8: Terms ── */}
      <SectionCard icon={ScrollText} title="Terms & Conditions" badge="Cancellation policy and house rules" darkmode={darkmode} delay={0.5}>
        <textarea
          name="terms_and_conditions"
          value={formData.terms_and_conditions}
          onChange={handleInputChange}
          placeholder="e.g., Free cancellation up to 14 days before check-in. No smoking indoors. Pets allowed on request."
          rows="4"
          className={`${inputBase(darkmode)} resize-none`}
        />
      </SectionCard>

      {/* ── Submit ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56, duration: 0.4 }}
        className={`rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${darkmode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          } shadow-sm`}
      >
        <div className="flex-1">
          <p className={`text-sm font-semibold ${darkmode ? 'text-white' : 'text-slate-800'}`}>Ready to publish?</p>
          <p className={`text-xs mt-0.5 ${darkmode ? 'text-slate-500' : 'text-slate-400'}`}>
            Your listing will be reviewed by HomyGo before going live.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" />
              Publishing…
            </>
          ) : (
            <>
              <Rocket size={16} />
              Publish Homestay
            </>
          )}
        </button>
      </motion.div>

    </form>
  )
}

export default AddHomestay
