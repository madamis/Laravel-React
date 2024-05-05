import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router, useForm} from "@inertiajs/react";
import TasksTable from "@/Components/TasksTable.jsx";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import ProjectForm from "@/Components/ProjectForm";

export default function Edit({auth, project}){


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Project</h2>}
        >
            <Head title={'Project '} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {project.data.image_path && (<div>
                            <img src={project.data.image_path} alt={project.data.name} className="w-full h-64 object-cover"/>
                        </div>)}
                        <div className="p-6 text-gray-900">
                            <ProjectForm project={project.data}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
