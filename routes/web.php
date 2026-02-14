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

        // route settings
        Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])
            ->name('settings.index');

        // route settings update
        Route::put('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])
            ->name('settings.update');

        // route resource untuk permission
        Route::resource('/permissions', App\Http\Controllers\Admin\PermissionController::class);

        // route resource untuk role
        Route::resource('/roles', App\Http\Controllers\Admin\RoleController::class);

        // route resource untuk user
        Route::resource('/users', App\Http\Controllers\Admin\UserController::class);

        // route residents import
        Route::get('/residents/import', [App\Http\Controllers\Admin\ResidentController::class, 'import'])
            ->name('residents.import');

        // route residents store import
        Route::post('/residents/import', [App\Http\Controllers\Admin\ResidentController::class, 'storeImport'])
            ->name('residents.storeImport');

        // route residents export
        Route::get('/residents/export', [App\Http\Controllers\Admin\ResidentController::class, 'export'])
            ->name('residents.export');

        // route resource untuk resident
        Route::resource('/residents', App\Http\Controllers\Admin\ResidentController::class);

        // route resource untuk letter template
        Route::resource('/letter-templates', App\Http\Controllers\Admin\LetterTemplateController::class);

        // route resource untuk letter
        Route::resource('/letters', App\Http\Controllers\Admin\LetterController::class)->only(['index', 'show', 'update']);

        // route untuk letter completed
        Route::get('/letter-completeds', [App\Http\Controllers\Admin\LetterCompletedController::class, 'index'])
            ->name('letter-completeds.index');

        // route print letters
        Route::get('/letter-completeds/print/{reference}', [App\Http\Controllers\Admin\LetterCompletedController::class, 'print'])
            ->name('letter-completeds.print');
    });
});
