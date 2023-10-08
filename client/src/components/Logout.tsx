import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate(); // Используйте useNavigate как функцию

    const handleLogout = () => {
        // Удалите токен из локального хранилища (или из другого места, где вы его храните)
        localStorage.removeItem('token');

        // Перенаправьтесь на страницу входа (или на другую страницу после выхода)
        navigate('/');
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;