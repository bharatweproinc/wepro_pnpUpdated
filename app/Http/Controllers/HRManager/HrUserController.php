<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Repositories\UserRepository;
use App\Interfaces\UserInterface;

class HrUserController extends Controller
{
    private UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function list()
    {
        $data = $this->userRepository->getlist();
        return Inertia::render('HRManager/User/List',compact('data'));
    }

    public function save(UserRequest $request){
        $response = $this->userRepository->save($request );
        $id = $response['data']['id'];
        if($response['success']){
            return Redirect::route('hrManager.user.salary.create' ,['user'=>$id]);
        }
        else{
            return Redirect::back()->withErrors($response);
        }
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
        $data = $items[0];
        $salary = $items[1];
        $leave = $items[2];
        return Inertia::render('HRManager/User/Detail',['data'=>$data ,'salary'=>$salary ,'leave'=>$leave]);
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
