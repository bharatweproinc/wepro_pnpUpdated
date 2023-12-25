<?php

namespace App\Repositories;
use App\Interfaces\LeaveInterface;
use App\Models\Leave;
use App\Models\User;



class LeaveRepository implements LeaveInterface
{
    public function getlist()
    {
        $leave = Leave::orderBy('created_at','desc')->paginate(10);
        foreach($leave as $key => $val){
            $leave[$key]['file'] = asset('storage/'.$val->file);
         }
        $user = User::get();
        return [  $leave ,$user];
    }
    public function save($data,$id)
    {
        $leaves= Leave::create([
        'user_id' => $id,
        'description'=>$data['description'],
        'requested_date'=>$data['requested_date'],
        'subject'=>$data['subject'],
        'days'=>$data['days'],
        'to_date'=>$data['to_date'],
       ]);
       if(array_key_exists('file',$data) && isset($data['file']))
       {
        $file = $data['file'];
        $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs('LeaveFile', $fileName . $id . '.' . $file->getClientOriginalExtension(), 'public');
        Leave::where('user_id',$id)->update(['file'=>$filePath]);
       }

        return true;
    }

    public function update($data,$id)
    {
        $leave = Leave::where('id',$id)->first();
        $leave->update($data);
        if(isset($data['file']) && array_key_exists('file',$data) && is_array($data['file']))
        {
            $file = $data['file'];
            $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
            $filePath = $file->storeAs('LeaveFile', $fileName . $id . '.' . $file->getClientOriginalExtension(), 'public');
            Leave::where('user_id',$id)->update(['file'=>asset('storage/'.$filePath)]);
        }
        return true;
    }
}
