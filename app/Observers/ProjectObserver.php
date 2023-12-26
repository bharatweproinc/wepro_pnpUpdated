<?php

namespace App\Observers;
use App\Models\Project;
use App\Models\History;
use Illuminate\Support\Facades\Auth;

class ProjectObserver
{
    public function created(Project $project)
    {
        History::create([
            'historable_id'=>$project->id,
            'historable_type'=>Project::class,
            'change_type'=>'CREATE',
            'description'=> $project->id." Project created successfully.",
        ]);
    }

    public function updating(Project $project)
    {
        if ($project->isDirty('title')) {
            $oldTitle = $project->getOriginal('title');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>'Project title has been changed from ' .$oldTitle .' to '.$project->title,
            ]);
        }
        else if ($project->isDirty('description')) {
            $oldDescription = $project->getOriginal('description');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>'Project title has been changed from' .$oldDescription .'to'.$project->description,
            ]);
        }
        else if ($project->isDirty('manager')) {
            $oldManager = $project->getOriginal('manager');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>'Project title has been changed from' .$oldManager .'to'.$project->manager,

            ]);
        }
        else if ($project->isDirty('developer')) {
            $oldDeveloper = $project->getOriginal('developer');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>'Project title has been changed from ' .$oldDeveloper .' to '.$project->developer,

            ]);
        }


    }
}
