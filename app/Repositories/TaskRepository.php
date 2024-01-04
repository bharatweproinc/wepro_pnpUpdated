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
use Illuminate\Support\Facades\DB;

class TaskRepository implements TaskInterface
{

    public function multipleFile($id, $file,$data,$type){
        $media = [];
        foreach ($file as $key => $file) {
            $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
            $filePath = $file->storeAs('task_file', $fileName ,'public');
            $media[] = [
                'text_cases' => $data['text_cases'],
                'url' => $filePath,
                'title'=>$data['title'],
                'imageable_type' => $type,
                'imageable_id' => $id,
            ];
        }
        $data= Image::insert($media);
    }
    public function image($id,$data){

        if ($data['task_file']){
                $this->multipleFile($id ,$data['task_file'], $data,'App\Models\Task');
                if($data["estimated"]){
                    if ($data["estimated"] > 59) {
                        $data["estimated"] = ($data["estimated"]) / 60;
                        $data["estimated"] = str_replace('.', ':',$data["estimated"]);
                        }
                    $task = Task::where('id',$id)->first();
                    $task->estimated = $data["estimated"];
                    $task->update(["estimated"=>$data["estimated"]]);
                }
                return ['success'=>true];
            }
            else{
                return ['success'=>false, 'error'=>"Image not found"];
            }
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
        try {
            $data= Task::create([ 'task_name' => $items['task_name'],
            'description' => $items['description'],
            'start_date' => $items['start_date'],
            'estimated' => $items['estimated'],
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

            return ["success"=>true];
        } catch (\Exception $e) {
            return [
               'success'=>false,
               'error'=>$e->getMessage(),
            ];
          }

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
        try {
            $task = Task::findOrFail($id);
        $proj_id = $task->project_id;
        $dev_id = implode(',', $data['developer']);
        $task->task_name =$data['task_name'];
        $task->description =$data['description'];
        $task->priority =$data['priority'];
        $task->level = $data['level'];
        $task->estimated = $data['estimated'];
        $task->save();
        $task->update(['developer_id'=>$dev_id]);
        $developer = implode(',', $data['developer']);
        $task_id = $task->id;
        $dev =  Developer::where(['assignable_id'=>$task_id , 'assignable_type'=>'App\Models\Task'])->first();
        $dev->update(['developer_id' => $developer]);
        return ['success'=>true];
        } catch (\Exception $e) {
            return [
               'success'=>false,
               'error'=>$e->getMessage(),
            ];
          }
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
        $user = Auth::user();

        if (!$task) {
            return redirect()->back()->withError('Task not found for updated status');
        }

        $user_id = $user->id;

        if ($user->user_role == "junior developer" || $user->user_role == "senior developer") {
            $task_id = Developer::where('developer_id', 'like', '%' . $user_id . '%')
            ->where('assignable_type', 'App\Models\Task')
            ->pluck('assignable_id')->toArray();

            $status = Task::whereIn('id', $task_id)->where('status', 'started')->get();
            if (count($status) <= 0) {
                $task->status = $item;
                $task->started = Carbon::now();
                $task->save();
            } else if(count($status) > 0){
                $startedAt = $status[0]->started;
                $totalTime = now()->diffInMinutes($startedAt);

                if ($totalTime > 59) {
                    $totalTime = $totalTime / 60;
                }
                $hour = $status[0];
                $hour->development_hours = $totalTime;
                $hour->save();
                $task->status = $item;
                if ($item == "pause") {
                    $task->started = Carbon::now();

                } else if ($item == "complete") {
                    $startedAt = $task->started;
                    $totalTime = now()->diffInMinutes($startedAt);
                    $task->development_hours = $totalTime;
                    $task->started = null;

                }
                $task->save();
            }

        }
        else if ($user->user_role == "project manager" || $user->user_role == "admin") {
            $task_id = Developer::where('developer_id', 'like', '%' . $user_id . '%')
            ->where('assignable_type', 'App\Models\Task')
            ->pluck('assignable_id')->toArray();
            $status = Task::whereIn('id', $task_id)->where('status', 'started')->get();
            if (count($status) <= 0 && $item =="started") {
                $task->status = $item;
                $task->started = Carbon::now();
                $task->save();
            }
             else if(count($status) > 0){
                $startedAt = $status[0]->started;
                $totalTime = now()->diffInMinutes($startedAt);
                if ($totalTime > 59) {
                    $totalTime = $totalTime / 60;
                }
                $hour = $status[0];
                $hour->development_hours = $totalTime;
                $hour->save();
            }
            $task->status = $item;
            if ($item == "pause" || $item == "in progress" ) {
                $task->started = Carbon::now();
            } else if ($item == "complete") {
                $startedAt = $task->started;
                $totalTime = now()->diffInMinutes($startedAt);
                $task->development_hours = $totalTime;
                $task->started = null;
            } else if ($item == "reviewed") {
                $task->started = null;
            }else if ($item == "debugging") {
                $task->is_debugging = 1;
                $task->started = null;
            }
            $task->save();
        }
        return true;
    }

    public function filterData($data ,$id){
        try {
            $filterData = null;

            $task_id = Developer::where(['assignable_type'=>'App\Models\Task','project_id'=>$id])->pluck('assignable_id')->toArray();
            if(($data->status !="all") && ($data->developer_id != "all") && isset($data->from_date)){
                $filterData =Task::where('status', $data->status)->whereIn('id', $task_id)->whereDate('start_date', '>=', $data->from_date)->whereDate('start_date', '<=', $data->to_date)->get();
            }
            else if(($data->status !="all")  && ($data->developer_id != "all")){
                $filterData =Task::where('status', $data->status)->whereIn('id', $task_id)->get();
            }
            else if(($data->status !="all") && isset($data->from_date)){
                $filterData =Task::where('status', $data->status)->whereDate('start_date', '>=', $data->from_date)->whereDate('start_date', '<=', $data->to_date)->get();
            }
            else if(($data->developer_id != "all") && isset($data->from_date)){
                $task = Developer::where('developer_id', 'like', '%' . $data->developer_id . '%')->where(['assignable_type'=>'App\Models\Task','project_id'=>$id])->pluck('assignable_id')->toArray();
                $filterData =Task::where('status', $data->status)->whereIn('id', $task)->whereDate('start_date', '>=', $data->from_date)->whereDate('start_date', '<=', $data->to_date)->get();
            }
            else if($data->status !="all")
            {
                $filterData = Task::where(['status'=>$data->status ])->whereIn('id',$task_id)->get();
            }
            else if($data->developer_id != "all")
            {
                $task = Developer::where('developer_id', 'like', '%' . $data->developer_id . '%')->where(['assignable_type'=>'App\Models\Task','project_id'=>$id])->pluck('assignable_id')->toArray();
                $filterData = Task::whereIn('id', $task)->get();
            }
           else if(isset($data->from_date))
            {
                $filterData = Task::whereDate('start_date', '>=', $data->from_date)->whereDate('start_date', '<=', $data->to_date)->whereIn('id',$task_id)->get();
            }
            else{
                $filterData = Task::where(['project_id'=>$id])->get();
            }
            return [ 'success' =>true ,'data'=>$filterData];

        } catch (\Exception $e) {
            return [
               'success'=>false,
               'error'=>$e->getMessage(),
            ];
          }
    }

}

