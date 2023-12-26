<?php

namespace App\Http\Controllers\ProjectManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\TaskRepository;
use App\Interfaces\TaskInterface;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;



class ManagerTaskController extends Controller
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
        $status = $status[3];
        return Inertia::render('ProjectManager/Task/List',['data'=>$data,'Id'=>$id ,'developer'=>$developers ,'status'=>$status]);
 }

    public function save (Request $request,$id ){
        $this->taskRepository->save($id,$request->all());
        // return Inertia::location(route('projectManager.project.task.list',$id));
        return redirect()->back();


    }

    // public function edit($id){

    //     $items = $this->taskRepository->edit($id);
    //     $data= $items[0];
    //     $developer = $items[1];
    //     $user = $items[2];
    //     return Inertia::render('projectManager/Task/Edit',['data'=>$data ,'devId'=>$developer, 'developer'=>$user]);
    // }

    public function update(Request $request,$id){

        $proj_id = $this->taskRepository->update($id ,$request->all());
        // return Redirect::route('projectManager.project.task.list',$proj_id);
        return redirect()->back();


    }

    // public function details($id){

    //     $items = $this->taskRepository->detail($id);
    //     $data = $items[0];
    //     $user = $items[1];
    //     return Inertia::render('Admin/Task/Details',['data'=>$data , 'developer'=>$user]);
    // }

    public function status(Request $request, $id){
        $this->taskRepository->status($id,$request->only('status'));
        return Redirect::back();
    }
}
