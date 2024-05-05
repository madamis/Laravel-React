import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SortField from "@/Components/SortField";
import DangerButton from "@/Components/DangerButton";
import Alert from "@/Components/Alert";

export default function Index({auth, users, success, queryParams = null}){
    queryParams = queryParams || {'order_direction': 'asc'};

    const sortFieldChanged = (name) => {
        queryParams['order_field'] === name
            ? (queryParams['order_direction'] = queryParams['order_direction'] === 'asc' ? 'desc' : 'asc')
            : queryParams['order_direction'] = 'asc' ;
        queryParams['order_field'] = name

        router.get(route('user.index'), queryParams)
    }
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name];
        }

        router.get(route('user.index'), queryParams)
    }

    const onKeyPressed = (name, e) => {
        if(e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }

    const deleteUser = (user) => {
        if(!window.confirm('Do you want to delete?'))
            return;
        router.delete(route('user.destroy', user.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
                    <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"> Add User</Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Alert success={success}/>
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput className="w-full" placeholder="User name"
                                                       defaultValue={queryParams.name}
                                                       id="userName"
                                                       onBlur={e => searchFieldChanged('name', e.target.value)}
                                                       onKeyPress = {e => onKeyPressed(name, e)}
                                            />
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th>
                                            <SortField queryParams={queryParams} field='name' sortFieldChanged={()=>sortFieldChanged('name')} >Name</SortField>
                                        </th>
                                        <th className="px-3 py-2"><SortField queryParams={queryParams} field='email' sortFieldChanged={()=>sortFieldChanged('email')} >Email</SortField></th>
                                        <th className="px-3 py-2">
                                            <SortField queryParams={queryParams} field='created_at' sortFieldChanged={()=>sortFieldChanged('created_at')}>Date Created </SortField>
                                        </th>
                                        <th className="px-3 py-2">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        users.data && users.data.length ? (
                                            users.data.map(user => (
                                                <tr key={user.id} className="bg-white border-b text-gray-500">
                                                    <td className="px-3 py-2">{user.id}</td>
                                                    <td className="px-3 py-2">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <Link className="" href={route('user.show', user)}>{user.name}</Link>
                                                    </td>
                                                    <td className="px-3 py-2">{user.created_at}</td>
                                                    <td className="px-3 py-2">
                                                        <div className="flex px-1">
                                                            <Link href={route('user.edit', user.id)}
                                                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                                Edit
                                                            </Link>
                                                            <DangerButton
                                                                onClick={() => deleteUser(user)}
                                                                href={route('user.destroy', user.id)}
                                                                className="font-medium text-gray-200 dark:text-gray-50 hover:underline mx-1">
                                                                Delete
                                                            </DangerButton>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : ""
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
