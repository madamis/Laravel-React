import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import ProjectStatus from "@/Components/ProjectStatus.jsx";
import TasksTable from "@/Components/TasksTable.jsx";

export default function Show({auth, project, tasks}){
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects {project.data.name}</h2>}
        >
            <Head title={'Project ' + project.data.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={project.data.image_path} alt={project.data.name} className="w-full h-64 object-cover"/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <span>Status: <ProjectStatus project={project.data}/></span>
                                <span>Due Date: {project.data.due_date}</span>
                                <span>Created By: {project.data.createdBy.name}</span>
                                <span>Updated By: {project.data.updatedBy.name}</span>
                            </div>
                            <div className="mt-2">
                                {project.data.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            {/*{JSON.stringify(project)}*/}
                            <TasksTable tasks={tasks}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
