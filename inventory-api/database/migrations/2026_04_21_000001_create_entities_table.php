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
        // Cek jika tabel sudah ada untuk mencegah error saat dev (opsional)
        if (!Schema::hasTable('entities')) {
            Schema::create('entities', function (Blueprint $table) {
                $table->string('entity_code', 50)->primary();
                $table->string('name', 255);
                $table->string('description', 500)->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();

                // Index untuk performa pencarian
                $table->index('name');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Aman dihapus langsung karena tidak punya FK ke tabel lain
        Schema::dropIfExists('entities');
    }
};