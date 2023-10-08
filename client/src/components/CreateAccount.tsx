import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '../mutations/user';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);

    const [createUser] = useMutation(CREATE_USER);
    const [loginUser] = useMutation(LOGIN_USER);


    const handleCreateAccount = async () => {
        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        username,
                        password,
                        age,
                    },
                },
            });
            console.log('User created:', data.registerUser);

            const loginResult = await loginUser({
                variables: {
                    username,
                    password,
                },
            });
            console.log('User logged in, token:', loginResult.data.loginUser);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Создать аккаунт</h2>
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
                <input
                    type="number"
                    placeholder="Возраст..."
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <button onClick={handleCreateAccount}>Создать аккаунт</button>
            </form>

            <Link to='/'>ЛОГИН</Link>

        </div>
    );
};

export default CreateAccount;