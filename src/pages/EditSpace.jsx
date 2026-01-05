// src/pages/EditSpace.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const EditSpace = () => {
    const { id } = useParams();
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        space_type: '',
        rent: '',
        deposit: '',
        is_occupied: false,
        street_address: '',
        district: '',
        state: ''
    });

    useEffect(() => {
        // Fetch current data to populate form
        const fetchSpace = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/rentspace/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData(res.data);
            } catch (err) {
                console.error("Error fetching space details", err);
            }
        };
        fetchSpace();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/rentspace/${id}/`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Updated successfully!");
            navigate('/rentspacelist'); // Redirect back to list
        } catch (err) {
            console.error("Update failed", err);
            alert("Error updating property.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="space_type" value={formData.space_type} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Type" />
                <input name="rent" type="number" value={formData.rent} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Rent" />
                <input name="deposit" type="number" value={formData.deposit} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Deposit" />
                
                <div className="flex items-center">
                    <input name="is_occupied" type="checkbox" checked={formData.is_occupied} onChange={handleChange} className="mr-2" />
                    <label>Is Occupied?</label>
                </div>

                <input name="street_address" value={formData.street_address} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Address" />
                
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditSpace;