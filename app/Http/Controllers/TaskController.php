<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasksQuery = Task::query();

        $order_field = request('order_field', 'created_at');
        $order_direction = request('order_direction', 'desc');

        if(request('name')){
            $tasksQuery->where("name", "like", "%".request('name')."%");
        }
        if(request('status')){
            $tasksQuery->where("status", request('status'));
        }

        $tasksQuery->orderBy($order_field, $order_direction);

        $tasks = $tasksQuery->paginate(10)->onEachSide(1);

        return inertia('Task/Index',
            ['tasks'=>TaskResource::collection($tasks), 'queryParams'=>request()->query() ?: null, 'success'=>session('success')]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $projects = Project::all();
        return inertia('Task/Create', [
            'projects'=> ProjectResource::collection($projects),
            'users'=>UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        /** @var $image UploadedFile */
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if($image)
        {
            $data['image_path'] = $image->store('task/'.Str::random(), 'public');
        }

        Task::create($data);

        return to_route('task.index')->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::all();
        $projects = Project::all();
        return inertia('Task/Edit', [
            'projects'=> ProjectResource::collection($projects),
            'users'=>UserResource::collection($users),
            'task'=> new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        /** @var $image UploadedFile */
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if($image)
        {
            if($task->image_path)
            {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }

        $task->update($data);

        return to_route('task.index')->with('success', 'Task was Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if($task->image_path)
        {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();
        return to_route('task.index')->with('success',"Task $name was successfully deleted");
    }
}
