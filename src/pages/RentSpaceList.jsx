
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import InterestModal from './InterestModal';
import SearchBar from '../components/SearchBar';

const RentSpaceList = () => {
    const { token, logout, user } = useContext(UserContext); 
    const navigate = useNavigate();

    const [spaces, setSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // ✅ HELPER: Get image URL (handles both image & image_file)
    const getImageUrl = (space) => {
        return space.image || space.image_file || null;
    };

    const handleInterestClick = (space) => {
        setSelectedSpace(space);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedSpace(null);
    };

    const getHeaders = () => ({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    const handleEditSpace = (space) => {
        navigate(`/edit-space/${space.id}`);
    };

    const handleDeleteSpace = async (spaceId) => {
        if (!window.confirm(`Delete space ID ${spaceId}?`)) return;
        
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/rentspace/${spaceId}/`, {
                headers: getHeaders()
            });
            
            setSpaces(prev => prev.filter(space => space.id !== spaceId));
            alert('✅ Space deleted!');
        } catch (err) {
            console.error('Delete failed:', err.response?.data);
            alert(`❌ ${err.response?.data?.detail || 'Delete failed'}`);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        const fetchSpaces = async () => {
            if (!token) {
                // navigate('/login');
                navigate('/');

                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const apiEndpoint = user?.is_staff 
                    ? `${import.meta.env.VITE_API_URL}/api/admin/spaces/`
                    : `${import.meta.env.VITE_API_URL}/api/rentspace/`;
                
                const response = await axios.get(apiEndpoint, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSpaces(response.data);
                setFilteredSpaces(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response?.status === 401) {
                    logout();
                } else {
                    setError("Failed to load rental spaces. Please try again.");
                    setLoading(false);
                }
            }
        };
        fetchSpaces();
    }, [token, navigate, logout, user?.is_staff]);

    useEffect(() => {
        const filtered = spaces.filter(space =>
            space.space_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            space.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            space.street_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            space.owner_username?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSpaces(filtered);
    }, [spaces, searchTerm]);

    if (loading) return <div className="text-center mt-10 text-xl">Loading rental spaces...</div>;
    if (error) return <div className="text-center mt-10 text-red-600 font-bold">{error}</div>;

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-7xl mx-auto">
                {/* ⭐ SEARCHBAR */}
                <div className="mb-12">
                    <SearchBar 
                        onSearch={handleSearch}
                        placeholder="Search by space type, location, owner..."
                    />
                    {searchTerm && (
                        <p className="text-center mt-4 text-lg text-gray-700 font-semibold">
                            Found {filteredSpaces.length} of {spaces.length} spaces
                        </p>
                    )}
                </div>

                <h1 className='text-4xl font-bold mb-12 text-center text-gray-800 bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent'>
                    Rental Spaces ({spaces.length})
                </h1>
                
                {filteredSpaces.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No spaces found</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            {searchTerm ? `No spaces match "${searchTerm}"` : 'No rental spaces available.'}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => handleSearch('')}
                                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredSpaces.map(space => (
                            <div key={space.id} className='bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group'>
                                
                                {/* 🖼️ FIXED IMAGE SECTION - HANDLES image + image_file */}
                                <div className="relative h-48 w-full bg-gray-200 overflow-hidden rounded-t-xl">
                                    {getImageUrl(space) ? (
                                        <img 
                                            src={getImageUrl(space)} 
                                            alt={space.space_type}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    
                                    {/* Fallback Image */}
                                    {!getImageUrl(space) && (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    
                                    {/* Availability Badge */}
                                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                                        space.is_occupied ? 'bg-red-500/90 backdrop-blur-sm text-white' : 'bg-green-500/90 backdrop-blur-sm text-white'
                                    }`}>
                                        {space.is_occupied ? '🔴 Occupied' : '🟢 Available'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors line-clamp-2'>
                                        {space.space_type}
                                    </h2>
                                    
                                    {/* Owner Details - Admin Only */}
                                    {user?.is_staff && (
                                        <div className='bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg mb-4 border border-purple-100'>
                                            <p className='font-semibold text-purple-800 text-sm'>
                                                {/* 👤 {space.owner || space.owner_username || space.owner__username || 'N/A'} */}
                                                👤 {space.owner || 'N/A'}
                                            </p>
                                            <p className='font-semibold text-purple-800 text-sm'>
                                                📧 {space.owner_email || space.owner__email || 'N/A'}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className='space-y-2 mb-6'>
                                        <div className="text-2xl font-bold text-indigo-600">₹{space.rent}/month</div>
                                        <div className="text-lg text-gray-600">Deposit: ₹{space.deposit}</div>
                                        <div className="text-sm text-gray-500">📍 {space.district}, {space.state}</div>
                                    </div>

                                    <hr className='my-4 border-gray-200' />

                                    {/* Role-Based Buttons */}
                                    {user && user.id === (space.owner_id || space.owner_user_id) ? (
                                        <div className='flex flex-col sm:flex-row gap-3'>
                                            <button 
                                                onClick={() => handleEditSpace(space)}
                                                className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm'
                                            >
                                                🛠️ Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteSpace(space.id)}
                                                className='flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm'
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    ) : user?.is_staff ? (
                                        <div className='space-y-3'>
                                            <button 
                                                onClick={() => handleEditSpace(space)}
                                                className='w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all'
                                            >
                                                ✏️ Edit Space
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteSpace(space.id)}
                                                className='w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all'
                                            >
                                                🗑️ Delete Space
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleInterestClick(space)} 
                                            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed text-lg'
                                            disabled={space.is_occupied}
                                        >
                                            📩 {space.is_occupied ? '🔒 Occupied' : 'Express Interest'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {selectedSpace && isModalOpen && (
                    <InterestModal 
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        space={selectedSpace}
                    />
                )}
            </div>
        </div>
    );
};

export default RentSpaceList;
