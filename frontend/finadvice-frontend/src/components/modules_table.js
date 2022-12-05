import {React} from "react";
import { Link } from "react-router-dom";
export default function ModuleTable(props) {
    const modules = props.modules;
    return(
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
                                        <tr className="bg-white  dark:bg-neutral-50 dark:border-gray-700" key={module.id}>
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
    )
}