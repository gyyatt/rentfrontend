import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);  // ✅ FIXED: null, not JSON.parse
    const [userLoading, setUserLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ FIXED: Load token safely from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        } else {
            setUserLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
                        headers: {
                            Authorization: `Bearer ${token}`  // ✅ BEARER
                        }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error("Token invalid. Logging out.");
                    logout();
                } finally {
                    setUserLoading(false);
                }
            };
            fetchUser();
        } else {
            setUser(null);
            setUserLoading(false);
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    };

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout, userLoading }}>
            {children}
        </UserContext.Provider>
    );
};
