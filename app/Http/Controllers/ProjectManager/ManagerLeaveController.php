<?php

namespace App\Http\Controllers\ProjectManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Interfaces\LeaveInterface;
use App\Repository\LeaveRepository;
use App\Http\Requests\LeaveRequest;

class ManagerLeaveController extends Controller
{
    private LeaveInterface $leaveRepository ;

    public function __construct(LeaveInterface $leaveRepository)
    {
       $this->leaveRepository = $leaveRepository;
    }

    public function list()
    {
        $leaves = $this->leaveRepository->userlist();
        $leave = $leaves[0];
        $id = $leaves[1];
        return Inertia::render('ProjectManager/Leave/View',['leave'=>$leave ,'Id'=>$id]);
    }
    public function save(LeaveRequest $request ,$id)
    {
        $response = $this->leaveRepository->save($request->all(),$id);
        if($response['success']){
            return redirect()->back();
        }
        else{
            return Redirect::back()->withErrors($response);
        }
    }

    // public function update(LeaveEditRequest $request,$id)
    // {
    //     $response = $this->leaveRepository->update($request->all(),$id);
    //     if($response['success']){
    //         return redirect()->back();
    //     }
    //     else{
    //         return Redirect::back()->withErrors($response);
    //     }
    // }
}
