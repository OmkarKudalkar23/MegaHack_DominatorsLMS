import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { assets } from '../../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../../components/student/Footer';
import Youtube from 'react-youtube'

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);


  const { allCourses, calculateRating, calculateChapterTime ,currency,calculateCourseDuration, calculateNoOfLectures} = useContext(AppContext);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(course => course._id === id);
      setCourseData(findCourse || null);
    }
  }, [allCourses, id]);

  if (!courseData) {
    return <p className="text-center text-gray-500">Loading course details...</p>;
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
    <div className="flex md:flex-row flex-col gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

      {/* Left Column */}
      <div className="max-w-xl z-10 text-gray-500">
        <h1 className="md:text-4xl text-3xl font-bold text-blue-300">
          {courseData?.courseTitle}
        </h1>

        {/* Course Description */}
        <p className="text-gray-600 text-lg leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: courseData?.courseDescription?.slice(0, 200) || '' }}></p>

        {/* ⭐ Review and Rating Section */}
        <div className="flex items-center space-x-2 mt-3">
          <p>{calculateRating(courseData) || 0}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                className="w-3.5 h-3.5"
                key={i}
                src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                alt={i < Math.floor(calculateRating(courseData)) ? "Filled Star" : "Empty Star"}
              />
            ))}
          </div>
          <p className="text-blue-100">{courseData?.courseRatings?.length || 0}</p>
        </div>

        {/* 📖 Course Content Section */}
        <div className="pt-5">
          {courseData?.courseContent?.map((chapter, index) => (
            <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
              <div className="flex items-center justify-between px-3 py-3 cursor-pointer select-none" onClick={() => toggleSection(index)}>
                <div className="flex items-center gap-2">
                  <img src={assets.down_arrow_icon} alt="Expand" className="w-4 h-4" />
                  <p className={`font-medium md:text-lg text-md ${chapter.chapterTitle === 'Introduction to JavaScript' ? 'text-blue-300' : ''}`}>
                    {chapter.chapterTitle}
                  </p>
                </div>
                <p className="text-gray-600">{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
              </div>

              {/* Lectures List */}
              <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li key={i} className="flex items-start gap-2 py-1">
                      <img src={assets.play_icon} alt="" className="w-4 h-4 mt-1" />
                      <div className="flex justify-between w-full text-gray-800 text-sm md:text-base">
                        {/* Left-aligned Lecture Title */}
                        <p className="flex-1">{lecture.lectureTitle}</p>

                        {/* Right-aligned Preview & Duration */}
                        <div className="flex gap-2 text-right">
                          {lecture.isPreviewFree && <p onClick={()=>setPlayerData({
                            videoId:lecture.lectureUrl.split('/').pop()
                          })}
                          className="text-blue-500 cursor-pointer">Preview</p>}
                          <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Course Description Section */}
        <div>
          <h3 className='text-3xl font-semibold text-blue-300 pt-2 pb-2 '>Course Description</h3>
          <div className="pt-3 text-gray-700 leading-relaxed md:text-lg text-md bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm rich-text">
            <div dangerouslySetInnerHTML={{ __html: courseData?.courseDescription }} />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="max-w-[480px] sm:max-w-[520px] z-10 shadow-lg rounded-2xl overflow-hidden bg-white border border-gray-200">
    {playerData ? <Youtube videoId={playerData.videoId} opts={{playerVars :{
        autoplay :1
      }}} iframeClassName='w-full aspect-video'/>

      : <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="w-full h-64 object-cover" />
    }
  
 

  <div className="p-6 space-y-4">
    {/* Time Left Section */}
    <div className="flex items-center gap-3 text-red-500 text-lg font-medium">
   

      <img className="w-5 h-5" src={assets.time_left_clock_icon} alt="Time Left" />
      
    


      
      <p><span className="font-semibold">5 days</span> left at this price</p>
    </div>

    {/* Pricing Section */}
    <div className="flex gap-3 items-center">
      <p className="text-2xl font-bold text-blue-800">
        {currency}
        {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
      </p>
      <p className="text-lg text-gray-500 line-through">{currency} {courseData.coursePrice}</p>
      <p className="text-lg text-red-500 font-semibold">{courseData.discount}% off</p>
    </div>

    {/* Course Details Section */}
    <div className="flex items-center text-gray-500 text-base gap-4">
      <div className="flex items-center gap-2">
        <img className="w-4 h-4" src={assets.star} alt="Rating" />
        <p>{calculateRating(courseData)}</p>
      </div>
      <div className="h-5 w-px bg-gray-400"></div>
      <div className="flex items-center gap-2">
        <img className="w-4 h-4" src={assets.time_clock_icon} alt="Duration" />
        <p>{calculateCourseDuration(courseData)}</p>
      </div>
      <div className="h-5 w-px bg-gray-400"></div>
      <div className="flex items-center gap-2">
        <img className="w-4 h-4" src={assets.time_clock_icon} alt="Lectures" />
        <p>{calculateNoOfLectures(courseData)}</p>
      </div>
    </div>

    {/* Enroll Button */}
    <button className="mt-5 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-medium shadow-md">
      {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
    </button>

    {/* What's in the Course Section */}
    <div className="pt-4">
      <p className="text-lg font-semibold text-gray-800">What's in the course?</p>
      <ul className="list-disc ml-6 pt-2 text-gray-600 space-y-1">
        <li>Lifetime access with free updates.</li>
        <li>Step-by-step, hands-on project guidance.</li>
        <li>Downloadable resources and source code.</li>
        <li>Quizzes to test your knowledge.</li>
        <li>Certificate of completion.</li>
      </ul>
    </div>
  </div>
</div>
    </div>
    <Footer/>
    </>
  );
};

export default CourseDetails;
