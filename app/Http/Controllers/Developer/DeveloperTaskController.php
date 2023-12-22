<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\TaskRepository;
use App\Interfaces\TaskInterface;

class DeveloperTaskController extends Controller
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
        $status = $items[3];
        return Inertia::render('Developer/Task/View',['data'=>$data,'Id'=>$id ,'developer'=>$developers ,'updated'=>$status]);
    }

    public function status(Request $request, $id){
        $this->taskRepository->status($id,$request->only('status'));
        return redirect()->back();
    }
}
