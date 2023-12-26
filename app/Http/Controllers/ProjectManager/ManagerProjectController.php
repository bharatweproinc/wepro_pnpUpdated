<?php

namespace App\Http\Controllers\ProjectManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\ProjectInterface;
use App\Repositories\ProjectRepository;
use Inertia\Inertia;


class ManagerProjectController extends Controller
{
    private ProjectInterface $projectRepository;

    public function __construct(ProjectInterface $projectRepository){
        $this->projectRepository = $projectRepository;
    }

    public function list(){
        $items = $this->projectRepository->getlist();
        $data= $items[0];
        $developer= $items[1];
        $manager= $items[2];

        return Inertia::render('ProjectManager/Project/View',compact("data","developer" ,"manager"));
    }

    public function Detail($id){
        $allData = $this->projectRepository->detail($id);
        $data = $allData[0];
        $user = $allData[1];
        $task = $allData[2];
        $status = $allData[3];
        return Inertia::render('ProjectManager/Project/ProjectDetail', ['data' => $data, 'user' => $user,'task'=>$task ,'status'=>$status]);
    }


}
