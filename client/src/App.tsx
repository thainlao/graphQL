import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Info from './components/Info';
import Logout from './components/Logout';
 // Предполагается, что у вас есть компонент LoginPage для входа

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-user" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
        <Route path='/info' element={<Info />}/>
        <Route path='/logout' element={<Logout />}/>
      </Routes>
    </Router>
  );
}

export default App;