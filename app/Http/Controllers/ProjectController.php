<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use http\Env\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
//    public static $wrap = false;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projectsQuery = Project::query();

        $order_field = request('order_field', 'created_at');
        $order_direction = request('order_direction', 'desc');

        if(request('name')){
            $projectsQuery->where("name", "like", "%".request('name')."%");
        }
        if(request('status')){
            $projectsQuery->where("status", request('status'));
        }

        $projectsQuery->orderBy($order_field, $order_direction);

        $projects = $projectsQuery->paginate(10)->onEachSide(1);

        return inertia('Project/Index', [
            'projects'=>ProjectResource::collection($projects),
            'queryParams'=>request()->query() ?: null,
            'success'=>session('success'),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        /** @var $image UploadedFile */
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if($image)
        {
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }

        Project::create($data);

        return to_route('project.index')->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasksQuery = $project->tasks();

        $order_field = request('order_field', 'created_at');
        $order_direction = request('order_field', 'desc');

        if(request('name')){
            $tasksQuery->where("name", "like", "%".request('name')."%");
        }
        if(request('status')){
            $tasksQuery->where("status", request('status'));
        }

        $tasks = $tasksQuery->orderBy($order_field, $order_direction)->paginate(10)->onEachSide(1);

        return inertia('Project/Show',
            [
                'project'=> new ProjectResource($project),
                'tasks'=>TaskResource::collection($tasks),
                'queryParams'=>request()->query() ?: null,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        /** @var $image UploadedFile */
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if($image)
        {
            if($project->image_path)
            {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }

        $project->update($data);

        return to_route('project.index')->with('success', 'Project was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        if($project->image_path)
        {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        $project->delete();
        return to_route('project.index')->with('success',"$name was successfully deleted");
    }
}
