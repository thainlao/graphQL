import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../mutations/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/info', { state: { username: username } }); // Передаем username в Info через состояние маршрута
    }
  }, [navigate, username]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          username,
          password,
        },
      });
      localStorage.setItem('token', data.loginUser);

      // После входа в систему, перенаправляем пользователя на страницу Info
      navigate('/info', { state: { username: username } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form>
        <input
          type="text"
          placeholder="Имя пользователя..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Войти</button>
      </form>

      <Link to="/create-user">РЕГИСТРАЦИЯ</Link>
    </div>
  );
};

export default Login;