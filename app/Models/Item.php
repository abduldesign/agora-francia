<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'seller_id',
        'category_id',
        'name',
        'description',
        'price',
        'status',
        'sale_type',
        'photos',
        'auction_start',
        'auction_end',
    ];

    protected $casts = [
        'photos' => 'array',
        'auction_start' => 'datetime',
        'auction_end' => 'datetime',
    ];

    // Relationships
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
