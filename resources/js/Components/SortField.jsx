import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import {router} from "@inertiajs/react";

export default function SortField({children, sortFieldChanged, queryParams, field}){

    return (
        <div className="px-3 py-2 flex text-center justify-between cursor-pointer" onClick={sortFieldChanged}>
            {children}
            <div className="mt-[-5px]">
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
