import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const CreateRentSpace = () => {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    // State for non-file form data
    const [formdata, setFormdata] = useState({
        space_type: '',
        rent: '',
        deposit: '',
        country: '',
        state: '',
        district: '',
        street_address: '',
        is_occupied: false, // Default status
    });

    // State for the image file
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. General handler for text/number inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormdata(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // 2. Handler for the file input
    const handleFileChange = (e) => {
        // e.target.files[0] contains the selected file object
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 3. Create FormData object for file/data submission
        const formDataPayload = new FormData();
        
        // Append all text/number fields
        Object.keys(formdata).forEach(key => {
            formDataPayload.append(key, formdata[key]);
        });
        
        // 4. Append the image file using the name expected by the serializer (image_file)
        if (imageFile) {
            formDataPayload.append('image_file', imageFile); 
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/rentspace/`, formDataPayload, {
                headers: {
                    // Critical: Set the Content-Type to multipart/form-data
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });

            alert('Rental space created successfully!');
            navigate('/rentspacelist'); // Redirect to the list view

        } catch (err) {
            console.error("Creation Failed:", err.response?.data || err.message);
            setError(err.response?.data?.detail || "Failed to create listing. Check input values.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Create New Rental Space Listing</h1>
            
            {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

            <form onSubmit={handleSubmit} className='max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg space-y-4'>
                
                {/* Space Type */}
                <input type="text" name="space_type" value={formdata.space_type} onChange={handleInputChange} 
                    placeholder="Space Type (e.g., Commercial, Residential)" required 
                    className='w-full p-2 border border-gray-300 rounded' />

                {/* Rent & Deposit */}
                <div className='flex space-x-4'>
                    <input type="number" name="rent" value={formdata.rent} onChange={handleInputChange} 
                        placeholder="Monthly Rent ($)" required 
                        className='w-1/2 p-2 border border-gray-300 rounded' />
                    <input type="number" name="deposit" value={formdata.deposit} onChange={handleInputChange} 
                        placeholder="Security Deposit ($)" required 
                        className='w-1/2 p-2 border border-gray-300 rounded' />
                </div>
                
                {/* Location Fields */}
                <div className='grid grid-cols-3 gap-4'>
                    <input type="text" name="country" value={formdata.country} onChange={handleInputChange} placeholder="Country" required className='p-2 border border-gray-300 rounded' />
                    <input type="text" name="state" value={formdata.state} onChange={handleInputChange} placeholder="State" required className='p-2 border border-gray-300 rounded' />
                    <input type="text" name="district" value={formdata.district} onChange={handleInputChange} placeholder="District" required className='p-2 border border-gray-300 rounded' />
                </div>
                
                <textarea name="street_address" value={formdata.street_address} onChange={handleInputChange} 
                    placeholder="Street Address / Description" required 
                    className='w-full p-2 border border-gray-300 rounded' rows="3"></textarea>

                {/* Image Upload Input */}
                <label className="block text-sm font-medium text-gray-700 pt-2">
                    Upload Space Image:
                </label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className='w-full p-2 border border-gray-300 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                />
                
                {/* Status (Optional checkbox) */}
                <div className='flex items-center'>
                    <input 
                        type="checkbox" 
                        name="is_occupied" 
                        checked={formdata.is_occupied} 
                        onChange={handleInputChange} 
                        className='mr-2'
                    />
                    <label>Is currently occupied?</label>
                </div>

                <button 
                    type='submit' 
                    disabled={loading}
                    className='w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-150 disabled:bg-gray-400'
                >
                    {loading ? 'Uploading...' : 'Create Listing'}
                </button>
            </form>
        </div>
    );
};

export default CreateRentSpace;