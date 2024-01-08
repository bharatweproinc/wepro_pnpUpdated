<?php

namespace App\Http\Controllers\ProjectManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Salary;
use App\Models\Address;
use App\Models\State;



class DashboardController extends Controller
{

    public function index(){
            $auth = Auth()->user();
            $id = $auth->id;
            $user = User::where('id',$id)->first();
            $user['profile'] = asset('storage/'.$user['profile']);
            $salary = Salary::where('user_id',$id)->first();
            $address = Address::where('user_id',$id)->first();
            $states = State::with('cities')->get();
           return Inertia::render('Account/View',['data'=>$user ,'salary'=>$salary ,'states'=>$states ,'address'=>$address]);

    }
}
