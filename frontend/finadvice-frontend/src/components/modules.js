import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { MODULE_LIST_URL } from "../api_config";

export default function CourseModule(){
    const location = useLocation();
    const { course } = location.state;
    const [modules, setModules] = useState(null);
    
    useEffect (() => {
        axios.get(MODULE_LIST_URL+`?course_id=`+course['id'])
        .then(res => {
            console.log(res.data)
            setModules(res.data);
        })
        .catch(err => console.log(err))
    },[]);

    return(
        <div className="container mx-auto mt-8">

            <div className="mb-8 text-left">
                <h1 className="text-2xl text-blue-600">Course: {course.name}</h1>
                <h1 className="text-2xl text-blue-600">Description: {course.description}</h1>
                <h1 className="text-2xl text-blue-600">Start Date: {course.start_date}</h1>
            </div>

            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-green-200 dark:bg-teal-500 dark:text-neutral-100">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Module ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Module Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Description
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            modules && modules['course_modules'].map(module => {
                                return(
                                    <tr className="bg-white  dark:bg-neutral-50 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-neutral-900 whitespace-nowrap dark:text-neutral-900">
                                        {module.id}
                                    </th>
                                    <td className="py-4 px-6 text-neutral-900">
                                        <Link to="/video_module" state={{ module: module }}>
                                            {module.name}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 text-neutral-900">
                                        {module.description}
                                    </td>
                                    <td className="py-4 px-6 text-neutral-900">
                                        {module.created_at}
                                    </td>
                            </tr>
                                );
                            })
                        }
                            
                        
                    </tbody>
                </table>
            </div>

        </div>
        
    );
}