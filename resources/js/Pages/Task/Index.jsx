import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import TasksTable from "@/Components/TasksTable.jsx";

export default function Index({auth, tasks, queryParams = null, success}){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>
                    <Link href={route('task.create')} className="py-2 px-3 rounded shadow  text-white bg-emerald-500 hover:bg-emerald-700">Add New Task</Link>
                </div>
                }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TasksTable tasks={tasks} queryParams={queryParams} success={success}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
