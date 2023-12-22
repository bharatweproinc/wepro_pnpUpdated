<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use App\Models\User;
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

    public function list()
    {
        $data = $this->userRepository->getlist();
        return Inertia::render('Admin/User/List',compact('data'));
    }

    public function create()
    {
        return Inertia::render('Admin/User/Create');
    }

    public function save(UserRequest $request)
    {
        $response = $this->userRepository->save($request);
        $id = $response['data']['id'];
        if($response['success']) {
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

    public function update(Request $request ,$id)
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
        return Inertia::render('Admin/User/Detail',['data'=>$data ,'salary'=>$salary ,'leave'=>$leave]);
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

}
