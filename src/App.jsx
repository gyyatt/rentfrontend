import React, {useEffect} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import RentSpaceList from './pages/RentSpaceList'
import PrivateRoute from './components/PrivateRoute'
import Register from './pages/Register'
import CreateRentSpace from './pages/CreateRentSpace'
import About from './pages/About'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { UserContext, UserProvider } from './contexts/UserContext'  // ✅ Added useUser
import OwnerInquiries from './pages/OwnerInquiries'
import EditSpace from './pages/EditSpace'
import AdminDashboard from './components/AdminDashboard'
import AdminPanel from './pages/AdminPanel'  // ✅ Added AdminPanel import
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

// Loading component while auth checks
const AppContent = () => {
  const { loading: authLoading } = useAuth()
  const userContext = useContext(UserContext)
  const { user, loading: userLoading } = useContext || {}  // ✅ Added user context
  const navigate = useNavigate()
  
  // ✅ ADMIN AUTO-REDIRECT (Uncommented + Fixed)
  useEffect(() => {
    if (!authLoading && !userLoading && user?.is_staff) {
      navigate('/admin-panel', { replace: true })
    }
  }, [user, authLoading, userLoading, navigate])

  if (authLoading || userLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ✅ AdminDashboard for admins */}
        {user?.is_staff && <AdminDashboard />}
        
        <Routes>
          {/* ✅ ROOT: Admin=AdminPanel, Consumer=Home */}
          <Route path="/" element={
            user?.is_staff 
              ? <Navigate to="/admin-panel" replace />
              : <Home />
          } />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          
          {/* Protected routes */}
          <Route 
            path="/rentspacelist" 
            element={
              <PrivateRoute>
                <RentSpaceList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-rentspace" 
            element={
              <PrivateRoute>
                <CreateRentSpace />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/inbox" 
            element={
              <PrivateRoute>
                <OwnerInquiries />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/edit-space/:id" 
            element={
              <PrivateRoute>
                <EditSpace />
              </PrivateRoute>
            } 
          />

          {/* ✅ Admin Panel Route (Fixed) */}
          <Route path="/admin-panel" element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-lg font-semibold">© 2025 Rental Platform <span> <i>Just Made for learning purpose </i></span></p>
        </div>
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>        {/* Token auth context */}
      <UserProvider>      {/* Your existing user context */}
        <AppContent />
      </UserProvider>
    </AuthProvider>
  )
}

export default App
