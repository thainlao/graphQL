import { Link, useLocation, useNavigate } from 'react-router-dom';

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { username } = location.state || {}; // Получаем username из состояния маршрута

  const handleLogout = () => {
    localStorage.removeItem('token');


    navigate('/');
  };

  return (
    <div>
      {username ? (
        <div>
          <p>Добро пожаловать, {username}!</p>
          <p></p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <p>Вы не вошли в систему</p>
      )}
      <Link to="/logout">LOGOUT</Link>
    </div>
  );
};

export default Info;