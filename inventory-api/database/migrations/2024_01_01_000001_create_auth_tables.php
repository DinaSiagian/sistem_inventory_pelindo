<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthTables extends Migration
{
    public function up(): void
    {
        // Entities
        Schema::create('entities', function (Blueprint $table) {
            $table->string('entity_code', 255)->primary();
            $table->string('name', 255);
            $table->timestamps();
        });

        // Branches
        Schema::create('branches', function (Blueprint $table) {
            $table->string('branch_code', 255)->primary();
            $table->string('entity_code', 255);
            $table->string('name', 255);
            $table->text('address')->nullable();
            $table->string('phone', 20)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('entity_code')->references('entity_code')->on('entities')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        // Divisions
        Schema::create('divisions', function (Blueprint $table) {
            $table->string('division_code', 255)->primary();
            $table->string('branch_code', 255);
            $table->string('name', 255);
            $table->timestamps();

            $table->foreign('branch_code')->references('branch_code')->on('branches')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        // Roles
        Schema::create('roles', function (Blueprint $table) {
            $table->string('role_code', 50)->primary();
            $table->string('name', 255);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('username', 255)->unique();
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->string('phone', 20)->unique()->nullable();
            $table->string('nip', 50)->nullable();
            $table->string('role_code', 50);
            $table->string('entity_code', 255);
            $table->string('branches_code', 255);
            $table->string('division_code', 255)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('role_code')->references('role_code')->on('roles');
            $table->foreign('entity_code')->references('entity_code')->on('entities');
            $table->foreign('division_code')->references('division_code')->on('divisions')
                ->onUpdate('cascade')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('divisions');
        Schema::dropIfExists('branches');
        Schema::dropIfExists('entities');
    }
}