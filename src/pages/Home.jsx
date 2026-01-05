
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen max-w-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements - Full Width */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-1/4 w-screen h-screen max-w-2xl bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-1/4 w-screen h-screen max-w-2xl bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 gap-12 lg:gap-24">
        
        {/* Left Content - Full Responsive Width */}
        <div className="w-full flex-1 max-w-4xl lg:max-w-2xl xl:max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
          <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-xl sm:text-2xl font-bold rounded-full shadow-2xl animate-float inline-flex items-center gap-2">
            <span className="animate-pulse">🚀</span>
            Launch Your Rental Journey
          </div>
          
          <h1 className="w-full text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
            RENT SPACE
            <br className="sm:hidden" />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x text-5xl sm:text-7xl md:text-[5rem] lg:text-8xl">
              Made Simple
            </span>
          </h1>
          
          <p className="w-full text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto lg:mx-0 px-4">
            Discover premium rental spaces across India. From cozy offices to expansive warehouses, 
            find your perfect space at your fingertips with our intuitive platform.
          </p>
          
          {/* CTA Buttons - Full Width Container */}
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16 px-4 sm:px-0">
            <Link to="/rentspacelist">
              <button className="w-full sm:w-auto group relative px-10 py-5 sm:px-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden min-h-[3.5rem] flex items-center justify-center">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 w-full h-full"></span>
                <span className="relative z-10 flex items-center gap-3">
                  🚀 Explore Spaces
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </Link>
            
            <Link to="/register">
              <button className="w-full sm:w-auto px-10 py-5 sm:px-12 bg-white/90 backdrop-blur-xl border-2 border-indigo-200 text-indigo-800 font-bold text-lg rounded-3xl shadow-xl hover:shadow-2xl hover:border-indigo-400 hover:text-indigo-900 transform hover:-translate-y-1 transition-all duration-300 min-h-[3.5rem] flex items-center justify-center">
                ✨ Get Started Free
              </button>
            </Link>
          </div>

          {/* Stats - Full Width Responsive */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto lg:mx-0 px-4">
            <div className="text-center p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 mb-2">10K+</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Spaces Listed</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-black text-purple-600 mb-2">50K+</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Happy Renters</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-black text-pink-600 mb-2">100%</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Verified Owners</div>
            </div>
          </div>
        </div>

        {/* Right Hero Visual - Responsive Full Width */}
        <div className="w-full flex-1 flex justify-center items-center max-w-4xl mx-auto lg:mx-0 mt-12 lg:mt-0">
          <div className="relative w-full max-w-md lg:max-w-2xl aspect-square">
            <div className="relative w-full h-full min-h-[300px] lg:min-h-[450px] bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-4xl shadow-2xl backdrop-blur-xl border-2 border-white/40 animate-float-slow">
              <div className="absolute inset-6 lg:inset-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl shadow-xl"></div>
              
              {/* Responsive Space Cards */}
              <div className="absolute top-8 left-8 w-20 h-16 lg:w-32 lg:h-24 bg-white/90 rounded-2xl shadow-lg transform rotate-6"></div>
              <div className="absolute top-32 right-8 w-20 h-16 lg:w-24 lg:h-20 bg-white/90 rounded-xl shadow-lg transform -rotate-3 translate-y-4"></div>
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-28 h-20 lg:w-40 lg:h-28 bg-white/90 rounded-3xl shadow-2xl border-4 border-indigo-200"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl shadow-xl animate-bounce"></div>
              <div className="absolute -bottom-8 left-8 w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl shadow-xl animate-bounce delay-500"></div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-4xl blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 3s ease infinite; 
        }
      `}</style>
    </div>
  )
}

export default Home
