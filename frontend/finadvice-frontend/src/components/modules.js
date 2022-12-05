import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useLocation } from 'react-router-dom';
import { ADD_MODULE_URL, MODULE_LIST_URL, STUDENT_COURSES } from "../api_config";
import ModuleTable from "./modules_table";

export default function CourseModule(){
    const auth = useAuth();
    const userType = auth.userType

    const location = useLocation();
    const { course } = location.state;

    const [modules, setModules] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const [moduleName, setModuleName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setURL] = useState('');

    const handleNameChange = e => setModuleName(e.target.value);
    const handleDescriptionChange = e => setDescription(e.target.value);
    const handleURLChange = e => setURL(e.target.value);

    const [addCoursesError, setAddCoursesError] = useState(false);
    const [effect, setEffect] = useState(false);

    const [enrolledCourses, setStudentEnrolledCourses] = useState([]);
    const userId = auth.user['user']['id'];

    useEffect (() => {
        axios.get(MODULE_LIST_URL+`?course_id=`+course['id'])
        .then(res => {
            setModules(res.data);
        })
        .catch(err => console.log(err))

        //Enrolled courses
        const fetchStudentEnrolledCourses = async () => {
            axios.get(STUDENT_COURSES+`?user_id=`+userId)
            .then(
                res => setStudentEnrolledCourses(res.data['courses'])
            )
            .catch(err => console.log(err)); 
        }
        fetchStudentEnrolledCourses();
    },[effect]);

    const handleAddModuleSave = () => {
        var data = JSON.stringify({
            "module": {
              "name": moduleName,
              "description": description,
              "media_url": url,
              "course_id": course.id
            }
          });
          
          var config = {
            method: 'post',
            url: ADD_MODULE_URL,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            setShowAddModal(false);
            setEffect(!effect);
          })
          .catch(function (error) {
            console.log(error);
            setAddCoursesError(true)
          });
    }
    
    return(
        <div className="container mx-auto mt-8">
            {userType === 'instructor' && 
                <div>
                    <div className="grid lg:grid-cols-3 mb-4">
                        <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setShowAddModal(true)}>Add a new module</button>
                    </div>
                    <hr />
                </div>
            
            }

            <div className="mb-8 text-left">
                <h1 className="text-2xl text-blue-600">Course: {course.name}</h1>
                <h1 className="text-2xl text-blue-600">Description: {course.description}</h1>
                <h1 className="text-2xl text-blue-600">Start Date: {course.start_date}</h1>
            </div>
            {userType === 'student' && enrolledCourses.map(course => course['id']).indexOf(course.id) === -1 &&

                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Pleases enroll in the course to view its contents!</strong>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            }

            {  (userType === 'student' && enrolledCourses.map(course => course['id']).indexOf(course.id) !== -1) ? <ModuleTable modules={modules} />: null }
            { userType === 'instructor' ? <ModuleTable modules={modules} />: null}


            {showAddModal ? (
            <div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Add a new module
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
                                            placeholder="Module Name"
                                            onChange={handleNameChange}
                                            value={moduleName}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <textarea
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Module Description"
                                            onChange={handleDescriptionChange}
                                            value={description}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Media URL"
                                            onChange={handleURLChange}
                                            value={url}
                                        />
                                    </div>
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
                                            onClick={() => handleAddModuleSave()}
                                        >
                                            Add module
                                        </button>
                                    </div>

                                </form>
                            </div>
                            { addCoursesError && <div>Module creation failed</div>}
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
      ) : null}

        </div>
        
    );
}