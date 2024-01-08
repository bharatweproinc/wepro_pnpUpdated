<?php

namespace App\Observers;
use App\Models\User;
use App\Models\History;
use Illuminate\Support\Facades\Auth;

class UserObserver
{

    public function created(User $user)
    {
        $auth = Auth::user();
        $userName = $auth->name;
        History::create([
            'historable_id'=>$user->id,
            'historable_type'=>User::class,
            'change_type'=>'CREATE',
            'description'=>$userName ." create ". $user->name." successfully.",
        ]);
    }

    public function updating(User $user)
    {
        $auth = Auth::user();
        $userName = $auth->name;

        if ($user->isDirty('email')) {
            $oldEmail = $user->getOriginal('email');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'description' =>$userName." update email from " .$oldEmail .' to '.$user->email,
            ]);
        }
        else if ($user->isDirty('name')) {
            $oldName = $user->getOriginal('name');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'description' =>$userName." update name from " .$oldName .' to '.$user->name,
            ]);
        }
        else if ($user->isDirty('contact_no')) {
            $oldPhone = $user->getOriginal('contact_no');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update phone no from ' .$oldPhone .' to '.$user->contact_no,

            ]);
        }
        else if ($user->isDirty('user_role')) {
            $oldRole = $user->getOriginal('user_role');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update user role from ' .$oldRole .' to '.$user->user_role,

            ]);
        }
        else if ($user->isDirty('profile')) {
            $oldProfile = $user->getOriginal('profile');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update profile from ' .$oldProfile .' to '.$user->profile,

            ]);
        }
    }

    public function deleted(User $user){
        History::create([
            'historable_id' => $user->id,
            'historable_type' => User::class,
            'change_type' => 'DELETE',
            'description' =>$user->name .' user has been deleetd '
        ]);
    }

    private function historyEntry($user, $auth, $field, $label){
        if ($user->isDirty($field)){
            History::create([
                'historable_type' => User::class,
                'historable_id' => $user->id,
                'change_type'=>"UPDATE",
                'description' => "{$user->getOriginal($field)} $label {$user->getOriginal($field)} to {$user->$field}.",
            ]);
        }
    }
}
