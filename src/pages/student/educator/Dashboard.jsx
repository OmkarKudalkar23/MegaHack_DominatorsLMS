import { useState } from "react";

const EducatorDashboard = () => {
  const [notifications] = useState(["New student enrolled!", "Assignment submitted"]);

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-6 animate-fadeIn">Educator Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-orange-500 rounded-lg shadow-lg transform hover:scale-105 transition">
          <p className="text-xl font-semibold">📚 Total Courses</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="p-6 bg-blue-500 rounded-lg shadow-lg transform hover:scale-105 transition">
          <p className="text-xl font-semibold">👨‍🎓 Total Students</p>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="p-6 bg-green-500 rounded-lg shadow-lg transform hover:scale-105 transition">
          <p className="text-xl font-semibold">🔔 Notifications</p>
          <p className="text-2xl font-bold">{notifications.length}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Student Growth</h2>
        <div className="flex justify-center items-end gap-4 h-40">
          {[10, 20, 35, 50, 80, 95, 120].map((value, index) => (
            <div
              key={index}
              className="w-8 bg-purple-500 rounded-lg transition-all duration-500"
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;
