import React, { useContext } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import Footer from "../../../components/student/Footer";
import { AppContext } from "../../../context/AppContext";

const MyEnrollments = () => {
  // Hardcoded course data
  const enrolledCourses = [
    {
      courseTitle: "Introduction to JavaScript",
      courseThumbnail: "/src/assets/html.png",
      duration: "4 weeks",
      completedLectures: 4,
      totalLectures: 10,
      status: "On Going",
    },
    {
      courseTitle: "React for Beginners",
      courseThumbnail: "/src/assets/node.png",
      duration: "6 weeks",
      completedLectures: 6,
      totalLectures: 12,
      status: "On Going",
    },
    {
      courseTitle: "Full Stack Development",
      courseThumbnail: "/src/assets/js.jpg",
      duration: "12 weeks",
      completedLectures: 8,
      totalLectures: 24,
      status: "On Going",
    },
    {
      courseTitle: "Python for Data Science",
      courseThumbnail: "/src/assets/react.png",
      duration: "8 weeks",
      completedLectures: 3,
      totalLectures: 10,
      status: "On Going",
    },
    {
      courseTitle: "Machine Learning with TensorFlow",
      courseThumbnail: "/src/assets/js.jpg",
      duration: "10 weeks",
      completedLectures: 5,
      totalLectures: 20,
      status: "On Going",
    },
    {
      courseTitle: "Cybersecurity Fundamentals",
      courseThumbnail: "/src/assets/react.png",
      duration: "5 weeks",
      completedLectures: 2,
      totalLectures: 8,
      status: "On Going",
    },
  ];
  const {navigate} = useContext(AppContext)

  return (
    <>
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold text-center">My Enrollments</h1>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
        {enrolledCourses.map((course, index) => {
          const progress = (course.completedLectures / course.totalLectures) * 100;

          return (
            <motion.div
              key={index}
              className="border rounded-lg p-4 shadow-lg flex flex-col items-center bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {/* Course Thumbnail */}
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-24 h-24 object-cover rounded-md"
              />

              {/* Course Title */}
              <h2 className="text-lg font-semibold mt-2 text-center">
                {course.courseTitle}
              </h2>

              {/* Duration */}
              <p className="text-sm text-gray-600 mt-1">Duration: {course.duration}</p>

              {/* Completion Status */}
              <p className="text-sm text-gray-600">
                Completed: {course.completedLectures}/{course.totalLectures} Lectures
              </p>

              {/* Progress Bar */}
              <div className="w-full mt-3">
                <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-2 bg-blue-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">{progress.toFixed(0)}% Completed</p>
              </div>

              {/* Status Button */}
              <motion.button onClick={()=> navigate('/player/'+ course._id)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {course.status}
              </motion.button>
            </motion.div>
          );
        })}
      </div>


      
     
    </div>
    <Footer/>
    </>
  );
};

export default MyEnrollments;
