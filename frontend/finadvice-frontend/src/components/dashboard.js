import axios from "axios";
import React, {useState, useEffect} from "react";
import { useAuth } from "./auth";
import { ALL_COURSES_URL, ENROLLMENT_URL, INSTRUCTOR_COURSES, STUDENT_COURSES } from "../api_config";
import { Link } from "react-router-dom";

export default function Dashboard (){
    const auth = useAuth();
    const [courses, setCourses] = useState(null);

    const [showAddModal, setShowAddModal] = React.useState(false);

    const [courseName, setCourseName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [enrollLimit, setEnrollLimit] = useState('');

    const handleNameChange = e => setCourseName(e.target.value);
    const handleCategoryChange = e => setCategory(e.target.value);
    const handleDescriptionChange = e => setDescription(e.target.value);
    const handleStartDateChange = e => setStartDate(e.target.value);
    const handleEnrollLimit = e => setEnrollLimit(e.target.value);

    const [addCoursesError, setAddCoursesError] = useState('');
    // const [showAddCoursesError, setShowAddCoursesError] = useState('');

    const [runEffect, setRunEffect] = useState(false);
    const [instructorCourses, setInstructorCourses] = useState(null);
    const [studentEnrolledCourses, setStudentEnrolledCourses] = useState(null);

    const userId = auth.user['user']['id'];
    const userType = auth.userType;
    useEffect(() => {
        const fetchCouresData = async () =>{
            await axios.get(ALL_COURSES_URL)
            .then(
                res => {
                    setCourses(res.data);
                }
            )
            .catch(err => console.log(err))
        }
        fetchCouresData();
        // Instructor courses
        const fetchInstructorCoursesData = async () => {
            axios.get(INSTRUCTOR_COURSES+`?id=`+userId)
            .then(
                res => {
                    setInstructorCourses(res.data);
                }
            )
            .catch(err => console.log(err))
        }
        

        // Students Enrolled Courses
        const fetchStudentEnrolledCourses = async () => {
            axios.get(STUDENT_COURSES+`?user_id=`+userId)
            .then(
                res => setStudentEnrolledCourses(res.data)
            )
            .catch(err => console.log(err))
        }
        fetchStudentEnrolledCourses();

        if (userType === 'instructor'){
            fetchInstructorCoursesData();
        } else {
            fetchStudentEnrolledCourses();
        }

    },[runEffect]);

    const handleAddModalSave = () => {
        var data = JSON.stringify({
            "course": {
              "name": courseName,
              "category": category,
              "description": description,
              "start_date": startDate,
              "course_enroll_limit": enrollLimit,
              "user_id": auth.user['user']['id']
            }
        });
        var config = {
            method: 'post',
            url: ALL_COURSES_URL,
            headers: { 
              'Content-Type': 'application/json', 
            },
            data : data
          };
          axios(config)
          .then(function (res) {
            const r = res.data;
            if (r["course"] !== undefined && r["course"]["id"]){
                setCourseName('');
                setCategory('');
                setDescription('');
                setStartDate('');
                setEnrollLimit('');
                setShowAddModal(false);
                setRunEffect(!runEffect);
            }
            else{
                setAddCoursesError(true)
            }
          })
          .catch(function (error) {
            console.log(error);
        });

    }

    const handleCourseEnroll = (courseId, userId) => {

        var data = JSON.stringify({
            "enrollment": {
              "course_id": courseId,
              "user_id": userId
            }
          });
          
          var config = {
            method: 'post',
            url: ENROLLMENT_URL,
            headers: { 
              'Content-Type': 'application/json', 
            },
            data : data
          };
          
          axios(config)
          .then(function (response){
            setRunEffect(!runEffect);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    return(
        
        <div className="container mx-auto mt-8">
            {userType === 'instructor' && 
                <div>
                    <div className="grid lg:grid-cols-3 mb-4">
                        <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setShowAddModal(true)}>Add a new course</button>
                    </div>
                    <hr />
                </div>
            
            }
            { userType === 'instructor' && instructorCourses && instructorCourses['courses'].length !== 0 &&
                <div className="mt-8">
                    <h2 className="text-5xl font-normal leading-normal mt-0 mb-2 text-zinc-800 text-left">
                        My Courses
                    </h2>
                </div>
            }

            <div className="grid lg:grid-cols-3">
                {instructorCourses && instructorCourses['courses'].map(course => {
                    return(
                        <div key={course.id} className="container mx-auto mt-8">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg items-stretch h-full">
                                <img className="w-full" src="/static/images/finance.png" alt="Sunset in the mountains" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2"><Link to = "/course_module" state={{ course: course }}>{course.name}</Link></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            { instructorCourses && instructorCourses['courses'].length !== 0 &&
                <div className="mt-8 mb-8">
                    <hr />
                </div>
            }

            {/* Student Enrolled Courses */}
            { userType === 'student' && studentEnrolledCourses && studentEnrolledCourses['courses'].length !== 0 &&
                <div className="mt-8">
                    <h2 className="text-5xl font-normal leading-normal mt-0 mb-2 text-zinc-800 text-left">
                        Enrolled Courses
                    </h2>
                </div>
            }
            <div className="grid lg:grid-cols-3">
                {studentEnrolledCourses && studentEnrolledCourses['courses'].map(course => {
                    return(
                        <div key={course.id} className="container mx-auto mt-8">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg items-stretch h-full">
                                <img className="w-full" src="/static/images/finance.png" alt="Sunset in the mountains" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2"><Link to = "/course_module" state={{ course: course}}>{course.name}</Link></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            { studentEnrolledCourses && studentEnrolledCourses['courses'].length !== 0 &&
                <div className="mt-8 mb-8">
                    <hr />
                </div>
            }

            { courses && courses['courses'].length !== 0 &&
                <div className="mt-8">
                    <h2 className="text-5xl font-normal leading-normal mt-0 mb-2 text-zinc-800 text-left">
                        All Courses
                    </h2>
                </div>
            }
            <div className="grid lg:grid-cols-3">
                {courses && courses['courses'].map(course => {
                    return(
                        <div key={course.id} className="container mx-auto mt-8">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg items-stretch h-full">
                                <img className="w-full" src="/static/images/finance.png" alt="Sunset in the mountains" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2"><Link to = "/course_module" state={{ course: course }}>{course.name}</Link></div>
                                </div>
                                { auth.userType === 'student' && studentEnrolledCourses && studentEnrolledCourses['courses'].map(course => course['id']).indexOf(course.id) === -1 &&
                                    <button onClick = {() => handleCourseEnroll(course.id, userId)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4">
                                        Enroll
                                    </button>

                                }
                                { auth.userType === 'student' && studentEnrolledCourses && studentEnrolledCourses['courses'].map(course => course['id']).indexOf(course.id) !== -1 &&
                                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1 mb-4">
                                        Enrolled
                                    </span>

                                }
                                
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {showAddModal ? (
            <div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add a new course
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowAddModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    x
                                </span>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <form>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Course Name"
                                            onChange={handleNameChange}
                                            value={courseName}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Category"
                                            onChange={handleCategoryChange}
                                            value={category}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <textarea
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Description"
                                            onChange={handleDescriptionChange}
                                            value={description}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="date"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Start Date"
                                            onChange={handleStartDateChange}
                                            value={startDate}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Enroll Limit"
                                            onChange={handleEnrollLimit}
                                            value={enrollLimit}
                                        />
                                    </div>

                                </form>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => handleAddModalSave()}
                                >
                                    Add course
                                </button>
                            </div>
                            { addCoursesError && <div>Course creation failed</div>}
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
      ) : null}
    </div>
        
);
}