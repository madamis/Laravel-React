import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import {Link, useForm} from "@inertiajs/react";

export default function TaskForm({projects, users, task = null})
{
    const {data, setData, post, put, processing, errors, reset} =useForm({
        image: '',
        name: task?.name ?? '',
        description: task?.description ?? '',
        status: task?.status ?? '',
        priority: task?.priority ?? '',
        due_date: task?.due_date ?? '',
        assigned_user: task?.assigned_user ?? '',
        project_id: task?.project_id ?? '',
        _method: task ? 'put' : 'post'
    })

    const onSubmit = (e)=>{
        e.preventDefault();

        task ? post(route('task.update', task.id)) : post(route('task.store'));
    }
    return (
        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_image_path'}
                    value="Task Image"
                />
                <TextInput
                    id="task_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"

                    onChange={(e) => setData('image', e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_name'}
                    value="Task Name"
                />
                <TextInput
                    id="task_name"
                    type="text"
                    name="name"
                    value={data.name}
                    isFocused={true}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_description'}
                    value="Task Description"
                />
                <TextAreaInput
                    id="task_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_status'}
                    value="Task Status"
                />
                <SelectInput
                    id="task_status"
                    name="status"
                    value={data.status}
                    className="w-full"

                    onChange = { e => setData('status', e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_priority'}
                    value="Task Priority"
                />
                <SelectInput
                    id="task_priority"
                    name="priority"
                    value={data.priority}
                    className="w-full"

                    onChange = { e => setData('priority', e.target.value)}
                >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_due_date'}
                    value="Task Due Date"
                />
                <TextInput
                    id="task_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('due_date', e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_assigned_user'}
                    value="Task Assigned To"
                />
                <SelectInput
                    id="task_assigned_user"
                    name="assigned_user"
                    value={data.assigned_user}
                    className="w-full"

                    onChange = { e => setData('assigned_user', e.target.value)}
                >
                    <option value="">Select User</option>
                    {
                        users && users.length
                            ? users.map( u => (<option key={u.id} value={u.id} >{u.name}</option>))
                            : ''
                    }

                </SelectInput>
                <InputError message={errors.assigned_user} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'task_project_id'}
                    value="Task Project"
                />
                <SelectInput
                    id="task_project_id"
                    name="project_id"
                    value={data.project_id}
                    className="w-full"

                    onChange = { e => setData('project_id', e.target.value)}
                >
                    <option value="">Select Project</option>
                    {
                        projects && projects.length
                        ? projects.map( p => (<option key={p.id} value={p.id}>{p.name}</option>))
                            : ''
                    }

                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
            </div>

            <div className="mt-4 text-right">
                <Link href={route('task.index')} className="mr-3 bg-white shadow transition-all text-gray-500 rounded py-1 px-3 hover:text-gray-700 hover:border-gray-700">Cancel</Link>
                <button className="bg-emerald-500 text-white rounded py-1 px-3 hover:bg-emerald-500 shadow transition-all">Save</button>
            </div>
        </form>
    );
}
