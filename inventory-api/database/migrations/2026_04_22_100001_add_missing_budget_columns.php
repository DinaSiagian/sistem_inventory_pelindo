<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingBudgetColumns extends Migration
{
    public function up()
    {
        if (Schema::hasTable('budget_annual_opex')) {
            Schema::table('budget_annual_opex', function (Blueprint $table) {
                if (!Schema::hasColumn('budget_annual_opex', 'nm_anggaran')) {
                    $table->string('nm_anggaran', 255)->nullable();
                }
                if (!Schema::hasColumn('budget_annual_opex', 'nilai_anggaran')) {
                    $table->decimal('nilai_anggaran', 15, 2)->default(0);
                }
                if (!Schema::hasColumn('budget_annual_opex', 'realisasi_tahunan')) {
                    $table->json('realisasi_tahunan')->nullable();
                }
            });
        }

        if (Schema::hasTable('budget_annual_capex')) {
            Schema::table('budget_annual_capex', function (Blueprint $table) {
                if (!Schema::hasColumn('budget_annual_capex', 'nm_master')) {
                    $table->string('nm_master', 255)->nullable();
                }
                if (!Schema::hasColumn('budget_annual_capex', 'anggaran_tahunan')) {
                    $table->json('anggaran_tahunan')->nullable();
                }
                if (!Schema::hasColumn('budget_annual_capex', 'history_anggaran')) {
                    $table->json('history_anggaran')->nullable();
                }
                if (!Schema::hasColumn('budget_annual_capex', 'pekerjaan')) {
                    $table->json('pekerjaan')->nullable();
                }
            });
        }
    }

    public function down()
    {
        // down not fully defined as this is just a patch
    }
}
