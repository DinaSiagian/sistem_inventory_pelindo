<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBranchCodeToBudgetTables extends Migration
{
    public function up()
    {
        if (Schema::hasTable('budget_annual_opex')) {
            Schema::table('budget_annual_opex', function (Blueprint $table) {
                if (!Schema::hasColumn('budget_annual_opex', 'branch_code')) {
                    $table->string('branch_code', 50)->nullable();
                }
            });
        }

        if (Schema::hasTable('budget_annual_capex')) {
            Schema::table('budget_annual_capex', function (Blueprint $table) {
                if (!Schema::hasColumn('budget_annual_capex', 'branch_code')) {
                    $table->string('branch_code', 50)->nullable();
                }
            });
        }

        if (Schema::hasTable('budget_projects')) {
            Schema::table('budget_projects', function (Blueprint $table) {
                if (!Schema::hasColumn('budget_projects', 'branch_code')) {
                    $table->string('branch_code', 50)->nullable();
                }
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('budget_annual_opex')) {
            Schema::table('budget_annual_opex', function (Blueprint $table) {
                $table->dropColumn('branch_code');
            });
        }

        if (Schema::hasTable('budget_annual_capex')) {
            Schema::table('budget_annual_capex', function (Blueprint $table) {
                $table->dropColumn('branch_code');
            });
        }

        if (Schema::hasTable('budget_projects')) {
            Schema::table('budget_projects', function (Blueprint $table) {
                $table->dropColumn('branch_code');
            });
        }
    }
}
