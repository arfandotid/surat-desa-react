<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// ==============================================
// ROUTES UNTUK ADMIN
// ==============================================

// route login admin
Route::get('/admin/login', [\App\Http\Controllers\Admin\Auth\LoginController::class, 'index'])
    ->name('admin.login.index')
    ->middleware('guest');

// route login store admin
Route::post('/admin/login', [\App\Http\Controllers\Admin\Auth\LoginController::class, 'store'])
    ->name('admin.login.store')
    ->middleware('guest');

// route logout admin
Route::post('/admin/logout', [\App\Http\Controllers\Admin\Auth\LoginController::class, 'logout'])
    ->name('admin.logout');


// prefix "admin" untuk admin
Route::prefix('admin')->name('admin.')->group(function () {

    // middleware "auth" untuk admin
    Route::group(['middleware' => ['auth']], function () {

        // route dashboard admin
        Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    });
});
