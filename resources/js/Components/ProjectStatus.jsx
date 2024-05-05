import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.js";

export default function ProjectStatus({project})
{
    return (
        <span className={"px-2 py-1 rounded-lg text-gray-50 "+PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
    );
}
