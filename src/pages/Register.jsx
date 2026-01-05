
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Register = () => {
  const navigate = useNavigate()
  const { setToken } = useContext(UserContext)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_seller: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        const data = await res.json()
        setToken(data.token)
        navigate('/rentspacelist')
      } else {
        const errorData = await res.json()
        setError(errorData.username?.[0] || errorData.detail || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen max-w-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 lg:p-12">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
            <span className="text-3xl text-white">👤</span>
          </div>
          <h2 className="text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-lg text-gray-600">Join RentSpace today</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleInput}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-lg placeholder-gray-400"
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInput}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-lg placeholder-gray-400"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength="6"
              value={formData.password}
              onChange={handleInput}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-lg placeholder-gray-400"
              placeholder="Minimum 6 characters"
            />
          </div>

          {/* Role Dropdown - REPLACES checkbox */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Role</label>
            <div className="relative">
              <select
                name="is_seller"
                value={formData.is_seller}
                onChange={handleInput}
                className="w-full px-5 py-4 pr-12 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-lg appearance-none bg-white"
              >
                <option value={false}>👤 Renter (Consumer)</option>
                <option value={true}>🏢 Property Owner (Seller)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Sellers can list and manage rental spaces
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-3xl shadow-xl hover:shadow-2xl disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 text-xl"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {/* Login link */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Have account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
