import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import ProjectForm from "@/Components/ProjectForm";

export default function Create({auth}){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Projects</h2>}
        >
            <Head title={'Project '} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProjectForm />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
