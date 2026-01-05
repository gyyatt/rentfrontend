import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const InterestModal = ({ isOpen, onClose, space }) => {
    const { user, token } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !space) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log('🔥 Token:', token);  
        console.log('🔥 User:', user);                
        
        if (!token) {
            alert('No token - please login again');
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/send-inquiry/`, {
                rent_space_id: space.id,
                space_type: space.space_type,
                seller_id: space.owner_user_id || space.owner.id,
                consumer_name: user.username,
                consumer_email: user.email || 'no-email@example.com',
                message: message
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // ✅ BEARER TOKEN
                    'Content-Type': 'application/json'
                }
            });

            alert(`✅ Email sent to ${space.owner}! They'll contact you soon.`);
            setMessage('');
            onClose();
        } catch (error) {
            console.error('Email error:', error.response?.data);
            alert("Failed: " + (error.response?.data?.detail || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
                <h2 className="text-2xl font-bold mb-4">Express Interest in:</h2>
                <p className="text-lg mb-4 text-blue-700">{space.space_type} (ID: {space.id})</p>
                
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message to the seller here..."
                        rows="4"
                        required
                        minLength="10"
                        className="w-full p-3 border border-gray-300 rounded resize-none mb-4 focus:ring-blue-500 focus:border-blue-500"
                    />
                    
                    <div className="flex justify-end space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            disabled={isSubmitting}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || message.length < 10}
                            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterestModal;
