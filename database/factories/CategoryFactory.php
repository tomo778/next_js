<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'class_id' => 1,
            'category_id' => '',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    // static $sequence = 1;

    // public function configure()
    // {
        
    //     return $this->afterMaking(function (Category $category) {
    //         if ($category->class_id == 1) {
    //             $this->sequence = $this->sequence + 1;
    //             $category->category_id = $this->sequence;
    //             $category->category_id = Category::where('class_id', 1)->max(\DB::raw('CAST(category_id AS UNSIGNED)'));
    //         } elseif ($category->class_id == 2) {
    //             $category->category_id = "1," . ((Category::where('class_id', 2)->count()) + 1);
    //         } elseif ($category->class_id == 3) {
    //             $category->category_id = "1,2," . ((Category::where('class_id', 3)->count()) + 1);
    //         }
    //     });
    // }
}
