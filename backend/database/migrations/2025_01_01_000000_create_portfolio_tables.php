<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('category')->index();
            $table->boolean('featured')->default(false)->index();
            $table->year('year');
            $table->text('summary');
            $table->string('image_path')->nullable();
            $table->json('tags')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->json('architecture')->nullable();
            $table->json('challenges')->nullable();
            $table->json('results')->nullable();
            $table->json('timeline')->nullable();
            $table->json('code_snippet')->nullable();
            $table->timestamps();
        });

        Schema::create('project_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('month', 12);
            $table->unsignedBigInteger('requests')->default(0);
            $table->decimal('success_rate', 5, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('project_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('path');
            $table->string('caption')->nullable();
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedTinyInteger('level');
            $table->string('category')->index();
            $table->text('note')->nullable();
            $table->json('projects')->nullable();
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('icon')->nullable();
            $table->text('description');
            $table->json('technologies')->nullable();
            $table->json('details')->nullable();
            $table->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->text('quote');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->index();
            $table->string('project_type');
            $table->string('budget')->nullable();
            $table->text('message');
            $table->ipAddress('ip_address')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('services');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('project_images');
        Schema::dropIfExists('project_metrics');
        Schema::dropIfExists('projects');
    }
};
