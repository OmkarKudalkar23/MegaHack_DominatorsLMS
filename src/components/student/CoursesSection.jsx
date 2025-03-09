import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="w-full py-16 md:px-40 px-8 bg-black">
      <h2 className="text-3xl font-bold text-white">
        Experience the Industry Specialists
      </h2>
      <p className="text-sm md:text-base text-gray-400 mt-3">
        Explore cutting-edge courses across diverse domains, from foundational HTML to advanced Full Stack development, enhancing technical expertise.
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-6">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to={'/course-list'}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-300 border border-gray-600 px-10 py-3 rounded mt-6 inline-block hover:bg-gray-800 hover:border-gray-500 transition"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
