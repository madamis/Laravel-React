import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import TaskForm from "@/Components/Forms/TaskForm.jsx";

export default function Edit({auth, task, users, projects}){


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Task</h2>}
        >
            <Head title={'Task '} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {task.data.image_path && (<div>
                            <img src={task.data.image_path} alt={task.data.name} className="w-full h-64 object-cover"/>
                        </div>)}
                        <div className="p-6 text-gray-900">
                            <TaskForm task={task.data} users={users.data} projects={projects.data}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
