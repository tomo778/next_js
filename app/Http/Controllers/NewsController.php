<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\NewsCategory;

use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    public function index() {
        $news = News::with('add_category')->orderBy('created_at', 'desc')->paginate(5);
        return response()->json(['data' => $news], 200);
    }

    public function getById($id) {
        $news = News::with('add_category')->findOrFail($id);
        return response()->json([
            'id' => $news->id,
            'title' => $news->title,
            'text' => $news->text,
            'add_category' => $news->add_category,
        ], 200);
    }

    public function create(Request $request) {
        DB::transaction(function () use ($request) {
            $q = News::create($request->all());
            NewsCategory::create(['category_id' => $request->category, 'news_id' => $q->id]);
            return response()->json(['message' => 'Successfully created.'], 200);
        });
    }

    public function update(Request $request) {
        DB::transaction(function () use ($request) {
            $news = News::findOrFail($request->id);
            $news->fill($request->all())->save();
            NewsCategory::where('news_id', $request->id)->update(['category_id' => $request->category]);
            return response()->json(['message' => 'Successfully updated.'], 200);
        });
    }

    // public function delete($id) {
    //     News::where('id', $id)->delete();
    //     return response()->json(['message' => 'Successfully deleted.'], 200);
    // }
}