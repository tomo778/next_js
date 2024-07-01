<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Carbon\Carbon;


class NewsCategory extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'news_category';

    protected $fillable = [
        'news_id',
        'category_id',
    ];

    public function scopeDeleteRel(Object $query, int $id): void
    {
        $query->where('news_id', '=', $id)->delete();
    }

    public function scopeInsertRel(Object $query, array $categorys, int $last_id): void
    {
        foreach ($categorys as $k => $v) {
            $tmp['news_id'] = $last_id;
            $tmp['category_id'] = $v;
            $data[] = $tmp;
        }
        $query->insert($data);
    }
}
