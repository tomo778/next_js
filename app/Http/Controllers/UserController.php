<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserPostRequest;

class UserController extends Controller
{
    // 一覧表示
    public function index() {
        $users = User::select('id','name','email','created_at','updated_at')->orderBy('created_at','desc')->paginate(5);
        return response([
            'data' => $users
        ], 200);
    }

    // 登録
    public function create(UserPostRequest $request) {
        $request->merge([
            'password' => password_hash($request->password, PASSWORD_DEFAULT),
        ]);
        $q = User::create($request->all());
        return response()->json([
            'message' => 'successfully.'
        ], 200);
    }

    // 更新
    public function update(Request $request) {
        $q = User::findOrFail($request->id);
        $q->fill($request->all())->save();
        return response()->json([
            'data' => 'successfully.'
        ], 200);
    }

    // 削除
    public function delete(Request $request) {
        User::where('id', $request->id)->delete();
        return response()->json([
            'message' => 'deleted successfully.'
        ], 200);
    }
}