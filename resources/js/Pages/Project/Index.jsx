import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";

export default function Index({auth, projects}){
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Image</th>
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Date Created</th>
                                    <th className="px-3 py-2">Due Date</th>
                                    <th className="px-3 py-2">Created By</th>
                                    <th className="px-3 py-2">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    projects.data && projects.data.length ? (
                                        projects.data.map(project => (
                                            <tr key={project.id} className="bg-white border-b text-gray-500">
                                                <td className="px-3 py-2">{project.id}</td>
                                                <td className="px-3 py-2">
                                                    <img src={project.image_path} height="100px" width="100px" alt=""/>
                                                </td>
                                                <td className="px-3 py-2">{project.name}</td>
                                                <td className="px-3 py-2">{project.status}</td>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                                <td className="px-3 py-2">
                                                    <Link href={route('project.edit', project.id)}
                                                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Edit
                                                    </Link>
                                                    <Link href={route('project.destroy', project.id)}
                                                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : ""
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
