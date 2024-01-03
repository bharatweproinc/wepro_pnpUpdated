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
use App\Models\History;
use App\Models\Address;
use App\Models\State;


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
                 'gender' => $data->gender,
                 'dob' => $data->dob,
                 'alt_phone_no'=>$data->alt_phone_no,
            ]);
                if($data->hasFile('profile') && $data->profile != null){
                     $profileImage = $data->profile;
                     $fileName = uniqid().'_'.time().'_'.$profileImage->getClientOriginalName();
                     $profileImagePath = $profileImage->storeAs('profile', $fileName . $user->id . '.' . $profileImage->getClientOriginalExtension(), 'public');
                     User::where('id',$user->id)->update(['profile' =>$profileImagePath]);
                }
                $user_id = $user->id;
                $address = Address::create([
                    'user_id'=>$user_id,
                    'residential_address' => $data->residential_address,
                    'state'=>$data->state,
                    'city'=>$data->city,
                    'local_address' =>$data->local_address,
                    'pin_code' => $data->pin_code,
                ]);
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
            $profile = asset('storage/'.$user->profile);
            if( $data['profile']!== $profile && isset($data['profile'])){
                $profileImage =  $data['profile'];
                $profileName = uniqid().'_'.time().'_'.$profileImage->getClientOriginalName();
                $profileImagePath = $profileImage->storeAs('profile', $profileName . $id . '.' . $profileImage->getClientOriginalExtension(),'public');
                $data['profile'] = $profileImagePath;
           }
           $user->update($data);
           $address = Address::where('user_id',$id)->first();
           $da=$address->update($data);
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
        $data['profile'] = asset('storage/'.$data['profile']);
        $address = Address::where('user_id',$id)->first();
        $leave = Leave::where('user_id',$id)->orderBy('created_at','desc')->get();
        foreach($leave as $key => $val){
            $leave[$key]['file'] = asset('storage/'.$val->file);
         }
        $history = History::where('historable_id',$id)->where('historable_type','App\Models\User')->get();
        $states = State::with('cities')->get();
        return [ $data ,$salary ,$leave ,$history ,$states ,$address];
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
