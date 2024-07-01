<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Carbon\Carbon;


class News extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'news';

    public $timestamps = true;

    protected $fillable = [
        'status',
        'title',
        'text',
    ];

    /** JSONに含めるアクセサ */
    protected $appends = [
        'createdAtJa'
    ];

    public function category_rel(): \Illuminate\Database\Eloquent\Relations\hasOne
    {
        return $this->hasMany(NewsCategory::class);
    }

    public function add_category(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,
            'news_category'
        );
    }

    public function getCreatedAtJaAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('Y年m月d日H:i'); //'Y年m月d日(D)H:i'
    }

    // public function scopeStatusCheck(Object $query): \Illuminate\Database\Eloquent\Builder
    // {
    //     return $query->where('news.status', config('const.STATUS_ON'));
    // }
}
