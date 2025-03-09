import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import SearchBar from '../../../components/student/SearchBar';
import CourseCard from '../../../components/student/CourseCard';
import { assets } from '../../../assets/assets';
import Footer from '../../../components/student/Footer';

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]); // ✅ Ensures it's never undefined

  useEffect(() => {
    if (Array.isArray(allCourses) && allCourses.length > 0) { // ✅ Ensures allCourses exists
      setFilteredCourse(
        input
          ? allCourses.filter((item) =>
              item.courseTitle?.toLowerCase().includes(input.toLowerCase()) // ✅ Added optional chaining
            )
          : allCourses
      );
    } else {
      setFilteredCourse([]); // ✅ Prevents undefined state
    }
  }, [allCourses, input]);

  return (
  <>
    <div className="relative md:px-36 px-8 text-left">
      <div className="flex md:flex-row flex-col gap-6 items-center justify-between w-full">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold text-blue-400">Course List</h1>
          <p className="text-gray-500">
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
              Home
            </span>
            <span className="text-blue-500"> / Course List</span>
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <SearchBar data={input} />
        </div>
      </div>

      {input && (
        <div className="flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 w-fit">
          <p>{input}</p>
          <img
            src={assets.cross_icon}
            alt="Clear search"
            className="cursor-pointer"
            onClick={() => navigate('/course-list')}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
        {filteredCourse.length > 0 ? (
          filteredCourse.map((course, index) => <CourseCard key={index} course={course} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CoursesList;
