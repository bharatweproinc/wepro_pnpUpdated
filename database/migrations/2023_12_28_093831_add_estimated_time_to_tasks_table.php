<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->renameColumn('hour_worked','development_hours');
            $table->float('debugging_hours',10,2)->default(0);
            $table->integer('is_debugging')->default(1);
            $table->renameColumn('started_at','started');
            $table->timestamp('estimated_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {

        });
    }
};
