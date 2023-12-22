<?php

namespace App\Repositories;
use App\Interfaces\UserInterface;
use App\Models\User;
use App\Models\Salary;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use App\Models\Leave;


class UserRepository implements UserInterface
{

    public function getlist(){
         $data = User::orderBy('created_at','desc')->paginate(10);
         foreach($data as $key => $val){
            $data[$key]['profile'] = asset('storage/'.$val->profile);
         }
         return $data;
    }

    public function save($data){
       try {
             $user=User::create([
                 'name' => $data->name,
                 'email' => $data->email,
                 'user_role'=>str_replace('_', ' ', $data->user_role),
                 'password' => Hash::make($data->password),
                  'contact_no' => $data->contact_no,
            ]);
                if($data->hasFile('profile') && $data->profile != null){
                     $profileImage = $data->profile;
                     $fileName = uniqid().'_'.time().'_'.$profileImage->getClientOriginalName();
                     $profileImagePath = $profileImage->storeAs('profile', $fileName . $user->id . '.' . $profileImage->getClientOriginalExtension(), 'public');
                     $data=User::where('id',$user->id)->update(['profile' =>$profileImagePath]);
                }
            return [
                'success'=>true,
                'data'=>$user,
            ];
       }catch (\Exception $e) {
        return [
           'success'=>false,
           'error'=>$e->getMessage(),
        ];
      }
    }

    public function edit($id){
        $task = User::findOrfail($id);
        if (empty($task)) {
            return back();
        }
        return $task;
    }

    public function update($id, $data)
    {
        try {
            $validator = Validator::make($data, [
                'email' => 'required|email|unique:users,email,' . $id,
                'name' => 'required|string|max:255',
                'user_role' => 'required|string',
            ]);
            $user = User::findOrFail($id);
            $user->update($data);
            if(isset($data['profile']) && array_key_exists('profile',$data) && is_array($data['profile']) ){
                $profileImage =  $data['profile'];
                $profileName = uniqid().'_'.time().'_'.$profileImage->getClientOriginalName();
                $profileImagePath = $profileImage->storeAs('profile', $profileName . $id . '.' . $profileImage->getClientOriginalExtension(),'public');
                User::where('id',$id)->update(['profile' =>$profileImagePath]);
           }
            return [
                'success'=>true,
                'data'=>$user,
            ];
        }catch (\Exception $e) {
            return [
                'success'=>false,
                'error'=>$e->getMessage(),
            ];
        }
    }


    public function detail($id)
    {

        $salary = Salary::where('user_id' ,$id)->get();
        $data = User::where('id',$id)->first();
        $leave = Leave::where('user_id',$id)->orderBy('created_at','desc')->get();
        return [ $data ,$salary ,$leave];


    }

    public function delete($id)
    {
        try {
            User::findOrFail($id)->delete();

            return ['success'=>true];

        } catch (\Throwable $th) {
            return [
            'success'=>false,
            'error'=>$th->getMessage(),
            ];
        }
    }

}
