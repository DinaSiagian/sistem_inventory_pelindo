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
        if (!Schema::hasTable('divisions')) {
            Schema::create('divisions', function (Blueprint $table) {
                $table->string('division_code', 50)->primary();
                $table->string('branch_code', 50);
                $table->string('name', 255);
                $table->string('description', 500)->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                // FOREIGN KEY ke branches
                $table->foreign('branch_code')
                      ->references('branch_code')
                      ->on('branches')
                      ->cascadeOnUpdate()
                      ->cascadeOnDelete(); // Jika Branch dihapus, Division ikut terhapus

                // Index untuk performa
                $table->index(['branch_code', 'is_active']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus FK dulu sebelum drop table
        Schema::table('divisions', function (Blueprint $table) {
            $table->dropForeign(['branch_code']);
        });
        
        Schema::dropIfExists('divisions');
    }
};