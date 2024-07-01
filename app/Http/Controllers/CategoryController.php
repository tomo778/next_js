<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    private $separator = ',';

    public function index() {
        $categories = Category::orderBy('id', 'asc')->get();
        return response(['data' => $categories], 200);
    }

    public function showSubcategories(Request $request) {
        $categories = Category::where([
            ['category_id', 'LIKE', $request->category_id . $this->separator . '%'],
            ['class_id', '=', $request->class_id + 1]
        ])->orderBy('class_id', 'asc')->get();

        return response(['data' => $categories], 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'class_id' => 'required|integer',
            'categorys' => 'required|string',
            'category_id' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::transaction(function () use ($request) {
            $item = $request->class_id == 1 ? $this->createClass1Items($request) : $this->createClassEtcItems($request);
            Category::insert($item);
        });

        return response()->json(['message' => 'Created successfully.'], 200);
    }

    private function createClass1Items(Request $request) {
        $lastCategoryId = Category::lockForUpdate()->where('class_id', $request->class_id)->orderBy('id', 'desc')->first('category_id');
        $lastCategoryId = $lastCategoryId ? $lastCategoryId->category_id : 0;

        return $this->prepareItems($request, ++$lastCategoryId);
    }

    private function createClassEtcItems(Request $request) {
        $result = $request->category_id . $this->separator;
        $lastCategoryId = Category::lockForUpdate()->where('category_id', 'LIKE', $result . '%')->orderBy('id', 'desc')->first('category_id');
        $lastCategoryId = $lastCategoryId ? last(explode($this->separator, $lastCategoryId->category_id)) : 0;

        return $this->prepareItems($request, $result . ++$lastCategoryId);
    }

    private function prepareItems(Request $request, $startCategoryId) {
        $array = array_filter(preg_split('/\r\n|\r|\n/', $request->categorys));
        $currentTimestamp = Carbon::now();
        $items = [];

        foreach ($array as $k => $v) {
            $items[$k] = [
                'title' => $v,
                'class_id' => $request->class_id,
                'category_id' => $startCategoryId++,
                'created_at' => $currentTimestamp,
                'updated_at' => $currentTimestamp
            ];
        }

        return $items;
    }

    public function update(Request $request, int $id) {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string',
            'class_id' => 'sometimes|integer',
            'category_id' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::transaction(function () use ($request, $id) {
            $category = Category::findOrFail($id);
            $category->fill($request->all())->save();
        });

        return response()->json(['message' => 'Updated successfully.'], 200);
    }

    public function destroy(string $category_id) {
        $validator = Validator::make(['category_id' =>$category_id], [
            'category_id' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::transaction(function () use ($category_id) {
            Category::where('category_id', 'LIKE', $category_id . '%')->delete();
        });

        return response()->json(['message' => 'Deleted successfully.'], 200);
    }
}
