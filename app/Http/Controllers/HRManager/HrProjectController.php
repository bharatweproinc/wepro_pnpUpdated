<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\ProjectInterface;
use App\Repositories\ProjectRepository;
use Inertia\Inertia;

class HrProjectController extends Controller
{
    private ProjectInterface $projectRepository;

    public function __construct(ProjectInterface $projectRepository){
        $this->projectRepository = $projectRepository;
    }

    public function list(){
        $items = $this->projectRepository->getlist();
        $data = $items['data'];
        $developer = $items['developer'];
        $manager = $items['manager'];
        $task = $items['task'];
        return Inertia::render('HRManager/Project/View',compact('data','developer','manager','task'));
    }
    public function Detail($id){
        $allData = $this->projectRepository->detail($id);
        $data = $allData[0];
        $user = $allData[1];
        $task = $allData[2];
        $status= $allData[3];
        $history = $allData[4];
        $bugs = $allData[5];
       $result = $allData[6];
       $historyTask = $allData[7];
        return Inertia::render('HRManager/Project/ProjectDetail', ['data' => $data, 'user' => $user,'task'=>$task ,'history'=>$history,"bugs"=>$bugs ,'result'=>$result ,'taskHistory'=>$historyTask]);
    }
}
