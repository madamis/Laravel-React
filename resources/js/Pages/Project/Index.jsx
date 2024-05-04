import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP} from "@/constants.js";
import TextInput from "@/Components/TextInput.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import SortField from "@/Components/SortField";

export default function Index({auth, projects, queryParams = null}){
    queryParams = queryParams || {'order_direction': 'asc'};

    const sortFieldChanged = (name) => {
        queryParams['order_field'] === name
            ? (queryParams['order_direction'] = queryParams['order_direction'] === 'asc' ? 'desc' : 'asc')
            : queryParams['order_direction'] = 'asc' ;
        queryParams['order_field'] = name

        router.get(route('project.index'), queryParams)
    }
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams)
    }

    const onKeyPressed = (name, e) => {
        if(e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }
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
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Image</th>
                                        <th>
                                            <SortField queryParams={queryParams} field='name' sortFieldChanged={()=>sortFieldChanged('name')} >Name</SortField>
                                        </th>
                                        <th>
                                            <SortField queryParams={queryParams} field='status' sortFieldChanged={()=>sortFieldChanged('status')} > Status</SortField>
                                        </th>
                                        <th className="px-3 py-2">
                                            <SortField queryParams={queryParams} field='created_at' sortFieldChanged={()=>sortFieldChanged('created_at')}>Date Created </SortField>
                                        </th>
                                        <th className="px-3 py-2">
                                            <SortField queryParams={queryParams} field='due_date' sortFieldChanged={()=>sortFieldChanged('due_date')}>Due Date</SortField>
                                        </th>
                                        <th className="px-3 py-2">Created By</th>
                                        <th className="px-3 py-2">Actions</th>
                                    </tr>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput className="w-full" placeholder="Project name"
                                                       defaultValue={queryParams.name}
                                                       id="projectName"
                                                       onBlur={e => searchFieldChanged('name', e.target.value)}
                                                       onKeyPress = {e => onKeyPressed(name, e)}
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput className="w-full"
                                                         defaultValue={queryParams.status}
                                                         onChange = { e => searchFieldChanged('status', e.target.value)}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
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
                                                    <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded-lg text-gray-50 "+PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                    </td>
                                                    <td className="px-3 py-2">{project.due_date}</td>
                                                    <td className="px-3 py-2">{project.created_at}</td>
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
                            <Pagination links={projects.meta.links}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
