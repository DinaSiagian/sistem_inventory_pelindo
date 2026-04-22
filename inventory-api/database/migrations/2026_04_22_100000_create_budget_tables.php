<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBudgetTables extends Migration
{
    public function up()
    {
        // ── budget_masters ─────────────────────────────────────
        if (!Schema::hasTable('budget_masters')) {
            Schema::create('budget_masters', function (Blueprint $table) {
                $table->string('kd_anggaran_master', 20)->primary();
                $table->string('nm_anggaran_master', 255)->nullable();
                $table->string('tipe_anggaran_master', 50)->nullable();
            });
        }

        // ── budget_annual_opex ─────────────────────────────────
        if (!Schema::hasTable('budget_annual_opex')) {
            Schema::create('budget_annual_opex', function (Blueprint $table) {
                $table->bigIncrements('id_anggaran_tahunan');
                $table->string('kd_anggaran_master', 20)->nullable();
                $table->smallInteger('thn_anggaran')->nullable();
                $table->decimal('nilai_anggaran_tahunan', 15, 2)->nullable();
                $table->string('nm_anggaran', 255)->nullable();
                $table->decimal('nilai_anggaran', 15, 2)->default(0);
                $table->json('realisasi_tahunan')->nullable();
                $table->foreign('kd_anggaran_master')->references('kd_anggaran_master')->on('budget_masters')->onUpdate('cascade')->onDelete('set null');
            });
        } else {
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

        // ── budget_annual_capex ────────────────────────────────
        if (!Schema::hasTable('budget_annual_capex')) {
            Schema::create('budget_annual_capex', function (Blueprint $table) {
                $table->string('kd_anggaran_capex', 20)->primary();
                $table->string('kd_anggaran_master', 20)->nullable();
                $table->string('nm_anggaran_capex', 255)->nullable();
                $table->smallInteger('thn_rkap_awal')->nullable();
                $table->smallInteger('thn_rkap_akhir')->nullable();
                $table->smallInteger('thn_anggaran')->nullable();
                $table->decimal('nilai_anggaran_kad', 15, 2)->default(0);
                $table->decimal('nilai_anggaran_rkap', 15, 2)->default(0);
                $table->string('nm_master', 255)->nullable();
                $table->json('anggaran_tahunan')->nullable();
                $table->json('history_anggaran')->nullable();
                $table->json('pekerjaan')->nullable();
                $table->foreign('kd_anggaran_master')->references('kd_anggaran_master')->on('budget_masters')->onUpdate('cascade')->onDelete('set null');
            });
        } else {
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
        // ...
    }
}
