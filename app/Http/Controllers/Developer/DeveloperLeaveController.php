<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Interfaces\LeaveInterface;
use App\Repository\LeaveRepository;

class DeveloperLeaveController extends Controller
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
        return Inertia::render('Developer/Leave/View',['leave'=>$leave]);
    }
}
