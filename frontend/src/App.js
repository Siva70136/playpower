import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;