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
        if (!Schema::hasTable('branches')) {
            Schema::create('branches', function (Blueprint $table) {
                $table->string('branch_code', 50)->primary();
                $table->string('entity_code', 50);
                $table->string('name', 255);
                $table->text('address')->nullable();
                $table->string('phone', 20)->nullable();
                $table->decimal('longitude', 10, 8)->nullable();
                $table->decimal('latitude', 10, 8)->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                // FOREIGN KEY ke entities
                $table->foreign('entity_code')
                      ->references('entity_code')
                      ->on('entities')
                      ->cascadeOnUpdate()
                      ->cascadeOnDelete(); // Jika Entity dihapus, Branch ikut terhapus

                // Index untuk performa
                $table->index(['entity_code', 'is_active']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus FK dulu sebelum drop table agar aman
        Schema::table('branches', function (Blueprint $table) {
            $table->dropForeign(['entity_code']);
        });
        
        Schema::dropIfExists('branches');
    }
};