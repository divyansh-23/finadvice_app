import Login from './components/login';
import SignUp from './components/signup';
import { AuthProvider, useAuth } from './components/auth';
import { RequireAuth } from './components/RequireAuth';
import NavBar from './components/navbar';
import VideoPlayer from './components/video';
import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from './components/dashboard';
import CourseModule from './components/modules';


function App() {
  return (
  <div className="App">
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
        <Route path="/course_module" element={<RequireAuth><CourseModule/></RequireAuth>}/>
        <Route path="/video_module" element={<RequireAuth><VideoPlayer/></RequireAuth>}/>
      </Routes>
    </AuthProvider>
  </div>
  );
}

export default App;
