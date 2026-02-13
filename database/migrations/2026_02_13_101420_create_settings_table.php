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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();

            // ======================
            // DATA DESA
            // ======================
            $table->string('village_name');
            $table->text('village_address');
            $table->string('village_phone')->nullable();
            $table->string('village_email')->nullable();
            $table->string('village_website')->nullable();
            $table->string('village_logo')->nullable();

            // ======================
            // WILAYAH ADMINISTRATIF
            // ======================
            $table->string('subdistrict_name');
            $table->string('regency_name');
            $table->string('province_name');

            // ======================
            // DATA KEPALA DESA
            // ======================
            $table->string('official_name')->nullable();
            $table->string('official_position')->nullable();
            $table->string('official_phone')->nullable();
            $table->string('official_email')->nullable();
            $table->string('official_nipd')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
