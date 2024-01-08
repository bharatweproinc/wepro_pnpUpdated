<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\TaskRequest;
use App\Models\Developer;
use App\Models\Project;
use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Repositories\TaskRepository;
use App\Interfaces\TaskInterface;
use App\Models\Image;
use App\Http\Requests\FilterRequest;


class TaskController extends Controller
{

    private TaskInterface $taskRepository;

    public function __construct(TaskInterface $taskRepository ) {
        $this->taskRepository = $taskRepository;
    }

    public function list ($id){

        $items = $this->taskRepository->getlist($id);
        $data = $items[0];
        $id = $items[1];
        $developers = $items[2];
        return Inertia::render('Admin/Task/View',['data'=>$data,'Id'=>$id ,'developer'=>$developers]);
    }

    public function create ($id){
            $items = $this->taskRepository->create($id);
            $user = $items[0];
            return back();
    }

    public function save (TaskRequest $request,$id ){
           $response = $this->taskRepository->save($id,$request->all());
           if($response['success']){
            return back();
           }
           else{
            return Redirect::back()->withErrors($response);
           }
        }

    public function edit($id){

        $items = $this->taskRepository->edit($id);
        $data= $items[0];
        $developer = $items[1];
        $user = $items[2];
        return Inertia::render('Admin/Task/Edit',['data'=>$data ,'devId'=>$developer, 'developer'=>$user]);
    }

    public function update(Request $request,$id){

        $response = $this->taskRepository->update($id ,$request->all());
        if($response['success']){
            return Redirect::back();
        }
        else{
         return Redirect::back()->withErrors($response);
        }
    }

    public function details($id){
        $items = $this->taskRepository->detail($id);
        $data = $items[0];
        $user = $items[1];
        return Inertia::render('Admin/Task/Details',['data'=>$data , 'developer'=>$user]);
    }

    public function status(Request $request, $id){
        $this->taskRepository->status($id,$request);
        return back();
    }

    public function filter(Request $request ,$id){

        $response = $this->taskRepository->filterData($request,$id);
         if($response['success'])
         {
             $data = $response['data'];
             return response()->json($data);
         }
         else{
             return Redirect::back()->withErrors(['filterError' => $response['error']]);
         }
     }

     public function image(Request $request,$id){
       $response = $this->taskRepository->image($id, $request->all());
       if($response['success']){
        return  redirect()->back();
       }
       else{
        Redirect::back()->withErrors($response["error"]);
       }

    }
}
