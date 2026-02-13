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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->unique();
            $table->string('name');
            $table->string('password');
            $table->enum('gender', ['L', 'P']);
            $table->string('birth_place');
            $table->date('birth_date');
            $table->string('religion');
            $table->string('occupation');
            $table->string('education');
            $table->string('marital_status');
            $table->text('address');
            $table->string('rt');
            $table->string('rw');
            $table->string('phone');
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
