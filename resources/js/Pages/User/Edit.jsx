import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import UserForm from "@/Components/Forms/UserForm.jsx";

export default function Edit({auth, user}){


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>}
        >
            <Head title={'User '} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {user.data.image_path && (<div>
                            <img src={user.data.image_path} alt={user.data.name} className="w-full h-64 object-cover"/>
                        </div>)}
                        <div className="p-6 text-gray-900">
                            <UserForm user={user.data}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
