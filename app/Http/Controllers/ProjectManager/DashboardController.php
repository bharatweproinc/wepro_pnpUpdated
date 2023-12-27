<?php

namespace App\Http\Controllers\ProjectManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Salary;


class DashboardController extends Controller
{

    public function index(){
            $auth = Auth()->user();
            $id = $auth->id;
            $user = User::where('id',$id)->first();
            $user['profile'] = asset('storage/'.$user['profile']);
            $salary = Salary::where('user_id',$id)->first();
           return Inertia::render('ProjectManager/Account/View',['data'=>$user ,'salary'=>$salary]);

    }
}
