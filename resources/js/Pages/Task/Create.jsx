import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import ProjectForm from "@/Components/Forms/ProjectForm.jsx";
import TaskForm from "@/Components/Forms/TaskForm.jsx";

export default function Create({auth, projects, users,}){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Project Task</h2>}
        >
            <Head title={'Project '} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TaskForm projects={projects.data} users={users.data} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
