import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import StudentRegistration from './pages/StudentRegistration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChoosePathPage from './pages/ChoosePathPage';
import RecruiterDashboard from './pages/RecruiterDashboard';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentregistration" element={<StudentRegistration />} />
        <Route path="/choosepathpage" element={<ChoosePathPage />} />
        <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
        
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
