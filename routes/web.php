<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SalaryController;
use App\Http\Controllers\Admin\LeaveController;
use App\Http\Controllers\HRManager\HrLeaveController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Developer\DeveloperDashboardController;
use App\Http\Controllers\Developer\DeveloperProjectController;
use App\Http\Controllers\Developer\DeveloperTaskController;
use App\Http\Controllers\Developer\DeveloperLeaveController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Inertia\Inertia;
use App\Http\Controllers\ProjectManager\DashboardController;
use App\Http\Controllers\ProjectManager\ManagerProjectController;
use App\Http\Controllers\ProjectManager\ManagerTaskController;
use App\Http\Controllers\ProjectManager\ManagerLeaveController;
use App\Http\Controllers\HRManager\HrDashboardController;
use App\Http\Controllers\HRManager\HrUserController;
use App\Http\Controllers\HRManager\HrSalaryController;
use App\Http\Controllers\HRManager\HrProjectController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});




Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);



    Route::prefix('profile')->group( function() {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        }
    );

    Route::prefix('user')->name('user.')->controller(UserController::class)->group( function() {

        Route::get('/list','list')->name('list');
        Route::get('/create','create')->name('create');
        Route::post('/save','save')->name('save');
        Route::get('/edit/{id}','edit')->name('edit');
        Route::post('/update/{id}','update')->name('update');
        Route::get('/detail/{id}','detail')->name('detail');
        Route::post('/delete/{id}','delete')->name('delete');

        Route::prefix('salary')->name('salary.')->controller(SalaryController::class)->group( function () {
            Route::get('/create' ,'create')->name('create');
            Route::post('/save/{id}','save')->name('save');
            Route::post('/update/{id}','update')->name('update');
        });

        Route::prefix('leave')->name('leave.')->controller(LeaveController::class)->group( function () {
            Route::post('/save/{id}','save')->name('save');
            Route::post('/update/{id}','update')->name('update');
            Route::get('/detail/{id}','details')->name('detail');
        });

    });

    Route::prefix('project')->name('project.')->controller(ProjectController::class)->group(function () {
        Route::get('/list','list')->name('list');
        Route::get('/create','create')->name('create');
        Route::post('/save','save')->name('save');
        Route::get('/detail/{id}','details')->name('detail');
        Route::get('/edit/{id}','edit')->name('edit');
        Route::post('/update/{id}','update')->name('update');
        Route::get('project','project')->name('task-project');
        Route::post('/delete/{id}','delete')->name('delete');
        Route::post('/file/{id}','image')->name('file');


        Route::prefix('task')->name('task.')->controller(TaskController::class)->group( function () {
            Route::get('/list/{id}','list')->name('list');
            Route::get('/create/{id}','create')->name('create');
            Route::post('/save/{id}','save')->name('save');
            Route::get('/edit/{id}','edit')->name('task');
            Route::post('/update/{id}','update')->name('update');
            Route::get('/detail/{id}','details')->name('detail');

            Route::post('/status/{id}' , 'status')->name('status');

        });
    });

    Route::prefix('leave')->name('leave.')->controller(LeaveController::class)->group(function (){
        Route::get('/list','list')->name('list');
    });

});

Route::prefix('project-manager')->name('projectManager.')->middleware(['auth', 'role:project manager'])->group(function () {
    Route::prefix('dashboard')->name('dashboard')->controller(DashboardController::class)->group( function () {
        Route::get('/','index');
    });
    Route::prefix('project')->name('project.')->controller(ManagerProjectController::class)->group( function () {
        Route::get('/list','list')->name('list');
        Route::get('/detail/{id}','detail')->name('detail');


        Route::prefix('/task')->name('task.')->controller(ManagerTaskController::class)->group( function () {
            Route::post('/save/{id}','save')->name('save');
            Route::post('/update/{id}','update')->name('update');
            Route::post('/status/{id}','status')->name('status');
        });
    });
    Route::prefix('leave')->name('leave.')->controller(ManagerLeaveController::class)->group(function (){
        Route::get('/list','list')->name('list');
    });


});

Route::prefix('hr-manager')->name('hrManager.')->middleware(['auth', 'role:hr manager'])->group(function () {
    Route::prefix('dashboard')->name('dashboard')->controller(HrDashboardController::class)->group( function () {
        Route::get('/','index');
    });
    Route::prefix('user')->name('user.')->controller(HrUserController::class)->group( function () {
        Route::get('list','list')->name('list');
        Route::post('/save','save')->name('save');
        Route::post('/update/{id}','update')->name('update');
        Route::get('/detail/{id}','detail')->name('detail');
        Route::post('/delete/{id}','delete')->name('delete');


        Route::prefix('salary')->name('salary.')->controller(HrSalaryController::class)->group( function () {
            Route::get('create','create')->name('create');
            Route::post('/save/{id}','save')->name('save');
            Route::post('/update/{id}','update')->name('update');
        });

        Route::prefix('leave')->name('leave.')->controller(HrLeaveController::class)->group( function () {
            Route::post('/save/{id}','save')->name('save');
            Route::post('/update/{id}','update')->name('update');
            Route::get('/detail/{id}','details')->name('detail');
        });
    });

    Route::prefix('leave')->name('leave.')->controller(HrLeaveController::class)->group(function (){
        Route::get('/list','list')->name('list');
    });

    Route::prefix('project')->name('project.')->controller(HrProjectController::class)->group( function () {
        Route::get('list','list')->name('list');
        Route::get('/detail/{id}','detail')->name('detail');

        Route::prefix('task')->name('task.')->controller(HrTaskController::class)->group( function () {
            Route::get('list','list')->name('list');
            Route::post('/detail/{id}','detail')->name('detail');
        });
    });
});

Route::prefix('developer')->name('developer.')->middleware(['auth', 'role:developer'])->group(function () {
        Route::prefix('dashboard')->name('dashboard')->controller(DeveloperDashboardController::class)->group( function () {
            Route::get('/','index');
        });
        Route::prefix('project')->name('project.')->controller(DeveloperProjectController::class)->group( function () {
            Route::get('list','list')->name('list');
            Route::get('/detail/{id}','detail')->name('detail');
            Route::post('/file/{id}','image')->name('file');

            Route::prefix('task')->name('task.')->controller(DeveloperTaskController::class)->group( function () {
                Route::get('list','list')->name('list');
                Route::post('/status/{id}','status')->name('status');
            });
        });
        Route::prefix('leave')->name('leave.')->controller(DeveloperLeaveController::class)->group(function (){
            Route::get('/list','list')->name('list');
        });
});

require __DIR__.'/auth.php';

