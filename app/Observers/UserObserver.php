<?php

namespace App\Observers;
use App\Models\User;
use App\Models\History;
use Illuminate\Support\Facades\Auth;

class UserObserver
{
    // public function created(User $user)
    // {
    //     $user = Auth::user();
    //     History::create([
    //         'historable_id'=>$user->id,
    //         'historable_type'=>User::class,
    //         'change_type'=>'CREATE',
    //         'old_value'=>null,
    //         'new_value'=>$user,
    //     ]);
    // }

    public function updating(User $user)
    {
        if ($user->isDirty('email')) {
            $oldEmail = $user->getOriginal('email');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'old_value' => $oldEmail,
                'new_value' => $user->email,
            ]);
        }
        else if ($user->isDirty('name')) {
            $oldName = $user->getOriginal('name');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'old_value' => $oldName,
                'new_value' => $user->name,
            ]);
        }
        else if ($user->isDirty('contact_no')) {
            $oldPhone = $user->getOriginal('contact_no');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'old_value' => $oldPhone,
                'new_value' => $user->contact_no,
            ]);
        }
        else if ($user->isDirty('user_role')) {
            $oldRole = $user->getOriginal('user_role');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'old_value' => $oldRole,
                'new_value' => $user->user_role,
            ]);
        }
        else if ($user->isDirty('profile')) {
            $odProfile = $user->getOriginal('profile');

            History::create([
                'historable_id' => $user->id,
                'historable_type' => User::class,
                'change_type' => 'UPDATE',
                'old_value' => $odProfile,
                'new_value' => $user->profile,
            ]);
        }
    }
}
