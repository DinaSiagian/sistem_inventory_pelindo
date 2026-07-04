<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBranchCodeToAssetsTable extends Migration
{
    public function up()
    {
        Schema::table('assets', function (Blueprint $table) {
            if (!Schema::hasColumn('assets', 'branch_code')) {
                $table->string('branch_code', 50)->nullable()->after('device_code');
            }
        });
    }

    public function down()
    {
        Schema::table('assets', function (Blueprint $table) {
            if (Schema::hasColumn('assets', 'branch_code')) {
                $table->dropColumn('branch_code');
            }
        });
    }
}
