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
        $data = $items['project'];
        $developer = $items['developer'];
        $manager = $items['manager'];
        $task = $items['task'];
        return Inertia::render('ProjectManager/Project/View',compact("data","developer" ,"manager","task"));
    }

    public function Detail($id){
        $allData = $this->projectRepository->detail($id);
        $data = $allData[0];
        $user = $allData[1];
        $task = $allData[2];
        $status = $allData[3];
        $history = $allData[4];
        $bugs = $allData[5];
        $result = $allData[6];
        $historyTask = $allData[7];
        return Inertia::render('ProjectManager/Project/ProjectDetail', ['data' => $data, 'user' => $user,'task'=>$task ,'status'=>$status ,'history'=>$history ,"bugs"=>$bugs ,'result'=>$result,'taskHistory'=>$historyTask]);
    }


}
