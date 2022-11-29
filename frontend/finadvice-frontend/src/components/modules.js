import React from "react";
import { Link, useLocation } from 'react-router-dom'

export default function CourseModule(){
    const location = useLocation();
    const { course } = location.state;
    console.log(course);

    return(
        <div className="container mx-auto mt-8">
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-green-200 dark:bg-teal-500 dark:text-neutral-100">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Module ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Module Title
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Category
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr className="bg-white  dark:bg-neutral-50 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-neutral-900 whitespace-nowrap dark:text-neutral-900">
                                        {course.id}
                                    </th>
                                    <td className="py-4 px-6 text-neutral-900">
                                        <Link to="/video_module">
                                            {course.title}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 text-neutral-900">
                                        Laptop
                                    </td>
                                    <td className="py-4 px-6 text-neutral-900">
                                        $2999
                                    </td>
                            </tr>
                        
                    </tbody>
                </table>
            </div>

        </div>
        
    );
}