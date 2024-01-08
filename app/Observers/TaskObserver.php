<?php

namespace App\Observers;
use App\Models\History;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskObserver
{
    public function created(Task $task)
    {
        $auth = Auth::user();
        $userName = $auth->name;
        History::create([
            'historable_id'=>$task->id,
            'historable_type'=>Task::class,
            'change_type'=>'CREATE',
            'description'=> $userName ." create task ".$task->task_name." successfully.",
        ]);
    }

    public function updating(Task $task)
    {
        $auth = Auth::user();
        $userName = $auth->name;
        if ($task->isDirty('task_name')) {
            $oldtask_name = $task->getOriginal('task_name');
            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update task_name from ' .$oldtask_name .' to '.$task->task_name,
            ]);
        }

        else if ($task->isDirty('description')) {
            $oldDescription = $task->getOriginal('description');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update description from ' .$oldDescription .' to '.$task->description,
            ]);
        }
        else if ($task->isDirty('priority')) {
            $oldpriority = $task->getOriginal('priority');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update priority from ' .$oldpriority .' to '.$task->priority,

            ]);
        }
        else if ($task->isDirty('developer')) {
            $oldDeveloper = $task->getOriginal('developer');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update developer from ' .$oldDeveloper .' to '.$task->developer,

            ]);
        }
        else if ($task->isDirty('level')) {
            $oldlevel = $task->getOriginal('level');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update level from ' .$oldlevel .' to '.$task->level,

            ]);
        }
        else if ($task->isDirty('status')) {
            $oldStatus = $task->getOriginal('status');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>$userName.' update status from ' .$oldStatus .' to '.$task->status,

            ]);
        }
        else if ($task->isDirty('estimated')) {
            $oldestimated = $task->getOriginal('estimated');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>'Task task_name has been changed from ' .$oldestimated .' to '.$task->estimated,

            ]);
        }

    }


}
