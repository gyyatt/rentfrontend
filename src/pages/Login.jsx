import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(UserContext);
    const [formdata, setFormdata] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/`, formdata);
          console.log("✅ Login success:", res.data);
          
          // ✅ JWT returns {access: "...", refresh: "..."}
          const accessToken = res.data.access;
          setToken(accessToken);
          localStorage.setItem('token', accessToken);  // ✅ Save ACCESS token only
          navigate('/rentspacelist');
      } catch (error) {
          // ... error handling
      } finally {
          setIsLoading(false);
      }
  };


    return (
        <div className='flex flex-col max-h-screen justify-center items-center mt-10 gap-6 bg-gray-50'>
            <h1 className='text-4xl font-bold text-gray-800'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center text-center items-center border-2 border-gray-300 bg-white rounded-2xl w-96 p-8 shadow-xl'>
                <input 
                    onChange={handleInput} 
                    name='username' 
                    value={formdata.username} 
                    type="text" 
                    placeholder='Username' 
                    className='border border-gray-300 text-center w-full p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input 
                    onChange={handleInput} 
                    name='password' 
                    value={formdata.password} 
                    type="password" 
                    placeholder='Password' 
                    className='border border-gray-300 text-center w-full p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <button 
                    type='submit' 
                    disabled={isLoading}
                    className='bg-blue-600 text-white rounded-2xl px-8 py-3 font-semibold hover:bg-blue-700 transition-all disabled:bg-blue-400 w-full'
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className='text-sm text-gray-500'>Don't have an account? <a href='/register' className='text-blue-600 hover:underline'>Register</a></p>
        </div>
    );
};

export default Login;
