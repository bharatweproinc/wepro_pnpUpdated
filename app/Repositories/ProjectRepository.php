<?php
namespace App\Repositories;
use App\Interfaces\ProjectInterface;
use App\Models\Project;
use App\Models\Developer;
use App\Models\User;
use App\Models\Task;
use App\Models\History;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;


class ProjectRepository implements ProjectInterface
{

    public function getlist()
    {
        $user = Auth::user();
        $role = $user->user_role;

        if($role === "admin" || $role === "hr manager"){
            $developer = User::whereIn('user_role',['senior developer','junior developer'])->get();
            $manager = User::where('user_role','project manager')->get();
            $data = Project::orderBy('created_at','desc')->paginate(10);
            return [$data , $developer ,$manager];
        }

        else if($role ==="project manager"){
            $project = Project::where('project_manager',$user->name)->paginate(10);
            $developer = User::whereIn('user_role',['senior developer','junior developer'])->get();
            $manager = User::where('user_role','project manager')->get();
            return [$project , $developer , $manager];
        }
        else if($role === "junior developer" || $role === 'senior developer')
        {
            $dev_id = $user->id;
            $project_id = Developer::where('developer_id', 'like', '%' . $dev_id . '%')->pluck('project_id')->toArray();
            $data = Project::whereIn('id',$project_id)->paginate(10);
            $developer = User::whereIn('user_role',['senior developer','junior developer'])->get();
            $manager = User::where('user_role','project manager')->get();


            return [$data , $developer , $manager ];
        }

    }

    public function save($req)
    {
       try{
        $data = Project::create([
            'title' => $req['title'],
            'description' => $req['description'],
            'start_date' => $req['start_date'],
            'project_manager' => $req['project_manager'],
        ]);

        $project_id = $data->id;
        $project = Project::find($project_id);
        $project = $project->developer()->create([  'project_id' => $project_id,
        'developer_id' => implode(',', $req['developer']),
        ]);

        return [
            'success' => true,
        ];
       }
       catch (\Exception $e) {
        return [
           'success'=>false,
           'error'=>$e->getMessage(),
        ];
      }
    }

    public function edit($id)
    {
        try {
            $data = Project::findOrFail($id);
            $dev_id = Developer::where('project_id', $data->id)->pluck('developer_id');
            $dev = $dev_id->toArray();
            $developer = array_map('intval', explode(',', $dev[0]));
            $developer = array_unique($developer);
            $manager = User::whereIn('user_role', ['project manager'])->get();
            $devUsers = User::select('id', 'name', 'user_role')->whereIn('user_role', ['junior developer', 'senior developer'])->get();
            return [ 'success' => true,$data,  $devUsers,  $manager, $developer];
        } catch (\Exception $e) {
            return [
               'success'=>false,
               'error'=>$e->getMessage(),
            ];
          }
    }

    public function update($id,$item)
    {
       try {
        $data = Project::findOrFail($id);
        $data->title = $item['title'];
        $data->description = $item['description'];
        $data->start_date = $item['start_date'];
        $data->project_manager = $item['project_manager'];
        $data->save();
        $developer = implode(',', $item['developer']);
        $projId = $data->id;
        $dev =  Developer::where('project_id', $projId)->first();
        $id = $dev->update(['developer_id' => $developer]);
        return [
            'success' => true,
        ];
       }catch (\Exception $e) {
        return [
           'success'=>false,
           'error'=>$e->getMessage(),
        ];
      }
    }

    public function detail($id)
    {
        $auth = Auth::user();
        $role = $auth->user_role;
        $data = Project::where('id',$id)->first();
        $dev_id = Developer::where(['assignable_id'=>$data->id , 'assignable_type'=> 'App\Models\Project'])->pluck('developer_id');
        $developer = explode(',',$dev_id);
        $developer = str_replace(array('[', ']', '"'),'',$developer);
        $dev = array_map('intval', $developer);
        $user = User::whereIn('id', $dev)->get();

        $history = History::where('historable_id',$id)->where('historable_type','App\Models\Project')->get();
        $historyTask = History::where('historable_id',$id)->where('historable_type','App\Models\Task')->get();
        if($role === "admin" || $role === "hr manager"){
            $task = Task::where(['project_id'=>$id])->get();
            $auth = Auth::user();
            $task_id = Developer::where('assignable_type', 'App\Models\Task')->where('project_id',$id)->pluck('assignable_id');
            $status = Task::whereIn('id', $task_id)->where('status', 'started')->get();
            $debug_Id = Task::whereIn('id',$task_id)->where('is_debugging',1)->pluck('id');
            $bugs = Image::whereIn('imageable_id',$debug_Id)->where('imageable_type','App\Models\Task')->get();
            $res_id = Task::whereIn('id',$task_id)->where('status',"complete")->pluck('id');
            $result = Image::whereIn('imageable_id',$debug_Id)->where('imageable_type','App\Models\Task')->get();
            foreach($bugs  as $key => $bug){
                $bugs[$key]['url'] = asset('storage/'.$bug->url);
            }
            return [$data , $user , $task ,$status ,$history ,$bugs,$result ,$historyTask ];
        }
        else if($role == "project manager")
        {
            $task = Task::where(['project_id'=>$id])->get();
            $task_id = Developer::where('assignable_type', 'App\Models\Task')->where('project_id',$id) ->pluck('assignable_id');
            $status = Task::whereIn('id', $task_id)->where('status', 'started')->get();
            $debug_Id = Task::whereIn('id',$task_id)->where('is_debugging',1)->pluck('id');
            $bugs = Image::whereIn('imageable_id',$debug_Id)->where('imageable_type','App\Models\Task')->get();
            foreach($bugs  as $key => $bug){
                $bugs[$key]['url'] = asset('storage/'.$bug->url);
            }
            $res_id = Task::whereIn('id',$task_id)->where('status',"complete")->pluck('id');
            $result = Image::whereIn('imageable_id',$debug_Id)->where('imageable_type','App\Models\Task')->get();

           return [ $data , $user , $task ,$status,$history ,$bugs ,$result ,$historyTask];
        }
        else if($role === "junior developer" || $role === "senior developer" ){
            $auth = Auth::user();
            $user_id = $auth->id;
            $task_id = Developer::where('assignable_type', 'App\Models\Task')->where('developer_id', 'like', '%' . $user_id . '%')->pluck('assignable_id');
            $status = Task::whereIn('id', $task_id)->where('status', 'started')->where('project_id',$id)->get();
            $task = Task::whereIn('id',$task_id)->where('project_id',$id)->get();
            $debug_Id = Task::whereIn('id',$task_id)->where('is_debugging',1)->pluck('id');
            $bugs = Image::whereIn('imageable_id',$debug_Id)->where('imageable_type','App\Models\Task')->get();
            foreach($bugs  as $key => $bug){
                $bugs[$key]['url'] = asset('storage/'.$bug->url);
            }
            $res_id = Task::whereIn('id',$task_id)->where('status',"complete")->pluck('id');
            $result = Image::whereIn('imageable_id',$debug_Id)->where('imageable_type','App\Models\Task')->get();
            return [ $data , $user , $task ,$status,$history ,$bugs ,$result ,$historyTask];
        }
    }


}


