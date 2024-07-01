<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/news', 'App\Http\Controllers\NewsController@index');
// Route::get('/news/{id}', 'App\Http\Controllers\NewsController@getById');
// Route::put('/news/create', 'App\Http\Controllers\NewsController@create');
// Route::delete('/news/{id}', 'App\Http\Controllers\NewsController@delete');
// Route::put('/news/update', 'App\Http\Controllers\NewsController@update');

use App\Http\Controllers\NewsController;

Route::prefix('news')->group(function () {
    Route::get('', [NewsController::class, 'index']);
    Route::get('/{id}', [NewsController::class, 'getById']);
    Route::put('/create', [NewsController::class, 'create']);
    Route::put('/update', [NewsController::class, 'update']);
    Route::delete('/{id}', [NewsController::class, 'delete']);
});

// Route::get('/category', 'App\Http\Controllers\CategoryController@index');
// Route::get('/category/test', 'App\Http\Controllers\CategoryController@test');
// Route::put('/category/create', 'App\Http\Controllers\CategoryController@create');
// Route::delete('/category/{category_id}', 'App\Http\Controllers\CategoryController@delete');
// Route::put('/category/update', 'App\Http\Controllers\CategoryController@update');

use App\Http\Controllers\CategoryController;

Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/showSubcategories', [CategoryController::class, 'showSubcategories']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{category_id}', [CategoryController::class, 'destroy']);
});

// // リソースコントローラで標準のCRUDルートを定義
// Route::apiResource('category', CategoryController::class)
//     ->only(['index', 'store', 'update', 'destroy']);

// // カスタムルート
// Route::get('category/test', [CategoryController::class, 'test']);