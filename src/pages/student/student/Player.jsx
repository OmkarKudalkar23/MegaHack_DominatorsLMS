import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import { assets } from '../../../assets/assets';
const Player = () => {
  const{enrolledCourses , calculateChapterTime} = useContext(AppContext);
 const{courseId} = useParams()
 const {courseData, setCourseData} = useState(null)
 const {openSections, setOpenSections} = useState({})
 const {playerData, setPlayerData} = useState(null )

 const getCourse = ()=>{
  enrolledCourses.map(()=>{
    if(courseData._id=== courseId){
      setCourseData(course)
    }
  })
 }

 const toggleSection = (index) => {
  setOpenSections((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

 useEffect(() =>{
  getCourseData()
 },[])
  return (
    <>
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
  {/* Left Column */}
  <div className="text-gray-800">
    <h2 className="text-xl font-semibold">Course Structure</h2>
    <div className="pt-5">
              {courseData && courseContent.map((chapter, index) => (
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
                              {lecture.lectureUrl && <p onClick={()=>setPlayerData({
                                ...lecture, chapter:index+1,lecture :i+1 
                              })}
                              className="text-blue-500 cursor-pointer">Watch</p>}
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
  </div>

  {/* Right Column */}
  <div></div>
</div>
      
      </>
  )
}

export default Player
