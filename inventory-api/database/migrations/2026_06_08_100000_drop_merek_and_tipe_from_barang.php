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
        Schema::table('barang', function (Blueprint $table) {
            if (Schema::hasColumn('barang', 'merek')) {
                $table->dropColumn('merek');
            }
            if (Schema::hasColumn('barang', 'tipe')) {
                $table->dropColumn('tipe');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('barang', function (Blueprint $table) {
            if (!Schema::hasColumn('barang', 'merek')) {
                $table->string('merek', 255)->nullable();
            }
            if (!Schema::hasColumn('barang', 'tipe')) {
                $table->string('tipe', 255)->nullable();
            }
        });
    }
};
