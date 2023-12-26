<?php

namespace App\Repositories;
use App\Interfaces\TaskInterface;
use App\Models\Project;
use App\Models\Developer;
use App\Models\User;
use App\Models\Task;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


class TaskRepository implements TaskInterface
{

      public function multipleFile($id, $file, $type ,$data){
        $media = [];
        foreach ($files as $key => $file) {
            $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
            // $fileType = $file->getClientOriginalExtension();
            $file->storeAs('/public/task_file', $fileName);
            $media[] = [
                'text_cases' => $data->text_cases,
                'url' => asset('storage/'.$fileName),
                'imageable_type' => $type,
                'imageable_id' => $id,
            ];
        }
        Image::insert($media);
    }

    public function getlist($id)
    {
        $user = Auth::user();
        $role = $user->user_role;
        $data = Task::where('project_id',$id)->orderBy('created_at','desc')->get();
        $task_id = Task::where('project_id',$id)->pluck('id');
        $dev_id = Developer::whereIn('assignable_id',$task_id)->where('assignable_type','App\Models\Task')->pluck('developer_id');
        $developer = explode(',',$dev_id);
        $developer = str_replace(array('[', ']', '"'),'',$developer);
        $dev = array_map('intval', $developer);
        $developers = User::whereIn('id',$dev)->select('id','name','email','contact_no','user_role')->get();

        if($role === 'junior developer' || $role === 'senior developer' || $role == "project manager"){
            $user_id = $user->id;
            $task_id = Developer::where('developer_id', 'like', '%' . $user_id . '%')->where('assignable_type', 'App\Models\Task')->pluck('assignable_id');
            $status = Task::whereIn('id', $task_id)->where('status', 'started')->get();
            return [$data,$id ,$developers ,$status];
        }
        return [$data,$id ,$developers];

    }

    public function create($id)
    {
        $data = Developer::where('project_id',$id)->pluck('developer_id');
        $dev = explode(',', $data[0]);
        $user = User::whereIn('id', $dev)->get();
        return [ $user];
    }

    public function save($id,$items)
    {
             $data= Task::create([ 'task_name' => $items['task_name'],
            'description' => $items['description'],
            'start_date' => $items['start_date'],
            'priority' => $items['priority'],
            'level'=>$items['level'],
            'developer_id' => implode(',', $items['developer']),
            'project_id'=>$id,
            ]);
            $task_id = $data->id;

            $task = Task::find($task_id);
            $taskCreate = $task->developer()->create([  'project_id' => $id,
            'developer_id' => implode(',', $items['developer']),
            ]);

            // if ($request->hasFile('task_file')){
            //     $this->multipleFileUpload($request->file('task_file'), $task->id, 'App\Models\Task');
            // }
            return true;

    }

    public function edit($id)
    {
        $data = Task::findOrFail($id);
        $dev = Developer::where(['assignable_id'=>$data->id,'assignable_type'=>'App\Models\Task'])->pluck('developer_id');
        $dev_id = $dev->toArray();

        $developer = array_map('intval', explode(',', $dev_id[0]));
        $developer = array_unique($developer);

        $proj_id = Developer::where(['assignable_id'=>$data->project_id,'assignable_type'=>'App\Models\Project'])->pluck('developer_id');
        $project = $proj_id->toArray();

        $projectId = array_map('intval', explode(',', $project[0]));
        $projectId = array_unique($projectId);
        $user = User::whereIn('id', $projectId)->get();
        return [$data ,$developer, $user];
    }

    public function update($id,$data)
    {
        $task = Task::findOrFail($id);
        $proj_id = $task->project_id;
        $dev_id = implode(',', $data['developer']);
        $task->task_name =$data['task_name'];
        $task->description =$data['description'];
        $task->priority =$data['priority'];
        $task->level = $data['level'];

        $task->save();
        $task->update(['developer_id'=>$dev_id]);

        $developer = implode(',', $data['developer']);
        $task_id = $task->id;

        $dev =  Developer::where(['assignable_id'=>$task_id , 'assignable_type'=>'App\Models\Task'])->first();
        $dev->update(['developer_id' => $developer]);
        return $proj_id;
    }

    public function detail($id)
    {

        $data = Task::findOrfail($id);
        $developer = Developer::where(['assignable_id'=> $data->id ,'assignable_type'=>'App\Models\Task'])->pluck('developer_id');
        $dev = explode(',', $developer[0]);
        $user = User::whereIn('id', $dev)->get();
        return [$data , $user];
    }

    public function status($id, $data)
    {
        $item = $data['status'];
        $task = Task::where('id', $id)->first();
        if ($task) {
            $user = Auth::user();
            $user_id = $user->id;
            $task_id = Developer::where('developer_id', 'like', '%' . $user_id . '%')->where('assignable_type','App\Models\Task')->pluck('assignable_id')->toArray();
            $status = Task::whereIn('id', $task_id)->where('status', 'started')->get();
            if ($task && count($status) <= 0) {
                $task->status = $item;
                $task->started_at = Carbon::now();
                $task->save();
            }
            else if ($task && count($status) !== 0) {

                $startedAt = $status[0]->started_at;
                $totalTime = now()->diffInMinutes($startedAt);

                if ($totalTime > 59) {
                    $totalTime = $totalTime / 60;
                }
                $task->status = $item;
                $task->started_at = Carbon::now();
                $task->save();

                $hour = $status[0];
                $hour->hour_worked = $totalTime;
                $hour->save();
                return redirect()->back();
            }
            else {
                return redirect()->back()->withError('first Start the Task then  update');
            }
        }
        else
        {
            return redirect()->back()->withError('Task not found for updated status');
        }
    }

}
