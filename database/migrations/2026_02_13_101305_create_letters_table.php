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
        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_template_id')
                ->constrained('letter_templates');

            $table->foreignId('resident_id')
                ->constrained('residents');

            $table->json('resident_snapshot');
            $table->json('village_snapshot');
            $table->json('official_snapshot');
            $table->string('title');
            $table->string('letter_number')->unique()->nullable();
            $table->string('reference')->unique();
            $table->enum('status', [
                'pending',
                'approved',
                'rejected',
            ]);
            $table->json('payload');
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};
