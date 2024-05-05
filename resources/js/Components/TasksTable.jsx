import SortField from "@/Components/SortField.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants.js";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, queryParams = null})
{
    queryParams = queryParams || {'order_direction': 'asc'};

    const sortFieldChanged = (name) => {
        queryParams['order_field'] === name
            ? (queryParams['order_direction'] = queryParams['order_direction'] === 'asc' ? 'desc' : 'asc')
            : queryParams['order_direction'] = 'asc' ;
        queryParams['order_field'] = name

        router.get(route('task.index'), queryParams)
    }
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name];
        }

        router.get(route('task.index'), queryParams)
    }

    const onKeyPressed = (name, e) => {
        if(e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2">
                            <TextInput className="w-full" placeholder="Task name"
                                       defaultValue={queryParams.name}
                                       id="taskName"
                                       onBlur={e => searchFieldChanged('name', e.target.value)}
                                       onKeyPress = {e => onKeyPressed(name, e)}
                            />
                        </th>
                        <th></th>
                        <th className="px-3 py-2">
                            <SelectInput className="w-full"
                                         defaultValue={queryParams.priority}
                                         onChange = { e => searchFieldChanged('priority', e.target.value)}
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </SelectInput>
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
                        <th className="px-3 py-2">
                            <Link href={route('task.create')} className="py-2 px-3 rounded shadow  text-white bg-emerald-500 hover:bg-emerald-700">Add Task</Link>
                        </th>
                    </tr>
                    <tr className="text-nowrap">
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Image</th>
                        <th>
                            <SortField queryParams={queryParams} field='name' sortFieldChanged={()=>sortFieldChanged('name')} >Name</SortField>
                        </th>
                        <th>Assigned</th>
                        <th>
                            <SortField queryParams={queryParams} field='priority' sortFieldChanged={()=>sortFieldChanged('priority')} > Priority</SortField>
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
                    </thead>
                    <tbody>
                    {
                        tasks.data && tasks.data.length ? (
                            tasks.data.map(task => (
                                <tr key={task.id} className="bg-white border-b text-gray-500">
                                    <td className="px-3 py-2">{task.id}</td>
                                    <td className="px-3 py-2">
                                        <img src={task.image_path} height="100px" width="100px" alt=""/>
                                    </td>
                                    <td className="px-3 py-2">{task.name}</td>
                                    <td>{task.assignedTo.name}</td>
                                    <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded-lg text-gray-50 "
                                                        +TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                    </span>
                                    </td>
                                    <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded-lg text-gray-50 "+TASK_STATUS_CLASS_MAP[task.status]}>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                    </td>
                                    <td className="px-3 py-2">{task.due_date}</td>
                                    <td className="px-3 py-2">{task.created_at}</td>
                                    <td className="px-3 py-2">{task.createdBy.name}</td>
                                    <td className="px-3 py-2">
                                        <Link href={route('task.edit', task.id)}
                                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                            Edit
                                        </Link>
                                        <Link href={route('task.destroy', task.id)}
                                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10}>
                                    <div className="text-center text-gray-700 mt-3">
                                        There is no task related to your filter
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links}></Pagination>
        </>
    );
}
