<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            Category::factory()->create(['class_id' => 1,'category_id' => $i]);
        }
        for ($i = 1; $i <= 10; $i++) {
            Category::factory()->create(['class_id' => 2,'category_id' => '1,' . $i]);
        }
        for ($i = 1; $i <= 10; $i++) {
            Category::factory()->create(['class_id' => 3,'category_id' => '1,2,' . $i]);
        }
    }
}
