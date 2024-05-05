import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import {Link, useForm} from "@inertiajs/react";

export default function ProjectForm({project = null})
{
    const {data, setData, post, put, processing, errors, reset} =useForm({
        image: project?.image_path ??'',
        name: project?.name ?? '',
        status: project?.status ?? '',
        description: project?.description ?? '',
        due_date: project?.due_date ?? '',
        _method: project ? 'put' : 'post'
    })

    const onSubmit = (e)=>{
        e.preventDefault();

        project ? post(route('project.update', project.id)) : post(route('project.store'));
    }
    return (
        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="mb-2">
                <InputLabel
                    htmlFor={'project_image_path'}
                    value="Project Image"
                />
                <TextInput
                    id="project_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"

                    onChange={(e) => setData('image', e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'project_name'}
                    value="Project Name"
                />
                <TextInput
                    id="project_name"
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
                    htmlFor={'project_status'}
                    value="Project Status"
                />
                <SelectInput
                    id="project_status"
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
                    htmlFor={'project_due_date'}
                    value="Project Due Date"
                />
                <TextInput
                    id="project_due_date"
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
                    htmlFor={'project_description'}
                    value="Project Description"
                />
                <TextAreaInput
                    id="project_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4 text-right">
                <Link href={route('project.index')} className="mr-3 bg-white shadow transition-all text-gray-500 rounded py-1 px-3 hover:text-gray-700 hover:border-gray-700">Cancel</Link>
                <button className="bg-emerald-500 text-white rounded py-1 px-3 hover:bg-emerald-500 shadow transition-all">Save</button>
            </div>
        </form>
    );
}
