<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Project;
use App\Models\Leave;
use Carbon\Carbon;

class HrDashboardController extends Controller
{
    public function index(){
        $user = User::all();
        $project = Project::all();
        $leave = Leave::whereDate('created_at',  Carbon::today()->toDateString())->get();
        return Inertia::Render('HRManager/Dashboard/View',['user'=>$user ,'project'=>$project ,'leave'=>$leave]);
    }
}
