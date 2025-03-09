import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/student/student/Home';
import CoursesList from './pages/student/student/CoursesList';
import CourseDetails from './pages/student/student/CourseDetails';
import MyEnrollments from './pages/student/student/MyEnrollments';
import Player from './pages/student/student/Player';
import Loading from './components/student/Loading';
import Educator from './pages/student/educator/Educator';
import Dashboard from './pages/student/educator/Dashboard';
import AddCourse from './pages/student/educator/AddCourse';
import MyCourses from './pages/student/educator/MyCourses';
import StudentsEnrolled from './pages/student/educator/StudentsEnrolled';
import Navbar from './components/student/Navbar';
import FileToSpeech from './components/student/FileToSpeech';
import DebugGame from './components/student/DebugGame';
import CodingGame from './components/student/CodingGame';

const App = () => {
   const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="min-h-screen bg-black text-white">
      {!isEducatorRoute && <Navbar />}
      
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="speech-converter" element={<FileToSpeech />} /> 
        <Route path="debug-game" element={<DebugGame />} /> 
        <Route path="code-game" element={<CodingGame />} /> 


        {/* Educator Routes */}
        <Route path="/educator/*" element={<Educator />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
