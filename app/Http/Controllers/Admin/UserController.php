<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Models\State;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Repositories\UserRepository;
use App\Interfaces\UserInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use App\Http\Requests\UserEditRequest;


class UserController extends Controller
{

    private UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public function list(Request $request)
    {
        $data = $this->userRepository->getlist($request);
        $states = State::with('cities')->get();
        return Inertia::render('Admin/User/View',compact('data','states'));
    }

    public function create()
    {
        return Inertia::render('Admin/User/Create');
    }

    public function save(UserRequest $request)
    {
        $response = $this->userRepository->save($request);
        if($response['success']) {
            $id = $response['data']['id'];
            if($response['data']['user_role'] === 'admin'){
                return Redirect::back();
            }
            else{
                return redirect::route('admin.user.salary.create',['user'=>$response['data']]);
            }
        } else {
            return Redirect::back()->withErrors($response);
        }

    }

    public function edit(Request $request , $id){
         $task = $this->userRepository->edit($id);
        return Inertia::render('Admin/User/Edit', ['user' => $task]);
    }

    public function update(UserEditRequest $request ,$id)
    {
        $response =$this->userRepository->update($id,$request->all());
        if($response['success']) {
            return back();
        } else {
            return Redirect::back()->withErrors($response);
        }
    }

    public function detail($id)
    {
        $items = $this->userRepository->detail($id);
        $items = $this->userRepository->detail($id);
        $data = $items[0];
        $salary = $items[1];
        $leave = $items[2];
        $history = $items[3];
        $states = $items[4];
        $address = $items[5];
        return Inertia::render('Admin/User/Detail',['data'=>$data ,'salary'=>$salary ,'leave'=>$leave ,'history'=>$history,'states'=>$states ,'address'=>$address]);
    }


    public function delete($id)
    {
       $response= $this->userRepository->delete($id);
        if($response['success']) {
            return back();
        } else {
            return Redirect::back()->withErrors($response);
        }
    }

    public function filter(Request $request){

        // dd($data);
        //  foreach($data as $key => $val){
        //     $data[$key]['profile'] = asset('storage/'.$val->profile);
        //  }
        // $term = $request->term;
        // $data = User::where('name', 'like'. $term . '%')->orWhere('email', 'like' .$term . '%')->get();
        return redirect()->back()->with(['filter'=>$data]);
    }

}
