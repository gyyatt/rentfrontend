
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-8">
          About RentSpace
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed">
          Your platform for finding and listing rental spaces across India.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">For Renters</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>• Browse verified listings</li>
              <li>• Filter by location & price</li>
              <li>• Direct owner contact</li>
              <li>• Secure inquiries</li>
            </ul>
          </div>
          
          <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">For Owners</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>• List spaces free</li>
              <li>• Manage inquiries</li>
              <li>• Verified renters only</li>
              <li>• Easy management</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-3xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-6">Ready to start?</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/rentspacelist" className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-50 transition-all">
              Browse Spaces
            </a>
            <a href="/create-rentspace" className="px-10 py-4 border-2 border-white font-bold rounded-2xl hover:bg-white/20 transition-all">
              List Space
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
