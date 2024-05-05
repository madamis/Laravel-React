import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import UserStatus from "@/Components/UserStatus.jsx";
import TasksTable from "@/Components/TasksTable.jsx";

export default function Show({auth, user, tasks}){
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users {user.data.name}</h2>}
        >
            <Head title={'User ' + user.data.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={user.data.image_path} alt={user.data.name} className="w-full h-64 object-cover"/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <span>Status: <UserStatus user={user.data}/></span>
                                <span>Due Date: {user.data.due_date}</span>
                                <span>Created By: {user.data.createdBy.name}</span>
                                <span>Updated By: {user.data.updatedBy.name}</span>
                            </div>
                            <div className="mt-2">
                                {user.data.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-900">
                            {/*{JSON.stringify(user)}*/}
                            <TasksTable tasks={tasks}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}
