<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\Category;

class NewsSeeder extends Seeder
{
    public function run()
    {
        // Create 10 news items, each linked to a random category
        News::factory()->count(30)->create()->each(function ($news) {
            NewsCategory::create([
                'news_id' => $news->id,
                'category_id' => $news->id,
            ]);
        });
    }
}
