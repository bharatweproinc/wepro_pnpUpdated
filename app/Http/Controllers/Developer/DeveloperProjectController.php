<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Interfaces\ProjectInterface;
use App\Repositories\ProjectRepository;

class DeveloperProjectController extends Controller
{
    private ProjectInterface $projectRepository;

    public function __construct(ProjectInterface $projectRepository){
        $this->projectRepository = $projectRepository;
    }

    public function list()
    {
        $items = $this->projectRepository->getlist();
        $data = $items[0];
        $developer = $items[1];
        $manager = $items[2];
        return Inertia::render('Developer/Project/View',compact('data' ,'developer' , 'manager'));
    }
    public function detail($id)
    {
       $allData = $this->projectRepository->detail($id);
       $data = $allData[0];
       $user = $allData[1];
       $task = $allData[2];
       $status = $allData[3];
       $history = $allData[4];
       $bugs = $allData[5];
       $result = $allData[6];
       $historyTask = $allData[7];
       return Inertia::render('Developer/Project/Detail', ['data' => $data, 'user' => $user,'task'=>$task ,'updated'=>$status,'history'=>$history ,"bugs"=>$bugs ,'result'=>$result,'taskHistory'=>$historyTask]);
    }

}
