<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\Category;

class NewsControllerTest extends TestCase
{
    //use RefreshDatabase;
    use DatabaseTransactions;

    public function testIndex()
    {
        // Arrange
        News::factory()->count(10)->create();

        // Act
        $response = $this->getJson('/api/news');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'data' => [
                        '*' => ['id', 'title', 'text', 'created_at', 'updated_at', 'add_category']
                    ],
                    'current_page',
                    'per_page'
                ]
            ]);
        $response->assertJsonCount(5, 'data.data'); // パジネーションのため5件のみ
    }

    public function testGetById()
    {
        // Arrange
        $news = News::factory()->create();
        $category = Category::factory()->create();
        NewsCategory::create([
            'news_id' => $news->id,
            'category_id' => $category->id,
        ]);

        // Act
        $response = $this->getJson("/api/news/{$news->id}");

        // Assert
        $response->assertStatus(200);
        $response->assertJson([
            'id' => $news->id,
            'title' => $news->title,
            'text' => $news->text,
            'add_category' => [[
                'id' => $category->id,
                'title' => $category->title,
            ]],
        ]);
    }

    public function testCreate()
    {
        // Arrange
        $category = Category::factory()->create();
        $data = [
            'title' => 'Sample News Title',
            'text' => 'Sample News Text',
            'category' => $category->id,
        ];

        // Act
        $response = $this->putJson('/api/news/create', $data);

        // Assert
        $response->assertStatus(200);
        //$response->assertJson(['message' => 'Successfully created.']);
        $this->assertDatabaseHas('news', ['title' => 'Sample News Title']);
        $this->assertDatabaseHas('news_category', ['category_id' => $category->id]);
    }

    public function testUpdate()
    {
        // Arrange
        $news = News::factory()->create();
        $category = Category::factory()->create();
        NewsCategory::create([
            'news_id' => $news->id,
            'category_id' => $category->id,
        ]);
        $data = [
            'id' => $news->id,
            'title' => 'Updated News Title',
            'text' => 'Updated News Text',
            'category' => $category->id,
        ];

        // Act
        $response = $this->putJson('/api/news/update', $data);

        // Assert
        $response->assertStatus(200);
        //$response->assertJson(['message' => 'Successfully updated.']);
        $this->assertDatabaseHas('news', ['title' => 'Updated News Title']);
        $this->assertDatabaseHas('news_category', ['category_id' => $category->id]);
    }
}
