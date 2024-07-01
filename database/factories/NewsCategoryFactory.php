<?php

namespace Database\Factories;

use App\Models\NewsCategory;
use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsCategoryFactory extends Factory
{
    protected $model = NewsCategory::class;

    public function definition()
    {
        return [
            'news_id' => News::factory(),
            'category_id' => $this->faker->numberBetween(1, 10), // 仮のcategory_id、実際にはCategoryモデルが必要
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
