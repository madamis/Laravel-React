import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import {router} from "@inertiajs/react";

export default function SortField({children, field}){
    const sortFieldChanged = (name) => {
        queryParams['order_field'] === name
            ? (queryParams['order_direction'] = queryParams['order_direction'] === 'asc' ? 'desc' : 'asc')
            : queryParams['order_direction'] = 'asc' ;
        queryParams['order_field'] = name

        router.get(route('task.index'), queryParams)
    }
    return (
        <div className="px-3 py-2 flex text-center justify-between cursor-pointer" onClick={()=>sortFieldChanged()}>
            {children}
            <div>
                <ChevronUpIcon className={"w-4 " + ((queryParams.order_field === field && queryParams.order_direction === 'asc')
                    ? 'text-gray-900'
                    : 'text-gray-300')
                }/>
                <ChevronDownIcon className={"w-4 -mt-2 " + ((queryParams.order_field === field && queryParams.order_direction === 'desc')
                    ? 'text-gray-900'
                    : 'text-gray-300')}/>
            </div>
        </div>
    );
}
