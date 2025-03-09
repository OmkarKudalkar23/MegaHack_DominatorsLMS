import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [tuitions, setTuitions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCourses([
        { name: "JavaScript", students: 120, earnings: 8500 },
        { name: "React", students: 90, earnings: 7000 },
        { name: "HTML & CSS", students: 150, earnings: 9500 },
        { name: "Bootstrap", students: 80, earnings: 6000 },
      ]);
      setEarnings(8500 + 7000 + 9500 + 6000);
      setTuitions([
        { date: "2025-03-10", topic: "React Hooks" },
        { date: "2025-03-12", topic: "CSS Grid & Flexbox" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-5 bg-gray-900 text-white min-h-screen">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Educator Dashboard
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-400 mt-5">Loading...</p>
      ) : (
        <motion.div
          className="mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Earnings Section */}
          <motion.div
            className="bg-blue-700 p-5 rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">Total Earnings</h2>
            <p className="text-3xl font-bold">₹{earnings}</p>
          </motion.div>

          {/* Courses Section */}
          <h2 className="text-xl font-semibold mt-5">Your Courses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition"
                whileHover={{ scale: 1.1 }}
              >
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="text-sm text-gray-400">{course.students} students</p>
                <p className="text-sm text-green-400 font-bold">₹{course.earnings} earned</p>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Tuitions Calendar */}
          <h2 className="text-xl font-semibold mt-5">Upcoming Tuitions</h2>
          <ul className="mt-3">
            {tuitions.map((tuition, index) => (
              <motion.li
                key={index}
                className="bg-gray-800 p-3 rounded-md mb-2 flex justify-between"
                whileHover={{ scale: 1.02 }}
              >
                <span>{tuition.date}</span>
                <span>{tuition.topic}</span>
              </motion.li>
            ))}
          </ul>

          {/* Graph Visualization (Styled Bars) */}
          <h2 className="text-xl font-semibold mt-5">Earnings Per Course</h2>
          <div className="bg-gray-800 p-5 rounded-lg mt-3">
            <motion.div
              className="flex space-x-4 items-end justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  whileHover={{ scaleY: 1.1 }}
                >
                  {/* Graph Bar */}
                  <div
                    className="bg-blue-500 w-16 rounded-md text-center transition-all"
                    style={{
                      height: `${course.earnings / 100}px`, // Scaling bar height
                      minHeight: "40px",
                    }}
                  ></div>
                  
                  {/* Earnings Label */}
                  <p className="text-sm mt-2 text-gray-300">₹{course.earnings}</p>

                  {/* Course Name */}
                  <p className="text-sm mt-1 text-white font-semibold">{course.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
