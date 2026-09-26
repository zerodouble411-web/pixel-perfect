<?php

use App\Http\Controllers\Api\Admin\AdminProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('portfolio')->group(function () {
    Route::get('/hero', [PortfolioController::class, 'hero']);
    Route::get('/about', [PortfolioController::class, 'about']);
    Route::get('/services', [PortfolioController::class, 'services']);
    Route::get('/skills', [PortfolioController::class, 'skills']);
    Route::get('/live-cards', [PortfolioController::class, 'liveCards']);
    Route::get('/testimonials', [PortfolioController::class, 'testimonials']);
    Route::get('/architecture', [PortfolioController::class, 'architecture']);
    Route::get('/analytics', [PortfolioController::class, 'analytics']);
    Route::get('/github-activity', [PortfolioController::class, 'githubActivity']);
});

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('admin')->middleware('ability:admin')->group(function () {
        Route::put('/hero', [PortfolioController::class, 'updateHero']);
        Route::put('/about', [PortfolioController::class, 'updateAbout']);
        Route::apiResource('/skills', \App\Http\Controllers\Api\Admin\AdminSkillController::class)->except('show');
        Route::apiResource('/testimonials', \App\Http\Controllers\Api\Admin\AdminTestimonialController::class)->except('show');
        Route::apiResource('/projects', AdminProjectController::class)->except('show');
        Route::post('/projects/{project:slug}/gallery', [AdminProjectController::class, 'uploadGallery']);
        Route::get('/messages', [ContactController::class, 'index']);
        Route::patch('/messages/{message}', [ContactController::class, 'markRead']);
        Route::delete('/messages/{message}', [ContactController::class, 'destroy']);
        Route::get('/analytics', [PortfolioController::class, 'analytics']);
    });
});
