<?php

namespace App\Observers;
use App\Models\History;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskObserver
{
    public function created(Task $task)
    {
        History::create([
            'historable_id'=>$task->id,
            'historable_type'=>Task::class,
            'change_type'=>'CREATE',
            'description'=> $task->id." Task created successfully.",
        ]);
    }

    public function updating(Task $task)
    {
        if ($task->isDirty('task_name')) {
            $oldtask_name = $task->getOriginal('task_name');
            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>'Task task_name has been changed from ' .$oldtask_name .' to '.$task->task_name,
            ]);
        }

        else if ($task->isDirty('description')) {
            $oldDescription = $task->getOriginal('description');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>'Task task_name has been changed from ' .$oldDescription .' to '.$task->description,
            ]);
        }
        else if ($task->isDirty('priority')) {
            $oldpriority = $task->getOriginal('priority');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>'Task task_name has been changed from ' .$oldpriority .' to '.$task->priority,

            ]);
        }
        else if ($task->isDirty('developer')) {
            $oldDeveloper = $task->getOriginal('developer');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>'Task task_name has been changed from ' .$oldDeveloper .' to '.$task->developer,

            ]);
        }
        else if ($task->isDirty('level')) {
            $oldlevel = $task->getOriginal('level');

            History::create([
                'historable_id' => $task->id,
                'historable_type' => Task::class,
                'change_type' => 'UPDATE',
                'description' =>'Task task_name has been changed from ' .$oldlevel .' to '.$task->level,

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
