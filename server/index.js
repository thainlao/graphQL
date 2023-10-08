require('dotenv').config();
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const users = [{ id: 1, username:"vasya", password:"password_here" }];
const jwt = require('jsonwebtoken');
const { authenticate } = require('./auth');
const app = express();
app.use(cors());
const secretKey = process.env.SECRET_KEY;

const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const deleteUserById = (id) => {
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        return deletedUser;
    }
    return null;
};

const root = {
    loginUser: ({ username, password }) => {
        // Find the user by username and password
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password');
        }
        // Generate and return a JSON Web Token (JWT) for the user
        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        return token;
    },

    registerUser: ({ input }) => {
        const newUser = createUser(input);
        users.push(newUser);
        return newUser;
    },

    getAllUsers: (args, req) => {
        return users;
    },

    getUser: (args, req) => {
        const user = authenticate(req); // Извлекаем информацию о пользователе из токена
        return user;
    },

    deleteUser: ({ id }) => {
        const user = authenticate(req);
        if (user.role !== 'admin') throw new Error('Unauthorized');
        const deletedUser = deleteUserById(id);
        if (!deletedUser) throw new Error('User not found');
        return deletedUser;
    }
}
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log('Сервер успешно запущен на 5000 порту'))