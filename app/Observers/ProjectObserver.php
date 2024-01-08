<?php

namespace App\Observers;
use App\Models\Project;
use App\Models\History;
use Illuminate\Support\Facades\Auth;

class ProjectObserver
{
    public function created(Project $project)
    {
        $auth = Auth::user();
        $userName = $auth->name;
        History::create([
            'historable_id'=>$project->id,
            'historable_type'=>Project::class,
            'change_type'=>'CREATE',
            'description'=>$userName ." create project ". $project->title." successfully.",
        ]);
    }

    public function updating(Project $project)
    {
        $auth = Auth::user();
        $userName = $auth->name;

        if ($project->isDirty('title')) {
            $oldTitle = $project->getOriginal('title');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' => $userName .' update project title from ' .$oldTitle .' to '.$project->title,
            ]);
        }
        else if ($project->isDirty('description')) {
            $oldDescription = $project->getOriginal('description');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>$userName .' update project description from ' .$oldDescription .' to '.$project->description,
            ]);
        }
        else if ($project->isDirty('manager')) {
            $oldManager = $project->getOriginal('manager');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>$userName .' update project manager from ' .$oldManager .' to '.$project->manager,

            ]);
        }
        else if ($project->isDirty('developer')) {
            $oldDeveloper = $project->getOriginal('developer');

            History::create([
                'historable_id' => $project->id,
                'historable_type' => Project::class,
                'change_type' => 'UPDATE',
                'description' =>$userName .' update project developer from ' .$oldDeveloper .' to '.$project->developer,

            ]);
        }


    }
}
