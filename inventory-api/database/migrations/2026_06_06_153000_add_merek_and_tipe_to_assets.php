<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('assets')) {
            Schema::table('assets', function (Blueprint $table) {
                if (!Schema::hasColumn('assets', 'merek')) {
                    $table->string('merek', 255)->nullable();
                }
                if (!Schema::hasColumn('assets', 'tipe')) {
                    $table->string('tipe', 255)->nullable();
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('assets')) {
            Schema::table('assets', function (Blueprint $table) {
                if (Schema::hasColumn('assets', 'merek')) {
                    $table->dropColumn('merek');
                }
                if (Schema::hasColumn('assets', 'tipe')) {
                    $table->dropColumn('tipe');
                }
            });
        }
    }
};
