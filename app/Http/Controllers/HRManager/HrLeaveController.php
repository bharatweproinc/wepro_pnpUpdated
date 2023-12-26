<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Interfaces\LeaveInterface;
use App\Repository\LeaveRepository;

class HrLeaveController extends Controller
{
    private LeaveInterface $leaveRepository ;

    public function __construct(LeaveInterface $leaveRepository)
    {
       $this->leaveRepository = $leaveRepository;
    }

    public function list()
    {
        $leaves = $this->leaveRepository->getlist();
        $leave = $leaves[0];
        $user = $leaves[1];
        return Inertia::render('HRManager/AllLeaves/View',['leave'=>$leave ,'user'=>$user]);
    }

    public function save(Request $request ,$id)
    {
        $this->leaveRepository->save($request->all(),$id);
        return redirect()->back();
    }

    public function update(Request $request,$id)
    {
        $this->leaveRepository->update($request->all(),$id);
        return redirect()->back();
    }

}
