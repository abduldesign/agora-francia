<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'item_id',
        'buyer_id',
        'final_price',
        'payment_status',
    ];

    // Relationships
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}