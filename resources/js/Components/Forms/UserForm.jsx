import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {Link, useForm} from "@inertiajs/react";

export default function UserForm({user = null})
{
    const {data, setData, post, put, processing, errors, reset} =useForm({

        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
        _method: user ? 'put' : 'post'
    })

    const onSubmit = (e)=>{
        e.preventDefault();

        user ? post(route('user.update', user.id)) : post(route('user.store'));
    }
    return (
        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="mb-2">
                <InputLabel
                    htmlFor={'user_name'}
                    value="User Name"
                />
                <TextInput
                    id="user_name"
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
                    htmlFor={'user_email'}
                    value="Email"
                />
                <TextInput
                    id="user_email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'user_password'}
                    value="Password"
                />
                <TextInput
                    id="user_password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="mb-2">
                <InputLabel
                    htmlFor={'user_password_confirmation'}
                    value="Password Confirmation"
                />
                <TextInput
                    id="user_password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"

                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="mt-4 text-right">
                <Link href={route('user.index')} className="mr-3 bg-white shadow transition-all text-gray-500 rounded py-1 px-3 hover:text-gray-700 hover:border-gray-700">Cancel</Link>
                <button className="bg-emerald-500 text-white rounded py-1 px-3 hover:bg-emerald-500 shadow transition-all">Save</button>
            </div>
        </form>
    );
}
