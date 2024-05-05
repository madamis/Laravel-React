import {useState} from "react";

export default function Alert({success})
{
    const [alertOpened, setAlertOpened] = useState(true);

    return (
        <>
            {alertOpened && (success && (
                <div className="flex justify-between bg-emerald-500 py-2 px-4 text-white rounded">
                    <span>{success}</span>
                    <span className="text-gray-200 hover:text-gray-50 shadow py-1 px-2 cursor-pointer" onClick={()=> setAlertOpened(false)}>X</span>
                </div>))
            }
        </>
    );
}
