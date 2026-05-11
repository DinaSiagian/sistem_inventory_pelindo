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
        // 1. Tabel Kategori Barang
        Schema::create('kategori_barang', function (Blueprint $table) {
            $table->string('category', 255)->primary(); // Sesuai formData.category
            $table->string('name', 255)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 2. Tabel Master Barang (Induk)
        Schema::create('barang', function (Blueprint $table) {
            $table->string('assetId', 255)->primary(); // Sesuai formData.assetId
            $table->string('category', 255); // Sesuai formData.category
            $table->string('name', 255); // Sesuai formData.name
            $table->string('tipeAset', 255)->nullable(); // Sesuai formData.tipeAset
            
            // Lokasi Default Master
            $table->string('entitasCode', 255)->nullable(); // Sesuai formData.entitasCode
            $table->string('branchCode', 255)->nullable(); // Sesuai formData.branchCode
            $table->string('zonaCode', 255)->nullable(); // Sesuai formData.zonaCode
            $table->string('subzonaCode', 255)->nullable(); // Sesuai formData.subzonaCode
            $table->string('nomorAset', 255)->nullable(); // Sesuai formData.nomorAset
            
            $table->decimal('value', 15, 2)->nullable(); // Sesuai formData.value
            $table->date('procurementDate')->nullable(); // Sesuai formData.procurementDate
            
            // Relasi Anggaran
            $table->string('id_pekerjaan', 255)->nullable(); // Sesuai formData.id_pekerjaan
            $table->string('kd_anggaran', 255)->nullable(); // Sesuai formData.kd_anggaran
            $table->integer('thn_anggaran')->nullable(); // Sesuai formData.thn_anggaran
            
            $table->text('photo')->nullable(); // Sesuai formData.photo
            $table->text('description')->nullable();
            
            $table->timestamps();

            $table->foreign('category')->references('category')->on('kategori_barang')->onUpdate('cascade');
        });

        // 3. Tabel Unit Fisik Barang (Anak dari Master)
        Schema::create('barang_units', function (Blueprint $table) {
            $table->id('unit_id'); // BIGINT Identity
            $table->string('assetId', 255); // Foreign Key ke barang.assetId
            $table->string('serialNumber', 255)->nullable(); // Sesuai formData.units[].serialNumber
            $table->string('location', 255)->nullable(); // Sesuai formData.units[].location
            
            $table->string('status', 50)->default('Tersedia'); // Sesuai formData.status
            $table->string('condition', 50)->default('Baik'); // Sesuai formData.condition
            
            $table->timestamps();

            $table->foreign('assetId')->references('assetId')->on('barang')->onUpdate('cascade')->onDelete('cascade');
        });

        // 4. Tabel Spesifikasi Barang
        Schema::create('barang_spesifikasi', function (Blueprint $table) {
            $table->id('spec_id');
            $table->string('assetId', 255); // Foreign Key ke barang.assetId
            $table->bigInteger('template_id')->nullable(); // Bisa nullable untuk custom specs
            
            $table->string('spec_label', 255); // Sesuai formData.specs[].spec_label
            $table->text('value')->nullable(); // Sesuai formData.specs[].value
            $table->string('default_unit', 50)->nullable(); // Sesuai formData.specs[].default_unit
            
            $table->timestamps();

            $table->foreign('assetId')->references('assetId')->on('barang')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang_spesifikasi');
        Schema::dropIfExists('barang_units');
        Schema::dropIfExists('barang');
        Schema::dropIfExists('kategori_barang');
    }
};
