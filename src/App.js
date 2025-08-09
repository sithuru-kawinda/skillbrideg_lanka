import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import StudentRegistration from './pages/StudentRegistration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentregistration" element={<StudentRegistration />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
